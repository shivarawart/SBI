"use client";

import { useState } from "react";

const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "United Arab Emirates",
  "Singapore",
  "Germany",
  "France",
  "Japan",
  "South Korea",
  "Other",
];

const categories = [
  "Technology",
  "Fashion",
  "Food & Beverage",
  "Electronics",
  "Beauty",
  "Education",
  "Healthcare",
  "Automotive",
  "Home & Living",
  "Other",
];

export default function InfoPage() {
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-15%] top-[-10%] h-[500px] w-[500px] rounded-full bg-red-500/[0.07] blur-[140px]" />
        <div className="absolute right-[-15%] top-[25%] h-[500px] w-[500px] rounded-full bg-emerald-400/[0.05] blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[30%] h-[500px] w-[500px] rounded-full bg-white/[0.025] blur-[160px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Top navigation */}
    

      <section className="relative top-16 z-10 mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-8 lg:pt-20">
        {/* Hero */}
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
                Add your product
              </span>
            </div>

            <h1 className="max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Put your
              <br />
              <span className="text-white/35">product on the map.</span>
            </h1>
          </div>

          <div className="lg:pb-1">
            <p className="max-w-xl text-sm leading-7 text-white/45 sm:text-base">
              Tell us about your product, where it comes from, and what makes it
              worth discovering. Add images or video and create a clean product
              profile.
            </p>

            <div className="mt-7 flex items-center gap-5">
              <div>
                <p className="text-lg font-semibold">05</p>
                <p className="text-[10px] uppercase tracking-wider text-white/30">
                  Steps
                </p>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div>
                <p className="text-lg font-semibold">2–3</p>
                <p className="text-[10px] uppercase tracking-wider text-white/30">
                  Minutes
                </p>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div>
                <p className="text-lg font-semibold">100%</p>
                <p className="text-[10px] uppercase tracking-wider text-white/30">
                  Simple
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main form shell */}
        <div className="mt-14 overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0a0a0a]/90 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {/* Progress */}
          <div className="border-b border-white/[0.07] px-5 py-5 sm:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <Step number="01" label="Identity" active />
                <Line />
                <Step number="02" label="Origin" />
                <Line />
                <Step number="03" label="Product" />
                <Line />
                <Step number="04" label="Media" />
                <Line />
                <Step number="05" label="Review" />
              </div>

              <span className="hidden text-[10px] text-white/25 sm:block">
                01 / 05
              </span>
            </div>
          </div>

          {/* Form content */}
          <div className="grid lg:grid-cols-[230px_1fr]">
            {/* Left rail */}
            <aside className="border-b border-white/[0.07] p-6 lg:border-b-0 lg:border-r lg:p-8">
              <div className="sticky top-24">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
                  Step 01
                </p>

                <h2 className="mt-3 text-xl font-semibold tracking-tight">
                  Tell us
                  <br />
                  about you.
                </h2>

                <p className="mt-3 text-xs leading-6 text-white/35">
                  Start with the basic information we'll use to identify your
                  submission.
                </p>

                <div className="mt-8 hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 lg:block">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-[10px] uppercase tracking-wider text-white/40">
                      Required
                    </span>
                  </div>

                  <p className="mt-3 text-[11px] leading-5 text-white/25">
                    Fields marked with * are required before your product can be
                    submitted.
                  </p>
                </div>
              </div>
            </aside>

            {/* Form */}
            <div className="p-6 sm:p-8 lg:p-10">
              {/* Identity */}
              <div>
                <SectionHeading
                  eyebrow="01 — Identity"
                  title="Who are you?"
                  description="Give us a way to identify and contact you."
                />

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" required placeholder="Your name" />

                  <Field
                    label="Email address"
                    required
                    type="email"
                    placeholder="you@example.com"
                  />

                  <Field
                    label="Phone number"
                    type="tel"
                    placeholder="+91 00000 00000"
                  />

                  <Select
                    label="Country"
                    required
                    value={country}
                    onChange={setCountry}
                    options={countries}
                    placeholder="Select your country"
                  />
                </div>
              </div>

              <Divider />

              {/* Origin */}
              <div>
                <SectionHeading
                  eyebrow="02 — Origin"
                  title="Where is it from?"
                  description="Help people understand where your product comes from."
                />

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Origin / Region"
                    placeholder="e.g. Haryana, India"
                  />

                  <Field label="City" placeholder="e.g. Ambala" />

                  <Field label="Brand / Company" placeholder="Brand name" />

                  <Field label="Website" placeholder="https://example.com" />
                </div>
              </div>

              <Divider />

              {/* Product */}
              <div>
                <SectionHeading
                  eyebrow="03 — Product"
                  title="What are you adding?"
                  description="Create the basic profile people will discover."
                />

                <div className="mt-8 space-y-5">
                  <Field
                    label="Product name"
                    required
                    placeholder="Give your product a clear name"
                    large
                  />

                  <div>
                    <label className="mb-2.5 block text-xs font-medium text-white/65">
                      Category <span className="text-white/30">*</span>
                    </label>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                      {categories.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setCategory(item)}
                          className={[
                            "rounded-xl border px-3 py-3 text-left text-xs transition",
                            category === item
                              ? "border-white/30 bg-white text-black"
                              : "border-white/[0.08] bg-white/[0.02] text-white/45 hover:border-white/20 hover:text-white",
                          ].join(" ")}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2.5 block text-xs font-medium text-white/65">
                      Product description
                    </label>

                    <textarea
                      rows={5}
                      placeholder="Describe your product, what it does, who it is for, or what makes it different..."
                      className="w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-4 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-white/25 focus:bg-white/[0.04]"
                    />

                    <div className="mt-2 flex justify-between text-[10px] text-white/20">
                      <span>Keep it clear and useful.</span>
                      <span>0 / 1000</span>
                    </div>
                  </div>
                </div>
              </div>

              <Divider />

              {/* Media */}
              <div>
                <SectionHeading
                  eyebrow="04 — Media"
                  title="Show, don't just tell."
                  description="Add a product image or video so people can understand it instantly."
                />

                <div className="mt-8">
                  <div className="mb-4 flex w-fit rounded-xl border border-white/[0.08] bg-white/[0.025] p-1">
                    <button
                      type="button"
                      onClick={() => setMediaType("image")}
                      className={[
                        "rounded-lg px-4 py-2 text-xs transition",
                        mediaType === "image"
                          ? "bg-white text-black"
                          : "text-white/40 hover:text-white",
                      ].join(" ")}
                    >
                      Image
                    </button>

                    <button
                      type="button"
                      onClick={() => setMediaType("video")}
                      className={[
                        "rounded-lg px-4 py-2 text-xs transition",
                        mediaType === "video"
                          ? "bg-white text-black"
                          : "text-white/40 hover:text-white",
                      ].join(" ")}
                    >
                      Video
                    </button>
                  </div>

                  <div className="group relative flex min-h-[250px] cursor-pointer items-center justify-center overflow-hidden rounded-[22px] border border-dashed border-white/[0.12] bg-white/[0.02] transition hover:border-white/25 hover:bg-white/[0.035]">
                    <div className="relative z-10 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-xl text-white/50 transition group-hover:scale-105 group-hover:text-white">
                        +
                      </div>

                      <p className="mt-5 text-sm font-medium">
                        Add {mediaType}
                      </p>

                      <p className="mt-2 text-xs text-white/30">
                        Drag & drop or click to browse
                      </p>

                      <p className="mt-3 text-[10px] text-white/20">
                        {mediaType === "image"
                          ? "PNG, JPG, WEBP · Max 10MB"
                          : "MP4, MOV, WEBM · Max 100MB"}
                      </p>
                    </div>

                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.05),transparent_55%)] opacity-0 transition group-hover:opacity-100" />
                  </div>
                </div>
              </div>

              <Divider />

              {/* Review */}
              <div>
                <SectionHeading
                  eyebrow="05 — Review"
                  title="Ready to publish?"
                  description="Make sure everything looks right before sending your information."
                />

                <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
                  <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                    <span className="text-xs text-white/35">
                      Submission preview
                    </span>

                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-2.5 py-1 text-[10px] text-emerald-300">
                      Ready
                    </span>
                  </div>

                  <div className="grid gap-5 p-5 sm:grid-cols-[120px_1fr]">
                    <div className="flex aspect-square items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025]">
                      <span className="text-2xl text-white/15">◇</span>
                    </div>

                    <div>
                      <p className="text-lg font-semibold">Your product</p>

                      <p className="mt-1 text-xs text-white/30">
                        Product category
                      </p>

                      <p className="mt-4 max-w-lg text-xs leading-6 text-white/35">
                        Your product description will appear here after you've
                        completed the previous fields.
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="rounded-full border border-white/[0.07] px-2.5 py-1 text-[10px] text-white/35">
                          Country
                        </span>

                        <span className="rounded-full border border-white/[0.07] px-2.5 py-1 text-[10px] text-white/35">
                          Category
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <label className="mt-6 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 accent-white"
                  />

                  <span className="text-xs leading-5 text-white/35">
                    I confirm that the information and media I've provided are
                    accurate and that I have the right to submit them.
                  </span>
                </label>
              </div>

              {/* Bottom actions */}
              <div className="mt-10 flex flex-col-reverse gap-3 border-t border-white/[0.07] pt-7 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  className="text-xs text-white/30 transition hover:text-white"
                >
                  Save as draft
                </button>

                <div className="flex gap-3">
                  <button
                    type="button"
                    className="rounded-xl border border-white/[0.08] px-5 py-3 text-xs font-medium text-white/55 transition hover:border-white/20 hover:text-white"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    className="group flex items-center gap-3 rounded-xl bg-white px-6 py-3 text-xs font-semibold text-black transition hover:bg-white/90"
                  >
                    Submit product
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom trust section */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Trust
            number="01"
            title="Simple"
            text="Only the information people actually need."
          />

          <Trust
            number="02"
            title="Reviewed"
            text="Submissions can be reviewed before becoming public."
          />

          <Trust
            number="03"
            title="Discoverable"
            text="Approved products can appear across search and discovery."
          />
        </div>
      </section>
    </main>
  );
}

