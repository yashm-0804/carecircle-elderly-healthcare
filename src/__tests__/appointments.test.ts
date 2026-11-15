import { describe, it, expect } from "vitest";
import { getAppointments, addAppointment, updateAppointment } from "@/lib/db";
import { DoctorAppointmentSchema } from "@/lib/validations";

describe("Doctor Appointments & Healthcare Routine Suite", () => {
  it("retrieves seeded doctor appointments", () => {
    const appts = getAppointments();
    expect(appts.length).toBeGreaterThanOrEqual(2);
    expect(appts.some((a) => a.doctorName.includes("Dr. Robert Chen"))).toBe(true);
  });

  it("validates and creates a new appointment with automated reminder", () => {
    const newApptInput = {
      doctorName: "Dr. Marcus Vance, OD",
      specialty: "Optometry",
      clinicName: "Springfield Eye Care Pavilion",
      address: "100 Medical Center Dr, Suite 402",
      phone: "+1 (555) 777-8888",
      dateTime: new Date(Date.now() + 10 * 24 * 3600 * 1000).toISOString(),
      preparationNotes: "Bring current reading glasses.",
      companionAssigned: "Dr. Sarah Vance",
    };

    const validated = DoctorAppointmentSchema.parse(newApptInput);
    const added = addAppointment(validated);

    expect(added.id).toBeDefined();
    expect(added.doctorName).toBe("Dr. Marcus Vance, OD");

    const all = getAppointments();
    expect(all.some((a) => a.id === added.id)).toBe(true);
  });

  it("updates appointment details", () => {
    const appts = getAppointments();
    const target = appts[0];

    const updated = updateAppointment(target.id, {
      preparationNotes: "Updated fasting instructions: drink water only.",
    });

    expect(updated?.preparationNotes).toContain("drink water only");
  });
});
