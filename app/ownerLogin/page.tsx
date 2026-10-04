"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/* ============================================================
   OWNER CONFIGURATION
   ============================================================ */

/**
 * Put your actual owner email here.
 *
 * Example:
 * const OWNER_EMAIL = "owner@gmail.com";
 */
const OWNER_EMAIL = "rajinderkumardhiman672@gmail.com";

const ACCESS_KEY = "owner_route_access";

/* ============================================================
   TYPES
   ============================================================ */

type RouteNode = {
  id: string;
  name: string;
  path: string;
  description: string;
  icon: string;
};

/* ============================================================
   ROUTES
   ============================================================ */

const routes: RouteNode[] = [
  {
    id: "home",
    name: "Home",
    path: "/owner",
    description: "Owner dashboard",
    icon: "⌂",
  },
  {
    id: "videos",
    name: "Videos",
    path: "/owner/videos",
    description: "Owner video library",
    icon: "▶",
  },
];

/* ============================================================
   MAIN PAGE
   ============================================================ */

export default function RoutesPage() {
  const router = useRouter();

  const [authenticated, setAuthenticated] = useState(false);

  const [email, setEmail] = useState("");

  const [selectedRoute, setSelectedRoute] = useState<RouteNode | null>(null);

  const [showModal, setShowModal] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [checkingAccess, setCheckingAccess] = useState(true);

  /* ==========================================================
     CHECK EXISTING ACCESS
     ========================================================== */

  useEffect(() => {
    try {
      const access = sessionStorage.getItem(ACCESS_KEY);

      if (access === "granted") {
        setAuthenticated(true);
      }
    } catch (error) {
      console.error("ACCESS CHECK ERROR:", error);
    } finally {
      setCheckingAccess(false);
    }
  }, []);

  /* ==========================================================
     NORMALIZE EMAIL
     ========================================================== */

  const normalizeEmail = (value: string) => {
    return value.trim().toLowerCase();
  };

  /* ==========================================================
     ROUTE CLICK
     ========================================================== */

  const handleRouteClick = (route: RouteNode) => {
    /*
     * Already verified?
     * Open route immediately.
     */
    if (authenticated) {
      router.push(route.path);
      return;
    }

    /*
     * Not verified?
     * Show email verification.
     */
    setSelectedRoute(route);
    setEmail("");
    setError("");
    setSuccess("");
    setShowModal(true);
  };

  /* ==========================================================
     VERIFY OWNER EMAIL
     ========================================================== */

  const verifyOwnerEmail = () => {
    const enteredEmail = normalizeEmail(email);

    const ownerEmail = normalizeEmail(OWNER_EMAIL);

    setError("");
    setSuccess("");

    /*
     * Empty email
     */
    if (!enteredEmail) {
      setError("Please enter your email address.");

      return;
    }

    /*
     * Owner email not configured
     */
    if (!ownerEmail || ownerEmail === "your-owner-email@example.com") {
      setError(
        "Owner email is not configured. Add your owner email in OWNER_EMAIL.",
      );

      return;
    }

    /*
     * Email does not match
     */
    if (enteredEmail !== ownerEmail) {
      setError("Access denied. This email is not the owner email.");

      return;
    }

    /*
     * ========================================================
     * SUCCESS
     * ========================================================
     */

    setAuthenticated(true);

    /*
     * Persist access for this browser session.
     */
    try {
      sessionStorage.setItem(ACCESS_KEY, "granted");
    } catch (error) {
      console.error("SESSION STORAGE ERROR:", error);
    }

    setSuccess("Owner verified. All routes are now unlocked.");

    /*
     * Open the route the user originally selected.
     */
    setTimeout(() => {
      setShowModal(false);

      if (selectedRoute) {
        router.push(selectedRoute.path);
      }
    }, 650);
  };

  /* ==========================================================
     LOGOUT / LOCK AGAIN
     ========================================================== */

  const lockRoutes = () => {
    try {
      sessionStorage.removeItem(ACCESS_KEY);
    } catch (error) {
      console.error("SESSION STORAGE ERROR:", error);
    }

    setAuthenticated(false);
  };

  /* ==========================================================
     CLOSE MODAL
     ========================================================== */

  const closeModal = () => {
    setShowModal(false);
    setSelectedRoute(null);
    setEmail("");
    setError("");
    setSuccess("");
  };

  /* ==========================================================
     LOADING
     ========================================================== */

  if (checkingAccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="flex items-center gap-3 text-sm text-white/40">
          <span className="h-2 w-2 animate-pulse rounded-full bg-white/50" />
          Checking access...
        </div>
      </main>
    );
  }

  /* ==========================================================
     UI
     ========================================================== */

  return (
    <main className="min-h-screen overflow-hidden py-10 bg-[#050505] text-white">
      {/* ======================================================
          BACKGROUND
          ====================================================== */}

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-350px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-white/[0.025] blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      {/* ======================================================
          HEADER
          ====================================================== */}

    

      {/* ======================================================
          HERO
          ====================================================== */}

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                authenticated ? "bg-emerald-400" : "bg-white/30"
              }`}
            />

            <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
              {authenticated ? "All routes available" : "Owner verification"}
            </span>
          </div>

          <h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
            One email.
            <br />
            <span className="text-white/30">Every route.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/40 sm:text-base">
            Verify the owner email once. After verification, every connected
            owner route becomes available.
          </p>
        </div>

        {/* ====================================================
            ROUTE CANVAS
            ==================================================== */}

        <div className="relative mt-14 overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#080808] shadow-2xl shadow-black/40">
          {/* Canvas top */}

          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-white/60">
                Connected routes
              </span>

              <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] text-white/25">
                {routes.length} routes
              </span>
            </div>

            <span className="font-mono text-[9px] text-white/20">
              owner.access
            </span>
          </div>

          {/* ==================================================
              CANVAS
              ================================================== */}

          <div className="relative px-6 py-20 sm:px-16">
            {/* Connection */}

            <div className="pointer-events-none absolute left-[28%] right-[28%] top-1/2 hidden h-px -translate-y-1/2 sm:block">
              <div
                className={`h-full transition-all duration-700 ${
                  authenticated ? "bg-emerald-400/60" : "bg-white/10"
                }`}
              />
            </div>

            {/* Arrow */}

            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-y-1/2 sm:block">
              <div
                className={`h-3 w-3 rotate-45 border-r border-t transition ${
                  authenticated ? "border-emerald-400/70" : "border-white/20"
                }`}
              />
            </div>

            {/* Nodes */}

            <div className="relative grid gap-6 sm:grid-cols-2 sm:gap-32">
              {routes.map((route, index) => {
                const unlocked = authenticated;

                return (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => handleRouteClick(route)}
                    className="group relative w-full text-left"
                  >
                    {/* Port */}

                    <span
                      className={`absolute top-1/2 z-20 hidden h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#080808] sm:block ${
                        index === 0 ? "-right-[6px]" : "-left-[6px]"
                      } ${unlocked ? "bg-emerald-400" : "bg-white/25"}`}
                    />

                    {/* Card */}

                    <div
                      className={`relative overflow-hidden rounded-[26px] border p-6 transition-all duration-300 ${
                        unlocked
                          ? "border-emerald-400/15 bg-emerald-400/[0.025] hover:-translate-y-1 hover:border-emerald-400/30"
                          : "border-white/10 bg-white/[0.025] hover:-translate-y-1 hover:border-white/20"
                      }`}
                    >
                      {/* Glow */}

                      <div
                        className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl ${
                          unlocked ? "bg-emerald-400/10" : "bg-white/[0.02]"
                        }`}
                      />

                      <div className="relative">
                        {/* Top */}

                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-11 w-11 items-center justify-center rounded-xl border text-sm ${
                                unlocked
                                  ? "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-400"
                                  : "border-white/10 bg-white/[0.04] text-white/40"
                              }`}
                            >
                              {route.icon}
                            </div>

                            <div>
                              <p className="text-sm font-semibold">
                                {route.name}
                              </p>

                              <p className="mt-1 text-[11px] text-white/30">
                                {route.description}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`text-lg transition ${
                              unlocked
                                ? "text-emerald-400/70 group-hover:translate-x-1"
                                : "text-white/20"
                            }`}
                          >
                            {unlocked ? "→" : "🔒"}
                          </span>
                        </div>

                        {/* Route */}

                        <div className="mt-6 flex items-center justify-between rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3">
                          <span className="font-mono text-[11px] text-white/55">
                            {route.path}
                          </span>

                          <span
                            className={`rounded-full border px-2 py-1 text-[9px] ${
                              unlocked
                                ? "border-emerald-400/15 bg-emerald-400/[0.05] text-emerald-400/70"
                                : "border-white/10 bg-white/[0.03] text-white/25"
                            }`}
                          >
                            {unlocked ? "OPEN" : "LOCKED"}
                          </span>
                        </div>

                        {/* Footer */}

                        <div className="mt-4 flex justify-between">
                          <span className="text-[10px] text-white/20">
                            {unlocked
                              ? "Click to open"
                              : "Owner email required"}
                          </span>

                          <span className="font-mono text-[10px] text-white/15">
                            route.{index + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ====================================================
            ACCESS STATUS
            ==================================================== */}

        <div className="mx-auto mt-8 max-w-3xl">
          <div
            className={`rounded-2xl border p-5 transition ${
              authenticated
                ? "border-emerald-400/15 bg-emerald-400/[0.04]"
                : "border-white/[0.07] bg-white/[0.025]"
            }`}
          >
            <div className="flex items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                    authenticated
                      ? "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-400"
                      : "border-white/10 bg-white/[0.04] text-white/30"
                  }`}
                >
                  {authenticated ? "✓" : "@"}
                </div>

                <div>
                  <p className="text-xs font-semibold">
                    {authenticated
                      ? "All routes unlocked"
                      : "Application locked"}
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-white/30">
                    {authenticated
                      ? "Owner verification completed successfully."
                      : "Verify the owner email to access the application."}
                  </p>
                </div>
              </div>

              {authenticated && (
                <button
                  type="button"
                  onClick={lockRoutes}
                  className="rounded-lg border border-white/10 px-3 py-2 text-[10px] text-white/30 transition hover:border-white/20 hover:text-white/60"
                >
                  Lock
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ====================================================
            EXPLANATION
            ==================================================== */}

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <InfoCard
            number="01"
            title="Click any route"
            text="Every owner route starts behind the same email verification layer."
          />

          <InfoCard
            number="02"
            title="Match owner email"
            text="The entered email is compared against your configured owner email."
          />

          <InfoCard
            number="03"
            title="Unlock everything"
            text="One successful verification unlocks every route in the application."
          />
        </div>
      </section>

      {/* ========================================================
          EMAIL MODAL
          ======================================================== */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-5 backdrop-blur-md">
          {/* Backdrop */}

          <button
            type="button"
            aria-label="Close"
            onClick={closeModal}
            className="absolute inset-0 cursor-default"
          />

          {/* Modal */}

          <div className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-black/70">
            {/* Glow */}

            <div className="pointer-events-none absolute left-1/2 top-[-120px] h-56 w-56 -translate-x-1/2 rounded-full bg-white/[0.04] blur-3xl" />

            <div className="relative p-7">
              {/* Close */}

              <button
                type="button"
                onClick={closeModal}
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-sm text-white/30 transition hover:bg-white/5 hover:text-white"
              >
                ×
              </button>

              {/* Icon */}

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-lg">
                @
              </div>

              <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-white/25">
                Owner verification
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Verify your email
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/35">
                You are trying to open{" "}
                <span className="font-mono text-white/60">
                  {selectedRoute?.path}
                </span>
                . Verify the owner email to unlock every route.
              </p>

              {/* Email input */}

              <div className="mt-6">
                <label className="mb-2 block text-xs text-white/40">
                  Owner email
                </label>

                <input
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);

                    setError("");
                    setSuccess("");
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      verifyOwnerEmail();
                    }
                  }}
                  placeholder="owner@example.com"
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/25 focus:bg-white/[0.04]"
                />
              </div>

              {/* Error */}

              {error && (
                <div className="mt-3 rounded-xl border border-red-400/15 bg-red-400/[0.05] px-4 py-3 text-xs text-red-400">
                  <span className="mr-2">×</span>

                  {error}
                </div>
              )}

              {/* Success */}

              {success && (
                <div className="mt-3 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.05] px-4 py-3 text-xs text-emerald-400">
                  <span className="mr-2">✓</span>

                  {success}
                </div>
              )}

              {/* Verify */}

              <button
                type="button"
                onClick={verifyOwnerEmail}
                className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-white text-sm font-semibold text-black transition hover:bg-white/90 active:scale-[0.99]"
              >
                Verify & Continue
              </button>

              <p className="mt-4 text-center text-[10px] leading-5 text-white/20">
                One successful verification unlocks all owner routes.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ================================================================
   INFO CARD
================================================================ */

function InfoCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
      <span className="font-mono text-[10px] text-white/20">{number}</span>

      <h3 className="mt-4 text-sm font-semibold">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-white/30">{text}</p>
    </div>
  );
}
