# AGENTRAA — PHASE 1: SECURITY HARDENING & DEPENDENCY REMEDIATION REPORT

**Project:** Agentraa (`https://www.agentraa.me/`)  
**Framework:** Next.js 16 (`16.4.6`, Turbopack)  
**Hosting:** Vercel (Retained)  
**Date:** 2026-11-26  
**Scope:** Phase 1 Only — Dependency Security, ESLint/TypeScript Cleanup, Contact API Hardening, Security Headers, and Verification.

---

## A. Executive Summary

Phase 1 security hardening and dependency remediation has been completed locally without altering the website's UI, layout, branding, logo, or Vercel hosting configuration.

- **Dependency Vulnerabilities:** Reduced from **13 vulnerabilities (1 critical, 5 high, 7 moderate)** to **0 vulnerabilities** (`npm audit`: `found 0 vulnerabilities`) by upgrading `next` and `eslint-config-next` from `16.3.0` to `16.4.6` and running `npm audit fix` (without `--force`). **Status: `VERIFIED FIXED`**.
- **ESLint & TypeScript:** Resolved all **12 ESLint errors** and **3 ESLint warnings**. `npm run lint` and `npx tsc --noEmit` both exit with code `0`. **Status: `VERIFIED FIXED`**.
- **Contact API Validation & Bot Honeypot:** Added strict server-side schema validation, field length caps, allowlists, sanitization, `Content-Type` (`415`) and payload size (`413`) enforcement, and a hidden honeypot field (`website`). **Status: `VERIFIED FIXED`**.
- **Rate Limiting:** Implemented a provider-independent `RateLimiter` interface (`UpstashRestRateLimiter` + `getClientIp()` for Vercel proxy headers). Because Upstash Redis credentials are not yet configured in `.env.local` / Vercel, production distributed rate limiting is **not yet active**. **Status: `NEEDS MANUAL CONFIGURATION`**.
- **Security Headers:** Configured `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, `Content-Security-Policy-Report-Only`, and production `Strict-Transport-Security` in `next.config.ts`. **Status: `VERIFIED FIXED`** (CSP is in `Report-Only` mode).

---

## B. Files Modified & Created

### Modified Files
1. [package.json](file:///y:/GIthubRepo/Agentraa/package.json) — Updated `next` and `eslint-config-next` from `16.3.0` to `16.4.6`.
2. [package-lock.json](file:///y:/GIthubRepo/Agentraa/package-lock.json) — Updated lockfile for `next@16.4.6`, `eslint-config-next@16.4.6`, and transitive security fixes (`npm audit fix`).
3. [next.config.ts](file:///y:/GIthubRepo/Agentraa/next.config.ts) — Added `headers()` configuration for security headers and `Content-Security-Policy-Report-Only`.
4. [src/app/api/contact/route.ts](file:///y:/GIthubRepo/Agentraa/src/app/api/contact/route.ts) — Hardened `POST` handler with content-type/size checks, validation, honeypot, rate-limit integration, optional Turnstile hook, and safe error handling.
5. [src/components/Contact.tsx](file:///y:/GIthubRepo/Agentraa/src/components/Contact.tsx) — Added hidden `website` honeypot field to `formData` and `<form>` without changing visible UI.
6. [src/components/Showcase.tsx](file:///y:/GIthubRepo/Agentraa/src/components/Showcase.tsx) — Removed unused imports (`User`, `Monitor`), moved `BOT_DEMO` to module scope, reset `demoStep` in tab click handler (fixing `react-hooks/set-state-in-effect` and `exhaustive-deps`), and escaped apostrophe.
7. [src/components/BookCallModal.tsx](file:///y:/GIthubRepo/Agentraa/src/components/BookCallModal.tsx) — Escaped apostrophe (`Let&apos;s`).
8. [src/components/AutomationFinder.tsx](file:///y:/GIthubRepo/Agentraa/src/components/AutomationFinder.tsx) — Escaped apostrophes (`you&apos;re`, `we&apos;ll`).
9. [src/components/BeforeAfter.tsx](file:///y:/GIthubRepo/Agentraa/src/components/BeforeAfter.tsx) — Escaped apostrophe (`Here&apos;s`).
10. [src/components/CTA.tsx](file:///y:/GIthubRepo/Agentraa/src/components/CTA.tsx) — Escaped apostrophes (`Let&apos;s`, `team&apos;s`).
11. [src/components/ROICalculator.tsx](file:///y:/GIthubRepo/Agentraa/src/components/ROICalculator.tsx) — Escaped apostrophes (`don&apos;t`, `team&apos;s`).
12. [src/components/WhyAgentraa.tsx](file:///y:/GIthubRepo/Agentraa/src/components/WhyAgentraa.tsx) — Escaped apostrophe (`don&apos;t`).

### Created Files
1. [src/lib/contact-validation.ts](file:///y:/GIthubRepo/Agentraa/src/lib/contact-validation.ts) — Zero-dependency strict payload validator and sanitizer.
2. [src/lib/rate-limit.ts](file:///y:/GIthubRepo/Agentraa/src/lib/rate-limit.ts) — Provider-independent `RateLimiter` interface, `UpstashRestRateLimiter`, and Vercel-aware `getClientIp()`.
3. [src/lib/bot-protection.ts](file:///y:/GIthubRepo/Agentraa/src/lib/bot-protection.ts) — Optional Cloudflare Turnstile `siteverify` helper.
4. [AGENTRAA_PHASE_1_SECURITY_REPORT.md](file:///y:/GIthubRepo/Agentraa/AGENTRAA_PHASE_1_SECURITY_REPORT.md) — This report.

*(Pre-existing uncommitted workspace changes `D public/next.svg`, `D public/vercel.svg`, `?? public/Agentraa Agency Orbital Logo.png`, and `?? AGENTRAA_PRODUCTION_READINESS_AUDIT.md` were preserved untouched.)*

---

## C. Dependency Changes

| Package | Previous Version | New Version | Reason | Compatibility |
| :--- | :--- | :--- | :--- | :--- |
| `next` | `16.3.0` | `16.4.6` | Resolves critical & high Next.js advisories (RCE, SSRF, cache poisoning, `ImageResponse` RCE) | Same `16.x` major; compatible with `react@19.2.8` & `react-dom@19.2.8` |
| `eslint-config-next` | `16.3.0` | `16.4.6` | Keeps ESLint ruleset aligned with `next@16.4.6` | Compatible with `eslint@9.39.5` |
| Transitive packages (`sharp`, `source-map-js`, `zod`, `brace-expansion`, `js-yaml`, `minimatch`) | Vulnerable ranges | Patched via `npm audit fix` | Resolves remaining 4 high & 7 moderate advisories | No breaking changes; `npm run build` & `tsc` pass |

---

## D. Vulnerabilities Resolved

- **Before (`npm audit`):** `13 vulnerabilities (7 moderate, 5 high, 1 critical)` affecting `next`, `sharp`, `source-map-js`, `zod`, `brace-expansion`, `js-yaml`, and `minimatch`.
- **After (`npm audit`):** **`found 0 vulnerabilities`** (`AUDIT_EXIT: 0`).
- **Status:** **`VERIFIED FIXED`**

---

## E. Vulnerabilities Remaining

- **0 known npm audit vulnerabilities** remain in the installed dependency tree as of `2026-11-26`.

---

## F. ESLint Fixes

| File | Issue Fixed | Status |
| :--- | :--- | :--- |
| `src/app/api/contact/route.ts` | Replaced `error: any` with `error: unknown` | **VERIFIED FIXED** |
| `src/components/Showcase.tsx` | Removed unused `User`/`Monitor` imports; moved `BOT_DEMO` to module scope; moved `setDemoStep(0)` to tab click handler; escaped `&apos;` | **VERIFIED FIXED** |
| `src/components/BookCallModal.tsx` | Escaped `&apos;` | **VERIFIED FIXED** |
| `src/components/AutomationFinder.tsx` | Escaped `&apos;` | **VERIFIED FIXED** |
| `src/components/BeforeAfter.tsx` | Escaped `&apos;` | **VERIFIED FIXED** |
| `src/components/CTA.tsx` | Escaped `&apos;` | **VERIFIED FIXED** |
| `src/components/ROICalculator.tsx` | Escaped `&apos;` | **VERIFIED FIXED** |
| `src/components/WhyAgentraa.tsx` | Escaped `&apos;` | **VERIFIED FIXED** |

- **Result:** `npm run lint` exits `0` (**0 errors, 0 warnings**).

---

## G. Contact API Security Improvements

Implemented in [src/app/api/contact/route.ts](file:///y:/GIthubRepo/Agentraa/src/app/api/contact/route.ts) and [src/lib/contact-validation.ts](file:///y:/GIthubRepo/Agentraa/src/lib/contact-validation.ts):

- **Content-Type & Size Enforcement:** Rejects non-`application/json` with `415` and payloads `>16 KB` with `413`.
- **Malformed JSON & Unknown Keys:** Rejects invalid JSON, non-object bodies, and unexpected fields with `400`.
- **Required Fields & Allowlists:** Enforces required fields (`businessName`, `businessType`, `teamSize`, `challenge`, `automation`, `name`, `email`, `phone`) and strict allowlists for `teamSize` and `budget`.
- **Format & Length Caps:** Validates email/phone formats and enforces max lengths (`name <= 120`, `email <= 254`, `phone <= 25`, `businessName <= 150`, `businessType <= 120`, `challenge <= 1500`, `automation <= 250`).
- **Sanitization & Privacy:** Strips control characters and collapses CR/LF on single-line fields; removes PII from server error logs; returns `{ success: true, id }` instead of echoing full Notion page data.
- **Status:** **`VERIFIED FIXED`** (validation & rejection paths tested locally; live Notion `POST` not executed to avoid polluting production Notion data).

---

## H. Rate Limiting Implementation Status

- **Architecture:** [src/lib/rate-limit.ts](file:///y:/GIthubRepo/Agentraa/src/lib/rate-limit.ts) implements a provider-independent `RateLimiter` interface with `UpstashRestRateLimiter` (5 requests / 10 minutes per IP via Upstash REST `/pipeline`, using Vercel's `x-vercel-forwarded-for` first) and returns `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`, and `Retry-After` on `429`.
- **Current Runtime State:** `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are **not configured**, so the endpoint currently returns `X-RateLimit-Status: unconfigured` and does not enforce distributed rate limiting.
- **Status:** **`NEEDS MANUAL CONFIGURATION`** (and `429` live behavior is **`NOT TESTED`** until Upstash credentials are provided).

