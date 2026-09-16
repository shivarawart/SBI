"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();

    if (!name || !email || !phone || !message) {
      setError("Please fill in all fields.");
      return;
    }

    if (name.length < 2) {
      setError("Please enter a valid name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (message.length < 10) {
      setError("Please write a little more about your message.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      /*
        Connect your API here later:

        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }
      */

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitted(true);

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[140px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_40%)]" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/50 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            Get in touch
          </div>

          <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Contact <span className="text-white/40">Vishvaguru.</span>
          </h1>

          <p className="mt-5 text-sm leading-7 text-white/45 sm:text-base">
            Have a question, suggestion, or want to become part of the
            Vishvaguru community? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Main Grid */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          {/* =====================================================
              CONTACT INFORMATION
          ===================================================== */}
          <section className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl sm:p-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
                Contact
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Let&apos;s talk.
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/40">
                Send us your question and the Vishvaguru team will get back to
                you.
              </p>
            </div>

            <div className="mt-10 space-y-3">
              {/* Email */}
              <a
                href="mailto:owner@vishavguru.com"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-white/30">Email</p>

                  <p className="mt-1 truncate text-sm font-medium text-white/75 transition group-hover:text-white">
                    owner@vishavguru.com
                  </p>
                </div>
              </a>

              {/* Community */}
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>

                <div>
                  <p className="text-xs text-white/30">Community</p>

                  <p className="mt-1 text-sm font-medium text-white/75">
                    Vishvaguru Global Community
                  </p>
                </div>
              </div>
            </div>

            {/* Member CTA */}
            <div className="mt-auto pt-10">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <p className="text-sm font-medium text-white/80">
                  Become a Vishvaguru Member
                </p>

                <p className="mt-2 text-xs leading-5 text-white/35">
                  Join the community and stay connected with opportunities,
                  knowledge and resources.
                </p>

                <Link
                  href="/"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white/60 transition hover:text-white"
                >
                  Explore Vishvaguru
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* =====================================================
              CONTACT FORM
          ===================================================== */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
            {submitted ? (
              /* SUCCESS */
              <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </div>

                <h2 className="mt-6 text-2xl font-semibold">
                  Message received.
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-6 text-white/40">
                  Thank you for contacting Vishvaguru. We&apos;ll get back to
                  you as soon as possible.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-7 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.1] hover:text-white"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
                    Message
                  </p>

                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                    Tell us what&apos;s on your mind.
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-medium text-white/50"
                    >
                      Full name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      autoComplete="name"
                      className="h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/25 focus:bg-black/50"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-xs font-medium text-white/50"
                      >
                        Email
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/25 focus:bg-black/50"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-xs font-medium text-white/50"
                      >
                        Phone
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                        className="h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/25 focus:bg-black/50"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs font-medium text-white/50"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      rows={6}
                      className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/20 focus:border-white/25 focus:bg-black/50"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="rounded-xl border border-red-400/10 bg-red-400/[0.05] px-4 py-3 text-xs text-red-300/80">
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex h-12 w-full items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send message
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="m13 6 6 6-6 6" />
                        </svg>
                      </span>
                    )}
                  </button>

                  <p className="text-center text-[11px] leading-5 text-white/25">
                    Your information is only used to respond to your enquiry.
                  </p>
                </form>
              </>
            )}
          </section>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Vishvaguru
          </p>

          <Link
            href="/"
            className="text-xs text-white/30 transition hover:text-white"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
