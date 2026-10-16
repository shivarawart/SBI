import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import WhatsAppWidget from "./components/WhatsAppWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Search.",
  description: "A modern search and video discovery platform.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-black text-white antialiased">
        <ClerkProvider>
          <Navbar />

          <main className="relative min-h-screen w-full ">
            {children}
            <WhatsAppWidget
              phoneNumber="+7988256574"
              message="Hello, I have a question about your services."
              brandName="VishavGuru"
              subtitle="We typically reply as soon as possible."
            />
          </main>
        </ClerkProvider>
      </body>
    </html>
  );
}
