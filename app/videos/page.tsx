"use client";

import { useEffect, useState } from "react";

type Video = {
  id: string;
  video_url: string;
  description: string;
  created_at: string;
  owner_name?: string;
};

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/videos", {
          cache: "no-store",
        });

        const data = await res.json();

        console.log("VIDEOS:", data);

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to load videos");
        }

        setVideos(data.videos || []);
      } catch (err) {
        console.error("VIDEO FRONTEND ERROR:", err);

        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="min-h-screen  bg-[#050505] px-5 py-28 text-white sm:px-8 lg:px-12">
      <div className="mx-auto  max-w-7xl">
        {/* HEADER */}
        <div className="mb-12">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/30">
            Video Library
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Latest Videos
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-white/40">
            Watch the latest videos published on the platform.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-sm text-white/40">Loading videos...</div>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && videos.length === 0 && (
          <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-white/30">No videos available yet.</p>
          </div>
        )}

        {/* VIDEOS */}
        {!loading && !error && videos.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <article
                key={video.id}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                {/* VIDEO */}
                <div className="aspect-video bg-black">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-contain"
                  >
                    <source src={video.video_url} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <p className="text-sm leading-6 text-white/60">
                    {video.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      {video.owner_name && (
                        <p className="text-xs font-medium text-white/60">
                          {video.owner_name}
                        </p>
                      )}

                      <p className="mt-1 text-[11px] text-white/25">
                        {new Date(video.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-[10px] text-emerald-400">
                      Published
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
