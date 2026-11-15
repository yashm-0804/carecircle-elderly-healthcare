"use client";

import React from "react";
import { UserProfile } from "@/types";
import { X, User, Shield, Heart, AlertCircle, Phone, Stethoscope, Award, FileText } from "lucide-react";

interface ProfileModalProps {
  currentUser: UserProfile;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ currentUser, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="max-w-2xl w-full rounded-3xl apple-glass shadow-2xl border border-white/80 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-sky-100/90 via-white/80 to-pink-100/90 border-b border-white/60 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-400 to-pink-400 p-0.5 shadow-md">
              <div className="w-full h-full rounded-2xl bg-white/90 flex items-center justify-center text-3xl">
                {currentUser.avatar || "👵"}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">{currentUser.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-100 text-pink-700">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                CareCircle Master Patient Health Record • ID #MED-8849-ELN
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white/60 transition"
            aria-label="Close Profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[72vh] overflow-y-auto space-y-5">
          {/* Vitals & Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/70 border border-white/80 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Age & DOB</span>
              <span className="text-base font-black text-slate-900 mt-1 block">78 Yrs</span>
              <span className="text-[11px] text-slate-500 font-medium">May 14, 1948</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/70 border border-white/80 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Blood Type</span>
              <span className="text-base font-black text-rose-600 mt-1 block">O Positive</span>
              <span className="text-[11px] text-slate-500 font-medium">Universal Donor</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/70 border border-white/80 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Adherence</span>
              <span className="text-base font-black text-emerald-600 mt-1 block">12 Days</span>
              <span className="text-[11px] text-slate-500 font-medium">Active Streak</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/70 border border-white/80 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Care Status</span>
              <span className="text-base font-black text-sky-600 mt-1 block">Protected</span>
              <span className="text-[11px] text-slate-500 font-medium">Circle Active</span>
            </div>
          </div>

          {/* Clinical Profile */}
          <div className="p-5 rounded-2xl apple-glass-sky space-y-3">
            <div className="flex items-center gap-2 text-sky-900">
              <Heart className="w-5 h-5 text-sky-600" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider">Clinical Diagnosis & Conditions</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-white/90 border border-sky-200 text-xs font-bold text-sky-900 shadow-xs">
                🩺 Essential Hypertension (Stage 1)
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/90 border border-sky-200 text-xs font-bold text-sky-900 shadow-xs">
                🩸 Type-2 Diabetes Mellitus
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/90 border border-sky-200 text-xs font-bold text-sky-900 shadow-xs">
                🦴 Osteopenia (Bone Density)
              </span>
            </div>
          </div>

          {/* Known Allergies Alert */}
          <div className="p-5 rounded-2xl apple-glass-pink space-y-2">
            <div className="flex items-center gap-2 text-pink-900">
              <AlertCircle className="w-5 h-5 text-pink-600" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider">Documented Medication Allergies</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-xl bg-white/90 border border-pink-200 text-xs font-bold text-pink-800">
                ⚠️ Penicillin Class (Moderate cutaneous reaction)
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/90 border border-pink-200 text-xs font-bold text-pink-800">
                ⚠️ Sulfonamides / Sulfa Drugs
              </span>
            </div>
          </div>

          {/* Care Circle Contacts */}
          <div className="p-5 rounded-2xl bg-white/70 border border-white/80 space-y-3">
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Authorized Care Circle Contacts</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-extrabold text-slate-900 block">Dr. Sarah Vance (Daughter)</span>
                <span className="text-xs text-sky-700 font-semibold">Primary Caregiver • +1 (555) 234-5678</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Emergency proxy & healthcare surrogate</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-extrabold text-slate-900 block">Leo Vance (Grandson)</span>
                <span className="text-xs text-indigo-700 font-semibold">Family Companion • +1 (555) 345-6789</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Daily companion & routine check-ins</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white/80 border-t border-white/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl apple-button-primary font-bold text-sm shadow-md"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