/* ---------------- Components ---------------- */

function Step({
  number,
  label,
  active = false,
}: {
  number: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <div
        className={[
          "flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-semibold",
          active
            ? "bg-white text-black"
            : "border border-white/[0.08] text-white/25",
        ].join(" ")}
      >
        {number}
      </div>

      <span
        className={[
          "hidden text-[10px] sm:block",
          active ? "text-white/70" : "text-white/20",
        ].join(" ")}
      >
        {label}
      </span>
    </div>
  );
}

function Line() {
  return <div className="hidden h-px w-4 bg-white/[0.08] sm:block lg:w-8" />;
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h2>

      <p className="mt-2 max-w-lg text-xs leading-6 text-white/35">
        {description}
      </p>
    </div>
  );
}

function Field({
  label,
  placeholder,
  required,
  type = "text",
  large = false,
}: {
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  large?: boolean;
}) {
  return (
    <div className={large ? "sm:col-span-2" : ""}>
      <label className="mb-2.5 block text-xs font-medium text-white/65">
        {label} {required && <span className="text-white/30">*</span>}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className={[
          "w-full border border-white/[0.08] bg-white/[0.025] px-4 text-white outline-none",
          "placeholder:text-white/20 transition",
          "focus:border-white/25 focus:bg-white/[0.04]",
          large ? "rounded-2xl py-4 text-base" : "rounded-xl py-3.5 text-sm",
        ].join(" ")}
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2.5 block text-xs font-medium text-white/65">
        {label} {required && <span className="text-white/30">*</span>}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3.5 text-sm text-white outline-none transition focus:border-white/25 focus:bg-white/[0.04]"
        >
          <option value="" className="bg-[#111]">
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option} value={option} className="bg-[#111]">
              {option}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/30">
          ↓
        </span>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="my-12 h-px bg-white/[0.07]" />;
}

function Trust({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-white/20">{number}</span>

        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
      </div>

      <h3 className="mt-5 text-sm font-medium">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-white/30">{text}</p>
    </div>
  );
}
