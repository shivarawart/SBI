"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";

import { useUser } from "@clerk/nextjs";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

type Video = {
  id: string;
  video_url: string;
  description: string;
  created_at: string;
  owner_id?: string;
  owner_name?: string;
  owner_email?: string;
};

type UploadAuthResponse = {
  success: boolean;
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
  owner: {
    id: string;
    name: string;
    email: string;
  };
};

export default function OwnerVideosPage() {
  const { user, isLoaded } = useUser();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [dragActive, setDragActive] = useState(false);

  const ownerEmail =
    user?.primaryEmailAddress?.emailAddress?.trim().toLowerCase() || "";

  const ownerName = user?.fullName || user?.firstName || "Owner";

  const loadVideos = async () => {
    try {
      setLoadingVideos(true);
      setError("");

      const response = await fetch("/api/videos", {
        method: "GET",
        cache: "no-store",
      });

      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        const text = await response.text();
        console.error(
          "VIDEOS API RETURNED NON JSON:",
          response.status,
          text.slice(0, 300),
        );
        throw new Error(`Videos API returned HTTP ${response.status}`);
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to load videos");
      }

      setVideos(Array.isArray(data.videos) ? data.videos : []);
    } catch (err) {
      console.error("LOAD VIDEOS ERROR:", err);
      setError(err instanceof Error ? err.message : "Failed to load videos");
    } finally {
      setLoadingVideos(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      loadVideos();
    }
  }, [isLoaded]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setMessage("");

    if (!file.type.startsWith("video/")) {
      setError("Please select a valid video file.");
      event.target.value = "";
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!uploading) {
      setDragActive(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    if (uploading) {
      return;
    }

    const file = event.dataTransfer.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setMessage("");

    if (!file.type.startsWith("video/")) {
      setError("Please drop a valid video file.");
      return;
    }

    setSelectedFile(file);

    if (fileInputRef.current) {
      try {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      } catch {
        // selectedFile is enough
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const getUploadAuth = async (): Promise<UploadAuthResponse> => {
    if (!ownerEmail) {
      throw new Error(
        "Your Clerk account does not have a primary email address.",
      );
    }

    const response = await fetch("/api/upload-auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerEmail,
      }),
    });

    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      const text = await response.text();
      console.error(
        "UPLOAD AUTH NON JSON:",
        response.status,
        text.slice(0, 300),
      );
      throw new Error(`Upload authentication returned HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Failed to authenticate ImageKit upload");
    }

    if (!data.token || !data.signature || !data.expire || !data.publicKey) {
      throw new Error("ImageKit authentication response is incomplete.");
    }

    return data;
  };

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("🚀 PUBLISH BUTTON CLICKED");

    setError("");
    setMessage("");

    if (!isLoaded) {
      setError("Authentication is still loading. Please wait.");
      return;
    }

    if (!ownerEmail) {
      setError("Owner email was not found in your Clerk account.");
      return;
    }

    if (!selectedFile) {
      setError("Please select a video first.");
      return;
    }

    const cleanDescription = description.trim();
    if (!cleanDescription) {
      setError("Please add a description.");
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      setMessage("Preparing secure upload...");
      console.log("1️⃣ Requesting ImageKit auth...");
      const auth = await getUploadAuth();
      console.log("✅ ImageKit auth received");

      setMessage("Uploading video to ImageKit...");
      console.log("2️⃣ Uploading video to ImageKit...");
      const imageKitResponse = await upload({
        file: selectedFile,
        fileName: selectedFile.name,
        token: auth.token,
        expire: auth.expire,
        signature: auth.signature,
        publicKey: auth.publicKey,
        folder: "/videos",
        useUniqueFileName: true,
        onProgress: (event) => {
          if (event.total > 0) {
            const progress = (event.loaded / event.total) * 100;
            setUploadProgress(Math.min(100, Math.round(progress)));
          }
        },
        abortSignal: abortController.signal,
      });

      console.log("✅ ImageKit upload completed:", imageKitResponse);

      if (!imageKitResponse.url) {
        throw new Error("ImageKit did not return a video URL.");
      }

      setMessage("Saving video to your library...");
      console.log("3️⃣ Saving video metadata...");
      const saveResponse = await fetch("/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerEmail,
          videoUrl: imageKitResponse.url,
          description: cleanDescription,
        }),
      });

      const saveContentType = saveResponse.headers.get("content-type") || "";

      if (!saveContentType.includes("application/json")) {
        const text = await saveResponse.text();
        console.error(
          "SAVE VIDEO NON JSON:",
          saveResponse.status,
          text.slice(0, 300),
        );
        throw new Error(`Video API returned HTTP ${saveResponse.status}`);
      }

      const saveData = await saveResponse.json();

      if (!saveResponse.ok || !saveData.success) {
        throw new Error(
          saveData.error || "Video uploaded but could not be saved.",
        );
      }

      console.log("✅ Video saved successfully");

      setUploadProgress(100);
      setMessage("Video published successfully.");
      setDescription("");
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await loadVideos();
    } catch (err) {
      console.error("❌ VIDEO UPLOAD ERROR:", err);

      if (err instanceof ImageKitAbortError) {
        setError("Video upload was cancelled.");
      } else if (err instanceof ImageKitInvalidRequestError) {
        setError(`Invalid ImageKit request: ${err.message}`);
      } else if (err instanceof ImageKitUploadNetworkError) {
        setError(`Network error while uploading: ${err.message}`);
      } else if (err instanceof ImageKitServerError) {
        setError(`ImageKit server error: ${err.message}`);
      } else {
        setError(err instanceof Error ? err.message : "Video upload failed.");
      }

      setMessage("");
    } finally {
      setUploading(false);
      abortControllerRef.current = null;
    }
  };

  const cancelUpload = () => {
    abortControllerRef.current?.abort();
  };

  const removeSelectedFile = () => {
    if (uploading) {
      return;
    }
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white" />
          <p className="mt-4 text-sm text-white/40">Loading owner account...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <header className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                Owner Studio
              </span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Video Library
            </h1>
            <p className="mt-2 text-sm leading-6 text-white/45">
              Upload your videos directly to ImageKit and publish them to your
              video library.
            </p>
          </div>

          <div className="flex-shrink-0 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
              Owner
            </p>
            <p className="mt-1 text-sm font-medium text-white">{ownerName}</p>
            <p className="mt-1 max-w-[260px] truncate text-xs text-white/35">
              {ownerEmail || "No primary email"}
            </p>
          </div>
        </header>

        {/* MAIN */}
        <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
          {/* UPLOAD */}
          <section className="h-fit rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20 sm:p-6">
            <div className="mb-5">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/30">
                Create
              </p>
              <h2 className="mt-2 text-lg font-semibold sm:text-xl">
                Publish a video
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/40">
                Select a video, add a description, and publish it.
              </p>
            </div>

            <form onSubmit={handleUpload} className="space-y-5">
              {/* FILE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/70">
                  Video file
                </label>

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => {
                    if (!uploading) {
                      fileInputRef.current?.click();
                    }
                  }}
                  className={[
                    "relative cursor-pointer overflow-hidden rounded-xl border border-dashed p-5 text-center transition-all duration-200",
                    dragActive
                      ? "border-white/50 bg-white/[0.08] scale-[1.02]"
                      : "border-white/15 bg-black/20 hover:border-white/25 hover:bg-white/[0.03]",
                    uploading ? "cursor-not-allowed opacity-60" : "",
                  ].join(" ")}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="hidden"
                  />

                  {!selectedFile ? (
                    <>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-6 w-6 text-white/60"
                        >
                          <path
                            d="M8 5.5L18 12L8 18.5V5.5Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="mt-4 text-sm font-medium text-white">
                        Drop your video here
                      </p>
                      <p className="mt-1 text-xs text-white/35">
                        or click to browse
                      </p>
                      <p className="mt-3 text-[11px] text-white/25">
                        MP4 · MOV · WEBM · AVI · MKV
                      </p>
                    </>
                  ) : (
                    <div className="text-left">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-black">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-5 w-5"
                          >
                            <path
                              d="M8 5.5L18 12L8 18.5V5.5Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-white">
                            {selectedFile.name}
                          </p>
                          <p className="mt-1 text-xs text-white/35">
                            {formatFileSize(selectedFile.size)}
                          </p>
                        </div>

                        {!uploading && (
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              removeSelectedFile();
                            }}
                            className="rounded-lg p-1.5 text-white/30 transition-colors hover:bg-white/10 hover:text-white"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              className="h-4 w-4"
                            >
                              <path
                                d="M18 6L6 18M6 6L18 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-white/70"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  disabled={uploading}
                  rows={5}
                  maxLength={1000}
                  placeholder="Tell people what this video is about..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/20 focus:border-white/30 focus:ring-1 focus:ring-white/10 transition-all duration-200"
                />

                <div className="mt-2 text-right text-[11px] text-white/25">
                  {description.length}/1000
                </div>
              </div>

              {/* PROGRESS */}
              {uploading && (
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs text-white/50">Uploading</span>
                    <span className="text-xs font-medium text-white">
                      {uploadProgress}%
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-white transition-all duration-300"
                      style={{
                        width: `${uploadProgress}%`,
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={cancelUpload}
                    className="mt-3 text-xs text-white/35 transition-colors hover:text-white"
                  >
                    Cancel upload
                  </button>
                </div>
              )}

              {/* ERROR */}
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3">
                  <p className="text-sm leading-5 text-red-300">{error}</p>
                </div>
              )}

              {/* SUCCESS */}
              {message && !error && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] px-4 py-3">
                  <p className="text-sm leading-5 text-emerald-300">
                    {message}
                  </p>
                </div>
              )}

              {/* PUBLISH */}
              <button
                type="submit"
                disabled={
                  uploading ||
                  !selectedFile ||
                  !description.trim() ||
                  !ownerEmail
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition-all duration-200 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
              >
                {uploading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                    Publishing...
                  </>
                ) : (
                  <>
                    Publish video
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </section>

          {/* LIBRARY */}
          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/30">
                  Library
                </p>
                <h2 className="mt-2 text-lg font-semibold sm:text-xl">
                  Published videos
                </h2>
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/45">
                {videos.length} {videos.length === 1 ? "video" : "videos"}
              </div>
            </div>

            {/* LOADING */}
            {loadingVideos ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                  >
                    <div className="aspect-video animate-pulse bg-white/[0.05]" />
                    <div className="space-y-3 p-4">
                      <div className="h-4 w-32 animate-pulse rounded bg-white/[0.06]" />
                      <div className="h-3 w-full animate-pulse rounded bg-white/[0.05]" />
                      <div className="h-3 w-2/3 animate-pulse rounded bg-white/[0.05]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : videos.length === 0 ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6 text-white/40"
                  >
                    <path
                      d="M8 5.5L18 12L8 18.5V5.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="mt-5 text-sm font-medium text-white">
                  No videos yet
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/35">
                  Upload your first video and it will appear here.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {videos.map((video) => (
                  <article
                    key={video.id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] transition-all duration-200 hover:border-white/20 hover:shadow-lg hover:shadow-black/20"
                  >
                    <div className="relative aspect-video overflow-hidden bg-black">
                      <video
                        controls
                        preload="metadata"
                        className="h-full w-full object-cover"
                      >
                        <source src={video.video_url} />
                        Your browser does not support video playback.
                      </video>
                    </div>

                    <div className="p-4">
                      <p className="line-clamp-3 text-sm leading-6 text-white/55">
                        {video.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                        <span className="text-[11px] text-white/25">
                          {new Date(video.created_at).toLocaleDateString(
                            undefined,
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>

                        <span className="flex items-center gap-1.5 text-[11px] text-emerald-400/70">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Published
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
