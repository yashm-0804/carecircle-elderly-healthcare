import {
  IMedicationRepository,
  IDoseRepository,
  IAppointmentRepository,
  IAlertRepository,
  IUserRepository,
} from "../../domain/ports/repositories.port";
import {
  Medication,
  DoseRecord,
  DoctorAppointment,
  CaregiverAlert,
  AdherenceMetrics,
  UserProfile,
} from "@/types";
import {
  getMedications,
  addMedication,
  updateMedication,
  deleteMedication,
  getTodayDoses,
  recordDoseAction,
  getAppointments,
  addAppointment,
  updateAppointment,
  getAlerts,
  getAdherenceMetrics,
  getSeniorProfile,
} from "@/lib/db";
import { getCareCircleMembers } from "@/lib/auth";

export class InMemoryMedicationRepository implements IMedicationRepository {
  async findAll(): Promise<Medication[]> {
    return getMedications();
  }

  async findById(id: string): Promise<Medication | null> {
    const meds = getMedications();
    return meds.find((m) => m.id === id) || null;
  }

  async save(medication: Medication): Promise<Medication> {
    return addMedication(medication);
  }

  async update(id: string, updates: Partial<Omit<Medication, "id" | "seniorId">>): Promise<Medication | null> {
    return updateMedication(id, updates);
  }

  async delete(id: string): Promise<boolean> {
    return deleteMedication(id);
  }
}

export class InMemoryDoseRepository implements IDoseRepository {
  async findTodayDoses(): Promise<DoseRecord[]> {
    return getTodayDoses();
  }

  async findById(id: string): Promise<DoseRecord | null> {
    const doses = getTodayDoses();
    return doses.find((d) => d.id === id) || null;
  }

  async save(dose: DoseRecord): Promise<DoseRecord> {
    // In our database implementation, addMedication automatically creates initial scheduled doses
    return dose;
  }

  async update(dose: DoseRecord): Promise<DoseRecord> {
    const result = recordDoseAction(
      dose.id,
      dose.status as "TAKEN" | "SNOOZED" | "MISSED",
      dose.verifiedVia,
      dose.notes
    );
    if (!result) throw new Error(`Could not update dose ${dose.id}`);
    return result;
  }

  async deleteByMedicationId(medicationId: string): Promise<void> {
    deleteMedication(medicationId);
  }

  async getMetrics(): Promise<AdherenceMetrics> {
    return getAdherenceMetrics();
  }
}

export class InMemoryAppointmentRepository implements IAppointmentRepository {
  async findAll(): Promise<DoctorAppointment[]> {
    return getAppointments();
  }

  async findById(id: string): Promise<DoctorAppointment | null> {
    const appts = getAppointments();
    return appts.find((a) => a.id === id) || null;
  }

  async save(appointment: DoctorAppointment): Promise<DoctorAppointment> {
    return addAppointment(appointment);
  }

  async update(id: string, updates: Partial<Omit<DoctorAppointment, "id" | "seniorId">>): Promise<DoctorAppointment | null> {
    return updateAppointment(id, updates);
  }
}

export class InMemoryAlertRepository implements IAlertRepository {
  async findAll(): Promise<CaregiverAlert[]> {
    return getAlerts();
  }

  async save(alert: CaregiverAlert): Promise<CaregiverAlert> {
    // Alert is recorded through database trigger or direct save
    return alert;
  }
}

export class InMemoryUserRepository implements IUserRepository {
  async getSeniorProfile(): Promise<UserProfile> {
    return getSeniorProfile();
  }

  async getCareCircleMembers(): Promise<UserProfile[]> {
    return getCareCircleMembers();
  }
}
