
"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Eye,
  LoaderCircle,
  Users,
} from "lucide-react";

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

  return (
    <section aria-labelledby="visitor-card-title" className="w-full">
      <article
        className="
          group relative mx-auto w-full max-w-[200px]
          overflow-hidden
          rounded-[12px]
          border border-neutral-200/80
          bg-white/90
          shadow-[0_8px_28px_rgba(15,23,42,0.08)]
          backdrop-blur-xl
          transition-all duration-300
          hover:-translate-y-[2px]
          hover:shadow-[0_12px_34px_rgba(15,23,42,0.12)]
          h-10
        "
      >
        {/* subtle glow */}
        <div className="flex  w-full items-center justify-between gap-2">
          {/* Visits */}
          <div className="flex w-full  items-center gap-2">
            <div
              className="
                    flex h-7 w-10 shrink-0
                    items-center justify-center
                    rounded-[8px]
                    bg-white
                    border border-neutral-200/80
                    text-neutral-500
                  "
            >
              <Users aria-hidden="true" className="h-3.5 w-3.5" />
            </div>

            <div className="">
              <p
                className="
                      text-[6px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-neutral-400
                    "
              >
                Total visits
              </p>

              <div className="mt-[1px] flex items-center gap-1.5">
                <p
                  aria-live="polite"
                  className="
                        text-[17px]
                        font-extrabold
                        leading-none
                        tracking-[-0.05em]
                        text-neutral-950
                      "
                >
                  {hasError ? "—" : formattedVisits}
                </p>

                {totalVisits === null && !hasError ? (
                  <LoaderCircle
                    aria-hidden="true"
                    className="
                          h-3 w-3
                          animate-spin
                          text-neutral-400
                        "
                  />
                ) : (
                  <span
                    className="
                          rounded-full
                          bg-emerald-50
                          px-1.5 py-[2px]
                          text-[6px]
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

          {/* Status box */}
          <div
            className="
                  flex shrink-0 items-center gap-1.5
                  rounded-[9px]
                  border border-neutral-200/80
                  bg-white
                  px-2 py-1.5
                "
          >
            <Activity
              aria-hidden="true"
              className={
                hasError
                  ? "h-3 w-3 text-neutral-400"
                  : "h-3 w-3 text-emerald-500"
              }
              strokeWidth={2.2}
            />

            <div>
              <p
                className="
                      text-[6px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-neutral-400
                    "
              >
                Status
              </p>

              <p
                className={
                  hasError
                    ? "text-[8px] font-bold text-neutral-500"
                    : "text-[8px] font-bold text-emerald-600"
                }
              >
                {hasError ? "Unavailable" : "Active"}
              </p>
            </div>
          </div>
        </div>

        {/* CARD CONTENT */}

        {/* Bottom accent */}
      </article>
    </section>
  );
}

