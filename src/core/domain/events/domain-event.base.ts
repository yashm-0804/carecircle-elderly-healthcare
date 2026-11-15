/**
 * Base Domain Event
 * Core building block for Event-Driven Architecture (EDA).
 * Represents an immutable statement of something that happened in the healthcare domain.
 */
export interface IDomainEvent {
  readonly eventId: string;
  readonly eventName: string;
  readonly occurredOn: Date;
  readonly aggregateId?: string;
}

export abstract class BaseDomainEvent implements IDomainEvent {
  public readonly eventId: string;
  public readonly occurredOn: Date;

  constructor(
    public readonly eventName: string,
    public readonly aggregateId?: string
  ) {
    this.eventId = `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    this.occurredOn = new Date();
  }
}
