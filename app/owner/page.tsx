"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  getOwnerEmailFromStorage,
  OWNER_EMAIL,
  getMediaItems,
  saveMediaItem,
  deleteMediaItem,
  MediaItem,
} from "../lib/storage";
import Navbar  from "../components/Navbar";

export default function OwnerPage() {
  const router = useRouter();
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const [items, setItems] = useState<MediaItem[]>([]);

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"image" | "video">("image");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = getOwnerEmailFromStorage();
    const ok = !!stored && stored.toLowerCase() === OWNER_EMAIL.toLowerCase();
    setIsOwner(ok);
    if (!ok) {
      // Not owner, redirect to home or login
      setTimeout(() => router.push("/login"), 500);
      return;
    }
    setItems(getMediaItems());
  }, [router]);

  if (isOwner === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!isOwner) {
    return null;
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) {
      setFile(null);
      return;
    }
    if (f.type.startsWith("image/")) {
      setType("image");
    } else if (f.type.startsWith("video/")) {
      setType("video");
    } else {
      setError("Please select a valid image or video file.");
      setFile(null);
      return;
    }
    setFile(f);
    setError(null);
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      saveMediaItem({
        type,
        dataUrl,
        title: title.trim() || undefined,
      });
      setItems(getMediaItems());
      setFile(null);
      setTitle("");
      setIsUploading(false);
    };
    reader.onerror = () => {
      setError("Failed to read file.");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (id: string) => {
    deleteMediaItem(id);
    setItems(getMediaItems());
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-black/60" />

      <Navbar />

      <div className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="mb-2 text-3xl font-extrabold">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Owner Dashboard
          </span>
        </h1>
        <p className="mb-6 text-sm text-gray-300">
          Upload images and videos that will be visible on the Media page.
        </p>

        {/* Upload Form */}
        <form
          onSubmit={handleUpload}
          className="mb-10 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
        >
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-gray-300">
                Title (optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Campus Tour Video"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-300">
                File (image or video)
              </label>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-700"
              />
              {file && (
                <p className="mt-1 text-xs text-gray-400">
                  Selected: {file.name} ({type})
                </p>
              )}
            </div>
          </div>

          {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={isUploading || !file}
            className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </form>

        {/* Uploaded Items List */}
        <h2 className="mb-4 text-xl font-semibold">Uploaded Content</h2>
        {items.length === 0 ? (
          <p className="text-sm text-gray-400">
            No content uploaded yet. Use the form above to add images or videos.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md"
              >
                {item.type === "image" ? (
                  <img
                    src={item.dataUrl}
                    alt={item.title || "Uploaded image"}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <video
                    src={item.dataUrl}
                    controls
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-3">
                  <div className="text-sm font-medium">
                    {item.title || (item.type === "image" ? "Image" : "Video")}
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-gray-400">
                    <span>{new Date(item.createdAt).toLocaleString()}</span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded bg-red-600/80 px-2 py-0.5 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
