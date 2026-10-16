"use client";

import { useState } from "react";

interface WhatsAppWidgetProps {
  phoneNumber: string;
  message?: string;
  brandName?: string;
  subtitle?: string;
}

export default function WhatsAppWidget({
  phoneNumber,
  message = "Hi! I'd like to know more about your services.",
  brandName = "Let's Talk",
  subtitle = "We typically reply as soon as possible.",
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(
    /\D/g,
    "",
  )}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 sm:bottom-8 sm:right-8">
      {/* Contact Card */}
      <div
        className={`w-[min(350px,calc(100vw-2rem))] origin-bottom-right
        overflow-hidden rounded-[24px] border border-white/10
        bg-[#0C1512] text-white shadow-[0_25px_100px_-20px_rgba(0,0,0,0.7)]
        transition-all duration-300 ease-out
        ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#167D4B] via-[#128C55] to-[#075E3B] p-5">
          <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full border border-white/10" />
          <div className="absolute -right-4 -top-6 h-28 w-28 rounded-full border border-white/10" />

          <div className="relative flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-inner">
                <WhatsAppIcon className="h-7 w-7" />
              </div>

              <div>
                <h3 className="text-lg font-bold tracking-tight">
                  {brandName}
                </h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-white/85">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                  Available on WhatsApp
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp widget"
              className="rounded-full p-2 text-white/80 transition hover:bg-white/15 hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path d="m18 6-12 12M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-4 p-5">
          <div>
            <p className="text-xl font-semibold tracking-tight">
              Hey there! <span>👋</span>
            </p>
            <p className="mt-2 text-sm leading-6 text-[#A3B3AA]">{subtitle}</p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-[#B7C8BE]">
                Start a conversation
              </span>
            </div>
            <p className="text-sm leading-6 text-[#E0EAE4]">
              Hi! Thanks for reaching out. How can we help you today?
            </p>
            <p className="mt-2 text-right text-[10px] text-[#70877A]">
              Message preview · WhatsApp
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-5 py-4 text-sm font-bold text-[#062B19] shadow-[0_8px_30px_-10px_rgba(37,211,102,0.6)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#32E477] hover:shadow-[0_12px_35px_-8px_rgba(37,211,102,0.5)] active:translate-y-0"
          >
            <WhatsAppIcon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-[-10deg]" />
            Chat with us
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1"
            >
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </a>

          <p className="text-center text-[11px] text-[#72857A]">
            Opens WhatsApp in a new tab
          </p>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="group relative flex items-center gap-3">
        <span className="pointer-events-none rounded-xl border border-white/10 bg-[#111A16] px-3 py-2 text-xs font-medium text-white shadow-xl transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 sm:opacity-0">
          Chat with us
        </span>

        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-label={
            isOpen ? "Close WhatsApp contact" : "Open WhatsApp contact"
          }
          aria-expanded={isOpen}
          className="relative flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_35px_-8px_rgba(37,211,102,0.65)] transition duration-300 hover:scale-110 hover:bg-[#20C763] active:scale-95"
        >
          <span className="absolute inset-0 rounded-full border border-[#25D366]/60 animate-ping opacity-20" />

          <span className="relative flex h-full w-full items-center justify-center">
            {isOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-7 w-7"
              >
                <path d="m18 6-12 12M6 6l12 12" />
              </svg>
            ) : (
              <WhatsAppIcon className="h-8 w-8 transition-transform duration-300 group-hover:rotate-[-8deg]" />
            )}
          </span>
        </button>
      </div>
    </div>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.82 11.82 0 0 0 12.1 0C5.56 0 .23 5.33.23 11.87c0 2.09.55 4.13 1.59 5.93L.12 24l6.37-1.67a11.9 11.9 0 0 0 5.6 1.42h.01c6.54 0 11.87-5.33 11.87-11.87 0-3.17-1.23-6.15-3.45-8.4ZM12.1 21.7a9.85 9.85 0 0 1-5.02-1.37l-.36-.21-3.78.99 1.01-3.68-.23-.38a9.82 9.82 0 0 1-1.5-5.18c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 7c0 5.45-4.44 9.81-9.89 9.81Zm5.42-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.48-.5-.66-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}
