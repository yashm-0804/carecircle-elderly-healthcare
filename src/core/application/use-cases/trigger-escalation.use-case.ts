import { IDoseRepository, IAlertRepository, IUserRepository } from "../../domain/ports/repositories.port";
import { INotificationService } from "../../domain/ports/notification.port";
import { DomainEventBus } from "../event-bus/domain-event-bus";
import { CaregiverEscalationTriggeredEvent } from "../../domain/events/healthcare.events";
import { CaregiverAlert } from "@/types";

export interface TriggerEscalationCommand {
  doseId: string;
  reason?: string;
}

export class TriggerEscalationUseCase {
  constructor(
    private readonly doseRepo: IDoseRepository,
    private readonly alertRepo: IAlertRepository,
    private readonly userRepo: IUserRepository,
    private readonly notificationService: INotificationService,
    private readonly eventBus: DomainEventBus
  ) {}

  public async execute(command: TriggerEscalationCommand): Promise<CaregiverAlert> {
    const dose = await this.doseRepo.findById(command.doseId);
    if (!dose) {
      throw new Error(`Dose with ID '${command.doseId}' not found to escalate.`);
    }

    const senior = await this.userRepo.getSeniorProfile();
    const reason = command.reason || "Scheduled dose elapsed without senior confirmation";

    dose.status = "MISSED";
    await this.doseRepo.update(dose);

    const alert: CaregiverAlert = {
      id: `alert_${Date.now()}`,
      seniorId: senior.id,
      medicationId: dose.medicationId,
      title: `Missed Medication Alert: ${dose.medicationName}`,
      message: `${senior.name} has not confirmed their ${dose.scheduledTime} dose of ${dose.medicationName} (${dose.dosage}). Reason: ${reason}`,
      type: "MISSED_DOSE",
      severity: "CRITICAL",
      triggeredAt: new Date().toISOString(),
      resolved: false,
      recipients: ["sarah.vance@caregiver.example.com"],
    };

    const savedAlert = await this.alertRepo.save(alert);

    // Proactively send automated alert email to primary caregiver
    await this.notificationService.dispatchEmail({
      to: alert.recipients,
      subject: `[URGENT] Missed Dose Alert for ${senior.name}: ${dose.medicationName}`,
      headline: `Missed Medication Escalation: ${dose.medicationName}`,
      bodyText: `Dear Dr. Sarah Vance,\n\nOur system detected that ${senior.name} has not confirmed taking her scheduled ${dose.scheduledTime} dose of ${dose.medicationName} (${dose.dosage}).\n\nPlease check in with her or confirm whether she took her medication.\n\nTime of Alert: ${new Date().toLocaleTimeString()}`,
      actionUrl: "/caregiver",
      actionText: "Acknowledge in Caregiver Dashboard",
    });

    // Publish domain event
    await this.eventBus.publish(
      new CaregiverEscalationTriggeredEvent(
        savedAlert.id,
        senior.id,
        dose.medicationName,
        "CRITICAL",
        alert.recipients
      )
    );

    return savedAlert;
  }
}
