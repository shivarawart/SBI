"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { setOwnerEmailInStorage, OWNER_EMAIL } from "../lib/storage";
import  Navbar  from "../components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!value) {
      setError("Please enter an email.");
      return;
    }

    // Simple check: if matches owner email -> owner, else -> user
    if (value === OWNER_EMAIL.toLowerCase()) {
      setOwnerEmailInStorage(value);
      router.push("/owner");
    } else {
      // For normal users, just store that they are "logged in" as user
      setOwnerEmailInStorage("user:" + value);
      router.push("/");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-black/60" />

      <Navbar />

      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-2 text-3xl font-extrabold">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Owner Login
          </span>
        </h1>
        <p className="mb-6 text-sm text-gray-300">
          Enter your email to access the Vishavguru dashboard.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
        >
          <label className="mb-2 block text-left text-sm text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="mb-4 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {error && (
            <p className="mb-4 text-left text-xs text-red-400">{error}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700"
          >
            Continue
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-400">
          Owner email for demo:{" "}
          <span className="text-gray-200">owner@vishavguru.com</span>
        </p>
      </div>
    </div>
  );
}
