"use client";

import { useEffect, useState } from "react";
import { Eye, Activity, ArrowUpRight } from "lucide-react";

export default function Visitor() {
  const [totalVisits, setTotalVisits] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    const countVisitor = async () => {
      try {
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
          const text = await response.text();

          console.error(
            "Visitor API returned non-JSON:",
            response.status,
            text.slice(0, 300),
          );

          throw new Error(
            `Visitor API returned ${response.status} instead of JSON`,
          );
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
        console.error("❌ Visitor counter error:", error);
      }
    };

    countVisitor();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="group relative w-full overflow-hidden rounded-[28px] border border-black/[0.07] bg-white/90 shadow-[0_20px_70px_-30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_90px_-35px_rgba(0,0,0,0.3)]">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-red-500/[0.07] blur-3xl transition-all duration-700 group-hover:bg-red-500/[0.12]" />

          <div className="relative flex flex-col items-center justify-between gap-6 px-6 py-7 sm:flex-row sm:px-8 lg:px-10">
            {/* Left Content */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-600 shadow-sm">
                <Eye size={22} strokeWidth={2} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold tracking-tight text-neutral-900 sm:text-lg">
                    Vishvaguru Visitors
                  </h2>

                  <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-green-600">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                    Live
                  </span>
                </div>

                <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
                  Every visit helps us grow the Vishvaguru community.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex w-full items-center justify-between gap-8 sm:w-auto sm:justify-end">
              <div className="text-left sm:text-right">
                <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                  Total Visits
                </p>

                <div className="flex items-center gap-2 sm:justify-end">
                  <span className="text-3xl font-bold tracking-[-0.04em] text-neutral-950 sm:text-4xl">
                    {totalVisits === null ? "—" : totalVisits.toLocaleString()}
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="text-red-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </div>

              <div className="hidden h-10 w-px bg-neutral-200 sm:block" />

              <div className="hidden items-center gap-2 sm:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
                  <Activity size={17} />
                </div>

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                    Status
                  </p>
                  <p className="text-xs font-semibold text-neutral-800">
                    Tracking Active
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-60" />
        </div>
      </div>
    </section>
  );
}
