"use client";

import { FormEvent, useMemo, useState } from "react";
import Visitor from "../components/Visitor";

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

function VishvaguruLogo({ large = false }: { large?: boolean }) {
  const size = large
    ? "text-[clamp(2.5rem,4vw,6.25rem)]"
    : "text-[17px] sm:text-xl";

  const letters = [
    ["V", "text-blue-600"],
    ["i", "text-red-500"],
    ["s", "text-yellow-500"],
    ["h", "text-blue-600"],
    ["v", "text-green-600"],
    ["a", "text-red-500"],
    ["g", "text-yellow-500"],
    ["u", "text-blue-600"],
    ["r", "text-green-600"],
    ["u", "text-red-500"],
  ] as const;

  return (
    <div
      role="img"
      aria-label="Vishvaguru"
      className={[
        "group inline-flex items-center",
        "select-none",
        "font-semibold leading-none",
        "tracking-[-0.065em]",
        "transition-transform duration-200",
        "hover:scale-[1.015]",
        "motion-reduce:transition-none",
        large ? "gap-3 sm:gap-4" : "gap-2",
      ].join(" ")}
    >
      {/* Small colorful brand mark */}
      <span
        aria-hidden="true"
        className={[
          "relative inline-flex shrink-0 items-center justify-center",
          "bg-white shadow-sm ring-1 ring-slate-200/80",
          "transition-transform duration-300",
          "group-hover:rotate-2 group-hover:scale-105",
          "motion-reduce:transition-none",
          large
            ? "h-10 w-10 rounded-[13px] sm:h-14 sm:w-14 sm:rounded-[17px]"
            : "h-7 w-7 rounded-[9px] sm:h-8 sm:w-8 sm:rounded-[10px]",
        ].join(" ")}
      >
        {/* Soft multicolor border */}
        <span
          aria-hidden="true"
          className="
            absolute inset-0 rounded-[inherit]
            bg-[conic-gradient(from_140deg,#2563eb,#ef4444,#eab308,#16a34a,#2563eb)]
            opacity-90
          "
        />

        {/* Inner surface */}
        <span
          aria-hidden="true"
          className="
            absolute inset-[2px] rounded-[inherit]
            bg-white sm:inset-[3px]
          "
        />

        {/* Mark */}
        <span
          className={[
            "relative z-10 font-bold tracking-[-0.14em]",
            "text-blue-600",
            large ? "text-xl sm:text-3xl" : "text-sm sm:text-base",
          ].join(" ")}
        >
          V
        </span>

        {/* Decorative accent dots */}
        <span
          aria-hidden="true"
          className={[
            "absolute -right-0.5 -top-0.5 rounded-full",
            "bg-red-500 ring-2 ring-white",
            large ? "h-2 w-2" : "h-1.5 w-1.5",
          ].join(" ")}
        />

        <span
          aria-hidden="true"
          className={[
            "absolute -bottom-0.5 -left-0.5 rounded-full",
            "bg-yellow-400 ring-2 ring-white",
            large ? "h-1.5 w-1.5" : "h-1 w-1",
          ].join(" ")}
        />
      </span>

      {/* Vishvaguru wordmark */}
      <span className={size}>
        {letters.map(([letter, color], index) => (
          <span
            key={`${letter}-${index}`}
            aria-hidden="true"
            className={[
              "inline-block",
              color,
              "transition-transform duration-200",
              "group-hover:-translate-y-px",
              "motion-reduce:transition-none",
            ].join(" ")}
          >
            {letter}
          </span>
        ))}
      </span>

      {/* Small badge only for the larger hero logo */}
      {large && (
        <span
          className="
            hidden items-center gap-1.5
            rounded-full border border-amber-200
            bg-amber-50 px-2.5 py-1
            text-[9px] font-semibold uppercase
            tracking-[0.13em] text-amber-700
            sm:inline-flex
          "
        >
          <span
            aria-hidden="true"
            className="
              h-1.5 w-1.5 rounded-full bg-amber-400
              motion-safe:animate-pulse
            "
          />
          made in india
        </span>
      )}
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
  const [focused, setFocused] = useState(false);

  const suggestions = [
    "Universities in India",
    "Scholarships for students",
    "Study in USA",
    "IELTS preparation",
  ];

  const showSuggestions = focused && !compact;

  const handleSuggestion = (suggestion: string) => {
    onChange(suggestion);

    // Small delay gives the input state time to update
    requestAnimationFrame(() => {
      const form = document.querySelector(
        'form[role="search"]',
      ) as HTMLFormElement | null;

      form?.requestSubmit();
    });
  };

  return (
    <div
      className={`
        relative mx-auto w-full
        ${compact ? "max-w-[620px]" : "max-w-[680px]"}
      `}
    >
      <form onSubmit={onSubmit} role="search" className="relative w-full">
        {/* Outer search shell */}
        <div
          className={`
            group relative flex w-full items-center
            rounded-full
            border
            bg-white
            transition-all duration-200 ease-out

            ${
              focused
                ? `
                  border-gray-300
                  shadow-[0_4px_16px_rgba(32,33,36,0.16)]
                `
                : `
                  border-gray-200
                  shadow-[0_2px_8px_rgba(32,33,36,0.08)]
                  hover:border-gray-300
                  hover:shadow-[0_3px_12px_rgba(32,33,36,0.12)]
                `
            }

            ${compact ? "h-11" : "h-12 sm:h-[54px]"}
          `}
        >
          {/* Search icon */}
          <div
            className="
              ml-3
              flex h-9 w-9 shrink-0
              items-center justify-center
              text-gray-500
              sm:ml-4
            "
          >
            <SearchIcon
              className={compact ? "h-[17px] w-[17px]" : "h-[18px] w-[18px]"}
            />
          </div>

          {/* Input */}
          <input
            type="search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              // Allow suggestion clicks to fire
              setTimeout(() => setFocused(false), 120);
            }}
            placeholder={
              compact ? "Search Vishvaguru" : "Search Vishvaguru or type a URL"
            }
            aria-label="Search Vishvaguru"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="search"
            className="
              min-w-0
              flex-1
              bg-transparent
              px-2
              text-[14px]
              text-gray-800
              outline-none
              placeholder:text-gray-400
              selection:bg-blue-100
              sm:text-[15px]
            "
          />

          {/* Right controls */}
          <div className="mr-1.5 flex shrink-0 items-center gap-0.5 sm:mr-2">
            {/* Clear */}
            {value.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={onClear}
                  aria-label="Clear search"
                  title="Clear"
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-full
                    text-gray-400
                    transition
                    hover:bg-gray-100
                    hover:text-gray-700
                    active:scale-95
                  "
                >
                  <CloseIcon className="h-4 w-4" />
                </button>

                <div className="mx-0.5 h-5 w-px bg-gray-200" />
              </>
            )}

            {/* Voice search */}
            <button
              type="button"
              aria-label="Voice search"
              title="Voice search"
              className="
                hidden h-9 w-9
                items-center justify-center
                rounded-full
                text-gray-500
                transition
                hover:bg-gray-100
                hover:text-gray-800
                active:scale-95
                sm:flex
              "
              onClick={() => {
                if (
                  typeof window === "undefined" ||
                  !("webkitSpeechRecognition" in window)
                ) {
                  return;
                }

                const SpeechRecognition = (window as any)
                  .webkitSpeechRecognition;

                const recognition = new SpeechRecognition();

                recognition.lang = "en-IN";
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;

                recognition.onresult = (event: any) => {
                  const transcript = event.results?.[0]?.[0]?.transcript || "";

                  if (transcript) {
                    onChange(transcript);
                  }
                };

                recognition.start();
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-[18px] w-[18px]"
              >
                <rect x="9" y="3" width="6" height="11" rx="3" />
                <path strokeLinecap="round" d="M5.5 11a6.5 6.5 0 0013 0" />
                <path strokeLinecap="round" d="M12 17.5V21" />
                <path strokeLinecap="round" d="M8.5 21h7" />
              </svg>
            </button>

            {/* Search */}
            <button
              type="submit"
              aria-label="Search"
              title="Search"
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-full
                text-gray-500
                transition-all
                hover:bg-gray-100
                hover:text-gray-900
                active:scale-95
              "
            >
              <SearchIcon className="h-[17px] w-[17px]" />
            </button>
          </div>
        </div>

        {/* Suggestions panel */}
        {showSuggestions && (
          <div
            className="
              absolute left-0 right-0 top-[calc(100%+8px)]
              z-50
              overflow-hidden
              rounded-[20px]
              border border-gray-200/80
              bg-white
              shadow-[0_12px_40px_rgba(32,33,36,0.14)]
              animate-in
              fade-in
              slide-in-from-top-1
              duration-150
            "
          >
            {/* Search suggestion header */}
            <div className="flex items-center justify-between px-4 pb-2 pt-3">
              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-gray-400
                "
              >
                Explore
              </span>

              <span className="text-[10px] text-gray-400">Vishvaguru</span>
            </div>

            <div className="px-2 pb-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    handleSuggestion(suggestion);
                  }}
                  className="
                    group flex w-full
                    items-center gap-3
                    rounded-[13px]
                    px-3 py-2.5
                    text-left
                    transition
                    hover:bg-gray-50
                  "
                >
                  <span
                    className="
                      flex h-8 w-8 shrink-0
                      items-center justify-center
                      rounded-full
                      bg-gray-100
                      text-gray-500
                      transition
                      group-hover:bg-blue-50
                      group-hover:text-blue-600
                    "
                  >
                    <SearchIcon className="h-3.5 w-3.5" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-gray-700">
                      {suggestion}
                    </span>

                    <span className="block truncate text-[11px] text-gray-400">
                      Search on Vishvaguru
                    </span>
                  </span>

                  <span className="hidden text-[10px] text-gray-300 transition group-hover:text-gray-500 sm:block">
                    ↵
                  </span>
                </button>
              ))}
            </div>

            {/* Bottom utility */}
            <div
              className="
                border-t border-gray-100
                bg-gray-50/70
                px-4 py-2.5
              "
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">
                  Search smarter with Vishvaguru
                </span>

                <span className="text-[10px] font-medium text-gray-400">
                  India
                </span>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
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
    <div className="relative h-[100vh] w-full overflow-hidden  bg-white text-gray-900">
      {!hasSearched ? (
        /*
         * ============================================================
         * HOME / SEARCH ENGINE LANDING
         * ============================================================
         */
        <main className="relative flex  h-full object-cover w-full items-center justify-center overflow-hidden">
          {/* Background image - Using external URL for demo */}
          <div
            aria-hidden="true"
            className="absolute  object-cover inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/vishav.png')",
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
          <section className="relative z-10 flex w-full flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-24 md:py-28 lg:px-8">
            <div className="flex w-full max-w-5xl flex-col items-center">
              {/* Brand */}
              <div className="mb-5 sm:mb-7 md:mb-8">
                <VishvaguruLogo large />
              </div>

              {/* Search */}
              <div className="w-full">
                <SearchBar
                  value={query}
                  onChange={setQuery}
                  onSubmit={handleSubmit}
                  onClear={handleClear}
                />
              </div>

              <div
                className="
        mt-2
        flex w-full max-w-[760px]
        flex-wrap
        items-center
        justify-center
        gap-2
        sm:mt-9
      "
              >
                <span
                  className="
          mr-1
          rounded-full
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
            hover:border-white/35
            hover:bg-white/25
            active:scale-[0.97]
            sm:text-sm
          "
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Visitor */}

            <div className="mt-5 w-full max-w-[700px] sm:mt-6">
  <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center">
    
    {/* ───────────────── VOICE CARD ───────────────── */}
    <div
      className="
        group
        min-w-0
        flex-1
        rounded-[14px]
        border border-white/[0.08]
        bg-white/[0.035]
        p-2
        backdrop-blur-xl
        transition-all duration-300
        hover:border-white/[0.13]
        hover:bg-white/[0.05]
      "
    >
      <div
        className="
          flex min-w-0
          items-center
          overflow-hidden
          rounded-[9px]
          border border-white/[0.06]
          bg-black/20
          px-1
        "
      >
        <audio
          controls
          preload="metadata"
          className="
            block
            h-7
            min-w-0
            flex-1
            opacity-75
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        >
          <source
            src="/audia/vishavguru.mp3"
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>

    {/* ───────────────── VISITOR CARD ───────────────── */}
    <div className="min-w-0 flex-1">
      <Visitor />
    </div>

  </div>
</div>
          </section>

          {/* Small bottom hint */}
          <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-2">
  <div
    className="
      group flex h-7 items-center gap-2
      rounded-full
      border border-white/[0.08]
      bg-black/65
      px-3.5
      backdrop-blur-xl
      shadow-[0_8px_30px_rgba(0,0,0,0.4)]
      transition-all duration-300
      hover:border-white/[0.14]
      hover:bg-black/75
    "
  >
    {/* Status */}
    <span className="relative flex h-1.5 w-1.5 shrink-0">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50" />
      <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
    </span>

    <p className="whitespace-nowrap text-[9px] font-medium tracking-[0.06em] text-white/50 sm:text-[10px]">
      <span className="font-semibold text-white/85">
        Vishvaguru Search
      </span>

      <span className="mx-1.5 text-white/20">•</span>

      <span className="text-emerald-400/90">
        Made in India Project
      </span>

      <span className="mx-1.5 text-white/20">•</span>

      <span className="text-white/45">
        Coming Soon
      </span>
    </p>
  </div>
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
            {/* Search header */}
            <div className="relative mx-auto flex w-full max-w-6xl items-center justify-center">
              {/* Compact logo */}
              <button
                type="button"
                onClick={handleClear}
                aria-label="Go to Vishvaguru home"
                className="
        absolute left-0
        hidden shrink-0
        sm:block
      "
              >
                <VishvaguruLogo />
              </button>

              {/* Centered search */}
              <div className="w-full max-w-[620px]">
                <SearchBar
                  value={query}
                  onChange={setQuery}
                  onSubmit={handleSubmit}
                  onClear={handleClear}
                  compact
                />
              </div>
            </div>

            {/* Search categories */}
            <div className="mx-auto mt-3 w-full max-w-6xl overflow-x-auto scrollbar-none">
              <div className="flex min-w-max items-center gap-5 px-1 text-sm">
                <button
                  type="button"
                  className="
          border-b-2 border-blue-600
          pb-2
          font-medium
          text-blue-600
        "
                >
                  All
                </button>

                {["Images", "Videos", "News", "Maps", "More"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="
            border-b-2 border-transparent
            pb-2
            text-gray-600
            transition
            hover:text-gray-900
          "
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
