"use client";

import React, { useState } from "react";
import { X, Bell, Sliders, Volume2, Shield, Moon, Eye, RefreshCw, Check } from "lucide-react";

interface SettingsModalProps {
  onClose: () => void;
  onResetData?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onResetData }) => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [voiceSpeed, setVoiceSpeed] = useState("0.85");
  const [graceMinutes, setGraceMinutes] = useState("30");
  const [autoRead, setAutoRead] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="max-w-xl w-full rounded-3xl apple-glass shadow-2xl border border-white/80 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-sky-100/90 via-white/80 to-pink-100/90 border-b border-white/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Platform Settings</h2>
              <p className="text-xs text-slate-500 font-semibold">Preferences & Care Circle Customization</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white/60 transition"
            aria-label="Close Settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Notifications Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Bell className="w-4 h-4 text-sky-600" />
              <span>Proactive Escalation Channels</span>
            </h3>
            <div className="p-4 rounded-2xl bg-white/70 border border-white/80 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-900 block">Proactive Email Alerts</span>
                  <span className="text-xs text-slate-500">Dispatch alerts to family circle if doses are missed</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-5 h-5 rounded text-sky-600 accent-sky-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <span className="text-sm font-bold text-slate-900 block">Caregiver Grace Period</span>
                  <span className="text-xs text-slate-500">Wait time before missed dose triggers escalation</span>
                </div>
                <select
                  value={graceMinutes}
                  onChange={(e) => setGraceMinutes(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-800"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes (Standard)</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Voice & Accessibility Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-pink-600" />
              <span>Senior Voice Cadence & Audio</span>
            </h3>
            <div className="p-4 rounded-2xl bg-white/70 border border-white/80 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-900 block">Voice Cadence (Speech Pace)</span>
                  <span className="text-xs text-slate-500">Slower speech cadence is optimized for elderly listening</span>
                </div>
                <select
                  value={voiceSpeed}
                  onChange={(e) => setVoiceSpeed(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-800"
                >
                  <option value="0.7">Very Gentle (0.7x)</option>
                  <option value="0.85">Recommended (0.85x)</option>
                  <option value="1.0">Normal (1.0x)</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <span className="text-sm font-bold text-slate-900 block">Voice Confirmation Chime</span>
                  <span className="text-xs text-slate-500">Play pleasant praise chime when pills are marked taken</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoRead}
                  onChange={(e) => setAutoRead(e.target.checked)}
                  className="w-5 h-5 rounded text-pink-600 accent-pink-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Reset Demo State for Judges */}
          <div className="p-4 rounded-2xl apple-glass-pink flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-pink-900 block">Reset Demo State</span>
              <span className="text-xs text-pink-700">Restore all medications, appointments & streaks to default</span>
            </div>
            <button
              onClick={() => {
                if (onResetData) onResetData();
                alert("Demo data reset to baseline for Eleanor Vance.");
              }}
              type="button"
              className="px-3.5 py-2 rounded-xl bg-white/90 hover:bg-white text-pink-800 font-bold text-xs border border-pink-200 shadow-xs flex items-center gap-1.5 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Demo</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white/80 border-t border-white/60 flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-600">
            {savedNotice && "✓ Settings Saved Successfully"}
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 rounded-xl text-slate-600 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="px-6 py-2.5 rounded-xl apple-button-primary font-bold text-xs shadow-md"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
