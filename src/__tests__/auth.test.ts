import { describe, it, expect } from "vitest";
import { verifyPasscode, hashPasscode } from "@/lib/auth";
import { PasscodeAuthSchema } from "@/lib/validations";

describe("Passcode Security & Authentication Suite", () => {
  it("authenticates Senior Eleanor Vance with PIN 1234", () => {
    const result = verifyPasscode("1234");
    expect(result.success).toBe(true);
    expect(result.profile?.name).toBe("Eleanor Vance");
    expect(result.profile?.role).toBe("SENIOR");
  });

  it("authenticates Primary Caregiver Dr. Sarah Vance with PIN 9876", () => {
    const result = verifyPasscode("9876");
    expect(result.success).toBe(true);
    expect(result.profile?.name).toBe("Dr. Sarah Vance");
    expect(result.profile?.role).toBe("CAREGIVER");
  });

  it("authenticates Family Member Leo Vance with PIN 5555", () => {
    const result = verifyPasscode("5555");
    expect(result.success).toBe(true);
    expect(result.profile?.name).toBe("Leo Vance");
    expect(result.profile?.role).toBe("FAMILY");
  });

  it("rejects unauthorized passcodes with an error", () => {
    const result = verifyPasscode("0000");
    expect(result.success).toBe(false);
    expect(result.error).toContain("Invalid passcode");
  });

  it("validates passcode format with Zod schema (min 4 chars)", () => {
    const valid = PasscodeAuthSchema.safeParse({ passcode: "1234" });
    expect(valid.success).toBe(true);

    const invalid = PasscodeAuthSchema.safeParse({ passcode: "12" });
    expect(invalid.success).toBe(false);
  });
});
