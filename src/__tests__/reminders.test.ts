import { describe, it, expect } from "vitest";
import { sendProactiveEmail, getEmailAuditLog } from "@/lib/email";
import { triggerEscalation, getAlerts, getTodayDoses } from "@/lib/db";

describe("Proactive Notification & Caregiver Escalation Suite", () => {
  it("dispatches and records a proactive email reminder", async () => {
    const payload = {
      to: "sarah.vance@caregiver.example.com",
      subject: "Test Upcoming Medication Dose Reminder",
      headline: "Dose Reminder",
      bodyText: "Eleanor Vance has a scheduled dose of Lisinopril in 15 minutes.",
    };

    const record = await sendProactiveEmail(payload);
    expect(record.id).toBeDefined();
    expect(record.to).toContain("sarah.vance@caregiver.example.com");
    expect(record.subject).toBe(payload.subject);

    const log = getEmailAuditLog();
    expect(log.some((entry) => entry.id === record.id)).toBe(true);
  });

  it("triggers automated caregiver escalation for a missed dose", async () => {
    const doses = getTodayDoses();
    const targetDose = doses[0];

    const alert = await triggerEscalation(targetDose.id, "Testing missed medication escalation");
    expect(alert).toBeDefined();
    expect(alert?.severity).toBe("CRITICAL");
    expect(alert?.type).toBe("MISSED_DOSE");
    expect(alert?.recipients).toContain("sarah.vance@caregiver.example.com");

    const alerts = getAlerts();
    expect(alerts.some((a) => a.id === alert?.id)).toBe(true);
  });
});
