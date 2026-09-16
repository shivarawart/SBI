"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="text-xl font-semibold tracking-tight text-white">
            Search<span className="text-white/50">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            Search
          </Link>

          {/* <Link
            href="/videos"
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            Videos
          </Link> */}

          <Link
            href="/contect"
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            Contact
          </Link>
          <Link
            href="/owner"
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            owner Login
          </Link>

          {/* Dashboard link (owner page) */}
          {isSignedIn && (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-indigo-300 transition-colors hover:text-indigo-200"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 md:flex">
          {!isSignedIn ? (
            <>
              <SignInButton>
                <button className="text-sm font-medium text-white/70 transition-colors hover:text-white">
                  Sign in
                </button>
              </SignInButton>

              <SignUpButton>
                <button className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform duration-300 hover:scale-105">
                  Get started
                </button>
              </SignUpButton>
            </>
          ) : (
            <UserButton />
          )}
        </div>

        {/* Mobile Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-5 bg-white transition-transform duration-300 ${
              open ? "translate-y-[4px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-white transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-white transition-transform duration-300 ${
              open ? "-translate-y-[4px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col px-5 py-5">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="border-b border-white/10 py-4 text-sm text-white/80"
          >
            Search
          </Link>

          <Link
            href="/owner"
            onClick={() => setOpen(false)}
            className="border-b border-white/10 py-4 text-sm text-white/80"
          >
            ower login
          </Link>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="border-b border-white/10 py-4 text-sm text-white/80"
          >
            Contact
          </Link>

          {isSignedIn && (
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-4 text-sm text-indigo-300"
            >
              Dashboard
            </Link>
          )}

          <div className="flex items-center gap-4 pt-5">
            {!isSignedIn ? (
              <>
                <SignInButton>
                  <button className="text-sm font-medium text-white/70">
                    Sign in
                  </button>
                </SignInButton>

                <SignUpButton>
                  <button className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black">
                    Get started
                  </button>
                </SignUpButton>
              </>
            ) : (
              <UserButton />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
