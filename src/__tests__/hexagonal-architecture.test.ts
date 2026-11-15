import { describe, it, expect, vi } from "vitest";
import { DomainEventBus } from "@/core/application/event-bus/domain-event-bus";
import {
  DoseMarkedTakenEvent,
  DoseMissedEvent,
  CaregiverEscalationTriggeredEvent,
} from "@/core/domain/events/healthcare.events";
import { RecordDoseUseCase } from "@/core/application/use-cases/record-dose.use-case";
import { TriggerEscalationUseCase } from "@/core/application/use-cases/trigger-escalation.use-case";
import { ScheduleAppointmentUseCase } from "@/core/application/use-cases/schedule-appointment.use-case";
import {
  InMemoryDoseRepository,
  InMemoryAlertRepository,
  InMemoryUserRepository,
  InMemoryAppointmentRepository,
} from "@/core/infrastructure/adapters/in-memory-repositories.adapter";
import { INotificationService } from "@/core/domain/ports/notification.port";

describe("Hexagonal Architecture & Event-Driven Domain-Driven Design Suite", () => {
  it("DomainEventBus dispatches events to registered listeners", async () => {
    const bus = new DomainEventBus();
    const mockListener = vi.fn();

    bus.subscribe("HEALTHCARE.DOSE_MARKED_TAKEN", mockListener);

    const event = new DoseMarkedTakenEvent(
      "dose_test",
      "med_test",
      "Metformin",
      "usr_senior_01",
      "MANUAL",
      new Date()
    );

    await bus.publish(event);

    expect(mockListener).toHaveBeenCalledTimes(1);
    expect(mockListener).toHaveBeenCalledWith(event);
  });

  it("RecordDoseUseCase marks a dose TAKEN and publishes DoseMarkedTakenEvent", async () => {
    const bus = new DomainEventBus();
    const eventSpy = vi.fn();
    bus.subscribe("HEALTHCARE.DOSE_MARKED_TAKEN", eventSpy);

    const doseRepo = new InMemoryDoseRepository();
    const useCase = new RecordDoseUseCase(doseRepo, bus);

    const doses = await doseRepo.findTodayDoses();
    const targetDose = doses[0];

    const result = await useCase.execute({
      doseId: targetDose.id,
      action: "TAKEN",
      verifiedVia: "VOICE",
      notes: "Voice confirmed intake",
    });

    expect(result.dose.status).toBe("TAKEN");
    expect(result.dose.verifiedVia).toBe("VOICE");
    expect(result.metrics.adherenceRate).toBeGreaterThan(0);
    expect(eventSpy).toHaveBeenCalledTimes(1);
  });

  it("TriggerEscalationUseCase enforces missed dose escalation, creates alert, dispatches email, and fires domain event", async () => {
    const bus = new DomainEventBus();
    const eventSpy = vi.fn();
    bus.subscribe("HEALTHCARE.CAREGIVER_ESCALATION_TRIGGERED", eventSpy);

    const mockNotificationService: INotificationService = {
      dispatchEmail: vi.fn().mockResolvedValue({
        id: "email_mock_1",
        to: ["sarah.vance@caregiver.example.com"],
        subject: "Urgent Escalation",
        sentAt: new Date().toISOString(),
        status: "SIMULATED",
        deliveryProvider: "Mock",
      }),
      getAuditLogs: vi.fn().mockResolvedValue([]),
    };

    const doseRepo = new InMemoryDoseRepository();
    const alertRepo = new InMemoryAlertRepository();
    const userRepo = new InMemoryUserRepository();

    const useCase = new TriggerEscalationUseCase(
      doseRepo,
      alertRepo,
      userRepo,
      mockNotificationService,
      bus
    );

    const doses = await doseRepo.findTodayDoses();
    const target = doses[0];

    const alert = await useCase.execute({
      doseId: target.id,
      reason: "Unit test simulated missed medication",
    });

    expect(alert).toBeDefined();
    expect(alert.severity).toBe("CRITICAL");
    expect(mockNotificationService.dispatchEmail).toHaveBeenCalledTimes(1);
    expect(eventSpy).toHaveBeenCalledTimes(1);
  });

  it("ScheduleAppointmentUseCase records appointment, dispatches notification, and publishes event", async () => {
    const bus = new DomainEventBus();
    const eventSpy = vi.fn();
    bus.subscribe("HEALTHCARE.APPOINTMENT_SCHEDULED", eventSpy);

    const mockNotificationService: INotificationService = {
      dispatchEmail: vi.fn().mockResolvedValue({
        id: "email_mock_2",
        to: ["sarah.vance@caregiver.example.com"],
        subject: "Appointment Scheduled",
        sentAt: new Date().toISOString(),
        status: "SIMULATED",
        deliveryProvider: "Mock",
      }),
      getAuditLogs: vi.fn().mockResolvedValue([]),
    };

    const apptRepo = new InMemoryAppointmentRepository();
    const userRepo = new InMemoryUserRepository();

    const useCase = new ScheduleAppointmentUseCase(
      apptRepo,
      userRepo,
      mockNotificationService,
      bus
    );

    const appt = await useCase.execute({
      doctorName: "Dr. Evelyn Reed",
      specialty: "Neurology",
      clinicName: "Memory & Cognitive Health Clinic",
      address: "220 Brain Health Way",
      phone: "+1 (555) 321-4321",
      dateTime: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(),
      preparationNotes: "Bring previous cognitive assessment notes.",
      companionAssigned: "Dr. Sarah Vance",
    });

    expect(appt.id).toBeDefined();
    expect(appt.doctorName).toBe("Dr. Evelyn Reed");
    expect(mockNotificationService.dispatchEmail).toHaveBeenCalledTimes(1);
    expect(eventSpy).toHaveBeenCalledTimes(1);
  });
});
