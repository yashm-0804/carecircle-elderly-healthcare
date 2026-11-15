import { describe, it, expect } from "vitest";
import { sanitizeText, sanitizeObject } from "@/lib/sanitize";

describe("Input Sanitization & XSS Prevention Suite", () => {
  it("strips HTML tags from user input", () => {
    const malicious = '<script>alert("XSS")</script>Hello World';
    expect(sanitizeText(malicious)).toBe('alert("XSS")Hello World');
  });

  it("strips inline event handlers", () => {
    const input = '<img onerror=alert(1) src="x">';
    expect(sanitizeText(input)).not.toContain("onerror");
  });

  it("strips javascript: URIs", () => {
    const input = "Click here: javascript:alert(1)";
    expect(sanitizeText(input)).not.toContain("javascript:");
  });

  it("preserves clean text unchanged", () => {
    const clean = "Take 1 tablet with breakfast and water.";
    expect(sanitizeText(clean)).toBe(clean);
  });

  it("sanitizes all string fields in an object", () => {
    const obj = {
      name: '<b>Metformin</b>',
      instructions: '<script>steal()</script>Take with food',
      count: 30,
    };
    const sanitized = sanitizeObject(obj);
    expect(sanitized.name).toBe("Metformin");
    expect(sanitized.instructions).toBe("steal()Take with food");
    expect(sanitized.count).toBe(30); // non-string preserved
  });
});
