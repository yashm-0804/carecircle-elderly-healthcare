import { Medication, DoseRecord, DoctorAppointment, CaregiverAlert, AdherenceMetrics, UserProfile } from "@/types";

/**
 * Driven / Outbound Repository Ports
 * These interfaces decouple the core healthcare domain from database technologies.
 */

export interface IMedicationRepository {
  findAll(): Promise<Medication[]>;
  findById(id: string): Promise<Medication | null>;
  save(medication: Medication): Promise<Medication>;
  update(id: string, updates: Partial<Omit<Medication, "id" | "seniorId">>): Promise<Medication | null>;
  delete(id: string): Promise<boolean>;
}

export interface IDoseRepository {
  findTodayDoses(): Promise<DoseRecord[]>;
  findById(id: string): Promise<DoseRecord | null>;
  save(dose: DoseRecord): Promise<DoseRecord>;
  update(dose: DoseRecord): Promise<DoseRecord>;
  deleteByMedicationId(medicationId: string): Promise<void>;
  getMetrics(): Promise<AdherenceMetrics>;
}

export interface IAppointmentRepository {
  findAll(): Promise<DoctorAppointment[]>;
  findById(id: string): Promise<DoctorAppointment | null>;
  save(appointment: DoctorAppointment): Promise<DoctorAppointment>;
  update(id: string, updates: Partial<Omit<DoctorAppointment, "id" | "seniorId">>): Promise<DoctorAppointment | null>;
}

export interface IAlertRepository {
  findAll(): Promise<CaregiverAlert[]>;
  save(alert: CaregiverAlert): Promise<CaregiverAlert>;
}

export interface IUserRepository {
  getSeniorProfile(): Promise<UserProfile>;
  getCareCircleMembers(): Promise<UserProfile[]>;
}
