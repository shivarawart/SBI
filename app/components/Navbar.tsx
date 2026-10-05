"use client";

import Link from "next/link";
import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Search", href: "/" },
  { label: "Videos", href: "/videos" },
  { label: "Carrers", href: "/contect" },
  { label: "Owner", href: "/ownerLogin" },
  { label: "Feedback", href: "/feedback" },
];

export default function Navbar() {
  const { isLoaded, isSignedIn } = useUser();

  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigation = (href: string) => {
    setMobileOpen(false);

    /*
     * Videos requires Clerk authentication.
     */
    if (href === "/videos" && isLoaded && !isSignedIn) {
      return;
    }

    router.push(href);
  };

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <nav className="relative flex h-[68px] items-center justify-between rounded-2xl border border-white/[0.08] bg-[#070707]/80 px-3 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:px-4">
            {/* =================================================
                LEFT — LOGO
            ================================================= */}

            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="group flex items-center gap-3"
            >
              {/* Logo */}
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] shadow-[0_0_30px_rgba(255,255,255,0.04)] transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.09]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.14] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <img
                  src="/vishavguru.png"
                  alt="Vishvaguru"
                  className="relative h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Brand */}
              <div className="hidden sm:block leading-none">
                <p className="text-sm font-semibold tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-white/90">
                  Vishvaguru
                </p>

                <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-white/30 transition-colors duration-300 group-hover:text-white/45">
                  Search the world
                </p>
              </div>
            </Link>

            {/* =================================================
                CENTER — DESKTOP NAV
            ================================================= */}

            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.025] p-1 md:flex">
              {navItems.map((item) => {
                const active = pathname === item.href;

                const requiresAuth = item.href === "/videos";

                return (
                  <div key={item.href} className="relative">
                    {requiresAuth && isLoaded && !isSignedIn ? (
                      <SignInButton mode="modal" fallbackRedirectUrl="/videos">
                        <button
                          type="button"
                          className={`relative rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                            active
                              ? "bg-white text-black shadow-lg shadow-white/10"
                              : "text-white/45 hover:bg-white/[0.06] hover:text-white"
                          }`}
                        >
                          {item.label}

                          <span className="ml-1.5 text-[8px] opacity-40">
                            •
                          </span>
                        </button>
                      </SignInButton>
                    ) : (
                      <Link
                        href={item.href}
                        className={`relative block rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                          active
                            ? "bg-white text-black shadow-lg shadow-white/10"
                            : "text-white/45 hover:bg-white/[0.06] hover:text-white"
                        }`}
                      >
                        {item.label}

                        {active && (
                          <span className="absolute inset-x-3 -bottom-[1px] h-px bg-black/20" />
                        )}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            {/* =================================================
                RIGHT — AUTH
            ================================================= */}

            <div className="flex items-center gap-2">
              {!isLoaded ? (
                <div className="h-9 w-24 animate-pulse rounded-xl bg-white/[0.06]" />
              ) : isSignedIn ? (
                <div className="flex items-center gap-3">
                  <div className="hidden text-right sm:block">
                    <p className="text-[10px] font-medium text-white/60">
                      Account
                    </p>

                    <p className="text-[9px] text-white/25">Signed in</p>
                  </div>

                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "h-9 w-9 ring-1 ring-white/10",
                      },
                    }}
                  />
                </div>
              ) : (
                <div className="hidden items-center gap-1.5 sm:flex">
                  <SignInButton mode="modal" fallbackRedirectUrl="/">
                    <button
                      type="button"
                      className="rounded-xl px-4 py-2.5 text-xs font-medium text-white/50 transition hover:bg-white/[0.05] hover:text-white"
                    >
                      Sign in
                    </button>
                  </SignInButton>

                  <SignUpButton mode="modal" fallbackRedirectUrl="/">
                    <button
                      type="button"
                      className="rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-white/90"
                    >
                      Sign up
                    </button>
                  </SignUpButton>
                </div>
              )}

              {/* =================================================
                  MOBILE MENU
              ================================================= */}

              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 transition hover:bg-white/[0.08] hover:text-white md:hidden"
                aria-label="Toggle menu"
              >
                <div className="space-y-1.5">
                  <span
                    className={`block h-px w-4 bg-current transition ${
                      mobileOpen ? "translate-y-[3px] rotate-45" : ""
                    }`}
                  />

                  <span
                    className={`block h-px w-4 bg-current transition ${
                      mobileOpen ? "-translate-y-[3px] -rotate-45" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </nav>

          {/* ===================================================
              MOBILE MENU
          =================================================== */}

          {mobileOpen && (
            <div className="mt-2 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080808]/95 p-2 shadow-2xl backdrop-blur-2xl md:hidden">
              <div className="space-y-1">
                {navItems.map((item) => {
                  const active = pathname === item.href;

                  const requiresAuth = item.href === "/videos";

                  if (requiresAuth && isLoaded && !isSignedIn) {
                    return (
                      <SignInButton
                        key={item.href}
                        mode="modal"
                        fallbackRedirectUrl="/videos"
                      >
                        <button
                          type="button"
                          onClick={() => setMobileOpen(false)}
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-white/55 transition hover:bg-white/[0.05] hover:text-white"
                        >
                          <span>{item.label}</span>

                          <span className="text-[9px] text-white/20">
                            Sign in required
                          </span>
                        </button>
                      </SignInButton>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition ${
                        active
                          ? "bg-white text-black"
                          : "text-white/55 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <span>{item.label}</span>

                      {active && <span className="text-[10px]">●</span>}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile auth */}

              {!isLoaded ? null : !isSignedIn ? (
                <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-2">
                  <SignInButton mode="modal" fallbackRedirectUrl="/">
                    <button
                      type="button"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl border border-white/10 py-3 text-xs font-medium text-white/60"
                    >
                      Sign in
                    </button>
                  </SignInButton>

                  <SignUpButton mode="modal" fallbackRedirectUrl="/">
                    <button
                      type="button"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl bg-white py-3 text-xs font-semibold text-black"
                    >
                      Sign up
                    </button>
                  </SignUpButton>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </header>
    </>
  );
}
 