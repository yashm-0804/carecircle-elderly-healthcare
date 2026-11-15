"use client";

import React, { useState } from "react";
import { DoseRecord, DoctorAppointment } from "@/types";
import { PillVisionModal } from "./PillVisionModal";
import {
  CheckCircle2,
  Clock,
  Camera,
  Mic,
  Calendar,
  PhoneCall,
  Sparkles,
  Award,
  AlertCircle,
  HelpCircle,
  Heart,
} from "lucide-react";

interface SeniorKioskProps {
  doses: DoseRecord[];
  appointments: DoctorAppointment[];
  onTakeDose: (doseId: string, verifiedVia?: "MANUAL" | "VOICE" | "VISION_AI") => void;
  onSnoozeDose: (doseId: string) => void;
}

export const SeniorKiosk: React.FC<SeniorKioskProps> = ({
  doses,
  appointments,
  onTakeDose,
  onSnoozeDose,
}) => {
  const [activeVisionDose, setActiveVisionDose] = useState<DoseRecord | null>(null);
  const [listening, setListening] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState<string | null>(null);

  // Sort doses chronologically so the earliest upcoming dose is prioritized
  const sortedDoses = [...doses].sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));
  const nextDose = sortedDoses.find((d) => d.status === "SCHEDULED" || d.status === "SNOOZED");
  const nextAppt = appointments.find((a) => a.status === "UPCOMING");

  // Web Speech API Voice Check-in
  const handleVoiceCheckIn = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setVoiceFeedback("Voice recognition is not supported in this browser. Please tap the button.");
      return;
    }

    const SpeechRecognition =
      (window as unknown as { SpeechRecognition: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition: any }).webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    setListening(true);
    setVoiceFeedback("Listening... Say: 'I took my medicine'");

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setVoiceFeedback(`Heard: "${transcript}"`);

      if (
        transcript.includes("took") ||
        transcript.includes("taken") ||
        transcript.includes("swallowed") ||
        transcript.includes("done")
      ) {
        if (nextDose) {
          onTakeDose(nextDose.id, "VOICE");
          speakAudio(`Wonderful Eleanor! Recorded your ${nextDose.medicationName} as taken.`);
        }
      } else {
        setVoiceFeedback("Did not detect 'took'. Please tap the big green button.");
      }
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
      setVoiceFeedback("Could not hear clearly. Please tap the button.");
    };

    recognition.start();
  };

  const speakAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header & Senior Greeting Card */}
      <div className="rounded-3xl p-6 sm:p-8 apple-glass border border-white/80 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-sky-100 to-pink-100 border border-pink-200/60 rounded-full text-xs font-black tracking-wide text-pink-700 uppercase mb-3">
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>Senior Friendly Kiosk • Grandpa Mode</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Good day, Eleanor! 🌸
          </h1>
          <p className="text-slate-600 text-lg mt-1 font-semibold">
            Your healthcare routine is synchronized and safe today.
          </p>
        </div>
        <div className="flex items-center gap-3.5 apple-glass-pink px-5 py-4 rounded-2xl border border-pink-200/80 shadow-sm relative z-10">
          <Award className="w-9 h-9 text-amber-500 flex-shrink-0" />
          <div>
            <span className="text-3xl font-black text-slate-900 leading-none">12 Days</span>
            <p className="text-[11px] text-pink-700 uppercase font-extrabold tracking-wider mt-0.5">
              Perfect Streak
            </p>
          </div>
        </div>
      </div>

      {/* Primary Action Card: Next Due Medication */}
      {nextDose ? (
        <div className="rounded-3xl apple-glass-card p-6 sm:p-8 border-2 border-sky-300/80 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="px-4 py-1.5 rounded-full text-xs font-black bg-amber-100/90 text-amber-900 border border-amber-300/80 flex items-center gap-2 shadow-xs">
              <Clock className="w-4 h-4 text-amber-600" />
              Due Today at {nextDose.scheduledTime}
            </span>
            <span className="text-xs uppercase font-black tracking-wider text-slate-400">
              {nextDose.timeOfDay} Dose
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              {nextDose.medicationName}
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-sky-700 mt-1">
              Dosage: {nextDose.dosage}
            </p>
          </div>

          {/* Large Senior Action Buttons (60px high for accessibility) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => {
                onTakeDose(nextDose.id, "MANUAL");
                speakAudio(`Great job! Marked ${nextDose.medicationName} as taken.`);
              }}
              type="button"
              className="h-20 sm:h-24 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xl sm:text-2xl flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/25 active:scale-[0.98] transition-all border border-emerald-400/60"
              aria-label={`Mark ${nextDose.medicationName} as taken`}
            >
              <CheckCircle2 className="w-8 h-8 flex-shrink-0" />
              <span>I Took This Pill</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setActiveVisionDose(nextDose)}
                type="button"
                className="h-20 sm:h-24 rounded-3xl apple-glass-sky hover:bg-white text-sky-900 font-black text-sm sm:text-base flex flex-col items-center justify-center gap-1.5 border border-sky-300 shadow-sm transition-all active:scale-[0.98]"
                aria-label="Scan pill with camera"
              >
                <Camera className="w-6 h-6 text-sky-600" />
                <span>AI Pill Lens</span>
              </button>

              <button
                onClick={handleVoiceCheckIn}
                type="button"
                className={`h-20 sm:h-24 rounded-3xl text-sm sm:text-base font-black flex flex-col items-center justify-center gap-1.5 border transition-all active:scale-[0.98] ${
                  listening
                    ? "bg-rose-100 border-rose-500 text-rose-800 animate-pulse"
                    : "apple-glass-pink hover:bg-white text-pink-900 border-pink-300 shadow-sm"
                }`}
                aria-label="Confirm with voice hands-free"
              >
                <Mic className="w-6 h-6 text-pink-600" />
                <span>{listening ? "Listening..." : "Voice Confirm"}</span>
              </button>
            </div>
          </div>

          {/* Voice Feedback Banner */}
          {voiceFeedback && (
            <div className="mt-4 p-3.5 rounded-2xl apple-glass-sky text-sky-950 text-sm font-bold flex items-center gap-2 border border-sky-200">
              <Mic className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span>{voiceFeedback}</span>
            </div>
          )}

          {/* Snooze Option */}
          <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">
              Need a few more minutes?
            </span>
            <button
              onClick={() => onSnoozeDose(nextDose.id)}
              type="button"
              className="text-sm font-black text-amber-700 hover:text-amber-800 underline underline-offset-4"
            >
              Remind me in 15 minutes
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl apple-glass p-8 text-center border-2 border-emerald-300 shadow-xl">
          <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-3" />
          <h2 className="text-3xl font-black text-slate-900">All Done for Now!</h2>
          <p className="text-lg text-emerald-800 mt-2 font-semibold">
            You have taken all scheduled medications for this part of the day.
          </p>
        </div>
      )}

      {/* Today's Full Schedule Overview */}
      <div className="rounded-3xl apple-glass-card p-6 sm:p-8 shadow-sm">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <Clock className="w-6 h-6 text-sky-600" />
          <span>Today&apos;s Medicine Routine</span>
        </h3>

        <div className="space-y-3.5">
          {sortedDoses.map((dose) => (
            <div
              key={dose.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                dose.status === "TAKEN"
                  ? "bg-emerald-50/70 border-emerald-200 opacity-85"
                  : dose.status === "MISSED"
                  ? "bg-rose-50/70 border-rose-300"
                  : "bg-white/80 border-white/80 hover:border-sky-300 shadow-xs"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-xs ${
                    dose.status === "TAKEN"
                      ? "bg-emerald-100 text-emerald-700"
                      : dose.status === "MISSED"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-sky-100 text-sky-700"
                  }`}
                >
                  {dose.timeOfDay === "MORNING"
                    ? "🌅"
                    : dose.timeOfDay === "AFTERNOON"
                    ? "☀️"
                    : dose.timeOfDay === "EVENING"
                    ? "🌇"
                    : "🌙"}
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-black text-slate-900">
                    {dose.medicationName}
                  </h4>
                  <p className="text-sm font-bold text-slate-500">
                    {dose.dosage} • Scheduled: {dose.scheduledTime}
                  </p>
                  {dose.verifiedVia && (
                    <span className="text-[11px] font-bold text-emerald-700 inline-block mt-0.5">
                      ✓ Verified via {dose.verifiedVia === "VISION_AI" ? "AI Pill Lens" : dose.verifiedVia === "VOICE" ? "Voice Check-in" : "Manual tap"}
                    </span>
                  )}
                </div>
              </div>

              <div>
                {dose.status === "TAKEN" ? (
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 flex items-center gap-1.5 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4" />
                    Taken
                  </span>
                ) : dose.status === "MISSED" ? (
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-rose-100 text-rose-800 flex items-center gap-1.5 border border-rose-200">
                    <AlertCircle className="w-4 h-4" />
                    Missed
                  </span>
                ) : (
                  <button
                    onClick={() => onTakeDose(dose.id, "MANUAL")}
                    type="button"
                    className="px-4 py-2.5 rounded-xl apple-button-primary font-bold text-sm shadow transition"
                  >
                    Take Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Doctor Appointment Card */}
      {nextAppt && (
        <div className="rounded-3xl apple-glass-pink p-6 sm:p-8 shadow-sm border border-pink-200/80">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-md shadow-pink-500/20">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-pink-700 block">
                  Upcoming Doctor Visit
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {nextAppt.doctorName}
                </h3>
                <p className="text-sm font-bold text-slate-600">
                  {nextAppt.specialty} • {nextAppt.clinicName}
                </p>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-full text-xs font-black bg-white/90 text-pink-800 border border-pink-200 shadow-2xs">
              {new Date(nextAppt.dateTime).toLocaleDateString()}
            </span>
          </div>

          <div className="mt-4 p-3.5 bg-white/80 rounded-2xl border border-pink-100">
            <span className="text-xs font-bold text-slate-500 uppercase block mb-1">
              Preparation Instructions
            </span>
            <p className="text-sm font-semibold text-slate-800">
              {nextAppt.preparationNotes}
            </p>
          </div>
        </div>
      )}

      {/* Call Caregiver Button */}
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="tel:+15552345678"
          className="flex-1 h-16 rounded-2xl apple-glass hover:bg-white text-slate-900 font-black text-base flex items-center justify-center gap-3 shadow-md border border-white/80 transition active:scale-[0.98]"
        >
          <PhoneCall className="w-5 h-5 text-emerald-600" />
          <span>Call Daughter Sarah (+1 555-234-5678)</span>
        </a>
      </div>

      {/* Pill Lens Modal */}
      {activeVisionDose && (
        <PillVisionModal
          dose={activeVisionDose}
          onClose={() => setActiveVisionDose(null)}
          onVerifiedTaken={(id, method) => onTakeDose(id, method)}
        />
      )}
    </div>
  );
};
