"use client";

import { FormEvent, useEffect, useState } from "react";

type Owner = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

export default function OwnerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [owners, setOwners] = useState<Owner[]>([]);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function fetchOwners() {
    try {
      setFetching(true);

      const response = await fetch("/api/owners", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch owners");
      }

      setOwners(data.owners || []);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "Failed to fetch owners",
      );
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    fetchOwners();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/owners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create owner");
      }

      setMessage("Owner created successfully");

      setName("");
      setEmail("");

      await fetchOwners();
    } catch (error) {
      console.error(error);

      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] px-10 py-26 text-white">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-white/40">
            Owner Management
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Owner Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-white/50">
            Create and manage owners who can publish videos to the platform.
          </p>
        </div>

        {/* Create Owner */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20 md:p-8">
          <div className="mb-7">
            <h2 className="text-xl font-semibold">Create Owner</h2>

            <p className="mt-1 text-sm text-white/40">
              Add an owner using their name and email address.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-white/60">Name</label>

              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Shivam"
                className="h-12 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-sm outline-none transition placeholder:text-white/20 focus:border-white/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/60">Email</label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="owner@example.com"
                className="h-12 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-sm outline-none transition placeholder:text-white/20 focus:border-white/30"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="h-12 rounded-xl bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Owner"}
              </button>
            </div>
          </form>

          {/* Status */}
          {message && (
            <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3 text-sm text-emerald-300">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}
        </section>

        {/* Owners */}
        <section className="mt-8">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold">Registered Owners</h2>

              <p className="mt-1 text-sm text-white/40">
                Owners currently stored in Neon.
              </p>
            </div>

            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/50">
              {owners.length} owners
            </span>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
            {fetching ? (
              <div className="p-8 text-center text-sm text-white/40">
                Loading owners...
              </div>
            ) : owners.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-white/60">No owners yet.</p>

                <p className="mt-1 text-sm text-white/30">
                  Create your first owner above.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.07]">
                {owners.map((owner) => (
                  <div
                    key={owner.id}
                    className="flex flex-col gap-3 p-5 transition hover:bg-white/[0.025] md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="font-medium">{owner.name}</p>

                      <p className="mt-1 text-sm text-white/40">
                        {owner.email}
                      </p>
                    </div>

                    <div className="text-xs text-white/25">
                      {new Date(owner.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
