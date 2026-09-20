
"use client";

import { useEffect, useState } from "react";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";

import { getMediaItems, MediaItem } from "../lib/storage";

const BACKGROUND_IMAGE =
  "/a5593427-15d9-4b62-b7b1-56b600c72c4a.png";

export default function MediaPage() {
  const { isLoaded, isSignedIn } = useUser();

  const [items, setItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    if (!isLoaded) return;

    setItems(getMediaItems());
  }, [isLoaded]);

  /*
   * ============================================================
   * LOADING STATE
   * ============================================================
   */

  if (!isLoaded) {
    return (
      <main className="relative min-h-[calc(100svh-80px)] w-full overflow-hidden bg-[#080604] text-white">
        <Background />

        <div className="relative z-10 flex min-h-[calc(100svh-80px)] items-center justify-center px-5">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-400/10">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-amber-300" />
            </div>

            <p className="text-sm font-medium text-white/70">
              Loading Vishvaguru Media
            </p>

            <p className="mt-1 text-xs text-white/35">
              Preparing your media experience...
            </p>
          </div>
        </div>
      </main>
    );
  }

  /*
   * ============================================================
   * AUTH GATE
   * ============================================================
   */

  if (!isSignedIn) {
    return (
      <main className="relative min-h-[calc(100svh-80px)] w-full overflow-hidden bg-[#080604] text-white">
        <Background />

        <div className="relative z-10 flex min-h-[calc(100svh-80px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <section className="w-full max-w-md">
            {/* Brand label */}
            <div className="mb-7 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/15 bg-black/25 px-4 py-2 backdrop-blur-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.8)]" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-100/70">
                  Vishvaguru Media
                </span>
              </div>
            </div>

            {/* Auth card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.12] bg-black/45 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8">
              {/* Card glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl"
              />

              <div className="relative">
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/20 bg-gradient-to-br from-amber-300/15 to-orange-500/10 shadow-[0_0_35px_rgba(245,158,11,0.08)]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6 text-amber-300"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />

                    <path
                      d="m4.5 16 4.2-4.2a1.8 1.8 0 0 1 2.55 0l1.15 1.15 1.15-1.15a1.8 1.8 0 0 1 2.55 0L19.5 16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <circle
                      cx="9"
                      cy="8.5"
                      r="1.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Explore Vishvaguru Media
                </h1>

                <p className="mt-3 text-sm leading-6 text-white/55 sm:text-[15px]">
                  Sign in to discover videos, images, and visual stories
                  shared through Vishvaguru.
                </p>

                {/* Buttons */}
                <div className="mt-7 space-y-3">
                  <SignInButton>
                    <button
                      type="button"
                      className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white px-5 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-50 hover:shadow-[0_12px_35px_rgba(255,255,255,0.12)] active:translate-y-0"
                    >
                      Sign in

                      <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                        →
                      </span>
                    </button>
                  </SignInButton>

                  <SignUpButton>
                    <button
                      type="button"
                      className="group relative flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-amber-300/25 bg-gradient-to-r from-amber-400 to-orange-500 px-5 text-sm font-semibold text-black shadow-[0_10px_35px_rgba(245,158,11,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:from-amber-300 hover:to-orange-400 hover:shadow-[0_15px_40px_rgba(245,158,11,0.25)] active:translate-y-0"
                    >
                      Create account

                      <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                        →
                      </span>
                    </button>
                  </SignUpButton>
                </div>

                <div className="mt-6 border-t border-white/[0.08] pt-5">
                  <p className="text-center text-xs leading-5 text-white/35">
                    Create an account to access the Vishvaguru media
                    experience.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  /*
   * ============================================================
   * AUTHENTICATED MEDIA PAGE
   * ============================================================
   */

  return (
    <main className="relative min-h-[calc(100svh-80px)] w-full overflow-hidden bg-[#080604] text-white">
      <Background />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* ======================================================
            PAGE HEADER
        ====================================================== */}

        <section className="mb-8 flex flex-col gap-5 sm:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            {/* Label */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/15 bg-black/25 px-3.5 py-1.5 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-100/65 sm:text-[11px]">
                Vishvaguru Media
              </span>
            </div>

            <h1 className="max-w-3xl text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
              Discover stories,
              <span className="block bg-gradient-to-r from-amber-200 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                captured visually.
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50 sm:text-[15px]">
              Browse images and videos shared by the Vishvaguru community.
            </p>
          </div>

          {/* Media count */}
          <div className="shrink-0">
            <div className="rounded-2xl border border-white/[0.09] bg-black/30 px-5 py-3 backdrop-blur-xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                Available
              </p>

              <p className="mt-1 text-xl font-semibold text-white">
                {items.length}
                <span className="ml-1 text-sm font-normal text-white/35">
                  {items.length === 1 ? "item" : "items"}
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================
            EMPTY STATE
        ====================================================== */}

        {items.length === 0 ? (
          <section className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-black/35 px-6 py-16 text-center shadow-[0_25px_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:px-10 sm:py-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-amber-500/[0.07] blur-3xl"
            />

            <div className="relative mx-auto max-w-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-300/15 bg-amber-400/[0.06]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-7 w-7 text-amber-300/70"
                  aria-hidden="true"
                >
                  <rect
                    x="3.5"
                    y="4"
                    width="17"
                    height="16"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />

                  <circle
                    cx="8.5"
                    cy="9"
                    r="1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />

                  <path
                    d="m5 17 4.5-4.5a2 2 0 0 1 2.83 0L14 14.17l1.17-1.17a2 2 0 0 1 2.83 0L19 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h2 className="mt-6 text-xl font-semibold text-white">
                Nothing here yet
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/45">
                No media has been published yet. Check back later for new
                images and videos.
              </p>
            </div>
          </section>
        ) : (
          /*
           * ========================================================
           * MEDIA GRID
           * ========================================================
           */

          <section>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-white/[0.09] bg-black/35 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-amber-300/20 hover:shadow-[0_25px_70px_rgba(0,0,0,0.35)]"
                >
                  {/* Media */}
                  <div className="relative aspect-video overflow-hidden bg-black">
                    {item.type === "image" ? (
                      <img
                        src={item.dataUrl}
                        alt={item.title || "Uploaded image"}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <video
                        src={item.dataUrl}
                        controls
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />
                    )}

                    {/* Image overlay */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70"
                    />

                    {/* Type badge */}
                    <div className="absolute left-3 top-3">
                      <span className="inline-flex items-center rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/80 backdrop-blur-xl">
                        {item.type}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h2 className="line-clamp-1 text-sm font-semibold text-white">
                      {item.title ||
                        (item.type === "image" ? "Untitled Image" : "Untitled Video")}
                    </h2>

                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="text-xs text-white/35">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>

                      <span className="text-xs text-amber-300/60 transition-colors group-hover:text-amber-300">
                        Vishvaguru
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

/*
 * ================================================================
 * SHARED BACKGROUND
 * ================================================================
 */

function Background() {
  return (
    <>
      {/* Background image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${BACKGROUND_IMAGE}')`,
        }}
      />

      {/* Main dark overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/65"
      />

      {/* Cinematic gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/35 to-[#080604]/95"
      />

      {/* Saffron atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-amber-500/[0.07] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-orange-600/[0.05] blur-3xl"
      />
    </>
  );
}
