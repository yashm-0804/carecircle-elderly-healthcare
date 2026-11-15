/**
 * Input Sanitization Utility
 * Strips HTML tags and dangerous characters from freeform text inputs
 * to prevent Stored XSS attacks in notes, instructions, and prep fields.
 */

/**
 * Strips all HTML tags and trims whitespace from a string
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/javascript:/gi, "") // Strip javascript: URIs
    .replace(/on\w+\s*=/gi, "") // Strip inline event handlers
    .trim();
}

/**
 * Sanitizes all string values in an object (shallow)
 */
export function sanitizeObject<T extends Record<string, unknown>>(
  obj: T
): T {
  const sanitized = { ...obj };
  for (const key in sanitized) {
    if (typeof sanitized[key] === "string") {
      (sanitized as Record<string, unknown>)[key] = sanitizeText(
        sanitized[key] as string
      );
    }
  }
  return sanitized;
}
