"use client";

import { FormEvent, useMemo, useState } from "react";

type SearchResult = {
  id: number;
  title: string;
  description: string;
  category: string;
};

const SEARCH_RESULTS: SearchResult[] = [
  {
    id: 1,
    title: "Top Universities in India",
    description:
      "Explore universities, colleges, courses, admissions and other education opportunities.",
    category: "Universities",
  },
  {
    id: 2,
    title: "Scholarships for Students",
    description:
      "Discover scholarship opportunities and financial support for your education journey.",
    category: "Scholarships",
  },
  {
    id: 3,
    title: "SOP Guide",
    description:
      "Learn how to create a strong Statement of Purpose for university applications.",
    category: "Guides",
  },
  {
    id: 4,
    title: "Study in USA",
    description:
      "Explore universities, courses, scholarships and useful information for studying in the USA.",
    category: "Study Abroad",
  },
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleChange = (value: string) => {
    setQuery(value);
  };

  const handleClear = () => {
    setQuery("");
    setSubmittedQuery("");
    setHasSearched(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanedQuery = query.trim();

    if (!cleanedQuery) {
      setHasSearched(false);
      setSubmittedQuery("");
      return;
    }

    setSubmittedQuery(cleanedQuery);
    setHasSearched(true);
  };

  const filteredResults = useMemo(() => {
    if (!submittedQuery) return [];

    const search = submittedQuery.toLowerCase();

    return SEARCH_RESULTS.filter((result) => {
      return (
        result.title.toLowerCase().includes(search) ||
        result.description.toLowerCase().includes(search) ||
        result.category.toLowerCase().includes(search)
      );
    });
  }, [submittedQuery]);

  const handleQuickSearch = (value: string) => {
    setQuery(value);
    setSubmittedQuery(value);
    setHasSearched(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">
      {/* =========================================================
          FIXED BACKGROUND IMAGE
          This NEVER moves with the page.
      ========================================================= */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://www.shutterstock.com/image-vector/republic-india-map-showing-indian-600w-437039734.jpg')",
        }}
      />

      {/* =========================================================
          FIXED DARK OVERLAY
      ========================================================= */}
      <div className="fixed inset-0 z-10 bg-black/60" />

      {/* =========================================================
          FIXED GRADIENT OVERLAY
      ========================================================= */}
      <div className="fixed inset-0 z-10 bg-gradient-to-b from-black/30 via-black/60 to-black" />

      {/* =========================================================
          FIXED SOFT LIGHT
      ========================================================= */}
      <div className="pointer-events-none fixed left-1/2 top-1/3 z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[120px]" />

      {/* =========================================================
          ENTIRE PAGE CONTENT
          Relative = page scrolls normally.
          z-20 = always above the fixed image.
      ========================================================= */}
      <main className="relative z-20 min-h-screen w-full">
        {/* =======================================================
            MAIN CONTENT
        ======================================================= */}
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
          {/* =====================================================
              TOP BRAND / BADGE
          ===================================================== */}
          <div className="flex justify-center pt-6 sm:pt-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium text-white/70 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              India&apos;s Global Education Search
            </div>
          </div>

          {/* =====================================================
              HERO
          ===================================================== */}
          <section className="flex flex-1 flex-col items-center justify-center py-16 text-center sm:py-20 lg:py-28">
            {/* Brand */}
            <h1 className="text-5xl font-black tracking-[-0.06em] sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                Vishvaguru
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base md:text-lg">
              Search universities, courses, scholarships, guides and more for
              your global education journey.
            </p>

            {/* ===================================================
                SEARCH
            =================================================== */}
            <form onSubmit={handleSubmit} className="mt-10 w-full max-w-3xl">
              <div className="group relative flex min-h-[62px] items-center rounded-2xl border border-white/10 bg-black/50 p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 focus-within:border-white/25 focus-within:bg-black/60 sm:min-h-[70px] sm:rounded-3xl sm:p-2.5">
                {/* Search Icon */}
                <div className="pointer-events-none flex h-11 w-11 shrink-0 items-center justify-center text-white/40 sm:h-12 sm:w-12">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </div>

                {/* Input */}
                <input
                  type="text"
                  value={query}
                  onChange={(event) => handleChange(event.target.value)}
                  placeholder="Search anything on Vishvaguru..."
                  className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-white/30 sm:text-base"
                />

                {/* Clear */}
                {query && (
                  <button
                    type="button"
                    onClick={handleClear}
                    aria-label="Clear search"
                    className="mr-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white/35 transition hover:bg-white/10 hover:text-white"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    >
                      <path d="M6 6l12 12" />
                      <path d="M18 6 6 18" />
                    </svg>
                  </button>
                )}

                {/* Search Button */}
                <button
                  type="submit"
                  className="flex h-11 shrink-0 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 active:scale-95 sm:h-12 sm:px-6"
                >
                  Search
                </button>
              </div>
            </form>

            {/* ===================================================
                QUICK SEARCH CHIPS
            =================================================== */}
            <div className="mt-5 flex w-full flex-wrap items-center justify-center gap-2">
              {[
                "Universities",
                "Scholarships",
                "SOP Guide",
                "Study in USA",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleQuickSearch(item)}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/55 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.09] hover:text-white active:scale-95"
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {/* =====================================================
              SEARCH RESULTS
          ===================================================== */}
          {hasSearched && (
            <section className="w-full pb-20">
              <div className="mx-auto max-w-4xl">
                {/* Result Header */}
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
                      Search results
                    </p>

                    <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                      Results for{" "}
                      <span className="text-white/50">
                        &quot;{submittedQuery}&quot;
                      </span>
                    </h2>
                  </div>

                  <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/40 sm:block">
                    {filteredResults.length}{" "}
                    {filteredResults.length === 1 ? "result" : "results"}
                  </span>
                </div>

                {/* No Results */}
                {filteredResults.length === 0 ? (
                  <div className="rounded-3xl border border-white/10 bg-black/40 p-8 text-center backdrop-blur-xl sm:p-12">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                      </svg>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold">
                      No results found
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/40">
                      We couldn&apos;t find anything matching your search. Try
                      another keyword or explore one of the quick searches.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredResults.map((result) => (
                      <article
                        key={result.id}
                        className="group rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] sm:p-6"
                      >
                        <div className="flex gap-4">
                          {/* Icon */}
                          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/60 sm:flex">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z" />
                              <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
                            </svg>
                          </div>

                          {/* Content */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                                {result.category}
                              </span>
                            </div>

                            <h3 className="mt-3 text-base font-semibold text-white transition-colors group-hover:text-white/90 sm:text-lg">
                              {result.title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-white/45">
                              {result.description}
                            </p>

                            <button
                              type="button"
                              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white/50 transition hover:text-white"
                            >
                              Explore
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
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* =====================================================
              EXTRA PAGE CONTENT
              This demonstrates that the page can become longer
              while the background remains fixed.
          ===================================================== */}
          <section className="w-full pb-20">
            <div className="grid gap-4 md:grid-cols-3">
              {/* Card 1 */}
              <div className="rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur-xl">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 21h18" />
                    <path d="M5 21V7l7-4 7 4v14" />
                    <path d="M9 21v-5h6v5" />
                  </svg>
                </div>

                <h3 className="text-lg font-semibold">Universities</h3>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  Find universities and institutions for your next education
                  journey.
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur-xl">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v20" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>

                <h3 className="text-lg font-semibold">Scholarships</h3>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  Discover financial opportunities that can support your
                  studies.
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur-xl">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
                  </svg>
                </div>

                <h3 className="text-lg font-semibold">Education Guides</h3>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  Access useful guides for admissions, applications and studying
                  abroad.
                </p>
              </div>
            </div>
          </section>

          {/* =====================================================
              FOOTER
          ===================================================== */}
          <footer className="mt-auto border-t border-white/10 py-8">
            <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
              {/* Brand */}
              <div className="text-sm font-semibold text-white/70">
                Vishvaguru
              </div>

              {/* Links */}
              <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <a
                  href="/about"
                  className="text-xs text-white/35 transition hover:text-white"
                >
                  About
                </a>

                <a
                  href="/privacy"
                  className="text-xs text-white/35 transition hover:text-white"
                >
                  Privacy
                </a>

                <a
                  href="/terms"
                  className="text-xs text-white/35 transition hover:text-white"
                >
                  Terms
                </a>

                <a
                  href="/contact"
                  className="text-xs text-white/35 transition hover:text-white"
                >
                  Contact
                </a>
              </nav>

              {/* Copyright */}
              <p className="text-xs text-white/25">
                © {new Date().getFullYear()} Vishvaguru
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
