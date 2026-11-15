import { IDomainEvent } from "../../domain/events/domain-event.base";

export type DomainEventHandler<T extends IDomainEvent = IDomainEvent> = (event: T) => Promise<void> | void;

/**
 * In-Memory Domain Event Bus
 * Core primitive of Event-Driven Architecture (EDA).
 * Allows use cases to publish state changes while decoupling listeners (notifications, logs, analytics).
 */
export class DomainEventBus {
  private static instance: DomainEventBus;
  private handlers: Map<string, DomainEventHandler[]> = new Map();

  public static getInstance(): DomainEventBus {
    if (!DomainEventBus.instance) {
      DomainEventBus.instance = new DomainEventBus();
    }
    return DomainEventBus.instance;
  }

  /**
   * Subscribe a listener to a specific domain event name
   */
  public subscribe<T extends IDomainEvent>(eventName: string, handler: DomainEventHandler<T>): void {
    const existing = this.handlers.get(eventName) || [];
    existing.push(handler as DomainEventHandler);
    this.handlers.set(eventName, existing);
  }

  /**
   * Publish a domain event to all registered listeners asynchronously
   */
  public async publish(event: IDomainEvent): Promise<void> {
    const listeners = this.handlers.get(event.eventName) || [];
    // Execute all registered listeners non-blockingly
    await Promise.allSettled(listeners.map((listener) => listener(event)));
  }

  /**
   * Clear all handlers (useful in test teardown)
   */
  public clear(): void {
    this.handlers.clear();
  }
}
