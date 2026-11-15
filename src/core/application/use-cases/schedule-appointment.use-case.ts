import { IAppointmentRepository, IUserRepository } from "../../domain/ports/repositories.port";
import { INotificationService } from "../../domain/ports/notification.port";
import { DomainEventBus } from "../event-bus/domain-event-bus";
import { AppointmentScheduledEvent } from "../../domain/events/healthcare.events";
import { DoctorAppointment } from "@/types";

export interface ScheduleAppointmentCommand {
  doctorName: string;
  specialty: string;
  clinicName: string;
  address: string;
  phone: string;
  dateTime: string;
  preparationNotes?: string;
  companionAssigned?: string;
}

export class ScheduleAppointmentUseCase {
  constructor(
    private readonly appointmentRepo: IAppointmentRepository,
    private readonly userRepo: IUserRepository,
    private readonly notificationService: INotificationService,
    private readonly eventBus: DomainEventBus
  ) {}

  public async execute(command: ScheduleAppointmentCommand): Promise<DoctorAppointment> {
    const senior = await this.userRepo.getSeniorProfile();

    const appt: DoctorAppointment = {
      id: `appt_${Date.now()}`,
      seniorId: senior.id,
      doctorName: command.doctorName,
      specialty: command.specialty,
      clinicName: command.clinicName,
      address: command.address,
      phone: command.phone,
      dateTime: command.dateTime,
      status: "UPCOMING",
      preparationNotes: command.preparationNotes || "",
      companionAssigned: command.companionAssigned,
    };

    const saved = await this.appointmentRepo.save(appt);

    // Proactively dispatch email reminder
    await this.notificationService.dispatchEmail({
      to: ["sarah.vance@caregiver.example.com", senior.email],
      subject: `New Doctor Appointment Scheduled: ${saved.doctorName} (${saved.specialty})`,
      headline: "Doctor Appointment Scheduled",
      bodyText: `An appointment with ${saved.doctorName} at ${saved.clinicName} has been recorded for ${new Date(saved.dateTime).toLocaleDateString()} at ${new Date(saved.dateTime).toLocaleTimeString()}.\n\nPreparation Notes: ${saved.preparationNotes || "None provided."}`,
      actionUrl: "/caregiver",
      actionText: "Review Appointment Details",
    });

    await this.eventBus.publish(
      new AppointmentScheduledEvent(
        saved.id,
        saved.doctorName,
        saved.specialty,
        new Date(saved.dateTime),
        senior.id
      )
    );

    return saved;
  }
}
