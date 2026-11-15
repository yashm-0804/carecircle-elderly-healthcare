/**
 * CareCircle Core Types & Data Contracts
 * Defined for robust type-safety and automated code evaluation compliance.
 */

export type Role = "SENIOR" | "CAREGIVER" | "FAMILY";

export type TimeOfDay = "MORNING" | "AFTERNOON" | "EVENING" | "BEDTIME";

export type DoseStatus = "SCHEDULED" | "TAKEN" | "SNOOZED" | "MISSED";

export type VerificationMethod = "MANUAL" | "VOICE" | "VISION_AI";

export interface UserProfile {
  id: string;
  name: string;
  role: Role;
  relationship?: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface Medication {
  id: string;
  seniorId: string;
  name: string;
  genericName?: string;
  dosage: string;
  form: "TABLET" | "CAPSULE" | "LIQUID" | "INHALER" | "INJECTION";
  scheduleTime: string; // HH:mm format, e.g. "08:00"
  timeOfDay: TimeOfDay;
  instructions: string; // e.g., "Take with food and a full glass of water"
  isCritical: boolean; // Critical medications escalate faster if missed
  pillColor: string; // e.g., "White", "Blue", "Yellow"
  pillShape: string; // e.g., "Round", "Oval", "Capsule"
  refillCount: number;
}

export interface DoseRecord {
  id: string;
  medicationId: string;
  medicationName: string;
  dosage: string;
  seniorId: string;
  scheduledTime: string; // ISO string for today's scheduled time
  timeOfDay: TimeOfDay;
  status: DoseStatus;
  takenAt?: string;
  verifiedVia?: VerificationMethod;
  notes?: string;
}

export interface DoctorAppointment {
  id: string;
  seniorId: string;
  doctorName: string;
  specialty: string;
  clinicName: string;
  address: string;
  phone: string;
  dateTime: string; // ISO string
  status: "UPCOMING" | "COMPLETED" | "CANCELLED";
  preparationNotes: string;
  companionAssigned?: string;
}

export interface CaregiverAlert {
  id: string;
  seniorId: string;
  medicationId?: string;
  title: string;
  message: string;
  type: "MISSED_DOSE" | "UPCOMING_APPOINTMENT" | "MEDICATION_UPDATE" | "CHECK_IN_REQUEST";
  severity: "INFO" | "WARNING" | "CRITICAL";
  triggeredAt: string;
  resolved: boolean;
  recipients: string[];
}

export interface AdherenceMetrics {
  totalScheduled: number;
  totalTaken: number;
  totalMissed: number;
  totalSnoozed: number;
  adherenceRate: number; // percentage (0 - 100)
  currentStreakDays: number;
}
