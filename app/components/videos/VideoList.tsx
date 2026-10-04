"use client";

import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";

type Video = {
  id: string;
  video_url: string;
  description: string;

  thumbnail_url?: string | null;

  original_name?: string | null;
  mime_type?: string | null;
  file_size?: number | null;

  created_at: string;

  owner_name: string;
  owner_email: string;
};

export default function VideoList() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/videos", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load videos");
      }

      setVideos(data.videos || []);
    } catch (error) {
      console.error("LOAD VIDEOS ERROR:", error);

      setError(
        error instanceof Error ? error.message : "Failed to load videos",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-sm text-white/40">
        Loading videos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 text-sm text-red-300">
        {error}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
        <p className="text-lg font-medium text-white">No videos yet</p>

        <p className="mt-2 text-sm text-white/40">
          Published videos will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
