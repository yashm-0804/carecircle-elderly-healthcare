"use client";

import React, { useState } from "react";
import { UserProfile } from "@/types";
import { Lock, KeyRound, ShieldCheck, HeartPulse, UserCheck, AlertCircle } from "lucide-react";

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
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-3xl mx-auto flex items-center justify-center mb-3 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            CareCircle Access
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Enter your passcode to open the shared care profile
          </p>
        </div>

        {/* Quick Demo Selector for Judges */}
        <div className="mb-6 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
            ⚡ Quick Passcode Selector (For Hackathon Review)
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                setPasscode("1234");
                submitPasscode("1234");
              }}
              type="button"
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white border border-slate-200 hover:border-sky-500 hover:shadow-sm transition"
            >
              <span className="text-2xl mb-1">👵</span>
              <span className="text-xs font-bold text-slate-900">Senior</span>
              <span className="text-[10px] text-sky-600 font-mono">1234</span>
            </button>
            <button
              onClick={() => {
                setPasscode("9876");
                submitPasscode("9876");
              }}
              type="button"
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white border border-slate-200 hover:border-sky-500 hover:shadow-sm transition"
            >
              <span className="text-2xl mb-1">👩‍⚕️</span>
              <span className="text-xs font-bold text-slate-900">Caregiver</span>
              <span className="text-[10px] text-sky-600 font-mono">9876</span>
            </button>
            <button
              onClick={() => {
                setPasscode("5555");
                submitPasscode("5555");
              }}
              type="button"
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white border border-slate-200 hover:border-sky-500 hover:shadow-sm transition"
            >
              <span className="text-2xl mb-1">👦</span>
              <span className="text-xs font-bold text-slate-900">Family</span>
              <span className="text-[10px] text-sky-600 font-mono">5555</span>
            </button>
          </div>
        </div>

        {/* PIN Display */}
        <div className="mb-6">
          <div className="h-14 bg-slate-100 rounded-2xl flex items-center justify-center tracking-[0.5em] text-3xl font-black text-slate-900 border border-slate-300 shadow-inner">
            {passcode ? "•".repeat(passcode.length) : (
              <span className="text-sm font-normal tracking-normal text-slate-400">
                Enter 4-digit PIN
              </span>
            )}
          </div>
          {error && (
            <div className="flex items-center gap-2 mt-2 text-rose-600 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Tactile Keypad */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
            <button
              key={digit}
              onClick={() => handleDigit(digit)}
              type="button"
              className="h-14 rounded-2xl bg-white border-2 border-slate-200 hover:border-sky-500 hover:bg-sky-50 text-2xl font-bold text-slate-900 active:scale-95 transition shadow-sm"
              aria-label={`Digit ${digit}`}
            >
              {digit}
            </button>
          ))}
          <button
            onClick={handleClear}
            type="button"
            className="h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700 active:scale-95 transition"
          >
            Clear
          </button>
          <button
            onClick={() => handleDigit("0")}
            type="button"
            className="h-14 rounded-2xl bg-white border-2 border-slate-200 hover:border-sky-500 hover:bg-sky-50 text-2xl font-bold text-slate-900 active:scale-95 transition shadow-sm"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            type="button"
            className="h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700 active:scale-95 transition"
          >
            ⌫
          </button>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => submitPasscode()}
          disabled={loading || passcode.length < 4}
          type="button"
          className="w-full h-14 rounded-2xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-extrabold text-lg flex items-center justify-center gap-2 shadow-lg shadow-sky-600/25 transition active:scale-[0.98]"
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
