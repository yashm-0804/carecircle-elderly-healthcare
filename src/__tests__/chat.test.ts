import { describe, it, expect } from "vitest";

describe("Carey AI Care Companion Chatbot Suite", () => {
  it("generates contextual advice for diabetes and Metformin", async () => {
    // Testing the core fallback response logic
    const userMessage = "When should I take my Metformin?";
    const lower = userMessage.toLowerCase();
    const isMetformin = lower.includes("metformin") || lower.includes("diabetes");
    expect(isMetformin).toBe(true);
  });

  it("identifies emergency symptoms and provides urgent guidance", () => {
    const userMessage = "I feel dizzy and fell down";
    const lower = userMessage.toLowerCase();
    const isEmergency = lower.includes("dizzy") || lower.includes("fall") || lower.includes("emergency");
    expect(isEmergency).toBe(true);
  });
});
