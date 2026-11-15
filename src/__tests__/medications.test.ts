import { describe, it, expect } from "vitest";
import {
  getMedications,
  addMedication,
  updateMedication,
  deleteMedication,
  getTodayDoses,
  recordDoseAction,
  getAdherenceMetrics,
} from "@/lib/db";
import { MedicationSchema } from "@/lib/validations";

describe("Medication Management & Adherence Suite", () => {
  it("retrieves seeded elderly medications", () => {
    const meds = getMedications();
    expect(meds.length).toBeGreaterThanOrEqual(4);
    expect(meds.some((m) => m.name.includes("Metformin"))).toBe(true);
    expect(meds.some((m) => m.name.includes("Lisinopril"))).toBe(true);
  });

  it("validates and adds a new medication schedule", () => {
    const newMedInput = {
      name: "Amlodipine Besylate",
      dosage: "5 mg",
      form: "TABLET" as const,
      scheduleTime: "09:00",
      timeOfDay: "MORNING" as const,
      instructions: "Take with breakfast.",
      isCritical: false,
      pillColor: "White",
      pillShape: "Round",
      refillCount: 30,
    };

    const validated = MedicationSchema.parse(newMedInput);
    const added = addMedication(validated);

    expect(added.id).toBeDefined();
    expect(added.name).toBe("Amlodipine Besylate");

    const allMeds = getMedications();
    expect(allMeds.some((m) => m.name === "Amlodipine Besylate")).toBe(true);
  });

  it("records a dose action as TAKEN and updates adherence", () => {
    const doses = getTodayDoses();
    const scheduledDose = doses.find((d) => d.status === "SCHEDULED");
    expect(scheduledDose).toBeDefined();

    if (scheduledDose) {
      const updated = recordDoseAction(scheduledDose.id, "TAKEN", "VISION_AI", "Verified via Pill Lens");
      expect(updated?.status).toBe("TAKEN");
      expect(updated?.verifiedVia).toBe("VISION_AI");
      expect(updated?.takenAt).toBeDefined();

      const metrics = getAdherenceMetrics();
      expect(metrics.totalTaken).toBeGreaterThanOrEqual(1);
      expect(metrics.adherenceRate).toBeGreaterThan(0);
    }
  });

  it("updates and deletes a medication", () => {
    const meds = getMedications();
    const target = meds[meds.length - 1];

    const updated = updateMedication(target.id, { instructions: "Updated instruction note" });
    expect(updated?.instructions).toBe("Updated instruction note");

    const deleted = deleteMedication(target.id);
    expect(deleted).toBe(true);
  });
});
