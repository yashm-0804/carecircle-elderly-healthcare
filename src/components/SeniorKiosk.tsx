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
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header & Senior Greeting */}
      <div className="bg-gradient-to-r from-sky-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-bold tracking-wide uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Senior Friendly Kiosk
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Good day, Eleanor!
          </h1>
          <p className="text-sky-100 text-lg mt-1 font-medium">
            Here is your health schedule for today.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl border border-white/20">
          <Award className="w-8 h-8 text-amber-300 flex-shrink-0" />
          <div>
            <span className="text-2xl font-black">12 Days</span>
            <p className="text-xs text-sky-200 uppercase font-bold tracking-wider">
              Perfect Streak
            </p>
          </div>
        </div>
      </div>

      {/* Primary Action Card: Due Now */}
      {nextDose ? (
        <div className="bg-white rounded-3xl border-4 border-sky-400 p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="px-4 py-1.5 rounded-full text-sm font-extrabold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Due Today at {nextDose.scheduledTime}
            </span>
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
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
              className="h-20 sm:h-24 rounded-3xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xl sm:text-2xl flex items-center justify-center gap-3 shadow-lg shadow-emerald-600/30 active:scale-[0.98] transition border-2 border-emerald-500"
              aria-label={`Mark ${nextDose.medicationName} as taken`}
            >
              <CheckCircle2 className="w-8 h-8 flex-shrink-0" />
              <span>I Took This Pill</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setActiveVisionDose(nextDose)}
                type="button"
                className="h-20 sm:h-24 rounded-3xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-extrabold text-sm sm:text-base flex flex-col items-center justify-center gap-1.5 border-2 border-sky-300 shadow-sm transition active:scale-[0.98]"
                aria-label="Scan pill with camera"
              >
                <Camera className="w-6 h-6 text-sky-600" />
                <span>AI Pill Lens</span>
              </button>

              <button
                onClick={handleVoiceCheckIn}
                type="button"
                className={`h-20 sm:h-24 rounded-3xl text-sm sm:text-base font-extrabold flex flex-col items-center justify-center gap-1.5 border-2 transition active:scale-[0.98] ${
                  listening
                    ? "bg-rose-100 border-rose-500 text-rose-800 animate-pulse"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-300"
                }`}
                aria-label="Confirm with voice hands-free"
              >
                <Mic className="w-6 h-6 text-indigo-600" />
                <span>{listening ? "Listening..." : "Voice Confirm"}</span>
              </button>
            </div>
          </div>

          {/* Voice Feedback Banner */}
          {voiceFeedback && (
            <div className="mt-4 p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-sm font-semibold flex items-center gap-2">
              <Mic className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <span>{voiceFeedback}</span>
            </div>
          )}

          {/* Snooze Option */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Need a few more minutes?
            </span>
            <button
              onClick={() => onSnoozeDose(nextDose.id)}
              type="button"
              className="text-sm font-extrabold text-amber-700 hover:text-amber-800 underline underline-offset-4"
            >
              Remind me in 15 minutes
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 rounded-3xl border-2 border-emerald-300 p-8 text-center text-emerald-950 shadow-md">
          <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-3" />
          <h2 className="text-3xl font-black">All Done for Now!</h2>
          <p className="text-lg text-emerald-800 mt-2 font-medium">
            You have taken all scheduled medications for this part of the day.
          </p>
        </div>
      )}

      {/* Today's Full Schedule Overview */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <Clock className="w-6 h-6 text-sky-600" />
          <span>Today&apos;s Medicine Routine</span>
        </h3>

        <div className="space-y-4">
          {sortedDoses.map((dose) => (
            <div
              key={dose.id}
              className={`p-4 sm:p-5 rounded-2xl border-2 transition flex items-center justify-between gap-4 ${
                dose.status === "TAKEN"
                  ? "bg-slate-50 border-emerald-200 opacity-80"
                  : dose.status === "MISSED"
                  ? "bg-rose-50 border-rose-300"
                  : "bg-white border-slate-200 hover:border-sky-300"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${
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
                    <span className="text-[11px] font-semibold text-emerald-700 inline-block mt-0.5">
                      ✓ Verified via {dose.verifiedVia === "VISION_AI" ? "AI Pill Lens" : dose.verifiedVia === "VOICE" ? "Voice Check-in" : "Manual tap"}
                    </span>
                  )}
                </div>
              </div>

              <div>
                {dose.status === "TAKEN" ? (
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Taken
                  </span>
                ) : dose.status === "MISSED" ? (
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-rose-100 text-rose-800 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    Missed
                  </span>
                ) : (
                  <button
                    onClick={() => onTakeDose(dose.id, "MANUAL")}
                    type="button"
                    className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow transition"
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
        <div className="bg-amber-50/60 rounded-3xl border-2 border-amber-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-800 block">
                  Upcoming Doctor Visit
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {nextAppt.doctorName}
                </h3>
                <p className="text-sm font-bold text-amber-900">
                  {nextAppt.specialty} • {nextAppt.clinicName}
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-200 text-amber-950">
              {new Date(nextAppt.dateTime).toLocaleDateString()}
            </span>
          </div>

          <div className="mt-4 p-3 bg-white rounded-2xl border border-amber-200">
            <span className="text-xs font-bold text-slate-500 uppercase block mb-1">
              Preparation Instructions
            </span>
            <p className="text-sm font-semibold text-slate-800">
              {nextAppt.preparationNotes}
            </p>
          </div>
        </div>
      )}

      {/* Support / Call Caregiver Button */}
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="tel:+15552345678"
          className="flex-1 h-16 rounded-2xl bg-white border-2 border-slate-300 hover:border-sky-500 hover:bg-sky-50 text-slate-800 font-extrabold text-base flex items-center justify-center gap-3 shadow-sm transition active:scale-[0.98]"
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
