"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Feedback = {
  id: string;
  name: string;
  rating: number;
  message: string;
  created_at: string;
};

const stars = [1, 2, 3, 4, 5];

const ratingLabels: Record<number, string> = {
  1: "Not great",
  2: "Could be better",
  3: "Good",
  4: "Very good",
  5: "Excellent",
};

export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  const [feedback, setFeedback] = useState<Feedback[]>([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadFeedback() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/feedback", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to load feedback.");
      }

      setFeedback(Array.isArray(data.feedback) ? data.feedback : []);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load feedback.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFeedback();
  }, []);

  const averageRating = useMemo(() => {
    if (!feedback.length) return "5.0";

    return (
      feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length
    ).toFixed(1);
  }, [feedback]);

  const ratingDistribution = useMemo(() => {
    return stars.reduce(
      (acc, star) => {
        acc[star] = feedback.filter((item) => item.rating === star).length;

        return acc;
      },
      {} as Record<number, number>,
    );
  }, [feedback]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!message.trim()) {
      setError("Please write your feedback.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          rating,
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit feedback.");
      }

      setFeedback((current) => [data.feedback, ...current]);

      setName("");
      setRating(5);
      setMessage("");

      setSuccess("Thanks for sharing your experience.");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to submit feedback.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] px-4  py-14 pb-28 text-white sm:px-6">
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-240px] h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[130px]" />

        <div className="absolute left-[-180px] top-[40%] h-[380px] w-[380px] rounded-full bg-white/[0.018] blur-[120px]" />

        <div className="absolute right-[-160px] top-[55%] h-[420px] w-[420px] rounded-full bg-white/[0.02] blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="mx-auto max-w-4xl pt-10 text-center sm:pt-14">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 shadow-lg shadow-black/20 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,.8)]" />

            <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/45">
              Community feedback
            </span>
          </div>

          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Your experience
            <br />
            <span className="text-white/30">shapes what comes next.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/35 sm:text-[15px]">
            Tell us what you think about Vishvaguru. A quick rating or a few
            words can help us build a better experience for everyone.
          </p>

          {/* Trust stats */}

          <div className="mx-auto mt-10 flex w-fit items-center divide-x divide-white/[0.08] rounded-2xl border border-white/[0.07] bg-white/[0.025] px-2 py-2 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="px-5 py-2 text-center">
              <p className="text-lg font-semibold tracking-tight">
                {averageRating}
              </p>

              <p className="mt-0.5 text-[9px] uppercase tracking-[0.16em] text-white/25">
                Average
              </p>
            </div>

            <div className="px-5 py-2 text-center">
              <p className="text-lg font-semibold tracking-tight">
                {feedback.length}
              </p>

              <p className="mt-0.5 text-[9px] uppercase tracking-[0.16em] text-white/25">
                Reviews
              </p>
            </div>

            <div className="hidden px-5 py-2 text-center sm:block">
              <p className="text-lg font-semibold tracking-tight">5</p>

              <p className="mt-0.5 text-[9px] uppercase tracking-[0.16em] text-white/25">
                Star scale
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <section className="mx-auto mt-16 grid max-w-6xl gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          {/* ===================================================
              LEFT — REVIEW FORM
          =================================================== */}

          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-7">
            {/* Card glow */}

            <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-52 w-52 rounded-full bg-white/[0.035] blur-3xl" />

            <div className="relative">
              <div className="mb-8 flex items-start justify-between gap-5">
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/25">
                    Leave a review
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                    How was it?
                  </h2>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-right">
                  <p className="text-[9px] uppercase tracking-[0.15em] text-white/20">
                    Rating
                  </p>

                  <p className="mt-0.5 text-xs font-medium text-white/60">
                    {rating}/5
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}

                <div>
                  <label className="mb-2.5 block text-[11px] font-medium text-white/45">
                    Name
                  </label>

                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    maxLength={100}
                    placeholder="Your name"
                    className="h-12 w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 text-sm text-white outline-none transition-all placeholder:text-white/20 hover:border-white/[0.12] focus:border-white/20 focus:bg-white/[0.045] focus:ring-4 focus:ring-white/[0.02]"
                  />
                </div>

                {/* Stars */}

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-[11px] font-medium text-white/45">
                      Rating
                    </label>

                    <span className="text-[10px] text-white/25">
                      {ratingLabels[rating]}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      {stars.map((star) => {
                        const active = star <= rating;

                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all hover:bg-white/[0.05]"
                            aria-label={`${star} star`}
                          >
                            <span
                              className={`text-2xl transition-all duration-200 ${
                                active
                                  ? "scale-110 text-white"
                                  : "text-white/10 group-hover:text-white/30"
                              }`}
                            >
                              ★
                            </span>

                            {active && (
                              <span className="pointer-events-none absolute inset-0 rounded-xl bg-white/[0.025]" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-3 text-center">
                      <span className="text-[10px] text-white/20">
                        Tap a star to rate your experience
                      </span>
                    </div>
                  </div>
                </div>

                {/* Message */}

                <div>
                  <div className="mb-2.5 flex items-center justify-between">
                    <label className="text-[11px] font-medium text-white/45">
                      Your feedback
                    </label>

                    <span className="text-[9px] text-white/20">
                      {message.length}/2000
                    </span>
                  </div>

                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    maxLength={2000}
                    rows={6}
                    placeholder="What did you like? What could we improve?"
                    className="w-full resize-none rounded-xl border border-white/[0.08] bg-black/30 p-4 text-sm leading-6 text-white outline-none transition-all placeholder:text-white/20 hover:border-white/[0.12] focus:border-white/20 focus:bg-white/[0.045] focus:ring-4 focus:ring-white/[0.02]"
                  />
                </div>

                {/* Messages */}

                {error && (
                  <div className="flex items-center gap-3 rounded-xl border border-red-500/10 bg-red-500/[0.04] px-4 py-3 text-xs text-red-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    {error}
                  </div>
                )}

                {success && (
                  <div className="flex items-center gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.04] px-4 py-3 text-xs text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {success}
                  </div>
                )}

                {/* Submit */}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative h-12 w-full overflow-hidden rounded-xl bg-white text-sm font-semibold text-black transition-all hover:scale-[1.005] hover:bg-white/90 active:scale-[0.995] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="relative z-10">
                    {submitting ? "Publishing..." : "Share your feedback"}
                  </span>

                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/[0.06] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>

                <p className="text-center text-[9px] text-white/15">
                  Your feedback helps improve the Vishvaguru experience.
                </p>
              </form>
            </div>
          </div>

          {/* ===================================================
              RIGHT — REVIEWS
          =================================================== */}

          <div className="min-w-0">
            {/* Rating overview */}

            <div className="mb-5 rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7">
              <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
                <div className="shrink-0">
                  <p className="text-5xl font-semibold tracking-[-0.05em]">
                    {averageRating}
                  </p>

                  <div className="mt-2 flex gap-1">
                    {stars.map((star) => (
                      <span key={star} className="text-sm text-white">
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="mt-2 text-[10px] text-white/25">
                    Based on {feedback.length}{" "}
                    {feedback.length === 1 ? "review" : "reviews"}
                  </p>
                </div>

                <div className="h-px w-full bg-white/[0.07] sm:h-20 sm:w-px" />

                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = ratingDistribution[star] || 0;

                    const percentage = feedback.length
                      ? (count / feedback.length) * 100
                      : 0;

                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="w-4 text-[10px] text-white/25">
                          {star}
                        </span>

                        <span className="text-[9px] text-white/15">★</span>

                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                          <div
                            className="h-full rounded-full bg-white/70 transition-all duration-700"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>

                        <span className="w-5 text-right text-[9px] text-white/20">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Reviews heading */}

            <div className="mb-4 flex items-center justify-between px-1">
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                  From the community
                </p>

                <h2 className="mt-1 text-xl font-semibold tracking-tight">
                  Recent experiences
                </h2>
              </div>

              {feedback.length > 0 && (
                <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[9px] text-white/25">
                  {feedback.length} total
                </span>
              )}
            </div>

            {/* Reviews */}

            {loading ? (
              <div className="rounded-[28px] border border-white/[0.07] bg-white/[0.02] p-10 text-center">
                <div className="mx-auto h-5 w-5 animate-spin rounded-full border border-white/10 border-t-white/60" />

                <p className="mt-4 text-xs text-white/25">
                  Loading experiences...
                </p>
              </div>
            ) : feedback.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-white/[0.08] bg-white/[0.015] px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025]">
                  <span className="text-xl text-white/20">★</span>
                </div>

                <h3 className="mt-5 text-sm font-medium text-white/60">
                  Be the first to share
                </h3>

                <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-white/20">
                  Your experience could help someone else discover Vishvaguru.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {feedback.map((item, index) => (
                  <article
                    key={item.id}
                    className="group relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12] hover:bg-white/[0.035] hover:shadow-xl hover:shadow-black/20 sm:p-6"
                  >
                    <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-white/[0.015] blur-2xl transition group-hover:bg-white/[0.03]" />

                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-xs font-semibold text-white/60">
                            {item.name.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <p className="text-sm font-medium text-white/85">
                              {item.name}
                            </p>

                            <div className="mt-1 flex gap-0.5">
                              {stars.map((star) => (
                                <span
                                  key={star}
                                  className={`text-[10px] ${
                                    star <= item.rating
                                      ? "text-white"
                                      : "text-white/10"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <time className="shrink-0 text-[9px] text-white/20">
                          {new Date(item.created_at).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </time>
                      </div>

                      <p className="mt-5 text-sm leading-7 text-white/40">
                        {item.message}
                      </p>

                      <div className="mt-5 flex items-center gap-2 text-[9px] text-white/15">
                        <span className="h-1 w-1 rounded-full bg-white/30" />
                        Verified community feedback
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            FOOTER STATEMENT
        ===================================================== */}

        <section className="mx-auto mt-16 max-w-3xl border-t border-white/[0.06] pt-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/15">
            Built with your feedback
          </p>

          <p className="mt-3 text-sm text-white/25">
            Every review gives us another reason to make Vishvaguru better.
          </p>
        </section>
      </div>
    </main>
  );
}
