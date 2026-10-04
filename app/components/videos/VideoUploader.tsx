"use client";

import { upload } from "@imagekit/next";
import { useRef, useState } from "react";

type Props = {
  ownerEmail: string;
  onUploaded?: () => void;
};

type UploadAuthResponse = {
  success: boolean;
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
};

export default function VideoUploader({ ownerEmail, onUploaded }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      setMessage("Please select a video.");
      return;
    }

    if (!ownerEmail) {
      setMessage("Owner email is required.");
      return;
    }

    if (!description.trim()) {
      setMessage("Please enter a video description.");
      return;
    }

    try {
      setUploading(true);
      setProgress(0);
      setMessage("");

      /*
       * STEP 1
       * Get ImageKit authentication.
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

      const authData =
        (await authResponse.json()) as Partial<UploadAuthResponse> & {
          error?: string;
        };

      if (!authResponse.ok) {
        throw new Error(authData.error || "Failed to authenticate upload");
      }

      /*
       * STEP 2
       * Upload video directly to ImageKit.
       */

      const imageKitResponse = await upload({
        file,

        fileName: file.name,

        token: authData.token!,
        expire: authData.expire!,
        signature: authData.signature!,
        publicKey: authData.publicKey!,

        folder: "/videos",

        useUniqueFileName: true,

        onProgress: (event) => {
          if (event.total > 0) {
            const percentage = (event.loaded / event.total) * 100;

            setProgress(Math.round(percentage));
          }
        },
      });

      /*
       * STEP 3
       * Save ImageKit metadata in Neon.
       */

      const saveResponse = await fetch("/api/videos", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ownerEmail,

          videoUrl: imageKitResponse.url,

          description: description.trim(),

          imagekitFileId: imageKitResponse.fileId ?? null,

          imagekitFilePath: imageKitResponse.filePath ?? null,

          thumbnailUrl: imageKitResponse.thumbnailUrl ?? null,

          originalName: file.name,

          mimeType: file.type,

          fileSize: file.size,
        }),
      });

      const saveData = await saveResponse.json();

      if (!saveResponse.ok) {
        throw new Error(saveData.error || "Failed to save video");
      }

      /*
       * SUCCESS
       */

      setMessage("Video published successfully.");

      setDescription("");
      setProgress(100);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      onUploaded?.();
    } catch (error) {
      console.error("VIDEO UPLOAD ERROR:", error);

      setMessage(
        error instanceof Error ? error.message : "Video upload failed.",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl">
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
          Owner Studio
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-white">
          Publish a video
        </h2>

        <p className="mt-2 text-sm text-white/50">
          Upload your video directly to ImageKit and publish it to the public
          video feed.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-white/70">Video</label>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            disabled={uploading}
            className="block w-full cursor-pointer rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-white file:mr-4 file:rounded-xl file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black hover:border-white/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/70">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={uploading}
            rows={4}
            placeholder="Write a short description..."
            className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/25"
          />
        </div>

        {uploading && (
          <div>
            <div className="mb-2 flex justify-between text-xs text-white/50">
              <span>Uploading...</span>
              <span>{progress}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-white transition-all duration-300"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        )}

        {message && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70">
            {message}
          </div>
        )}

        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="w-full rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Publish video"}
        </button>
      </div>
    </div>
  );
}
