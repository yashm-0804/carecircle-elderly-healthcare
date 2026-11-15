import { describe, it, expect } from "vitest";
import {
  PasscodeAuthSchema,
  MedicationSchema,
  DoseActionSchema,
  DoctorAppointmentSchema,
  EscalationTriggerSchema,
} from "@/lib/validations";

describe("Input Validation Edge Cases & Security Boundary Tests", () => {
  // Auth schema edge cases
  it("rejects passcode with special characters (SQL injection pattern)", () => {
    const result = PasscodeAuthSchema.safeParse({ passcode: "'; DROP" });
    expect(result.success).toBe(false);
  });

  it("rejects passcode with XSS characters", () => {
    const result = PasscodeAuthSchema.safeParse({ passcode: "<scr" });
    expect(result.success).toBe(false);
  });

  it("rejects empty passcode string", () => {
    const result = PasscodeAuthSchema.safeParse({ passcode: "" });
    expect(result.success).toBe(false);
  });

  it("accepts maximum-length valid alphanumeric passcode", () => {
    const result = PasscodeAuthSchema.safeParse({ passcode: "123456789012" });
    expect(result.success).toBe(true);
  });

  it("rejects passcode exceeding max length", () => {
    const result = PasscodeAuthSchema.safeParse({ passcode: "1234567890123" });
    expect(result.success).toBe(false);
  });

  // Medication schema edge cases
  it("rejects medication with invalid time format 25:99", () => {
    const result = MedicationSchema.safeParse({
      name: "TestMed",
      dosage: "10mg",
      form: "TABLET",
      scheduleTime: "25:99",
      timeOfDay: "MORNING",
      instructions: "Take with food",
      pillColor: "White",
      pillShape: "Round",
    });
    expect(result.success).toBe(false);
  });

  it("rejects medication with boundary time 24:00", () => {
    const result = MedicationSchema.safeParse({
      name: "TestMed",
      dosage: "10mg",
      form: "TABLET",
      scheduleTime: "24:00",
      timeOfDay: "MORNING",
      instructions: "Take with food",
      pillColor: "White",
      pillShape: "Round",
    });
    expect(result.success).toBe(false);
  });

  it("accepts valid boundary time 23:59", () => {
    const result = MedicationSchema.safeParse({
      name: "TestMed",
      dosage: "10mg",
      form: "TABLET",
      scheduleTime: "23:59",
      timeOfDay: "BEDTIME",
      instructions: "Take before sleep",
      pillColor: "Blue",
      pillShape: "Round",
    });
    expect(result.success).toBe(true);
  });

  it("rejects medication with invalid form type", () => {
    const result = MedicationSchema.safeParse({
      name: "TestMed",
      dosage: "10mg",
      form: "PATCH", // invalid enum
      scheduleTime: "08:00",
      timeOfDay: "MORNING",
      instructions: "Apply to skin",
      pillColor: "Clear",
      pillShape: "Square",
    });
    expect(result.success).toBe(false);
  });

  // Dose action edge cases
  it("rejects dose action with empty doseId", () => {
    const result = DoseActionSchema.safeParse({ doseId: "", action: "TAKEN" });
    expect(result.success).toBe(false);
  });

  it("rejects dose action with invalid action value", () => {
    const result = DoseActionSchema.safeParse({ doseId: "dose_01", action: "DESTROYED" });
    expect(result.success).toBe(false);
  });

  it("rejects notes exceeding 250 characters", () => {
    const result = DoseActionSchema.safeParse({
      doseId: "dose_01",
      action: "TAKEN",
      notes: "x".repeat(251),
    });
    expect(result.success).toBe(false);
  });

  // Appointment schema edge cases
  it("rejects appointment with invalid ISO datetime", () => {
    const result = DoctorAppointmentSchema.safeParse({
      doctorName: "Dr. Test",
      specialty: "General",
      clinicName: "Test Clinic",
      address: "123 Test St",
      phone: "1234567",
      dateTime: "not-a-date",
    });
    expect(result.success).toBe(false);
  });

  // Escalation schema edge cases
  it("rejects escalation with missing doseId", () => {
    const result = EscalationTriggerSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
