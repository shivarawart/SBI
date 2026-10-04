"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

type Video = {
  id: string;
  video_url: string;
  description: string;
  created_at: string;
  owner_name?: string;
  owner_email?: string;
};

export default function VideoManager() {
  const { user, isLoaded } = useUser();

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const ownerEmail =
    user?.primaryEmailAddress?.emailAddress?.trim().toLowerCase() || "";

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/videos", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to load videos");
      }

      setVideos(data.videos || []);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "Failed to load videos",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && ownerEmail) {
      loadVideos();
    }
  }, [isLoaded, ownerEmail]);

  const uploadVideo = async () => {
    if (!file) {
      setError("Please select a video.");
      return;
    }

    if (!description.trim()) {
      setError("Please add a description.");
      return;
    }

    if (!ownerEmail) {
      setError("Owner account not found.");
      return;
    }

    try {
      setUploading(true);
      setError("");
      setSuccess("");

      /*
       * STEP 1
       * Get ImageKit authentication
       */

      const authResponse = await fetch("/api/upload-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerEmail,
        }),
      });

      const authData = await authResponse.json();

      if (!authResponse.ok || !authData.success) {
        throw new Error(authData.error || "Failed to authenticate ImageKit");
      }

      /*
       * STEP 2
       * Upload directly to ImageKit
       */

      const formData = new FormData();

      formData.append("file", file);
      formData.append("fileName", file.name);

      formData.append("publicKey", authData.publicKey);

      formData.append("signature", authData.signature);

      formData.append("expire", String(authData.expire));

      formData.append("token", authData.token);

      formData.append("folder", "/videos");

      formData.append("useUniqueFileName", "true");

      const imageKitResponse = await fetch(
        "https://upload.imagekit.io/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const imageKitData = await imageKitResponse.json();

      if (!imageKitResponse.ok || !imageKitData.url) {
        throw new Error(imageKitData.message || "Video upload failed");
      }

      /*
       * STEP 3
       * Save metadata in Neon
       */

      const saveResponse = await fetch("/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerEmail,
          videoUrl: imageKitData.url,
          description: description.trim(),
        }),
      });

      const saveData = await saveResponse.json();

      if (!saveResponse.ok || !saveData.success) {
        throw new Error(saveData.error || "Failed to save video");
      }

      /*
       * DONE
       */

      setFile(null);
      setDescription("");

      setSuccess("Video published successfully.");

      await loadVideos();
    } catch (error) {
      console.error("VIDEO UPLOAD ERROR:", error);

      setError(error instanceof Error ? error.message : "Video upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
        <p className="text-sm text-white/40">Loading owner account...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* UPLOAD */}
      <section>
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.2em] text-white/30">
            Content
          </p>

          <h2 className="mt-2 text-2xl font-semibold">Upload video</h2>

          <p className="mt-2 text-sm text-white/40">
            Publish a new video to Vishvaguru.
          </p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
          <label className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/20 text-center transition hover:border-white/20 hover:bg-white/[0.03]">
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(event) => {
                const selected = event.target.files?.[0];

                if (selected) {
                  setFile(selected);
                }
              }}
            />

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
              ↑
            </div>

            <p className="mt-4 text-sm font-medium">
              {file ? file.name : "Choose a video"}
            </p>

            <p className="mt-2 text-xs text-white/30">
              MP4, WebM or supported video format
            </p>
          </label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Write a short description..."
            rows={4}
            className="mt-5 w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/20"
          />

          {error && (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-400">
              {success}
            </div>
          )}

          <button
            type="button"
            onClick={uploadVideo}
            disabled={uploading}
            className="mt-5 w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? "Publishing..." : "Publish video"}
          </button>
        </div>
      </section>

      {/* VIDEOS */}
      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/30">
              Library
            </p>

            <h2 className="mt-2 text-2xl font-semibold">Published videos</h2>
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/40">
            {videos.length} videos
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <p className="text-sm text-white/40">Loading videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 p-12 text-center">
            <p className="text-sm text-white/30">No videos published yet.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {videos.map((video) => (
              <article
                key={video.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
              >
                <div className="aspect-video bg-black">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-contain"
                  >
                    <source src={video.video_url} />
                  </video>
                </div>

                <div className="p-5">
                  <p className="line-clamp-3 text-sm leading-6 text-white/50">
                    {video.description}
                  </p>

                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-xs text-white/30">
                      {new Date(video.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
