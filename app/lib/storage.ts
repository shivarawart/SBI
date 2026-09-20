export type MediaItem = {
  id: string;
  type: "image" | "video";
  dataUrl: string; // base64 data URL for image/video
  title?: string;
  createdAt: number;
};

const MEDIA_KEY = "vishavguru_media";
const OWNER_EMAIL_KEY = "vishavguru_owner_email";

// You can set your owner email here or via env
export const OWNER_EMAIL = "owner@vishavguru.com";

export function getOwnerEmailFromStorage(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(OWNER_EMAIL_KEY);
}

export function setOwnerEmailInStorage(email: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(OWNER_EMAIL_KEY, email);
}

export function clearOwnerEmailFromStorage() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(OWNER_EMAIL_KEY);
}

export function getMediaItems(): MediaItem[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(MEDIA_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as MediaItem[];
  } catch {
    return [];
  }
}

export function saveMediaItem(item: Omit<MediaItem, "id" | "createdAt">) {
  const items = getMediaItems();
  const newItem: MediaItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  items.unshift(newItem);
  localStorage.setItem(MEDIA_KEY, JSON.stringify(items));
  return newItem;
}

export function deleteMediaItem(id: string) {
  const items = getMediaItems();
  const filtered = items.filter((i) => i.id !== id);
  localStorage.setItem(MEDIA_KEY, JSON.stringify(filtered));
}
