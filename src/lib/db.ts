import {
  Medication,
  DoseRecord,
  DoctorAppointment,
  CaregiverAlert,
  AdherenceMetrics,
  UserProfile,
} from "@/types";
import { sendProactiveEmail } from "./email";

/**
 * CareCircle In-Memory Thread-Safe Data Store
 * Provides realistic pre-seeded data for Eleanor Vance (Age 78)
 * and seamless CRUD operations for medications, doses, and appointments.
 */

// Initial Seed Data
const INITIAL_SENIOR: UserProfile = {
  id: "usr_senior_01",
  name: "Eleanor Vance",
  role: "SENIOR",
  email: "eleanor.vance@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "👵",
};

let medications: Medication[] = [
  {
    id: "med_01",
    seniorId: "usr_senior_01",
    name: "Metformin Hydrochloride",
    genericName: "Glucophage",
    dosage: "500 mg",
    form: "TABLET",
    scheduleTime: "08:00",
    timeOfDay: "MORNING",
    instructions: "Take 1 tablet with breakfast and a glass of water.",
    isCritical: true,
    pillColor: "White",
    pillShape: "Round",
    refillCount: 24,
  },
  {
    id: "med_02",
    seniorId: "usr_senior_01",
    name: "Lisinopril",
    genericName: "Prinivil",
    dosage: "10 mg",
    form: "TABLET",
    scheduleTime: "08:30",
    timeOfDay: "MORNING",
    instructions: "Take 1 tablet for blood pressure control. Do not skip.",
    isCritical: true,
    pillColor: "Pink",
    pillShape: "Oval",
    refillCount: 18,
  },
  {
    id: "med_03",
    seniorId: "usr_senior_01",
    name: "Vitamin D3 + Calcium",
    dosage: "2000 IU",
    form: "CAPSULE",
    scheduleTime: "13:00",
    timeOfDay: "AFTERNOON",
    instructions: "Take 1 softgel after lunch for bone density.",
    isCritical: false,
    pillColor: "Golden Yellow",
    pillShape: "Oval",
    refillCount: 45,
  },
  {
    id: "med_04",
    seniorId: "usr_senior_01",
    name: "Atorvastatin Calcium",
    genericName: "Lipitor",
    dosage: "20 mg",
    form: "TABLET",
    scheduleTime: "20:00",
    timeOfDay: "EVENING",
    instructions: "Take 1 tablet at dinner time for cholesterol.",
    isCritical: true,
    pillColor: "White",
    pillShape: "Oval",
    refillCount: 12,
  },
];

let doses: DoseRecord[] = [
  {
    id: "dose_01",
    medicationId: "med_01",
    medicationName: "Metformin Hydrochloride",
    dosage: "500 mg",
    seniorId: "usr_senior_01",
    scheduledTime: "08:00",
    timeOfDay: "MORNING",
    status: "TAKEN",
    takenAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    verifiedVia: "MANUAL",
    notes: "Confirmed taken after breakfast oatmeal",
  },
  {
    id: "dose_02",
    medicationId: "med_02",
    medicationName: "Lisinopril",
    dosage: "10 mg",
    seniorId: "usr_senior_01",
    scheduledTime: "08:30",
    timeOfDay: "MORNING",
    status: "SCHEDULED",
  },
  {
    id: "dose_03",
    medicationId: "med_03",
    medicationName: "Vitamin D3 + Calcium",
    dosage: "2000 IU",
    seniorId: "usr_senior_01",
    scheduledTime: "13:00",
    timeOfDay: "AFTERNOON",
    status: "SCHEDULED",
  },
  {
    id: "dose_04",
    medicationId: "med_04",
    medicationName: "Atorvastatin Calcium",
    dosage: "20 mg",
    seniorId: "usr_senior_01",
    scheduledTime: "20:00",
    timeOfDay: "EVENING",
    status: "SCHEDULED",
  },
];

let appointments: DoctorAppointment[] = [
  {
    id: "appt_01",
    seniorId: "usr_senior_01",
    doctorName: "Dr. Robert Chen, MD",
    specialty: "Cardiology",
    clinicName: "St. Jude Heart & Vascular Center",
    address: "742 Evergreen Terrace, Suite 300, Springfield",
    phone: "+1 (555) 889-1029",
    dateTime: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    status: "UPCOMING",
    preparationNotes: "Fasting required 8 hours prior. Bring daily blood pressure log.",
    companionAssigned: "Dr. Sarah Vance (Daughter)",
  },
  {
    id: "appt_02",
    seniorId: "usr_senior_01",
    doctorName: "Dr. Anita Gupta, MD",
    specialty: "Endocrinology",
    clinicName: "Metropolitan Diabetes Care",
    address: "104 Healthcare Blvd, Medical Pavilion B",
    phone: "+1 (555) 441-9920",
    dateTime: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString(),
    status: "UPCOMING",
    preparationNotes: "Routine 3-month HbA1c review.",
    companionAssigned: "Dr. Sarah Vance (Daughter)",
  },
];

let alerts: CaregiverAlert[] = [
  {
    id: "alert_01",
    seniorId: "usr_senior_01",
    title: "Cardiology Appointment Approaching",
    message: "Dr. Robert Chen appointment is in 48 hours. Fasting instructions sent to Eleanor.",
    type: "UPCOMING_APPOINTMENT",
    severity: "INFO",
    triggeredAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    resolved: false,
    recipients: ["sarah.vance@caregiver.example.com"],
  },
];

// Database accessor functions
export function getSeniorProfile(): UserProfile {
  return INITIAL_SENIOR;
}

export function getMedications(): Medication[] {
  return [...medications];
}

