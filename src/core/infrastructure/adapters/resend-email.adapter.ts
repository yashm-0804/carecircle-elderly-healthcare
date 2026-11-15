import { INotificationService } from "../../domain/ports/notification.port";
import { EmailDispatchPayload, DispatchedEmailRecord, sendProactiveEmail, getEmailAuditLog } from "@/lib/email";

export class ResendEmailNotificationAdapter implements INotificationService {
  async dispatchEmail(payload: EmailDispatchPayload): Promise<DispatchedEmailRecord> {
    return sendProactiveEmail(payload);
  }

  async getAuditLogs(): Promise<DispatchedEmailRecord[]> {
    return getEmailAuditLog();
  }
}
