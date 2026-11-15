"use client";

import React from "react";
import {
  Medication,
  DoctorAppointment,
  AdherenceMetrics,
  DoseRecord,
  UserProfile,
} from "@/types";
import {
  Heart,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Award,
  Pill,
  Eye,
  Sparkles,
} from "lucide-react";

interface FamilyViewProps {
  currentUser: UserProfile;
  doses: DoseRecord[];
  medications: Medication[];
  appointments: DoctorAppointment[];
  metrics: AdherenceMetrics;
}

export const FamilyView: React.FC<FamilyViewProps> = ({
  currentUser,
  doses,
  medications,
  appointments,
  metrics,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner Card */}
      <div className="rounded-3xl p-6 sm:p-8 apple-glass border border-white/80 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
          <span className="text-xs uppercase font-black tracking-wider text-pink-700">
            Family Circle • Read-Only View
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
          Hi {currentUser.name}! 👋
        </h1>
        <p className="text-slate-600 text-lg mt-1 font-semibold">
          Here is Grandma Eleanor&apos;s real-time healthcare routine today.
        </p>
      </div>

      {/* Adherence Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl p-5 apple-glass-card border border-white/80 shadow-sm">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
            Adherence Rate
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-slate-900">
              {metrics.adherenceRate}%
            </span>
          </div>
          <div className="w-full bg-slate-200/60 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full transition-all"
              style={{ width: `${metrics.adherenceRate}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl p-5 apple-glass-card border border-white/80 shadow-sm">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
            Streak Days
          </span>
          <div className="flex items-center gap-2 mt-2">
            <Award className="w-6 h-6 text-amber-500" />
            <span className="text-3xl font-black text-slate-900">
              {metrics.currentStreakDays}
            </span>
          </div>
          <span className="text-xs font-bold text-amber-600 mt-2 block">Days Active</span>
        </div>

        <div className="rounded-2xl p-5 apple-glass-card border border-white/80 shadow-sm">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
            Doses Taken Today
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-emerald-700">
              {doses.filter((d) => d.status === "TAKEN").length}
            </span>
            <span className="text-lg font-bold text-slate-400">
              / {doses.length}
            </span>
          </div>
          <span className="text-xs font-bold text-emerald-600 mt-2 block">On Track</span>
        </div>

        <div className="rounded-2xl p-5 apple-glass-card border border-white/80 shadow-sm">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
            Upcoming Visits
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-pink-600">
              {appointments.filter((a) => a.status === "UPCOMING").length}
            </span>
          </div>
          <span className="text-xs font-bold text-pink-600 mt-2 block">Scheduled</span>
        </div>
      </div>

      {/* Today's Dose Status (Read-Only) */}
      <div className="rounded-3xl apple-glass-card p-6 sm:p-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-5 flex items-center gap-2">
          <Pill className="w-5 h-5 text-sky-600" aria-hidden="true" />
          <span>Today&apos;s Medication Status</span>
        </h3>

        <div className="space-y-3" role="list" aria-label="Today's medication doses">
          {doses.map((dose) => (
            <div
              key={dose.id}
              role="listitem"
              className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                dose.status === "TAKEN"
                  ? "apple-glass border-emerald-300"
                  : dose.status === "MISSED"
                  ? "apple-glass-pink border-pink-300"
                  : "apple-glass border-white/80"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span className="text-2xl" aria-hidden="true">
                  {dose.timeOfDay === "MORNING"
                    ? "🌅"
                    : dose.timeOfDay === "AFTERNOON"
                    ? "☀️"
                    : dose.timeOfDay === "EVENING"
                    ? "🌇"
                    : "🌙"}
                </span>
                <div>
                  <h4 className="text-base font-black text-slate-900">
                    {dose.medicationName}
                  </h4>
                  <p className="text-xs font-bold text-slate-500">
                    {dose.dosage} • {dose.scheduledTime}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-black shadow-2xs ${
                  dose.status === "TAKEN"
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : dose.status === "MISSED"
                    ? "bg-pink-100 text-pink-800 border border-pink-200"
                    : "bg-amber-100 text-amber-800 border border-amber-200"
                }`}
              >
                {dose.status === "TAKEN" && (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                    Taken
                  </span>
                )}
                {dose.status === "MISSED" && (
                  <span className="flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    Missed
                  </span>
                )}
                {dose.status === "SCHEDULED" && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    Pending
                  </span>
                )}
                {dose.status === "SNOOZED" && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    Snoozed
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Prescriptions List */}
      <div className="rounded-3xl apple-glass-card p-6 sm:p-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-5 flex items-center gap-2">
          <Eye className="w-5 h-5 text-indigo-600" aria-hidden="true" />
          <span>Eleanor&apos;s Active Prescriptions</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list" aria-label="Active prescriptions">
          {medications.map((med) => (
            <div
              key={med.id}
              role="listitem"
              className="p-4 apple-glass rounded-2xl border border-white/80"
            >
              <h4 className="text-base font-black text-slate-900">{med.name}</h4>
              <p className="text-xs font-bold text-slate-500 mt-0.5">
                {med.dosage} • {med.form} • {med.scheduleTime} ({med.timeOfDay})
              </p>
              <p className="text-xs font-medium text-slate-600 mt-2">
                {med.instructions}
              </p>
              <div className="mt-2 text-[11px] font-bold text-slate-400">
                {med.pillColor} {med.pillShape} • {med.refillCount} doses remaining
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="rounded-3xl apple-glass-pink p-6 sm:p-8 shadow-sm border border-pink-200/80">
        <h3 className="text-xl font-black text-slate-900 mb-5 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-pink-600" aria-hidden="true" />
          <span>Upcoming Doctor Visits</span>
        </h3>

        <div className="space-y-3" role="list" aria-label="Upcoming appointments">
          {appointments
            .filter((a) => a.status === "UPCOMING")
            .map((appt) => (
              <div
                key={appt.id}
                role="listitem"
                className="p-5 bg-white/85 rounded-2xl border border-pink-100 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-black text-slate-900">
                      {appt.doctorName}
                    </h4>
                    <p className="text-xs font-bold text-pink-800 mt-0.5">
                      {appt.specialty} • {appt.clinicName}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-700 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
                    {new Date(appt.dateTime).toLocaleDateString()}
                  </span>
                </div>
                {appt.preparationNotes && (
                  <p className="text-xs font-medium text-slate-700 mt-3">
                    📋 {appt.preparationNotes}
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