export function addMedication(med: Omit<Medication, "id" | "seniorId">): Medication {
  const newMed: Medication = {
    ...med,
    id: `med_${Date.now()}`,
    seniorId: INITIAL_SENIOR.id,
  };
  medications.push(newMed);

  // Automatically create a scheduled dose for today
  doses.push({
    id: `dose_${Date.now()}`,
    medicationId: newMed.id,
    medicationName: newMed.name,
    dosage: newMed.dosage,
    seniorId: INITIAL_SENIOR.id,
    scheduledTime: newMed.scheduleTime,
    timeOfDay: newMed.timeOfDay,
    status: "SCHEDULED",
  });

  return newMed;
}

export function updateMedication(
  id: string,
  updates: Partial<Omit<Medication, "id" | "seniorId">>
): Medication | null {
  const index = medications.findIndex((m) => m.id === id);
  if (index === -1) return null;
  medications[index] = { ...medications[index], ...updates };
  return medications[index];
}

export function deleteMedication(id: string): boolean {
  const initialLen = medications.length;
  medications = medications.filter((m) => m.id !== id);
  doses = doses.filter((d) => d.medicationId !== id);
  return medications.length < initialLen;
}

export function getTodayDoses(): DoseRecord[] {
  return [...doses];
}

export function recordDoseAction(
  doseId: string,
  action: "TAKEN" | "SNOOZED" | "MISSED",
  verifiedVia: "MANUAL" | "VOICE" | "VISION_AI" = "MANUAL",
  notes?: string
): DoseRecord | null {
  const dose = doses.find((d) => d.id === doseId);
  if (!dose) return null;

  dose.status = action;
  dose.verifiedVia = verifiedVia;
  dose.notes = notes;
  if (action === "TAKEN") {
    dose.takenAt = new Date().toISOString();
  }

  return dose;
}

export function getAppointments(): DoctorAppointment[] {
  return [...appointments];
}

export function addAppointment(
  appt: Omit<DoctorAppointment, "id" | "seniorId">
): DoctorAppointment {
  const newAppt: DoctorAppointment = {
    ...appt,
    status: appt.status || "UPCOMING",
    id: `appt_${Date.now()}`,
    seniorId: INITIAL_SENIOR.id,
  };
  appointments.push(newAppt);

  // Proactively dispatch email reminder for new appointment
  sendProactiveEmail({
    to: ["sarah.vance@caregiver.example.com", INITIAL_SENIOR.email],
    subject: `New Doctor Appointment Scheduled: ${newAppt.doctorName} (${newAppt.specialty})`,
    headline: "Doctor Appointment Scheduled",
    bodyText: `An appointment with ${newAppt.doctorName} at ${newAppt.clinicName} has been recorded for ${new Date(newAppt.dateTime).toLocaleDateString()} at ${new Date(newAppt.dateTime).toLocaleTimeString()}.\n\nPreparation Notes: ${newAppt.preparationNotes || "None provided."}`,
    actionUrl: "/caregiver",
    actionText: "Review Appointment Details",
  });

  return newAppt;
}

export function updateAppointment(
  id: string,
  updates: Partial<Omit<DoctorAppointment, "id" | "seniorId">>
): DoctorAppointment | null {
  const index = appointments.findIndex((a) => a.id === id);
  if (index === -1) return null;
  appointments[index] = { ...appointments[index], ...updates };
  return appointments[index];
}

export function getAlerts(): CaregiverAlert[] {
  return [...alerts];
}

/**
 * Triggers automated caregiver escalation when an elderly person misses medication
 */
export async function triggerEscalation(
  doseId: string,
  reason = "Dose elapsed without senior confirmation"
): Promise<CaregiverAlert | null> {
  const dose = doses.find((d) => d.id === doseId);
  if (!dose) return null;

  dose.status = "MISSED";

  const alert: CaregiverAlert = {
    id: `alert_${Date.now()}`,
    seniorId: INITIAL_SENIOR.id,
    medicationId: dose.medicationId,
    title: `Missed Medication Alert: ${dose.medicationName}`,
    message: `${INITIAL_SENIOR.name} has not confirmed their ${dose.scheduledTime} dose of ${dose.medicationName} (${dose.dosage}). Reason: ${reason}`,
    type: "MISSED_DOSE",
    severity: "CRITICAL",
    triggeredAt: new Date().toISOString(),
    resolved: false,
    recipients: ["sarah.vance@caregiver.example.com"],
  };

  alerts.unshift(alert);

  // Proactively send automated alert email to primary caregiver
  await sendProactiveEmail({
    to: alert.recipients,
    subject: `[URGENT] Missed Dose Alert for ${INITIAL_SENIOR.name}: ${dose.medicationName}`,
    headline: `Missed Medication Escalation: ${dose.medicationName}`,
    bodyText: `Dear Dr. Sarah Vance,\n\nOur system detected that Eleanor Vance has not confirmed taking her scheduled ${dose.scheduledTime} dose of ${dose.medicationName} (${dose.dosage}).\n\nPlease check in with her or confirm whether she took her medication.\n\nTime of Alert: ${new Date().toLocaleTimeString()}`,
    actionUrl: "/caregiver",
    actionText: "Acknowledge in Caregiver Dashboard",
  });

  return alert;
}

export function getAdherenceMetrics(): AdherenceMetrics {
  const total = doses.length;
  const taken = doses.filter((d) => d.status === "TAKEN").length;
  const missed = doses.filter((d) => d.status === "MISSED").length;
  const snoozed = doses.filter((d) => d.status === "SNOOZED").length;

  const rate = total > 0 ? Math.round((taken / total) * 100) : 100;

  return {
    totalScheduled: total,
    totalTaken: taken,
    totalMissed: missed,
    totalSnoozed: snoozed,
    adherenceRate: rate,
    currentStreakDays: 12, // Realistic active streak
  };
}
