"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { ArrowRight, Check, Mail, MessageCircle, Users } from "lucide-react";

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const BACKGROUND_IMAGE = "/a5593427-15d9-4b62-b7b1-56b600c72c4a.png";

const initialForm: ContactForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm);
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

  if (loading) return;

  setError("");
  setSubmitted(false);

  const form = e.currentTarget;

  const formData = new FormData(form);

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  // -----------------------------
  // VALIDATION
  // -----------------------------

  if (!name || !email || !phone || !message) {
    setError("Please fill in all required fields.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    setError("Please enter a valid email address.");
    return;
  }

  if (phone.length < 10) {
    setError("Please enter a valid phone number.");
    return;
  }

  if (message.length < 10) {
    setError("Please enter at least 10 characters in your message.");
    return;
  }

  // -----------------------------
  // EMAILJS CONFIG
  // -----------------------------

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error("EmailJS configuration is missing.");

    setError(
      "Email service is not configured correctly. Please try again later.",
    );

    return;
  }

  // -----------------------------
  // ADD TIME
  // -----------------------------

  const timeInput = form.querySelector(
    'input[name="time"]',
  ) as HTMLInputElement | null;

  if (timeInput) {
    timeInput.value = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  setLoading(true);

  try {
    const response = await emailjs.sendForm(serviceId, templateId, form, {
      publicKey,
    });

    console.log("EmailJS success:", response);

    setSubmitted(true);
    form.reset();
  } catch (error: unknown) {
   

    if (typeof error === "object" && error !== null) {
      const emailError = error as {
        status?: number;
        text?: string;
        message?: string;
      };

   

      if (emailError.status === 412) {
        setError(
          "The Gmail connection used by EmailJS has expired. Please reconnect Gmail in EmailJS.",
        );
      } else if (emailError.text) {
        setError(emailError.text);
      } else if (emailError.message) {
        setError(emailError.message);
      } else {
        setError("Unable to send your message. Please try again.");
      }
    } else {
      setError("Unable to send your message. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="relative min-h-[calc(100svh-80px)] overflow-hidden bg-[#070604] text-white">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url("${BACKGROUND_IMAGE}")`,
          }}
        />

        <div className="absolute inset-0 bg-[#070604]/80" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#070604]/75 to-[#070604]" />

        <div className="absolute left-[8%] top-0 h-[520px] w-[520px] bg-amber-500/[0.045] blur-[150px]" />

        <div className="absolute right-[-120px] top-[30%] h-[500px] w-[500px] bg-orange-500/[0.035] blur-[160px]" />

        <div className="absolute bottom-0 left-[30%] h-[300px] w-[600px] bg-amber-400/[0.025] blur-[140px]" />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="relative z-10 mx-auto w-full max-w-[1450px] px-5 pb-10 pt-8 sm:px-8 sm:pt-12 lg:px-12">
        {/* =======================================================
            TOP BAR
        ======================================================= */}

        <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-amber-400" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-300/80">
              Vishvaguru / Contact
            </span>
          </div>

          <span className="hidden text-[10px] uppercase tracking-[0.25em] text-white/25 sm:block">
            Connect · Contribute · Grow
          </span>
        </div>

        {/* =======================================================
            HERO
        ======================================================= */}

        <section className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center border border-amber-400/30 text-[10px] text-amber-300">
                01
              </span>

              <span className="text-[10px] uppercase tracking-[0.25em] text-white/35">
                Join the community
              </span>
            </div>

            <h1 className="max-w-5xl text-[clamp(3.2rem,7.5vw,8rem)] font-medium leading-[0.86] tracking-[-0.07em]">
              Let&apos;s
              <br />
              <span className="text-white/25">build</span>{" "}
              <span className="text-amber-400">together.</span>
            </h1>
          </div>

          <div className="max-w-md border-l border-amber-400/30 pl-5 lg:mb-2">
            <p className="text-sm leading-7 text-white/50 sm:text-base">
              Vishvaguru is growing into a space for knowledge, discovery, ideas
              and meaningful connections.
            </p>

            <p className="mt-4 text-sm leading-7 text-white/30">
              Have something to share? A suggestion, question or idea can become
              part of the journey.
            </p>
          </div>
        </section>

        {/* =======================================================
            MAIN CONTENT
        ======================================================= */}

        <div className="mt-14 grid border-y border-white/10 lg:grid-cols-[0.72fr_1.28fr]">
          {/* =====================================================
              LEFT INFORMATION
          ===================================================== */}

          <section className="border-b border-white/10 py-8 lg:border-b-0 lg:border-r lg:pr-10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                Why connect
              </span>

              <span className="text-[10px] text-amber-300/60">01 / 03</span>
            </div>

            <div className="mt-10">
              {/* Idea */}

              <div className="flex items-start gap-5 border-b border-white/10 py-6">
                <MessageCircle
                  size={19}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-amber-300"
                />

                <div>
                  <h2 className="text-sm font-medium text-white">
                    Share an idea
                  </h2>

                  <p className="mt-2 max-w-sm text-xs leading-6 text-white/35">
                    Your feedback and ideas help shape what Vishvaguru becomes.
                  </p>
                </div>
              </div>

              {/* Community */}

              <div className="flex items-start gap-5 border-b border-white/10 py-6">
                <Users
                  size={19}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-amber-300"
                />

                <div>
                  <h2 className="text-sm font-medium text-white">
                    Join the journey
                  </h2>

                  <p className="mt-2 max-w-sm text-xs leading-6 text-white/35">
                    Connect with a growing community built around discovery and
                    knowledge.
                  </p>
                </div>
              </div>

              {/* Email */}

              <a
                href="mailto:owner@vishavguru.com"
                className="group flex items-start gap-5 py-6"
              >
                <Mail
                  size={19}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-amber-300"
                />

                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                    Direct contact
                  </p>

                  <p className="mt-2 text-sm font-medium text-white/75 transition group-hover:text-amber-300">
                    owner@vishavguru.com
                  </p>
                </div>
              </a>
            </div>

            <Link
              href="/"
              className="group mt-8 inline-flex items-center gap-3 border-b border-white/15 pb-2 text-xs uppercase tracking-[0.15em] text-white/50 transition hover:border-amber-400 hover:text-amber-300"
            >
              Explore Vishvaguru
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </section>

          {/* =====================================================
              RIGHT CONTACT FORM
          ===================================================== */}

          <section className="py-8 lg:pl-10">
            {submitted ? (
              /* =================================================
                 SUCCESS
              ================================================= */

              <div className="flex min-h-[500px] flex-col justify-center">
                <div className="flex h-14 w-14 items-center justify-center border border-emerald-400/25 bg-emerald-400/[0.06] text-emerald-300">
                  <Check size={24} strokeWidth={1.5} />
                </div>

                <p className="mt-8 text-[10px] uppercase tracking-[0.25em] text-emerald-300/70">
                  Transmission complete
                </p>

                <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                  Your message has been received.
                </h2>

                <p className="mt-4 max-w-md text-sm leading-7 text-white/40">
                  Thank you for reaching out to Vishvaguru. Your message has
                  been successfully delivered to our team.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setError("");
                  }}
                  className="mt-8 flex w-fit items-center gap-3 border border-white/15 px-5 py-3 text-xs uppercase tracking-[0.15em] text-white/60 transition hover:border-amber-400/40 hover:text-amber-300"
                >
                  Send another message
                  <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <>
                {/* FORM HEADER */}

                <div className="flex items-start justify-between border-b border-white/10 pb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-amber-300/60">
                      Contact us
                    </p>

                    <h2 className="mt-3 text-2xl font-medium tracking-[-0.035em] sm:text-3xl">
                      Start a conversation.
                    </h2>
                  </div>

                  <span className="hidden text-[10px] text-white/20 sm:block">
                    2026
                  </span>
                </div>

                {/* FORM */}

                <form onSubmit={handleSubmit} className="mt-8">
                  {/* NAME */}

                  <div className="border-b border-white/10 py-1">
                    <label
                      htmlFor="name"
                      className="block text-[10px] uppercase tracking-[0.2em] text-white/30"
                    >
                      01 — Full name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      autoComplete="name"
                      disabled={loading}
                      required
                      className="h-14 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/15 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  {/* EMAIL */}

                  <div className="border-b border-white/10 py-1">
                    <label
                      htmlFor="email"
                      className="block text-[10px] uppercase tracking-[0.2em] text-white/30"
                    >
                      02 — Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      disabled={loading}
                      required
                      className="h-14 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/15 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  {/* PHONE */}

                  <div className="border-b border-white/10 py-1">
                    <label
                      htmlFor="phone"
                      className="block text-[10px] uppercase tracking-[0.2em] text-white/30"
                    >
                      03 — Phone
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                      disabled={loading}
                      required
                      className="h-14 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/15 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  {/* MESSAGE */}

                  <div className="border-b border-white/10 py-1">
                    <label
                      htmlFor="message"
                      className="block text-[10px] uppercase tracking-[0.2em] text-white/30"
                    >
                      04 — Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us what you would like to share..."
                      rows={5}
                      disabled={loading}
                      required
                      className="w-full resize-none bg-transparent py-4 text-sm leading-7 text-white outline-none placeholder:text-white/15 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  {/* TIME */}

                  {/* ERROR */}

                  {error && (
                    <div
                      role="alert"
                      className="mt-5 border-l-2 border-red-400 bg-red-400/[0.05] px-4 py-3 text-xs leading-5 text-red-300"
                    >
                      {error}
                    </div>
                  )}

                  {/* SUBMIT */}

                  <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xs text-[10px] leading-5 text-white/25">
                      Your message will be sent directly to
                      rajinderkumardhiman672@gmail.com
                    </p>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group flex h-12 items-center justify-center gap-4 bg-amber-400 px-7 text-xs font-semibold uppercase tracking-[0.14em] text-black transition duration-300 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin border-2 border-black/20 border-t-black" />
                          Sending
                        </>
                      ) : (
                        <>
                          Send message
                          <ArrowRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </section>
        </div>

        {/* =======================================================
            FOOTER
        ======================================================= */}

        <footer className="flex flex-col justify-between gap-4 pt-6 sm:flex-row sm:items-center">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/20">
            © {new Date().getFullYear()} Vishvaguru
          </p>

          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.18em] text-white/30 transition hover:text-amber-300"
          >
            Back to home
          </Link>
        </footer>
      </div>
    </main>
  );
}
