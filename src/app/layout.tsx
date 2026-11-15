import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareCircle - Elderly Care & Medication Management Platform",
  description:
    "Smart, interconnected healthcare management platform empowering seniors, caregivers, and families with accessible medication adherence, proactive alerts, and AI pill safety verification.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="min-h-screen bg-slate-50 antialiased selection:bg-sky-200 transition-colors duration-300">
        <div id="aria-announcer" aria-live="polite" className="sr-only" />
        {children}
      </body>
    </html>
  );
}
