/**
 * Bot protection helpers:
 * 1. Honeypot check (always active, zero external dependencies).
 * 2. Optional Cloudflare Turnstile verification when TURNSTILE_SECRET_KEY is configured.
 */

export async function verifyTurnstileToken(
  token: string,
  clientIp: string
): Promise<{ ok: boolean; configured: boolean }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secretKey) {
    return { ok: true, configured: false };
  }

  if (!token) {
    return { ok: false, configured: true };
  }

  const formData = new URLSearchParams();
  formData.append("secret", secretKey);
  formData.append("response", token);
  if (clientIp && clientIp !== "unknown") {
    formData.append("remoteip", clientIp);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return { ok: false, configured: true };
  }

  const outcome = (await response.json()) as { success?: boolean };
  return { ok: Boolean(outcome.success), configured: true };
}
