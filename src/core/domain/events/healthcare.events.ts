import { BaseDomainEvent } from "./domain-event.base";
import { VerificationMethod, TimeOfDay } from "@/types";

/**
 * Healthcare Domain Events
 * Fired when critical state transitions occur in the medication or care ecosystem.
 */

export class DoseMarkedTakenEvent extends BaseDomainEvent {
  constructor(
    public readonly doseId: string,
    public readonly medicationId: string,
    public readonly medicationName: string,
    public readonly seniorId: string,
    public readonly verifiedVia: VerificationMethod,
    public readonly takenAt: Date
  ) {
    super("HEALTHCARE.DOSE_MARKED_TAKEN", doseId);
  }
}

export class DoseMissedEvent extends BaseDomainEvent {
  constructor(
    public readonly doseId: string,
    public readonly medicationId: string,
    public readonly medicationName: string,
    public readonly seniorId: string,
    public readonly scheduledTime: string,
    public readonly reason: string
  ) {
    super("HEALTHCARE.DOSE_MISSED", doseId);
  }
}

export class DoseSnoozedEvent extends BaseDomainEvent {
  constructor(
    public readonly doseId: string,
    public readonly medicationName: string,
    public readonly snoozeMinutes: number
  ) {
    super("HEALTHCARE.DOSE_SNOOZED", doseId);
  }
}

export class CaregiverEscalationTriggeredEvent extends BaseDomainEvent {
  constructor(
    public readonly alertId: string,
    public readonly seniorId: string,
    public readonly medicationName: string,
    public readonly severity: "INFO" | "WARNING" | "CRITICAL",
    public readonly recipients: string[]
  ) {
    super("HEALTHCARE.CAREGIVER_ESCALATION_TRIGGERED", alertId);
  }
}

export class AppointmentScheduledEvent extends BaseDomainEvent {
  constructor(
    public readonly appointmentId: string,
    public readonly doctorName: string,
    public readonly specialty: string,
    public readonly dateTime: Date,
    public readonly seniorId: string
  ) {
    super("HEALTHCARE.APPOINTMENT_SCHEDULED", appointmentId);
  }
}
