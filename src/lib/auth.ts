import crypto from "crypto";
import { Role, UserProfile } from "@/types";

/**
 * Passcode Authentication & Security Manager
 * Meets requirements for secure, passcode-based access for Senior, Caregiver, and Family.
 */

// Canonical registered passcodes and profiles for the shared care circle
const REGISTERED_ACCOUNTS: Array<{
  passcodeHash: string;
  salt: string;
  profile: UserProfile;
}> = [];

// Helper to hash passcodes with SHA-256 + salt
export function hashPasscode(passcode: string, salt: string): string {
  return crypto.createHmac("sha256", salt).update(passcode).digest("hex");
}

// Initial demo credentials
const INITIAL_PROFILES = [
  {
    passcode: "1234",
    salt: "senior_salt_2026",
    profile: {
      id: "usr_senior_01",
      name: "Eleanor Vance",
      role: "SENIOR" as Role,
      email: "eleanor.vance@example.com",
      avatar: "👵",
    },
  },
  {
    passcode: "9876",
    salt: "caregiver_salt_2026",
    profile: {
      id: "usr_caregiver_01",
      name: "Dr. Sarah Vance",
      role: "CAREGIVER" as Role,
      relationship: "Daughter & Primary Caregiver",
      email: "sarah.vance@caregiver.example.com",
      phone: "+1 (555) 234-5678",
      avatar: "👩‍⚕️",
    },
  },
  {
    passcode: "5555",
    salt: "family_salt_2026",
    profile: {
      id: "usr_family_01",
      name: "Leo Vance",
      role: "FAMILY" as Role,
      relationship: "Grandson",
      email: "leo.vance@family.example.com",
      avatar: "👦",
    },
  },
];

// Initialize in-memory credential store
INITIAL_PROFILES.forEach((item) => {
  REGISTERED_ACCOUNTS.push({
    passcodeHash: hashPasscode(item.passcode, item.salt),
    salt: item.salt,
    profile: item.profile,
  });
});

/**
 * Validates a passcode against registered accounts using constant-time comparison
 * to eliminate timing-attack vulnerabilities.
 */
export function verifyPasscode(inputPasscode: string): {
  success: boolean;
  profile?: UserProfile;
  error?: string;
} {
  for (const account of REGISTERED_ACCOUNTS) {
    const candidateHash = hashPasscode(inputPasscode, account.salt);
    const candidateBuffer = Buffer.from(candidateHash, "utf-8");
    const targetBuffer = Buffer.from(account.passcodeHash, "utf-8");

    if (
      candidateBuffer.length === targetBuffer.length &&
      crypto.timingSafeEqual(candidateBuffer, targetBuffer)
    ) {
      return { success: true, profile: account.profile };
    }
  }

  return { success: false, error: "Invalid passcode. Please verify your credentials." };
}

/**
 * Returns all active members in the shared care ecosystem
 */
export function getCareCircleMembers(): UserProfile[] {
  return REGISTERED_ACCOUNTS.map((a) => a.profile);
}
