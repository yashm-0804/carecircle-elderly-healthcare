import { DomainEventBus } from "../application/event-bus/domain-event-bus";
import {
  InMemoryMedicationRepository,
  InMemoryDoseRepository,
  InMemoryAppointmentRepository,
  InMemoryAlertRepository,
  InMemoryUserRepository,
} from "./adapters/in-memory-repositories.adapter";
import { ResendEmailNotificationAdapter } from "./adapters/resend-email.adapter";
import { GeminiVisionAdapter } from "./adapters/gemini-vision.adapter";
import { RecordDoseUseCase } from "../application/use-cases/record-dose.use-case";
import { TriggerEscalationUseCase } from "../application/use-cases/trigger-escalation.use-case";
import { ScheduleAppointmentUseCase } from "../application/use-cases/schedule-appointment.use-case";

/**
 * Dependency Injection (DI) Composition Root
 * Wires together Ports and Adapters to instantiate application use cases as singletons.
 */
class ServiceContainer {
  // Event Bus
  public readonly eventBus: DomainEventBus = DomainEventBus.getInstance();

  // Driven Adapters (Repositories & Services)
  public readonly medicationRepo = new InMemoryMedicationRepository();
  public readonly doseRepo = new InMemoryDoseRepository();
  public readonly appointmentRepo = new InMemoryAppointmentRepository();
  public readonly alertRepo = new InMemoryAlertRepository();
  public readonly userRepo = new InMemoryUserRepository();
  public readonly notificationService = new ResendEmailNotificationAdapter();
  public readonly visionService = new GeminiVisionAdapter();

  // Inbound Use Cases (Application Services)
  public readonly recordDoseUseCase = new RecordDoseUseCase(this.doseRepo, this.eventBus);
  public readonly triggerEscalationUseCase = new TriggerEscalationUseCase(
    this.doseRepo,
    this.alertRepo,
    this.userRepo,
    this.notificationService,
    this.eventBus
  );
  public readonly scheduleAppointmentUseCase = new ScheduleAppointmentUseCase(
    this.appointmentRepo,
    this.userRepo,
    this.notificationService,
    this.eventBus
  );

  constructor() {
    this.registerDomainEventListeners();
  }

  /**
   * Register reactive domain event listeners
   * Demonstrates asynchronous decoupling in Event-Driven Architecture (EDA).
   */
  private registerDomainEventListeners(): void {
    // Example: When a dose is taken, log an audit trail
    this.eventBus.subscribe("HEALTHCARE.DOSE_MARKED_TAKEN", async (event: any) => {
      console.log(
        `[DomainEvent: DOSE_MARKED_TAKEN] Senior ${event.seniorId} took ${event.medicationName} at ${event.takenAt}`
      );
    });

    // Example: When an escalation is triggered, log confirmation
    this.eventBus.subscribe("HEALTHCARE.CAREGIVER_ESCALATION_TRIGGERED", async (event: any) => {
      console.log(
        `[DomainEvent: CAREGIVER_ESCALATION] Escalated missed ${event.medicationName} to ${event.recipients.join(", ")}`
      );
    });
  }
}

// Global Singleton Export
export const container = new ServiceContainer();
