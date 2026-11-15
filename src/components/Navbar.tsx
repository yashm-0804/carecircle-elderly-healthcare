"use client";

import React, { useState, useEffect } from "react";
import { UserProfile } from "@/types";
import { HeartPulse, Eye, Type, Volume2, LogOut, ShieldCheck } from "lucide-react";

interface NavbarProps {
  currentUser: UserProfile | null;
  onLogout: () => void;
  activeRole: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentUser, onLogout, activeRole }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<"normal" | "large" | "xlarge">("normal");

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  }, [highContrast]);

  useEffect(() => {
    const root = document.documentElement;
    if (fontSizeLevel === "normal") root.style.fontSize = "16px";
    if (fontSizeLevel === "large") root.style.fontSize = "18px";
    if (fontSizeLevel === "xlarge") root.style.fontSize = "21px";
  }, [fontSizeLevel]);

  const speakStatus = () => {
    if ("speechSynthesis" in window) {
      const msg = new SpeechSynthesisUtterance(
        `Welcome to CareCircle. You are viewing the platform as ${currentUser?.name || "a guest"}. All medication alerts and doctor appointments are up to date.`
      );
      msg.rate = 0.85; // Slower, clear pace for elderly listeners
      window.speechSynthesis.speak(msg);
    }
  };

  const cycleFontSize = () => {
    if (fontSizeLevel === "normal") setFontSizeLevel("large");
    else if (fontSizeLevel === "large") setFontSizeLevel("xlarge");
    else setFontSizeLevel("normal");
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-600 flex items-center justify-center text-white shadow-md">
            <HeartPulse className="w-7 h-7" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-slate-900">
                CareCircle
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                Protected
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Elderly Healthcare & Medication Guardian
            </p>
          </div>
        </div>

        {/* Accessibility & Role Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Announcer Button */}
          <button
            onClick={speakStatus}
            type="button"
            className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-sky-500 transition"
            aria-label="Read page summary aloud"
            title="Read summary aloud"
          >
            <Volume2 className="w-5 h-5 text-sky-600" />
          </button>

          {/* High Contrast Mode Toggle */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            type="button"
            className={`p-2.5 rounded-xl border transition ${
              highContrast
                ? "bg-black text-white border-white"
                : "border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
            aria-label="Toggle High-Contrast Mode for low vision"
            title="Toggle High Contrast Mode"
          >
            <Eye className="w-5 h-5" />
          </button>

          {/* Font Size Scaler */}
          <button
            onClick={cycleFontSize}
            type="button"
            className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-sm font-bold"
            aria-label="Change text size"
            title="Increase text size"
          >
            <Type className="w-4 h-4 text-sky-600" />
            <span className="uppercase text-xs">{fontSizeLevel}</span>
          </button>

          {/* Active User Badge & Switch Passcode */}
          {currentUser && (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-sm font-bold text-slate-900 leading-none">
                  {currentUser.name}
                </span>
                <span className="text-xs text-sky-700 font-semibold mt-1">
                  {currentUser.role === "SENIOR"
                    ? "Senior Kiosk"
                    : currentUser.role === "CAREGIVER"
                    ? "Primary Caregiver"
                    : "Family Circle"}
                </span>
              </div>
              <button
                onClick={onLogout}
                type="button"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 text-sm font-semibold transition"
                aria-label="Switch User or Enter Different Passcode"
                title="Switch Profile / Passcode"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Switch Passcode</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
