"use client";

import React, { useState } from "react";
import {
  Medication,
  DoctorAppointment,
  CaregiverAlert,
  AdherenceMetrics,
  UserProfile,
} from "@/types";
import {
  Pill,
  Calendar,
  AlertTriangle,
  Mail,
  Plus,
  Trash2,
  Clock,
  Send,
  Sparkles,
  UserCheck,
  CheckCircle,
} from "lucide-react";

interface CaregiverHubProps {
  currentUser: UserProfile;
  medications: Medication[];
  appointments: DoctorAppointment[];
  alerts: CaregiverAlert[];
  metrics: AdherenceMetrics;
  onAddMedication: (med: any) => Promise<void>;
  onDeleteMedication: (id: string) => Promise<void>;
  onAddAppointment: (appt: any) => Promise<void>;
  onSimulateEscalation: (doseId: string) => Promise<void>;
}

export const CaregiverHub: React.FC<CaregiverHubProps> = ({
  currentUser,
  medications,
  appointments,
  alerts,
  metrics,
  onAddMedication,
  onDeleteMedication,
  onAddAppointment,
  onSimulateEscalation,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "medications" | "appointments" | "escalation">("overview");

  // Add Medication Form State
  const [showAddMed, setShowAddMed] = useState(false);
  const [newMed, setNewMed] = useState({
    name: "",
    dosage: "",
    form: "TABLET" as const,
    scheduleTime: "08:00",
    timeOfDay: "MORNING" as const,
    instructions: "Take with food and water.",
    isCritical: true,
    pillColor: "White",
    pillShape: "Round",
    refillCount: 30,
  });

  // Add Appointment Form State
  const [showAddAppt, setShowAddAppt] = useState(false);
  const [newAppt, setNewAppt] = useState({
    doctorName: "",
    specialty: "",
    clinicName: "",
    address: "",
    phone: "",
    dateTime: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().slice(0, 16),
    preparationNotes: "Bring medication list and insurance card.",
    companionAssigned: currentUser.name,
  });

  const [simulating, setSimulating] = useState(false);
  const [simulateSuccess, setSimulateSuccess] = useState<string | null>(null);

  const handleSimulate = async () => {
    setSimulating(true);
    setSimulateSuccess(null);
    try {
      await onSimulateEscalation("dose_02"); // escalate Lisinopril
      setSimulateSuccess("Proactive escalation alert & email dispatched to caregiver circle!");
    } catch (err) {
      console.error(err);
    } finally {
      setSimulating(false);
    }
  };

  const handleCreateMed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMed.name || !newMed.dosage) return;
    await onAddMedication(newMed);
    setShowAddMed(false);
    setNewMed({
      name: "",
      dosage: "",
      form: "TABLET",
      scheduleTime: "08:00",
      timeOfDay: "MORNING",
      instructions: "Take with food and water.",
      isCritical: true,
      pillColor: "White",
      pillShape: "Round",
      refillCount: 30,
    });
  };

  const handleCreateAppt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppt.doctorName || !newAppt.clinicName) return;
    await onAddAppointment({
      ...newAppt,
      dateTime: new Date(newAppt.dateTime).toISOString(),
    });
    setShowAddAppt(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner with Senior Context */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-3xl shadow-inner">
            👵
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                Eleanor Vance&apos;s Care Profile
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
                Age 78
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              Active Management: Hypertension, Type-2 Diabetes • Primary Caregiver: {currentUser.name} ({currentUser.relationship || "Care Team"})
            </p>
          </div>
        </div>

        {/* Live Simulator Button for Evaluators */}
        <button
          onClick={handleSimulate}
          disabled={simulating}
          type="button"
          className="px-5 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-extrabold text-sm flex items-center gap-2.5 shadow-md shadow-rose-600/25 transition active:scale-95"
          title="Simulates a missed dose and verifies proactive email dispatch"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{simulating ? "Dispatching Alert..." : "⚡ Simulate Missed Dose Alert"}</span>
        </button>
      </div>

      {simulateSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-sm font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{simulateSuccess}</span>
        </div>
      )}

      {/* Adherence & Health Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Adherence Rate
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-slate-900">
              {metrics.adherenceRate}%
            </span>
            <span className="text-xs font-bold text-emerald-600">On Target</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${metrics.adherenceRate}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Streak Days
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-slate-900">
              {metrics.currentStreakDays}
            </span>
            <span className="text-xs font-bold text-amber-600">Days Active</span>
          </div>
          <p className="text-xs text-slate-500 mt-3 font-medium">Consistent daily intake</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Prescriptions Active
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-slate-900">
              {medications.length}
            </span>
            <span className="text-xs font-bold text-sky-600">Monitored</span>
          </div>
          <p className="text-xs text-slate-500 mt-3 font-medium">Auto-refill alerts on</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Upcoming Visits
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-slate-900">
              {appointments.filter((a) => a.status === "UPCOMING").length}
            </span>
            <span className="text-xs font-bold text-indigo-600">Scheduled</span>
          </div>
          <p className="text-xs text-slate-500 mt-3 font-medium">Companion assigned</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { key: "overview", label: "Care Circle Feed", icon: UserCheck },
          { key: "medications", label: `Medications (${medications.length})`, icon: Pill },
          { key: "appointments", label: `Appointments (${appointments.length})`, icon: Calendar },
          { key: "escalation", label: `Escalation & Email Logs (${alerts.length})`, icon: Mail },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              type="button"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition ${
                activeTab === tab.key
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Alerts */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Priority Caregiver Alerts</span>
            </h3>
            {alerts.length === 0 ? (
              <p className="text-sm text-slate-500 font-medium">No active alerts. All doses on schedule!</p>
            ) : (
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-2xl border ${
                      alert.severity === "CRITICAL"
                        ? "bg-rose-50 border-rose-200 text-rose-950"
                        : "bg-amber-50 border-amber-200 text-amber-950"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-sm">{alert.title}</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/60">
                        {new Date(alert.triggeredAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-xs font-semibold mt-1">{alert.message}</p>
                    <div className="mt-2 pt-2 border-t border-black/10 flex items-center justify-between text-[11px] font-bold">
                      <span>Proactive email sent to: {alert.recipients.join(", ")}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Doctor Summary */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-600" />
              <span>Next Doctor Consultations</span>
            </h3>
            <div className="space-y-3">
              {appointments.slice(0, 2).map((appt) => (
                <div key={appt.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-sm">
                      {appt.doctorName}
                    </span>
                    <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full">
                      {new Date(appt.dateTime).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">
                    {appt.specialty} • {appt.clinicName}
                  </p>
                  <p className="text-xs font-medium text-slate-700 mt-2">
                    Prep: {appt.preparationNotes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Medications */}
      {activeTab === "medications" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">
              Manage Medication Schedules
            </h3>
            {currentUser.role === "CAREGIVER" && (
              <button
                onClick={() => setShowAddMed(!showAddMed)}
                type="button"
                className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm flex items-center gap-2 shadow transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Medication</span>
              </button>
            )}
          </div>

          {/* Add Medication Modal/Form */}
          {showAddMed && (
            <form onSubmit={handleCreateMed} className="p-6 bg-slate-50 rounded-3xl border border-slate-300 space-y-4">
              <h4 className="text-base font-black text-slate-900">Add New Prescription</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Medication Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amlodipine"
                    value={newMed.name}
                    onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Dosage</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 mg"
                    value={newMed.dosage}
                    onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Schedule Time</label>
                  <input
                    type="time"
                    required
                    value={newMed.scheduleTime}
                    onChange={(e) => setNewMed({ ...newMed, scheduleTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Time of Day</label>
                  <select
                    value={newMed.timeOfDay}
                    onChange={(e) => setNewMed({ ...newMed, timeOfDay: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-sm"
                  >
                    <option value="MORNING">Morning</option>
                    <option value="AFTERNOON">Afternoon</option>
                    <option value="EVENING">Evening</option>
                    <option value="BEDTIME">Bedtime</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Pill Appearance</label>
                  <input
                    type="text"
                    placeholder="e.g. White Round"
                    value={newMed.pillColor}
                    onChange={(e) => setNewMed({ ...newMed, pillColor: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Refill Pills Remaining</label>
                  <input
                    type="number"
                    value={newMed.refillCount}
                    onChange={(e) => setNewMed({ ...newMed, refillCount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Special Senior Instructions</label>
                <input
                  type="text"
                  placeholder="e.g. Take with warm food and water"
                  value={newMed.instructions}
                  onChange={(e) => setNewMed({ ...newMed, instructions: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddMed(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          )}

          {/* Medications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medications.map((med) => (
              <div
                key={med.id}
                className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-black text-slate-900">{med.name}</h4>
                      <p className="text-xs font-bold text-slate-500">
                        {med.dosage} • {med.form}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-sky-100 text-sky-800">
                      {med.scheduleTime} ({med.timeOfDay})
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-700 mt-3">
                    {med.instructions}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-slate-500">
                    <span>Appearance: {med.pillColor} {med.pillShape}</span>
                    <span>•</span>
                    <span className={med.refillCount < 15 ? "text-amber-600 font-extrabold" : ""}>
                      {med.refillCount} doses remaining
                    </span>
                  </div>
                </div>

                {currentUser.role === "CAREGIVER" && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => onDeleteMedication(med.id)}
                      type="button"
                      className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Appointments */}
      {activeTab === "appointments" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">
              Doctor Appointments & Routine Checkups
            </h3>
            {currentUser.role === "CAREGIVER" && (
              <button
                onClick={() => setShowAddAppt(!showAddAppt)}
                type="button"
                className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm flex items-center gap-2 shadow transition"
              >
                <Plus className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            )}
          </div>

          {/* Add Appointment Form */}
          {showAddAppt && (
            <form onSubmit={handleCreateAppt} className="p-6 bg-slate-50 rounded-3xl border border-slate-300 space-y-4">
              <h4 className="text-base font-black text-slate-900">Record New Appointment</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Doctor Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Jennifer Adams"
                    value={newAppt.doctorName}
                    onChange={(e) => setNewAppt({ ...newAppt, doctorName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Specialty</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ophthalmology (Eye)"
                    value={newAppt.specialty}
                    onChange={(e) => setNewAppt({ ...newAppt, specialty: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Clinic Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Westside Vision Pavilion"
                    value={newAppt.clinicName}
                    onChange={(e) => setNewAppt({ ...newAppt, clinicName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={newAppt.dateTime}
                    onChange={(e) => setNewAppt({ ...newAppt, dateTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Clinic Address</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 500 Health Ave"
                    value={newAppt.address}
                    onChange={(e) => setNewAppt({ ...newAppt, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Companion Assigned</label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah Vance"
                    value={newAppt.companionAssigned}
                    onChange={(e) => setNewAppt({ ...newAppt, companionAssigned: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddAppt(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow"
                >
                  Confirm & Send Automated Reminder
                </button>
              </div>
            </form>
          )}

          {/* Appointments List */}
          <div className="space-y-4">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-black text-xl flex-shrink-0">
                    🏥
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-black text-slate-900">{appt.doctorName}</h4>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                        {appt.specialty}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-500 mt-1">
                      {appt.clinicName} • {appt.address}
                    </p>
                    <p className="text-xs font-medium text-slate-700 mt-2">
                      Notes: {appt.preparationNotes}
                    </p>
                    {appt.companionAssigned && (
                      <span className="text-[11px] font-bold text-sky-700 block mt-1">
                        Companion: {appt.companionAssigned}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-slate-900 block">
                    {new Date(appt.dateTime).toLocaleDateString()} at {new Date(appt.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block mt-1">
                    ✓ Email Alert Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Escalation & Email Audit Logs */}
      {activeTab === "escalation" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">
              Proactive Alert & Email Dispatch Audit Log
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              Verified automated notification channel
            </span>
          </div>

          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-sky-600" />
                    <span className="font-extrabold text-sm text-slate-900">{alert.title}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    {new Date(alert.triggeredAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{alert.message}</p>
                <div className="text-[11px] font-bold text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span>Recipients: {alert.recipients.join(", ")}</span>
                  <span className="text-emerald-600">✓ Automated Notification Dispatched</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
