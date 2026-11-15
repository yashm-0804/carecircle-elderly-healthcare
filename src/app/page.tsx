"use client";

import React, { useState, useEffect } from "react";
import { UserProfile, DoseRecord, Medication, DoctorAppointment, CaregiverAlert, AdherenceMetrics } from "@/types";
import { Navbar } from "@/components/Navbar";
import { PasscodeGateway } from "@/components/PasscodeGateway";
import { SeniorKiosk } from "@/components/SeniorKiosk";
import { CaregiverHub } from "@/components/CaregiverHub";
import { FamilyView } from "@/components/FamilyView";
import { CareChatbot } from "@/components/CareChatbot";
import { ProfileModal } from "@/components/ProfileModal";
import { SettingsModal } from "@/components/SettingsModal";

export default function Home() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [doses, setDoses] = useState<DoseRecord[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [appointments, setAppointments] = useState<DoctorAppointment[]>([]);
  const [alerts, setAlerts] = useState<CaregiverAlert[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [metrics, setMetrics] = useState<AdherenceMetrics>({
    totalScheduled: 4,
    totalTaken: 1,
    totalMissed: 0,
    totalSnoozed: 0,
    adherenceRate: 25,
    currentStreakDays: 12,
  });

  const fetchData = async () => {
    try {
      const [dosesRes, medsRes, apptsRes, alertsRes] = await Promise.all([
        fetch("/api/doses"),
        fetch("/api/medications"),
        fetch("/api/appointments"),
        fetch("/api/escalation"),
      ]);

      if (dosesRes.ok) {
        const d = await dosesRes.json();
        setDoses(d.doses);
        setMetrics(d.metrics);
      }
      if (medsRes.ok) {
        const m = await medsRes.json();
        setMedications(m.medications);
      }
      if (apptsRes.ok) {
        const a = await apptsRes.json();
        setAppointments(a.appointments);
      }
      if (alertsRes.ok) {
        const al = await alertsRes.json();
        setAlerts(al.alerts);
      }
    } catch (err) {
      console.error("Failed to load care data:", err);
    }
  };

  useEffect(() => {
    // Restore session from localStorage if available
    try {
      const savedUser = localStorage.getItem("carecircle_session");
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  const handleAuthenticated = (profile: UserProfile) => {
    setCurrentUser(profile);
    try {
      localStorage.setItem("carecircle_session", JSON.stringify(profile));
    } catch (e) {}
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem("carecircle_session");
    } catch (e) {}
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const handleTakeDose = async (
    doseId: string,
    verifiedVia: "MANUAL" | "VOICE" | "VISION_AI" = "MANUAL"
  ) => {
    try {
      const res = await fetch("/api/doses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doseId,
          action: "TAKEN",
          verifiedVia,
          notes: `Confirmed via ${verifiedVia}`,
        }),
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error("Error taking dose:", err);
    }
  };

  const handleSnoozeDose = async (doseId: string) => {
    try {
      const res = await fetch("/api/doses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doseId,
          action: "SNOOZED",
          notes: "Snoozed by senior for 15 minutes",
        }),
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error("Error snoozing dose:", err);
    }
  };

  const handleAddMedication = async (newMed: any) => {
    try {
      const res = await fetch("/api/medications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMed),
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error("Error adding medication:", err);
    }
  };

  const handleDeleteMedication = async (id: string) => {
    try {
      const res = await fetch(`/api/medications/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error("Error deleting medication:", err);
    }
  };

  const handleAddAppointment = async (newAppt: any) => {
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAppt),
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error("Error adding appointment:", err);
    }
  };

  const handleSimulateEscalation = async (doseId: string) => {
    try {
      const res = await fetch("/api/escalation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doseId,
          reason: "Simulated 30-minute missed medication escalation trigger",
        }),
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error("Error triggering escalation:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 transition-colors relative overflow-hidden">
      {/* Ambient Apple Liquid Glass Background Glow Orbs */}
      <div className="fixed top-[-10vw] left-[-10vw] w-[45vw] h-[45vw] rounded-full ambient-orb-1 blur-3xl pointer-events-none animate-float-slow -z-10" />
      <div className="fixed bottom-[-10vw] right-[-10vw] w-[50vw] h-[50vw] rounded-full ambient-orb-2 blur-3xl pointer-events-none animate-float-reverse -z-10" />
      <div className="fixed top-[30%] right-[15%] w-[35vw] h-[35vw] rounded-full ambient-orb-3 blur-3xl pointer-events-none animate-pulse-subtle -z-10" />

      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-sky-600 focus:text-white focus:rounded-xl focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Floating Apple Glass Menu Bar */}
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        activeRole={currentUser?.role || "GUEST"}
        onOpenProfile={() => setShowProfile(true)}
        onOpenSettings={() => setShowSettings(true)}
      />

      <main id="main-content" className="flex-1 pb-16 pt-3" role="main" aria-label="CareCircle main content">
        {!currentUser ? (
          <PasscodeGateway onAuthenticated={handleAuthenticated} />
        ) : currentUser.role === "SENIOR" ? (
          <SeniorKiosk
            doses={doses}
            appointments={appointments}
            onTakeDose={handleTakeDose}
            onSnoozeDose={handleSnoozeDose}
          />
        ) : currentUser.role === "FAMILY" ? (
          <FamilyView
            currentUser={currentUser}
            doses={doses}
            medications={medications}
            appointments={appointments}
            metrics={metrics}
          />
        ) : (
          <CaregiverHub
            currentUser={currentUser}
            doses={doses}
            medications={medications}
            appointments={appointments}
            alerts={alerts}
            metrics={metrics}
            onAddMedication={handleAddMedication}
            onDeleteMedication={handleDeleteMedication}
            onAddAppointment={handleAddAppointment}
            onSimulateEscalation={handleSimulateEscalation}
          />
        )}
      </main>

      {/* Profile Modal */}
      {showProfile && currentUser && (
        <ProfileModal
          currentUser={currentUser}
          onClose={() => setShowProfile(false)}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          onResetData={() => fetchData()}
        />
      )}

      {/* AI Care Companion Chatbot (Carey) */}
      <CareChatbot />

      {/* Frosted Glass Footer */}
      <footer role="contentinfo" className="py-6 border-t border-white/60 dark:border-white/10 bg-white/40 dark:bg-slate-900/60 backdrop-blur-md text-center text-xs text-slate-500 dark:text-slate-400 font-semibold">
        <p>
          CareCircle Elderly Healthcare Management Platform • Apple Glass Design Edition • Built with Anti-Gravity
        </p>
      </footer>
    </div>
  );
}
