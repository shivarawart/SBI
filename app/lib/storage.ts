import { ContentCard } from "./types";

const CARDS_KEY = "vishavguru_cards";

export function loadCards(): ContentCard[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(CARDS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as ContentCard[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCards(cards: ContentCard[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
}

export function addCard(card: Omit<ContentCard, "id" | "createdAt">) {
  const cards = loadCards();
  const newCard: ContentCard = {
    ...card,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  cards.unshift(newCard);
  saveCards(cards);
  return newCard;
}

export function deleteCard(id: string) {
  const cards = loadCards().filter((c) => c.id !== id);
  saveCards(cards);
}
