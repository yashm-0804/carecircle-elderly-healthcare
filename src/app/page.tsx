"use client";

import React, { useState, useEffect } from "react";
import { UserProfile, DoseRecord, Medication, DoctorAppointment, CaregiverAlert, AdherenceMetrics } from "@/types";
import { Navbar } from "@/components/Navbar";
import { PasscodeGateway } from "@/components/PasscodeGateway";
import { SeniorKiosk } from "@/components/SeniorKiosk";
import { CaregiverHub } from "@/components/CaregiverHub";
import { FamilyView } from "@/components/FamilyView";

export default function Home() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [doses, setDoses] = useState<DoseRecord[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [appointments, setAppointments] = useState<DoctorAppointment[]>([]);
  const [alerts, setAlerts] = useState<CaregiverAlert[]>([]);
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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors">
      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-sky-600 focus:text-white focus:rounded-xl focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>

      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        activeRole={currentUser?.role || "GUEST"}
      />

      <main id="main-content" className="flex-1" role="main" aria-label="CareCircle main content">
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

      <footer role="contentinfo" className="border-t border-slate-200 py-6 bg-white text-center text-xs text-slate-500 font-medium">
        <p>
          CareCircle Elderly Care & Medication Management Platform • Built with Anti-Gravity for PromptWars x Catalyst
        </p>
      </footer>
    </div>
  );
}
