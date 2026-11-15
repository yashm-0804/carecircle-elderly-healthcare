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
} from "lucide-react";

interface FamilyViewProps {
  currentUser: UserProfile;
  doses: DoseRecord[];
  medications: Medication[];
  appointments: DoctorAppointment[];
  metrics: AdherenceMetrics;
}

/**
 * Read-only Family Member Companion View
 * Allows family members (e.g., grandson Leo) to monitor Eleanor's
 * health routines without the ability to edit or modify schedules.
 */
export const FamilyView: React.FC<FamilyViewProps> = ({
  currentUser,
  doses,
  medications,
  appointments,
  metrics,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-6 h-6 text-pink-300" />
          <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-200">
            Family Circle • View Only
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          Hi {currentUser.name}! 👋
        </h1>
        <p className="text-indigo-100 text-lg mt-1 font-medium">
          Here&apos;s how Grandma Eleanor is doing today.
        </p>
      </div>

      {/* Adherence Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Adherence Rate
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-slate-900">
              {metrics.adherenceRate}%
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all"
              style={{ width: `${metrics.adherenceRate}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Streak Days
          </span>
          <div className="flex items-center gap-2 mt-2">
            <Award className="w-6 h-6 text-amber-500" />
            <span className="text-3xl font-black text-slate-900">
              {metrics.currentStreakDays}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Doses Today
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-emerald-700">
              {doses.filter((d) => d.status === "TAKEN").length}
            </span>
            <span className="text-lg font-bold text-slate-400">
              / {doses.length}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Upcoming Visits
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-indigo-700">
              {appointments.filter((a) => a.status === "UPCOMING").length}
            </span>
          </div>
        </div>
      </div>

      {/* Today's Dose Status (Read-Only) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-5 flex items-center gap-2">
          <Pill className="w-5 h-5 text-sky-600" aria-hidden="true" />
          <span>Today&apos;s Medication Status</span>
        </h3>

        <div className="space-y-3" role="list" aria-label="Today's medication doses">
          {doses.map((dose) => (
            <div
              key={dose.id}
              role="listitem"
              className={`p-4 rounded-2xl border-2 flex items-center justify-between ${
                dose.status === "TAKEN"
                  ? "bg-emerald-50 border-emerald-200"
                  : dose.status === "MISSED"
                  ? "bg-rose-50 border-rose-200"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
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
                className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                  dose.status === "TAKEN"
                    ? "bg-emerald-100 text-emerald-800"
                    : dose.status === "MISSED"
                    ? "bg-rose-100 text-rose-800"
                    : "bg-amber-100 text-amber-800"
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

      {/* Medications List (Read-Only) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-5 flex items-center gap-2">
          <Eye className="w-5 h-5 text-indigo-600" aria-hidden="true" />
          <span>Eleanor&apos;s Active Prescriptions</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list" aria-label="Active prescriptions">
          {medications.map((med) => (
            <div
              key={med.id}
              role="listitem"
              className="p-4 bg-slate-50 rounded-2xl border border-slate-200"
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
                {med.refillCount < 15 && (
                  <span className="text-amber-600 ml-1">⚠ Low refill</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointments (Read-Only) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-5 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-600" aria-hidden="true" />
          <span>Upcoming Doctor Visits</span>
        </h3>

        <div className="space-y-3" role="list" aria-label="Upcoming appointments">
          {appointments
            .filter((a) => a.status === "UPCOMING")
            .map((appt) => (
              <div
                key={appt.id}
                role="listitem"
                className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-black text-slate-900">
                      {appt.doctorName}
                    </h4>
                    <p className="text-xs font-bold text-amber-800 mt-0.5">
                      {appt.specialty} • {appt.clinicName}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-slate-700 bg-white px-3 py-1 rounded-full border">
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

      {/* Read-Only Notice */}
      <div className="text-center py-4">
        <p className="text-xs font-semibold text-slate-400">
          You are viewing Eleanor&apos;s care profile in read-only mode. Contact Dr. Sarah Vance (Primary Caregiver) to make schedule changes.
        </p>
      </div>
    </div>
  );
};