---

## I. Bot Protection Implementation Status

1. **Honeypot Field (`website`):** Added to [Contact.tsx](file:///y:/GIthubRepo/Agentraa/src/components/Contact.tsx) and enforced in [route.ts](file:///y:/GIthubRepo/Agentraa/src/app/api/contact/route.ts) (`400` rejection when populated). **Status: `VERIFIED FIXED`**.
2. **Cloudflare Turnstile:** Server-side verification hook (`verifyTurnstileToken` in [src/lib/bot-protection.ts](file:///y:/GIthubRepo/Agentraa/src/lib/bot-protection.ts)) is implemented and activates automatically when `TURNSTILE_SECRET_KEY` is configured. Client-side widget rendering requires site key setup. **Status: `NEEDS MANUAL CONFIGURATION`**.

---

## J. Security Headers

Configured in [next.config.ts](file:///y:/GIthubRepo/Agentraa/next.config.ts) (`source: "/(.*)"`) and verified on local `next start` (`http://127.0.0.1:3099/`):

| Header | Value | Status |
| :--- | :--- | :--- |
| `X-Content-Type-Options` | `nosniff` | **VERIFIED FIXED** |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | **VERIFIED FIXED** |
| `X-Frame-Options` | `DENY` | **VERIFIED FIXED** |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), browsing-topics=()` | **VERIFIED FIXED** |
| `Content-Security-Policy-Report-Only` | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests` | **VERIFIED FIXED** (Report-Only) |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains` (applied when `NODE_ENV === "production"`, i.e., `next start` / Vercel prod; note PowerShell `Invoke-WebRequest` ran against `http://` local server) | **VERIFIED FIXED** (in config) |

---

## K. Environment Variable Inventory

| Variable Name | Purpose | Scope | Required / Optional | Configuration Status |
| :--- | :--- | :--- | :--- | :--- |
| `NOTION_API_KEY` | Notion SDK authentication for `/api/contact` | Server-only | Required | Configured in `.env.local` |
| `NOTION_DATABASE_ID` | Target Notion database ID for leads | Server-only | Required | Configured in `.env.local` |
| `UPSTASH_REDIS_REST_URL` | Distributed rate limiter endpoint | Server-only | Optional (Required for prod rate limit) | Not configured |
| `UPSTASH_REDIS_REST_TOKEN` | Distributed rate limiter auth token | Server-only | Optional (Required for prod rate limit) | Not configured |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile server verification | Server-only | Optional (Recommended) | Not configured |

*(`.env*` is protected by `.gitignore`; no `NEXT_PUBLIC_` secrets exist.)*

---

## L. Tests Executed

1. `npm run lint` → **PASSED** (`LINT_EXIT: 0`, 0 errors, 0 warnings).
2. `npx tsc --noEmit` → **PASSED** (`TSC_EXIT: 0`).
3. `npm run build` → **PASSED** (`BUILD_EXIT: 0`).
4. `npm audit` → **PASSED** (`AUDIT_EXIT: 0`, `found 0 vulnerabilities`).
5. Unit test suite → **NOT PRESENT** (no test runner/suite configured in `package.json`).
6. Local HTTP Security Header & Contact API Regression Tests (`http://127.0.0.1:3099`):
   - `GET /api/contact` → `405`
   - `POST` with `text/plain` → `415`
   - `POST` with malformed JSON → `400`
   - `POST` with missing required fields → `400`
   - `POST` with invalid email → `400`
   - `POST` with oversized `challenge` (1600 chars) → `400`
   - `POST` with unexpected key (`admin: true`) → `400`
   - `POST` with populated honeypot (`website`) → `400`
   - Valid submission to live Notion → **Not executed** (avoided creating test records in production Notion DB).

---

## M. Build Results

```text
▲ Next.js 16.4.6 (Turbopack)
- Environments: .env.local
✓ Running next.config.ts took 158ms
⚠ The Edge Runtime is deprecated. You can use the "nodejs" runtime instead.
✓ Compiled successfully in 20.1s
  Running TypeScript ...
  Finished TypeScript in 9.7s ...
⚠ Using edge runtime on a page currently disables static generation for that page
✓ Generating static pages using 6 workers (4/4) in 3.3s

Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/contact
└ ƒ /icon
```
*(Pre-existing `icon.tsx` Edge Runtime warning remains; deferred from Phase 1 because branding/icon replacement belongs to a later phase.)*

---

## N. Remaining Risks

1. **Distributed Rate Limiting Inactive:** Without Upstash Redis credentials, `/api/contact` cannot enforce cross-instance `429` rate limits on Vercel.
2. **No Strong CAPTCHA Active:** Honeypot blocks basic bots, but determined automated scripts can bypass it until Turnstile is configured.
3. **CSP is Report-Only:** `Content-Security-Policy-Report-Only` logs violations without blocking until promoted to `Content-Security-Policy`.
4. **Live Notion `select` Schema Mismatch Risk:** `Project Type` is sent as a joined string (`"Business Website + Mobile App"`), which relies on the Notion database column supporting dynamic `select` creation.

---

## O. Manual Configuration Required

1. **Upstash Redis (Rate Limiting):** Create an Upstash Redis database and add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to `.env.local` and Vercel Environment Variables.
2. **Cloudflare Turnstile (Optional Strong CAPTCHA):** Create a Turnstile widget for `www.agentraa.me`, add `TURNSTILE_SECRET_KEY` to Vercel Environment Variables, and integrate the client widget into `Contact.tsx` in a follow-up phase.

---

## P. Production Deployment Recommendations

1. Review `git diff` and commit Phase 1 security changes (`package.json`, `package-lock.json`, `next.config.ts`, `src/`).
2. Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in Vercel Project Settings before deploying.
3. Deploy to a Vercel Preview URL first, verify security headers on HTTPS, and submit one real test lead via the Preview `/api/contact` form to confirm end-to-end Notion delivery.
4. Once verified in Preview with zero CSP console violations, promote `Content-Security-Policy-Report-Only` to `Content-Security-Policy` in a follow-up commit and proceed to Phase 2 (SEO, Logo/Branding, and UI/UX fixes).
