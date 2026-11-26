/**
 * Strict server-side validation and sanitization for /api/contact payloads.
 * Supports both the simplified 4-field inquiry form (Name, Email, optional Company,
 * Business Problem) and optional legacy metadata fields when provided.
 */

export const CONTACT_LIMITS = {
  name: 120,
  email: 254,
  phone: 25,
  businessName: 150,
  businessType: 120,
  challenge: 1500,
  automation: 250,
} as const;

export const ALLOWED_TEAM_SIZES = new Set([
  "",
  "Just me",
  "2-5",
  "6-10",
  "11-25",
  "25+",
]);

export const ALLOWED_BUDGETS = new Set([
  "",
  "Just exploring",
  "Under ₹25000",
  "₹25000 - ₹50000",
  "₹50000 - ₹100000",
  "₹100000+",
  "Not sure",
]);

const ALLOWED_KEYS = new Set([
  "businessName",
  "businessType",
  "teamSize",
  "challenge",
  "automation",
  "budget",
  "name",
  "email",
  "phone",
  "website", // honeypot field
  "turnstileToken", // optional Cloudflare Turnstile token
]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[+\d][\d\s\-().]{6,24}$/;

export interface ValidatedContactPayload {
  businessName: string;
  businessType: string;
  teamSize: string;
  challenge: string;
  automation: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  turnstileToken: string;
}

export type ValidationResult =
  | { ok: true; data: ValidatedContactPayload }
  | { ok: false; error: string };

/**
 * Strips ASCII control characters and collapses CR/LF in single-line fields
 * to prevent header/log injection.
 */
function sanitizeSingleLine(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\r\n\x00-\x1F\x7F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Strips dangerous control characters from multi-line text while preserving newlines.
 */
function sanitizeMultiLine(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim();
}

export function validateContactPayload(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, error: "Invalid request payload." };
  }

  const record = raw as Record<string, unknown>;

  for (const key of Object.keys(record)) {
    if (!ALLOWED_KEYS.has(key)) {
      return { ok: false, error: "Unexpected field in request payload." };
    }
  }

  const website = sanitizeSingleLine(record.website);
  const turnstileToken = sanitizeSingleLine(record.turnstileToken);

  const name = sanitizeSingleLine(record.name);
  const email = sanitizeSingleLine(record.email).toLowerCase();
  const phone = sanitizeSingleLine(record.phone);
  const businessName = sanitizeSingleLine(record.businessName);
  const businessType = sanitizeSingleLine(record.businessType);
  const teamSize = sanitizeSingleLine(record.teamSize);
  const challenge = sanitizeMultiLine(record.challenge);
  const budget = sanitizeSingleLine(record.budget);

  const rawAutomation = Array.isArray(record.automation)
    ? record.automation.map((item) => sanitizeSingleLine(item)).filter(Boolean).join(" + ")
    : sanitizeSingleLine(record.automation);

  if (!name) {
    return { ok: false, error: "Your name is required." };
  }
  if (name.length > CONTACT_LIMITS.name) {
    return { ok: false, error: `Name must be at most ${CONTACT_LIMITS.name} characters.` };
  }

  if (!email || email.length > CONTACT_LIMITS.email || !EMAIL_REGEX.test(email)) {
    return { ok: false, error: "Please provide a valid email address." };
  }

  if (businessName.length > CONTACT_LIMITS.businessName) {
    return { ok: false, error: `Company name must be at most ${CONTACT_LIMITS.businessName} characters.` };
  }

  if (!challenge) {
    return { ok: false, error: "Please tell us about your business problem." };
  }
  if (challenge.length > CONTACT_LIMITS.challenge) {
    return { ok: false, error: `Description must be at most ${CONTACT_LIMITS.challenge} characters.` };
  }

  if (businessType.length > CONTACT_LIMITS.businessType) {
    return { ok: false, error: `Business type must be at most ${CONTACT_LIMITS.businessType} characters.` };
  }

  if (!ALLOWED_TEAM_SIZES.has(teamSize)) {
    return { ok: false, error: "Please select a valid team size." };
  }

  if (rawAutomation.length > CONTACT_LIMITS.automation) {
    return { ok: false, error: `Project type must be at most ${CONTACT_LIMITS.automation} characters.` };
  }

  if (!ALLOWED_BUDGETS.has(budget)) {
    return { ok: false, error: "Please select a valid budget range." };
  }

  if (phone && (phone.length > CONTACT_LIMITS.phone || !PHONE_REGEX.test(phone))) {
    return { ok: false, error: "Please provide a valid phone number." };
  }

  return {
    ok: true,
    data: {
      businessName,
      businessType,
      teamSize,
      challenge,
      automation: rawAutomation,
      budget,
      name,
      email,
      phone,
      website,
      turnstileToken,
    },
  };
}
