"use client";

import React, { useState } from "react";
import { UserProfile } from "@/types";
import { Lock, KeyRound, ShieldCheck, HeartPulse, UserCheck, AlertCircle, Sparkles } from "lucide-react";

interface PasscodeGatewayProps {
  onAuthenticated: (profile: UserProfile) => void;
}

export const PasscodeGateway: React.FC<PasscodeGatewayProps> = ({ onAuthenticated }) => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDigit = (digit: string) => {
    if (passcode.length < 10) {
      setPasscode((prev) => prev + digit);
      setError(null);
    }
  };

  const handleBackspace = () => {
    setPasscode((prev) => prev.slice(0, -1));
    setError(null);
  };

  const handleClear = () => {
    setPasscode("");
    setError(null);
  };

  // Enable physical keyboard entry (0-9, Backspace, Enter, Esc)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key >= "0" && e.key <= "9") {
        handleDigit(e.key);
      } else if (e.key === "Backspace") {
        handleBackspace();
      } else if (e.key === "Enter" && passcode.length >= 4) {
        submitPasscode(passcode);
      } else if (e.key === "Escape") {
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passcode]);

  const submitPasscode = async (codeToSubmit = passcode) => {
    if (!codeToSubmit || codeToSubmit.length < 4) {
      setError("Please enter a valid 4-digit passcode.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/passcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: codeToSubmit }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onAuthenticated(data.profile);
      } else {
        setError(data.error || "Invalid passcode. Please try again.");
      }
    } catch (err) {
      setError("Network or authentication server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center px-4 py-8 relative">
      {/* Frosted Glass Container */}
      <div className="max-w-md w-full rounded-3xl apple-glass shadow-2xl p-6 sm:p-8 border border-white/80 relative z-10 animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-sky-400 via-indigo-400 to-pink-400 p-0.5 mx-auto mb-3 shadow-lg shadow-sky-400/20">
            <div className="w-full h-full rounded-3xl bg-white/90 flex items-center justify-center text-sky-600">
              <Lock className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            CareCircle Access
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-semibold">
            Passcode Protected Shared Healthcare Ecosystem
          </p>
        </div>

        {/* Quick Demo Selector for Judges */}
        <div className="mb-6 p-3.5 apple-glass-pink rounded-2xl">
          <div className="flex items-center justify-center gap-1.5 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <p className="text-[11px] font-black text-pink-800 uppercase tracking-wider">
              Quick Role Passcode Selector
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                setPasscode("1234");
                submitPasscode("1234");
              }}
              type="button"
              className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/85 hover:bg-white border border-pink-200 shadow-xs hover:scale-105 active:scale-95 transition-all"
            >
              <span className="text-2xl mb-1">👵</span>
              <span className="text-xs font-black text-slate-900">Senior</span>
              <span className="text-[10px] text-sky-600 font-mono font-bold">1234</span>
            </button>
            <button
              onClick={() => {
                setPasscode("9876");
                submitPasscode("9876");
              }}
              type="button"
              className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/85 hover:bg-white border border-sky-200 shadow-xs hover:scale-105 active:scale-95 transition-all"
            >
              <span className="text-2xl mb-1">👩‍⚕️</span>
              <span className="text-xs font-black text-slate-900">Caregiver</span>
              <span className="text-[10px] text-sky-600 font-mono font-bold">9876</span>
            </button>
            <button
              onClick={() => {
                setPasscode("5555");
                submitPasscode("5555");
              }}
              type="button"
              className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/85 hover:bg-white border border-indigo-200 shadow-xs hover:scale-105 active:scale-95 transition-all"
            >
              <span className="text-2xl mb-1">👦</span>
              <span className="text-xs font-black text-slate-900">Family</span>
              <span className="text-[10px] text-sky-600 font-mono font-bold">5555</span>
            </button>
          </div>
        </div>

        {/* PIN Display */}
        <div className="mb-6">
          <div className="h-14 rounded-2xl bg-white/80 border border-white/90 shadow-inner flex items-center justify-center tracking-[0.5em] text-3xl font-black text-slate-900 backdrop-blur-md">
            {passcode ? "•".repeat(passcode.length) : (
              <span className="text-xs font-bold tracking-normal text-slate-400">
                Enter 4-Digit Passcode
              </span>
            )}
          </div>
          {error && (
            <div className="flex items-center gap-2 mt-2 text-rose-600 text-xs font-bold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Tactile Keypad */}
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
            <button
              key={digit}
              onClick={() => handleDigit(digit)}
              type="button"
              className="h-13 rounded-2xl bg-white/80 hover:bg-white border border-white/90 shadow-xs hover:shadow-md text-2xl font-black text-slate-900 active:scale-95 transition-all"
              aria-label={`Digit ${digit}`}
            >
              {digit}
            </button>
          ))}
          <button
            onClick={handleClear}
            type="button"
            className="h-13 rounded-2xl bg-slate-100/70 hover:bg-slate-200/70 text-xs font-extrabold text-slate-600 active:scale-95 transition"
          >
            Clear
          </button>
          <button
            onClick={() => handleDigit("0")}
            type="button"
            className="h-13 rounded-2xl bg-white/80 hover:bg-white border border-white/90 shadow-xs hover:shadow-md text-2xl font-black text-slate-900 active:scale-95 transition-all"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            type="button"
            className="h-13 rounded-2xl bg-slate-100/70 hover:bg-slate-200/70 text-sm font-black text-slate-600 active:scale-95 transition"
          >
            ⌫
          </button>
        </div>

        {/* Unlock Button */}
        <button
          onClick={() => submitPasscode()}
          disabled={loading || passcode.length < 4}
          type="button"
          className="w-full h-14 rounded-2xl apple-button-primary disabled:opacity-40 font-black text-base flex items-center justify-center gap-2 transition active:scale-[0.98]"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <KeyRound className="w-5 h-5" />
              <span>Unlock Care Profile</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
