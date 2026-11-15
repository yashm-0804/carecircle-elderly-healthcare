"use client";

import React, { useState, useEffect } from "react";
import { UserProfile } from "@/types";
import { HeartPulse, Eye, Type, Volume2, LogOut, ShieldCheck, User, Settings, Sparkles } from "lucide-react";

interface NavbarProps {
  currentUser: UserProfile | null;
  onLogout: () => void;
  activeRole: string;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onLogout,
  activeRole,
  onOpenProfile,
  onOpenSettings,
}) => {
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
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(
        `Welcome to CareCircle. You are viewing the platform as ${currentUser?.name || "a guest"}. All medication alerts and doctor appointments are synchronized.`
      );
      msg.rate = 0.85;
      window.speechSynthesis.speak(msg);
    }
  };

  const cycleFontSize = () => {
    if (fontSizeLevel === "normal") setFontSizeLevel("large");
    else if (fontSizeLevel === "large") setFontSizeLevel("xlarge");
    else setFontSizeLevel("normal");
  };

  return (
    <header className="sticky top-3 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full transition-all">
      <nav
        aria-label="Main Navigation"
        className="rounded-3xl apple-glass shadow-lg border border-white/70 px-4 sm:px-6 h-20 flex items-center justify-between"
      >
        {/* Brand */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-pink-500 p-0.5 shadow-md shadow-sky-500/20">
            <div className="w-full h-full rounded-2xl bg-white/90 flex items-center justify-center text-sky-600">
              <HeartPulse className="w-7 h-7" aria-hidden="true" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-sky-900 to-pink-900 bg-clip-text text-transparent">
                CareCircle
              </span>
              <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-pink-100 text-pink-700 border border-pink-200/60 shadow-2xs">
                <Sparkles className="w-3 h-3 mr-1 text-pink-500" />
                Smart Guardian
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold hidden sm:block">
              Elderly Healthcare & Medication Platform
            </p>
          </div>
        </div>

        {/* Controls, Profile, Settings & Switch Passcode */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Audio Announcer Button */}
          <button
            onClick={speakStatus}
            type="button"
            className="p-2.5 rounded-2xl bg-white/60 hover:bg-white text-slate-700 border border-white/80 shadow-xs hover:text-sky-600 transition active:scale-95"
            aria-label="Read page summary aloud"
            title="Read summary aloud"
          >
            <Volume2 className="w-5 h-5 text-sky-600" />
          </button>

          {/* High Contrast Mode Toggle */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            type="button"
            className={`p-2.5 rounded-2xl border transition active:scale-95 ${
              highContrast
                ? "bg-black text-white border-white"
                : "bg-white/60 hover:bg-white border-white/80 text-slate-700 shadow-xs"
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
            className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-white/60 hover:bg-white border border-white/80 text-slate-700 text-xs font-black shadow-xs transition active:scale-95"
            aria-label="Change text size"
            title="Increase text size"
          >
            <Type className="w-4 h-4 text-sky-600" />
            <span className="uppercase">{fontSizeLevel}</span>
          </button>

          {/* Profile & Settings (Shown when authenticated) */}
          {currentUser && (
            <>
              {/* Profile Button */}
              <button
                onClick={onOpenProfile}
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-gradient-to-r from-sky-50 to-pink-50 hover:from-sky-100 hover:to-pink-100 border border-pink-200/50 text-slate-800 text-xs font-bold shadow-xs transition active:scale-95"
                title="View Senior Health Record"
                aria-label="View Patient Profile"
              >
                <User className="w-4 h-4 text-pink-600" />
                <span className="hidden md:inline">Profile</span>
              </button>

              {/* Settings Button */}
              <button
                onClick={onOpenSettings}
                type="button"
                className="p-2.5 rounded-2xl bg-white/60 hover:bg-white border border-white/80 text-slate-700 shadow-xs hover:text-sky-600 transition active:scale-95"
                title="Care Preferences & Settings"
                aria-label="Open Settings"
              >
                <Settings className="w-4 h-4 text-slate-600" />
              </button>

              {/* Role Badge & Switch Passcode */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200/80">
                <div className="hidden lg:flex flex-col text-right">
                  <span className="text-xs font-black text-slate-900 leading-none">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-pink-700 font-bold mt-1">
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
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/80 hover:bg-rose-50 hover:text-rose-700 border border-slate-200/80 text-slate-700 text-xs font-extrabold shadow-xs transition active:scale-95"
                  aria-label="Switch User or Enter Different Passcode"
                  title="Switch Passcode"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Switch</span>
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
