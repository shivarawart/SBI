export type SearchResult = {
  id: string;
  title: string;
  url: string;
  snippet: string;
  category?: string;
};

const DUMMY_RESULTS: SearchResult[] = [
  {
    id: "1",
    title: "Vishavguru – Global Study Abroad Platform",
    url: "https://vishavguru.com",
    snippet:
      "Explore universities, courses, scholarships and mentorship for studying abroad with Vishavguru.",
    category: "Official",
  },
  {
    id: "2",
    title: "Top Universities in USA for Indian Students",
    url: "https://example.com/usa-universities",
    snippet:
      "A curated list of top US universities, admission requirements, and scholarship options for Indian students.",
    category: "Guides",
  },
  {
    id: "3",
    title: "Scholarships for International Students 2025",
    url: "https://example.com/scholarships-2025",
    snippet:
      "Find fully funded and partial scholarships for undergraduate and graduate programs worldwide.",
    category: "Funding",
  },
  {
    id: "4",
    title: "How to Write a SOP for Masters Abroad",
    url: "https://example.com/sop-guide",
    snippet:
      "Step-by-step guide to writing a strong Statement of Purpose (SOP) for MS programs in top universities.",
    category: "Guides",
  },
  {
    id: "5",
    title: "Best Countries to Study After 12th",
    url: "https://example.com/study-after-12th",
    snippet:
      "Compare countries like USA, UK, Canada, Germany and Australia for undergraduate studies after 12th.",
    category: "Guides",
  },
];

export function searchVishavguru(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return DUMMY_RESULTS.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.snippet.toLowerCase().includes(q) ||
      r.category?.toLowerCase().includes(q),
  );
}
