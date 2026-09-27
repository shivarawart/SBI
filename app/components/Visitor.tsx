"use client";

import { useEffect, useState } from "react";
import { Activity, ArrowUpRight, Eye, LoaderCircle, Users } from "lucide-react";

export default function Visitor() {
  const [totalVisits, setTotalVisits] = useState<number | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const countVisitor = async () => {
      try {
        setHasError(false);

        const response = await fetch("/api/visitors", {
          method: "POST",
          cache: "no-store",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });

        const contentType = response.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
          throw new Error("Visitor API returned an invalid response");
        }

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data?.error || data?.message || "Visitor API request failed",
          );
        }

        if (mounted) {
          setTotalVisits(Number(data.totalVisits));
        }
      } catch (error) {
        console.error("Visitor counter error:", error);

        if (mounted) {
          setHasError(true);
        }
      }
    };

    countVisitor();

    return () => {
      mounted = false;
    };
  }, []);

  const formattedVisits =
    totalVisits === null ? "—" : totalVisits.toLocaleString("en-IN");

  const statusText = hasError ? "Offline" : "Live";

  return (
    <section aria-labelledby="visitor-card-title" className="w-full">
      <article
        className="
          group relative mx-auto w-full
          max-w-[390px]
          overflow-hidden
          rounded-[20px]
          border border-white/70
          bg-white/[0.86]
          shadow-[0_12px_35px_rgba(15,23,42,0.10)]
          backdrop-blur-2xl
          transition-all duration-300 ease-out
          hover:-translate-y-1
          hover:shadow-[0_18px_45px_rgba(15,23,42,0.15)]
          sm:rounded-[22px]
        "
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -right-14 -top-14
            h-32 w-32
            rounded-full
            bg-red-400/10
            blur-3xl
            transition-all duration-500
            group-hover:bg-red-400/20
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -bottom-16 -left-12
            h-28 w-28
            rounded-full
            bg-blue-400/10
            blur-3xl
          "
        />

        {/* Main card */}
        <div className="relative p-3 sm:p-3.5">
          {/* Top row */}
          <div className="flex items-center justify-between gap-3">
            {/* Identity */}
            <div className="flex min-w-0 items-center gap-2.5">
              {/* Icon */}
              <div
                className="
                  relative flex
                  h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-[11px]
                  border border-red-100
                  bg-gradient-to-br
                  from-red-50
                  to-rose-100/70
                  text-red-500
                  shadow-[0_4px_12px_rgba(239,68,68,0.10)]
                  sm:h-10 sm:w-10
                "
              >
                <Eye
                  aria-hidden="true"
                  className="h-[17px] w-[17px]"
                  strokeWidth={2.2}
                />

                {/* tiny live dot */}
                <span
                  className="
                    absolute -right-0.5 -top-0.5
                    h-2.5 w-2.5
                    rounded-full
                    border-2 border-white
                    bg-emerald-500
                  "
                />
              </div>

              {/* Title */}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2
                    id="visitor-card-title"
                    className="
                      truncate
                      text-[12px]
                      font-bold
                      tracking-[-0.01em]
                      text-neutral-900
                      sm:text-[13px]
                    "
                  >
                    Vishvaguru Visitors
                  </h2>

                  <span
                    className="
                      hidden
                      items-center gap-1
                      rounded-full
                      bg-emerald-50
                      px-1.5 py-0.5
                      text-[7px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-emerald-600
                      xs:flex
                    "
                  >
                    <span
                      className="
                        h-1 w-1
                        rounded-full
                        bg-emerald-500
                        animate-pulse
                      "
                    />
                    {statusText}
                  </span>
                </div>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-[10px]
                    font-medium
                    text-neutral-400
                  "
                >
                  Growing together.
                </p>
              </div>
            </div>

            {/* Small arrow */}
            <div
              className="
                flex h-7 w-7 shrink-0
                items-center justify-center
                rounded-full
                border border-neutral-200/80
                bg-white/70
                text-neutral-400
                transition-all duration-300
                group-hover:border-red-100
                group-hover:bg-red-50
                group-hover:text-red-500
              "
            >
              <ArrowUpRight
                aria-hidden="true"
                className="
                  h-3.5 w-3.5
                  transition-transform duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </div>
          </div>

          {/* Divider */}
          <div className="my-3 h-px w-full bg-neutral-200/70" />

          {/* Stats */}
          <div className="flex items-center justify-between gap-3">
            {/* Total visits */}
            <div className="flex min-w-0 items-center gap-2.5">
              <div
                className="
                  flex h-8 w-8 shrink-0
                  items-center justify-center
                  rounded-[9px]
                  bg-neutral-100
                  text-neutral-500
                "
              >
                <Users aria-hidden="true" className="h-3.5 w-3.5" />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-neutral-400
                  "
                >
                  Total visits
                </p>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <p
                    aria-live="polite"
                    className="
                      text-[20px]
                      font-extrabold
                      leading-none
                      tracking-[-0.055em]
                      text-neutral-950
                      sm:text-[22px]
                    "
                  >
                    {hasError ? "—" : formattedVisits}
                  </p>

                  {totalVisits === null && !hasError ? (
                    <LoaderCircle
                      aria-hidden="true"
                      className="
                        h-3.5 w-3.5
                        animate-spin
                        text-neutral-400
                      "
                    />
                  ) : (
                    <span
                      className="
                        rounded-full
                        bg-emerald-50
                        px-1.5 py-0.5
                        text-[7px]
                        font-bold
                        text-emerald-600
                      "
                    >
                      LIVE
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Status */}
            <div
              className="
                flex shrink-0
                items-center gap-2
                rounded-[11px]
                border border-neutral-200/70
                bg-neutral-50/80
                px-2.5 py-2
              "
            >
              <Activity
                aria-hidden="true"
                className={
                  hasError
                    ? "h-3.5 w-3.5 text-neutral-400"
                    : "h-3.5 w-3.5 text-emerald-500"
                }
                strokeWidth={2.2}
              />

              <div>
                <p
                  className="
                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-neutral-400
                  "
                >
                  Status
                </p>

                <p
                  className={
                    hasError
                      ? "text-[10px] font-bold text-neutral-500"
                      : "text-[10px] font-bold text-emerald-600"
                  }
                >
                  {hasError ? "Unavailable" : "Active"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div
          aria-hidden="true"
          className="
            h-[2px] w-full
            bg-gradient-to-r
            from-transparent
            via-red-500/70
            to-transparent
            opacity-70
            transition-opacity duration-300
            group-hover:opacity-100
          "
        />
      </article>
    </section>
  );
}
