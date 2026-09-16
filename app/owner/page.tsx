"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { OWNER_EMAIL } from "../lib/config";
import { ContentCard } from "../lib/types";
import { loadCards, addCard, deleteCard } from "../lib/storage";

type Step = "login" | "dashboard";

export default function HomePage() {
  const [step, setStep] = useState<Step>("login");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Dashboard state
  const [cards, setCards] = useState<ContentCard[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Load cards when entering dashboard
  const openDashboard = () => {
    const stored = loadCards();
    setCards(stored);
    setStep("dashboard");
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      setError("Please enter your email address.");
      return;
    }
    if (trimmed !== OWNER_EMAIL.toLowerCase()) {
      setError("Access denied. This email is not authorized.");
      return;
    }
    openDashboard();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setImageDataUrl(dataUrl);
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert("Failed to read image file.");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handlePublish = () => {
    if (!title.trim() || !description.trim() || !imageDataUrl) {
      alert("Please fill title, description, and select an image.");
      return;
    }

    const newCard = addCard({
      title: title.trim(),
      description: description.trim(),
      imageSrc: imageDataUrl,
    });

    setCards((prev) => [newCard, ...prev]);
    // Reset form
    setTitle("");
    setDescription("");
    setImageDataUrl(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this content card?")) return;
    deleteCard(id);
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const handleLogout = () => {
    setStep("login");
    setEmail("");
    setError(null);
  };

  // ------------------ LOGIN VIEW ------------------
  if (step === "login") {
    return (
      <div className="relative min-h-screen bg-black text-white">
        {/* Background */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-black/60" />

        <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Vishavguru
            </span>
          </h1>
          <p className="mb-8 text-sm text-gray-300">
            Owner access – enter your email to continue
          </p>

          <form
            onSubmit={handleLogin}
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
          >
            <label
              htmlFor="email"
              className="mb-2 block text-left text-sm font-medium text-gray-200"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@vishavguru.com"
              className="mb-4 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {error && (
              <p className="mb-4 text-left text-xs text-red-400">{error}</p>
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Continue
            </button>
          </form>

          <p className="mt-6 text-xs text-gray-400">
            Only the owner email can access the dashboard.
          </p>
        </div>
      </div>
    );
  }

  // ------------------ DASHBOARD VIEW ------------------
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top bar */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-xl font-extrabold text-indigo-600">
              Vishavguru
            </span>
            <span className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-indigo-700">
              Owner Dashboard
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Welcome */}
        <section className="mb-8 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
          <h1 className="text-2xl font-bold text-indigo-900">
            Welcome to the Vishavguru Search Engine
          </h1>
          <p className="mt-1 text-sm text-indigo-800">
            Manage content that appears on your platform. Add images, titles,
            and descriptions – all stored locally in your browser.
          </p>
        </section>

        {/* Upload Form */}
        <section className="mb-10 grid gap-6 lg:grid-cols-3">
          {/* Form Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-1">
            <h2 className="mb-4 text-lg font-semibold">Add New Content</h2>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-1 block text-xs font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Top Universities in USA"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-1 block text-xs font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description for this content..."
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label
                  htmlFor="image"
                  className="mb-1 block text-xs font-medium text-gray-700"
                >
                  Cover Image
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-indigo-700"
                />
                {isUploading && (
                  <p className="mt-1 text-xs text-gray-500">
                    Reading image from your device...
                  </p>
                )}
                {imageDataUrl && (
                  <div className="mt-3 overflow-hidden rounded-lg border border-gray-200">
                    <img
                      src={imageDataUrl}
                      alt="Preview"
                      className="h-40 w-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Publish Button */}
              <button
                onClick={handlePublish}
                className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Publish Content
              </button>
            </div>
          </div>

          {/* Preview / List */}
          <div className="lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Published Content</h2>
              <span className="text-xs text-gray-500">
                {cards.length} item{cards.length !== 1 ? "s" : ""} stored
                locally
              </span>
            </div>

            {cards.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
                <p className="text-sm text-gray-600">
                  No content yet. Use the form to add your first card.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={card.imageSrc}
                        alt={card.title}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-gray-900">
                        {card.title}
                      </h3>
                      <p className="mt-1 line-clamp-3 text-sm text-gray-600">
                        {card.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[10px] text-gray-400">
                          {new Date(card.createdAt).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleDelete(card.id)}
                          className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
