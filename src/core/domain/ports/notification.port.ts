import { EmailDispatchPayload, DispatchedEmailRecord } from "@/lib/email";

/**
 * Outbound Notification Port
 * Decouples use cases and event handlers from specific email or SMS gateways.
 */
export interface INotificationService {
  dispatchEmail(payload: EmailDispatchPayload): Promise<DispatchedEmailRecord>;
  getAuditLogs(): Promise<DispatchedEmailRecord[]>;
}
