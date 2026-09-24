"use client";

import { FormEvent, useMemo, useState } from "react";
import Visitor from '../components/Visitor'

type SearchResult = {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
};

const SEARCH_RESULTS: SearchResult[] = [
  {
    id: 1,
    title: "Top Universities in India",
    description:
      "Explore universities, colleges, courses, admissions and other education opportunities. Find the best fit for your academic goals.",
    url: "vishvaguru.com/universities/india",
    category: "Universities",
  },
  {
    id: 2,
    title: "Scholarships for Students",
    description:
      "Discover scholarship opportunities and financial support for your education journey. Merit-based, need-based, and country-specific scholarships.",
    url: "vishvaguru.com/scholarships",
    category: "Scholarships",
  },
  {
    id: 3,
    title: "SOP Guide - Statement of Purpose",
    description:
      "Learn how to create a strong Statement of Purpose for university applications. Templates, examples, and expert tips included.",
    url: "vishvaguru.com/guides/sop",
    category: "Guides",
  },
  {
    id: 4,
    title: "Study in USA - Complete Guide",
    description:
      "Explore universities, courses, scholarships and useful information for studying in the USA. Visa process, costs, and living guide.",
    url: "vishvaguru.com/study-abroad/usa",
    category: "Study Abroad",
  },
  {
    id: 5,
    title: "IELTS Preparation Resources",
    description:
      "Free IELTS practice tests, study materials, and preparation tips to help you achieve your target band score.",
    url: "vishvaguru.com/exams/ielts",
    category: "Exams",
  },
  {
    id: 6,
    title: "Student Visa Requirements",
    description:
      "Complete guide to student visa requirements for popular study destinations. Documents, process, and timeline information.",
    url: "vishvaguru.com/visa-guide",
    category: "Visa",
  },
];

const QUICK_SEARCHES = [
  "Universities",
  "Scholarships",
  "Study in USA",
  "IELTS",
];

const RELATED_SEARCHES = [
  "Best universities for international students",
  "Scholarship application deadlines 2026",
  "How to write SOP for masters",
  "Study abroad cost calculator",
];

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19" />
      <path d="M12 2.5c2.7 2.6 4 5.8 4 9.5s-1.3 6.9-4 9.5c-2.7-2.6-4-5.8-4-9.5s1.3-6.9 4-9.5Z" />
    </svg>
  );
}

function VishvaguruLogo({
  large = false,
}: {
  large?: boolean;
}) {
  const size = large
    ? "text-[clamp(2.75rem,10vw,6.75rem)]"
    : "text-xl sm:text-2xl";

  return (
    <div
      aria-label="Vishvaguru"
      className={`${size} font-semibold tracking-[-0.055em] leading-none select-none`}
    >
      <span className="text-blue-600">V</span>
      <span className="text-red-500">i</span>
      <span className="text-yellow-500">s</span>
      <span className="text-blue-600">h</span>
      <span className="text-green-600">v</span>
      <span className="text-red-500">a</span>
      <span className="text-yellow-500">g</span>
      <span className="text-blue-600">u</span>
      <span className="text-green-600">r</span>
      <span className="text-red-500">u</span>
    </div>
  );
}

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClear: () => void;
  compact?: boolean;
};

