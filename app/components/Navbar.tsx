"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

type NavbarProps = {
  isOwnerLoggedIn?: boolean;
  onOwnerLogout?: () => void;
};

const navItems = [
  { label: "Search", href: "/" },
  { label: "Videos", href: "/media" },
  { label: "Contact", href: "/contect" },
];

export default function Navbar({
  isOwnerLoggedIn = false,
  onOwnerLogout,
}: NavbarProps) {
  const pathname = usePathname();

  const { isLoaded, isSignedIn } = useUser();

  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  // Close mobile menu whenever route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50 h-20
        border-b border-white/[0.08]
        bg-[#0b0805]/70
        text-white
        backdrop-blur-2xl
        supports-[backdrop-filter]:bg-[#0b0805]/55
      "
      style={
        {
          "--navbar-height": "80px",
        } as React.CSSProperties
      }
    >
      {/* Top ambient line */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 top-0 h-px
          bg-gradient-to-r
          from-transparent
          via-amber-400/70
          to-transparent
        "
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -top-24 left-1/2
          h-32 w-72
          -translate-x-1/2
          rounded-full
          bg-amber-500/[0.07]
          blur-3xl
        "
      />

      <nav
        className="
          relative mx-auto flex h-full max-w-7xl
          items-center justify-between
          px-4 sm:px-6 lg:px-8
        "
      >
        {/* =========================================================
            LOGO
        ========================================================= */}

        <Link
          href="/"
          onClick={closeMenu}
          aria-label="Vishvaguru home"
          className="group relative flex items-center gap-3 outline-none"
        >
          {/* Logo mark */}
          <span
            className="
              relative flex h-10 w-10 shrink-0
              items-center justify-center
              overflow-hidden rounded-xl
              border border-amber-300/20
              bg-gradient-to-br
              from-amber-300
              via-orange-500
              to-red-700
              shadow-[0_0_30px_rgba(245,158,11,0.15)]
              transition-all duration-500 ease-out
              group-hover:scale-110
              group-hover:-rotate-3
              group-hover:border-amber-300/60
              group-hover:shadow-[0_0_40px_rgba(245,158,11,0.35)]
              group-active:scale-95
            "
          >
            {/* Glow */}
            <span
              aria-hidden="true"
              className="
                absolute -inset-1
                rounded-2xl
                bg-gradient-to-r
                from-amber-400/0
                via-orange-400/20
                to-red-500/0
                opacity-0
                blur-md
                transition-opacity duration-500
                group-hover:opacity-100
              "
            />

            {/* Shine */}
            <span
              aria-hidden="true"
              className="
                absolute inset-0 z-10
                -translate-x-[130%]
                skew-x-[-20deg]
                bg-gradient-to-r
                from-transparent
                via-white/40
                to-transparent
                transition-transform duration-700
                group-hover:translate-x-[130%]
              "
            />

            {/* Inner border */}
            <span
              aria-hidden="true"
              className="
                absolute inset-1
                rounded-lg
                border border-white/15
              "
            />

            {/* V */}
            <span
              className="
                relative z-20
                select-none
                text-[15px]
                font-black
                tracking-[-0.08em]
                text-white
                drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]
                transition-transform duration-500
                group-hover:scale-110
              "
            >
              V
            </span>
          </span>

          {/* Wordmark */}
          <span
            className="
              whitespace-nowrap
              text-[17px]
              font-semibold
              tracking-[-0.04em]
              text-white
              transition-all duration-300
              group-hover:tracking-[-0.02em]
            "
          >
            <span className="text-white/95">Vishva</span>

            <span
              className="
                bg-gradient-to-r
                from-amber-200
                via-orange-400
                to-amber-500
                bg-clip-text
                text-transparent
              "
            >
              guru
            </span>
          </span>

          {/* Premium indicator */}
          <span
            aria-hidden="true"
            className="
              absolute -right-2 -top-1
              h-1.5 w-1.5
              rounded-full
              bg-amber-300
              opacity-0
              shadow-[0_0_10px_rgba(251,191,36,0.9)]
              transition-all duration-500
              group-hover:scale-125
              group-hover:opacity-100
            "
          />
        </Link>

        {/* =========================================================
            DESKTOP NAVIGATION
        ========================================================= */}

        <div className="hidden items-center gap-4 md:flex">
          {/* Navigation */}
          <div
            className="
              flex items-center
              rounded-full
              border border-white/[0.08]
              bg-white/[0.035]
              p-1
              shadow-[0_10px_40px_rgba(0,0,0,0.18)]
            "
          >
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group relative
                    rounded-full
                    px-4 py-2
                    text-[13px]
                    font-medium
                    transition-all duration-300
                    focus:outline-none
                    focus:ring-2
                    focus:ring-amber-400/40
                    ${
                      active
                        ? "bg-white/[0.08] text-white"
                        : "text-white/60 hover:bg-white/[0.07] hover:text-white"
                    }
                  `}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Active / hover underline */}
                  <span
                    className={`
                      absolute bottom-1 left-1/2
                      h-px
                      -translate-x-1/2
                      bg-gradient-to-r
                      from-transparent
                      via-amber-300
                      to-transparent
                      transition-all duration-300
                      ${active ? "w-1/2" : "w-0 group-hover:w-1/2"}
                    `}
                  />
                </Link>
              );
            })}
          </div>

          {/* =====================================================
              OWNER
          ===================================================== */}

          {!isOwnerLoggedIn ? (
            <Link
              href="/owner"
              className="
                group relative
                rounded-full
                border border-amber-400/15
                bg-amber-400/[0.06]
                px-4 py-2
                text-[13px]
                font-medium
                text-amber-100/80
                transition-all duration-300
                hover:border-amber-300/30
                hover:bg-amber-400/[0.12]
                hover:text-amber-100
                focus:outline-none
                focus:ring-2
                focus:ring-amber-400/40
              "
            >
              <span className="relative z-10">Owner Login</span>

              <span
                aria-hidden="true"
                className="
                  absolute inset-0 -z-0
                  rounded-full
                  bg-amber-400/10
                  opacity-0
                  blur-md
                  transition-opacity duration-300
                  group-hover:opacity-100
                "
              />
            </Link>
          ) : (
            <>
              <Link
                href="/owner"
                className="
                  group relative
                  rounded-full
                  px-4 py-2
                  text-[13px]
                  font-medium
                  text-amber-300
                  transition-all duration-300
                  hover:bg-amber-400/10
                  hover:text-amber-200
                "
              >
                Dashboard
                <span
                  aria-hidden="true"
                  className="
                    absolute bottom-1 left-1/2
                    h-px w-0
                    -translate-x-1/2
                    bg-amber-300
                    transition-all duration-300
                    group-hover:w-1/2
                  "
                />
              </Link>

              <button
                type="button"
                onClick={onOwnerLogout}
                className="
                  rounded-full
                  px-4 py-2
                  text-[13px]
                  font-medium
                  text-red-300/70
                  transition-all duration-300
                  hover:bg-red-400/10
                  hover:text-red-200
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-400/30
                "
              >
                Logout
              </button>
            </>
          )}

          {/* =====================================================
              CLERK AUTHENTICATION

              IMPORTANT:
              SignIn/SignUp are rendered ONLY after Clerk confirms
              that the user is signed out.
          ===================================================== */}

          {!isLoaded ? (
            /* Clerk loading state */
            <div
              className="
                h-9 w-20
                animate-pulse
                rounded-full
                bg-white/[0.06]
              "
              aria-hidden="true"
            />
          ) : isSignedIn ? (
            /* Signed in */
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-9 h-9 rounded-full border-2 border-amber-400/30",

                  userButtonPopoverCard:
                    "bg-[#0b0805] border border-white/[0.08]",

                  userButtonPopoverActionButton:
                    "text-white/70 hover:text-white hover:bg-white/[0.05]",

                  userButtonPopoverActionButtonText: "text-sm",
                },
              }}
            />
          ) : (
            /* Signed out */
            <div className="flex items-center gap-2">
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="
                    rounded-full
                    px-4 py-2
                    text-[13px]
                    font-medium
                    text-white/70
                    transition-all duration-300
                    hover:bg-white/[0.07]
                    hover:text-white
                    focus:outline-none
                    focus:ring-2
                    focus:ring-amber-400/40
                  "
                >
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button
                  type="button"
                  className="
                    rounded-full
                    border border-amber-400/30
                    bg-amber-500/[0.1]
                    px-4 py-2
                    text-[13px]
                    font-medium
                    text-amber-200
                    transition-all duration-300
                    hover:border-amber-300/50
                    hover:bg-amber-500/[0.18]
                    hover:text-amber-100
                    focus:outline-none
                    focus:ring-2
                    focus:ring-amber-400/40
                  "
                >
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          )}
        </div>

        {/* =========================================================
            MOBILE MENU BUTTON
        ========================================================= */}

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="
            group relative
            flex h-11 w-11
            items-center justify-center
            rounded-full
            border border-white/10
            bg-white/[0.04]
            transition-all duration-300
            hover:border-amber-300/30
            hover:bg-amber-400/[0.08]
            focus:outline-none
            focus:ring-2
            focus:ring-amber-400/40
            md:hidden
          "
        >
          <span className="relative flex h-5 w-5 flex-col items-center justify-center">
            <span
              className={`absolute h-[1.5px] w-5 bg-white transition-all duration-300 ${
                open ? "rotate-45" : "-translate-y-1.5"
              }`}
            />

            <span
              className={`absolute h-[1.5px] w-5 bg-white transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`absolute h-[1.5px] w-5 bg-white transition-all duration-300 ${
                open ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* =========================================================
          MOBILE MENU
      ========================================================= */}

      <div
        className={`
          absolute left-0 right-0 top-20
          overflow-hidden
          border-b border-white/[0.08]
          bg-[#0b0805]/95
          backdrop-blur-2xl
          transition-all duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          md:hidden
          ${
            open
              ? "pointer-events-auto max-h-[700px] opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }
        `}
      >
        {/* Mobile glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -top-20 left-1/2
            h-40 w-72
            -translate-x-1/2
            rounded-full
            bg-amber-500/[0.08]
            blur-3xl
          "
        />

        <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div
            className="
              overflow-hidden
              rounded-2xl
              border border-white/[0.08]
              bg-white/[0.025]
            "
          >
            {/* Navigation links */}
            {navItems.map((item, index) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`
                    group
                    flex items-center justify-between
                    px-5 py-4
                    text-sm
                    font-medium
                    transition-all duration-300
                    ${
                      active
                        ? "bg-white/[0.06] text-white"
                        : "text-white/70 hover:bg-white/[0.05] hover:text-white"
                    }
                    ${
                      index !== navItems.length - 1
                        ? "border-b border-white/[0.07]"
                        : ""
                    }
                  `}
                >
                  <span>{item.label}</span>

                  <span
                    className="
                      translate-x-0
                      text-amber-300/0
                      transition-all duration-300
                      group-hover:translate-x-1
                      group-hover:text-amber-300
                    "
                  >
                    →
                  </span>
                </Link>
              );
            })}

            {/* =====================================================
                MOBILE CLERK AUTH
            ===================================================== */}

            {!isLoaded ? (
              <div className="border-t border-white/[0.07] px-5 py-4">
                <div className="h-11 w-full animate-pulse rounded-xl bg-white/[0.06]" />
              </div>
            ) : isSignedIn ? (
              <div className="border-t border-white/[0.07] px-5 py-4">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-10 h-10 rounded-full border-2 border-amber-400/30",

                      userButtonPopoverCard:
                        "bg-[#0b0805] border border-white/[0.08]",

                      userButtonPopoverActionButton:
                        "text-white/70 hover:text-white hover:bg-white/[0.05]",

                      userButtonPopoverActionButtonText: "text-sm",
                    },
                  }}
                />
              </div>
            ) : (
              <>
                <div className="border-t border-white/[0.07] px-5 py-4">
                  <SignInButton mode="modal">
                    <button
                      type="button"
                      onClick={closeMenu}
                      className="
                        w-full
                        rounded-xl
                        border border-white/[0.08]
                        bg-white/[0.03]
                        px-4 py-3
                        text-sm
                        font-medium
                        text-white/80
                        transition-all duration-300
                        hover:bg-white/[0.06]
                        hover:text-white
                      "
                    >
                      Sign In
                    </button>
                  </SignInButton>
                </div>

                <div className="px-5 pb-4">
                  <SignUpButton mode="modal">
                    <button
                      type="button"
                      onClick={closeMenu}
                      className="
                        w-full
                        rounded-xl
                        border border-amber-400/20
                        bg-amber-500/[0.08]
                        px-4 py-3
                        text-sm
                        font-medium
                        text-amber-200
                        transition-all duration-300
                        hover:border-amber-300/30
                        hover:bg-amber-500/[0.12]
                        hover:text-amber-100
                      "
                    >
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </>
            )}

            {/* =====================================================
                OWNER
            ===================================================== */}

            {!isOwnerLoggedIn ? (
              <Link
                href="/owner"
                onClick={closeMenu}
                className="
                  group
                  flex items-center justify-between
                  border-t border-white/[0.07]
                  bg-amber-400/[0.04]
                  px-5 py-4
                  text-sm
                  font-medium
                  text-amber-100/80
                  transition-all duration-300
                  hover:bg-amber-400/[0.09]
                  hover:text-amber-100
                "
              >
                <span>Owner Login</span>

                <span
                  className="
                    translate-x-0
                    text-amber-300
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </Link>
            ) : (
              <>
                <Link
                  href="/owner"
                  onClick={closeMenu}
                  className="
                    group
                    flex items-center justify-between
                    border-t border-white/[0.07]
                    bg-amber-400/[0.04]
                    px-5 py-4
                    text-sm
                    font-medium
                    text-amber-200
                    transition-all duration-300
                    hover:bg-amber-400/[0.09]
                  "
                >
                  <span>Dashboard</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    onOwnerLogout?.();
                    closeMenu();
                  }}
                  className="
                    flex w-full
                    items-center justify-between
                    border-t border-white/[0.07]
                    px-5 py-4
                    text-left
                    text-sm
                    font-medium
                    text-red-300/80
                    transition-all duration-300
                    hover:bg-red-400/[0.07]
                    hover:text-red-200
                  "
                >
                  <span>Logout</span>
                  <span>↗</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile footer */}
          <div className="flex items-center justify-between px-2 py-4">
            <span className="text-[11px] tracking-[0.18em] text-white/30">
              VISHVAGURU
            </span>

            <span className="text-[11px] text-amber-300/50">
              Search • Discover • Explore
            </span>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      <button
        type="button"
        aria-label="Close navigation menu"
        onClick={closeMenu}
        className={`
          fixed inset-0 top-20 -z-10
          bg-black/40
          backdrop-blur-[2px]
          transition-opacity duration-300
          md:hidden
          ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />
    </header>
  );
}
