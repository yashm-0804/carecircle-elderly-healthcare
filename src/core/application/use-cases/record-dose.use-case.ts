import { IDoseRepository } from "../../domain/ports/repositories.port";
import { DomainEventBus } from "../event-bus/domain-event-bus";
import { DoseMarkedTakenEvent, DoseSnoozedEvent, DoseMissedEvent } from "../../domain/events/healthcare.events";
import { DoseRecord, DoseStatus, VerificationMethod, AdherenceMetrics } from "@/types";

export interface RecordDoseCommand {
  doseId: string;
  action: DoseStatus;
  verifiedVia?: VerificationMethod;
  notes?: string;
}

export interface RecordDoseResult {
  dose: DoseRecord;
  metrics: AdherenceMetrics;
}

export class RecordDoseUseCase {
  constructor(
    private readonly doseRepo: IDoseRepository,
    private readonly eventBus: DomainEventBus
  ) {}

  public async execute(command: RecordDoseCommand): Promise<RecordDoseResult> {
    const dose = await this.doseRepo.findById(command.doseId);
    if (!dose) {
      throw new Error(`Dose with ID '${command.doseId}' not found.`);
    }

    dose.status = command.action;
    dose.verifiedVia = command.verifiedVia || "MANUAL";
    dose.notes = command.notes;

    if (command.action === "TAKEN") {
      dose.takenAt = new Date().toISOString();
      const updated = await this.doseRepo.update(dose);

      // Publish Domain Event for reactive listeners
      await this.eventBus.publish(
        new DoseMarkedTakenEvent(
          updated.id,
          updated.medicationId,
          updated.medicationName,
          updated.seniorId,
          updated.verifiedVia || "MANUAL",
          new Date(updated.takenAt || Date.now())
        )
      );

      const metrics = await this.doseRepo.getMetrics();
      return { dose: updated, metrics };
    }

    if (command.action === "SNOOZED") {
      const updated = await this.doseRepo.update(dose);
      await this.eventBus.publish(
        new DoseSnoozedEvent(updated.id, updated.medicationName, 15)
      );
      const metrics = await this.doseRepo.getMetrics();
      return { dose: updated, metrics };
    }

    if (command.action === "MISSED") {
      const updated = await this.doseRepo.update(dose);
      await this.eventBus.publish(
        new DoseMissedEvent(
          updated.id,
          updated.medicationId,
          updated.medicationName,
          updated.seniorId,
          updated.scheduledTime,
          command.notes || "Senior intake window elapsed without confirmation"
        )
      );
      const metrics = await this.doseRepo.getMetrics();
      return { dose: updated, metrics };
    }

    const updated = await this.doseRepo.update(dose);
    const metrics = await this.doseRepo.getMetrics();
    return { dose: updated, metrics };
  }
}