function SearchBar({
  value,
  onChange,
  onSubmit,
  onClear,
  compact = false,
}: SearchBarProps) {
  return (
    <form
      onSubmit={onSubmit}
      role="search"
      className={`w-full ${compact ? "max-w-2xl" : "max-w-[760px]"}`}
    >
      <div
        className={[
          "group flex w-full items-center",
          "rounded-full border border-black/10",
          "bg-white/95 backdrop-blur-xl",
          "shadow-[0_8px_35px_rgba(0,0,0,0.12)]",
          "transition-all duration-200",
          "focus-within:border-black/20",
          "focus-within:shadow-[0_10px_45px_rgba(0,0,0,0.18)]",
          compact
            ? "min-h-[48px] sm:min-h-[52px]"
            : "min-h-[54px] sm:min-h-[58px] lg:min-h-[62px]",
        ].join(" ")}
      >
        <div
          className={`flex shrink-0 items-center justify-center text-gray-500 ${
            compact
              ? "ml-4 h-8 w-8 sm:ml-5"
              : "ml-4 h-9 w-9 sm:ml-5"
          }`}
        >
          <SearchIcon
            className={
              compact
                ? "h-[18px] w-[18px] sm:h-5 sm:w-5"
                : "h-5 w-5 sm:h-[21px] sm:w-[21px]"
            }
          />
        </div>

        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search Vishvaguru or type a URL"
          aria-label="Search Vishvaguru"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="search"
          className={[
            "min-w-0 flex-1 bg-transparent",
            "border-0 outline-none",
            "text-gray-900",
            "placeholder:text-gray-400",
            "selection:bg-blue-100",
            compact
              ? "px-3 text-[15px] sm:text-base"
              : "px-3 text-[15px] sm:text-base lg:text-[17px]",
          ].join(" ")}
        />

        {value.length > 0 && (
          <>
            <div className="h-6 w-px shrink-0 bg-gray-200" />

            <button
              type="button"
              onClick={onClear}
              aria-label="Clear search"
              title="Clear search"
              className="mr-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 active:scale-95 sm:mr-2"
            >
              <CloseIcon className="h-[17px] w-[17px]" />
            </button>
          </>
        )}

        <button
          type="submit"
          aria-label="Search"
          title="Search"
          className="mr-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-blue-600 transition hover:bg-blue-50 active:scale-95 sm:mr-2"
        >
          <SearchIcon className="h-[19px] w-[19px] sm:h-5 sm:w-5" />
        </button>
      </div>
    </form>
  );
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

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

  const handleClear = () => {
    setQuery("");
    setSubmittedQuery("");
    setHasSearched(false);
  };

  const handleQuickSearch = (value: string) => {
    setQuery(value);
    setSubmittedQuery(value);
    setHasSearched(true);
  };

  const filteredResults = useMemo(() => {
    if (!submittedQuery) return [];

    const search = submittedQuery.toLowerCase();

    return SEARCH_RESULTS.filter((result) => {
      return (
        result.title.toLowerCase().includes(search) ||
        result.description.toLowerCase().includes(search) ||
        result.category.toLowerCase().includes(search) ||
        result.url.toLowerCase().includes(search)
      );
    });
  }, [submittedQuery]);

  return (
    <div className="relative min-h-[calc(70vh-80px)] w-full overflow-hidden bg-white text-gray-900">
      {!hasSearched ? (
        /*
         * ============================================================
         * HOME / SEARCH ENGINE LANDING
         * ============================================================
         */
        <main className="relative flex min-h-[100svh] h-full object-cover w-full items-center justify-center overflow-hidden">
          {/* Background image - Using external URL for demo */}
          <div
            aria-hidden="true"
            className="absolute  object-cover inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('/vishav.png')",
            }}
          />

          {/* Dark cinematic overlay */}
          <div aria-hidden="true" className="absolute inset-0 bg-black/30" />

          {/* Left-side readability gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent"
          />

          {/* Bottom readability gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/25 to-transparent"
          />

          {/* Main search content */}
          <section className="relative z-10 flex w-full flex-col items-center px-4 py-24 text-center sm:px-6 md:py-28 lg:px-8">
            <div className="flex w-full max-w-5xl flex-col items-center">
              {/* Brand */}
              <div className="mb-5 sm:mb-7 md:mb-8">
                <VishvaguruLogo large />
              </div>

              {/* Coming Soon Badge */}
              <div className="mb-8">
                <div
                  className="
          group inline-flex items-center gap-2.5
          rounded-full
          border border-white/20
          bg-white/[0.08]
          px-4 py-2
          shadow-[0_8px_30px_rgba(0,0,0,0.12)]
          backdrop-blur-xl
          transition-all duration-300
          hover:border-white/30
          hover:bg-white/[0.13]
          hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)]
        "
                >
                  {/* Live indicator */}
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>

                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 sm:text-xs">
                    Vishvaguru
                  </span>

                  <span className="h-3 w-px bg-white/20" />

                  <span className="text-xs font-medium text-white/90 sm:text-sm">
                    India's First Search Engine
                  </span>

                  <span
                    className="
            rounded-full
            border border-amber-300/20
            bg-amber-300/10
            px-2.5 py-1
            text-[9px] font-bold uppercase
            tracking-[0.12em]
            text-amber-200
            sm:text-[10px]
          "
                  >
                    Coming Soon
                  </span>
                </div>
              </div>

              {/* Search */}
              <SearchBar
                value={query}
                onChange={setQuery}
                onSubmit={handleSubmit}
                onClear={handleClear}
              />

              {/* Desktop search buttons */}
              <div className="mt-7 hidden items-center justify-center gap-3 sm:flex">
                <button
                  type="button"
                  onClick={() => {
                    const firstResult = SEARCH_RESULTS[0];

                    if (firstResult) {
                      setQuery(firstResult.title);
                      setSubmittedQuery(firstResult.title);
                      setHasSearched(true);
                    }
                  }}
                  className="
          rounded-lg
          border border-white/20
          bg-white/70
          px-5 py-2.5
          text-sm font-medium
          text-gray-800
          shadow-sm
          backdrop-blur-md
          transition-all duration-200
          hover:-translate-y-0.5
          hover:bg-white
          hover:shadow-md
          active:scale-[0.98]
        "
                >
                  Top Universities in India
                </button>
              </div>

              {/* Audio / Vishvaguru Voice */}
              <div className="mt-9 w-full max-w-[560px]">
                <div
                  className="
          group relative overflow-hidden
          rounded-2xl
          border border-white/15
          bg-black/20
          p-3
          shadow-[0_20px_60px_rgba(0,0,0,0.15)]
          backdrop-blur-2xl
          transition-all duration-300
          hover:border-white/25
          hover:bg-black/25
        "
                >
                  {/* Subtle glow */}
                  <div
                    className="
            pointer-events-none absolute
            -left-20 -top-20
            h-40 w-40
            rounded-full
            bg-cyan-400/10
            blur-3xl
          "
                  />

                  <div className="relative flex items-center gap-3">
                    {/* Audio icon */}
                    <div
                      className="
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-xl
              border border-white/10
              bg-white/10
              text-white
              shadow-inner
            "
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5L6 9H3v6h3l5 4V5z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.5 8.5a5 5 0 010 7"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.5 6a9 9 0 010 12"
                        />
                      </svg>
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold text-white">
                          Vishvaguru Voice
                        </p>

                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/50">
                          Preview
                        </span>
                      </div>

                      <p className="mt-0.5 text-xs text-white/45">
                        Listen to the Vishvaguru experience
                      </p>
                    </div>

                    {/* Native audio controls */}
                    <audio
                      controls
                      preload="metadata"
                      className="
              h-9
              w-[250px]
              max-w-[42vw]
              opacity-90
            "
                    >
                      <source src="audia\vishavguru.mp3" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
              </div>

              {/* Popular searches */}
              <div className="mt-7 flex w-full max-w-[760px] flex-wrap items-center justify-center gap-2 sm:mt-9">
                <span
                  className="
          mr-1 rounded-full
          bg-black/20
          px-3 py-1.5
          text-xs font-medium
          text-white
          backdrop-blur-md
          sm:text-sm
        "
                >
                  Popular
                </span>

                {QUICK_SEARCHES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleQuickSearch(item)}
                    className="
            min-h-10
            rounded-full
            border border-white/25
            bg-white/15
            px-4 py-2
            text-xs font-medium
            text-white
            shadow-sm
            backdrop-blur-md
            transition-all duration-200
            hover:-translate-y-0.5
            hover:bg-white/25
            hover:border-white/35
            active:scale-[0.97]
            sm:text-sm
          "
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full max-w-[920px] mt-4">
              <Visitor />
            </div>
          </section>

          {/* Small bottom hint */}
          <div className="absolute bottom-1 left-0 right-0 z-10 px-4 text-center">
            <p className="text-[11px] font-medium tracking-wide text-white/75 sm:text-xs">
              Search knowledge. Discover India. Explore the world.
            </p>
          </div>
        </main>
      ) : (
        /*
         * ============================================================
         * SEARCH RESULTS
         * ============================================================
         */
        <main className="min-h-[100svh] w-full bg-white">
          {/* Search area — not a navbar/header */}
          <div className="sticky top-[70px] z-30 border-b border-gray-200/80 bg-white/95 px-3 py-3 shadow-sm backdrop-blur-xl sm:px-5 sm:py-4 lg:px-8">
            <div className="mx-auto flex w-full max-w-6xl items-center gap-3">
              {/* Compact logo */}
              <button
                type="button"
                onClick={handleClear}
                aria-label="Go to Vishvaguru home"
                className="hidden shrink-0 sm:block"
              >
                <VishvaguruLogo />
              </button>

              {/* Search */}
              <SearchBar
                value={query}
                onChange={setQuery}
                onSubmit={handleSubmit}
                onClear={handleClear}
                compact
              />
            </div>

            {/* Search categories */}
            <div className="mx-auto mt-3 flex w-full max-w-6xl overflow-x-auto scrollbar-none">
              <div className="flex min-w-max items-center gap-5 px-1 text-sm">
                <button
                  type="button"
                  className="border-b-2 border-blue-600 pb-2 font-medium text-blue-600"
                >
                  All
                </button>

                {["Images", "Videos", "News", "Maps", "More"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="border-b-2 border-transparent pb-2 text-gray-600 transition hover:text-gray-900"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-7 text-xs text-gray-500 sm:text-sm">
                About {filteredResults.length * 1250} results
              </p>

              {filteredResults.length === 0 ? (
                <section className="py-8 sm:py-12">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <SearchIcon className="h-5 w-5 text-gray-500" />
                  </div>

                  <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                    No results found
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                    Your search for{" "}
                    <span className="font-medium text-gray-900">
                      "{submittedQuery}"
                    </span>{" "}
                    did not match any available results.
                  </p>

                  <div className="mt-6">
                    <p className="text-sm font-medium text-gray-900">Try:</p>

                    <ul className="mt-2 space-y-1.5 text-sm text-gray-600">
                      <li>• Using different keywords</li>
                      <li>• Using fewer words</li>
                      <li>• Using a broader search</li>
                    </ul>
                  </div>
                </section>
              ) : (
                <div className="space-y-9 sm:space-y-11">
                  {filteredResults.map((result) => (
                    <article key={result.id} className="group max-w-3xl">
                      {/* URL / category */}
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
                          <GlobeIcon className="h-4 w-4 text-gray-500" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-gray-800">
                            {result.category}
                          </p>

                          <p className="truncate text-xs text-gray-500 sm:text-sm">
                            {result.url}
                          </p>
                        </div>
                      </div>

                      {/* Title */}
                      <button
                        type="button"
                        className="mt-2 block text-left text-lg font-medium leading-7 text-blue-700 underline-offset-2 transition hover:underline sm:text-xl"
                      >
                        {result.title}
                      </button>

                      {/* Description */}
                      <p className="mt-1.5 text-sm leading-6 text-gray-600 sm:text-[15px]">
                        {result.description}
                      </p>

                      {/* Links */}
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                        <button
                          type="button"
                          className="text-blue-600 hover:underline"
                        >
                          Overview
                        </button>

                        <button
                          type="button"
                          className="text-blue-600 hover:underline"
                        >
                          Requirements
                        </button>

                        <button
                          type="button"
                          className="text-blue-600 hover:underline"
                        >
                          Explore
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Related searches */}
              {filteredResults.length > 0 && (
                <section className="mt-14 border-t border-gray-200 pt-8 sm:mt-16">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Related searches
                  </h2>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {RELATED_SEARCHES.map((search) => (
                      <button
                        key={search}
                        type="button"
                        onClick={() => handleQuickSearch(search)}
                        className="flex min-h-12 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm text-gray-700 transition hover:border-gray-300 hover:bg-white hover:shadow-sm"
                      >
                        <SearchIcon className="h-4 w-4 shrink-0 text-gray-400" />

                        <span className="line-clamp-2">{search}</span>
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}