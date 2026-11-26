# AGENTRAA — Complete Production Readiness & Responsive UI Audit

**Target Website:** `https://www.agentraa.me/`  
**Repository:** `y:\GIthubRepo\Agentraa` (`origin`: `git@yash-gautam9953:yash-gautam9953/Agentraa.git`)  
**Audit Date:** 2026-11-26  
**Audit Mode:** Strictly Read-Only (no project files modified, no dependencies changed, no deployments triggered)

---

## A. Executive Summary

The Agentraa website is a **single-page marketing application** built with **Next.js 16.3.0 (App Router, Turbopack)**, **React 19.2.8**, **Tailwind CSS v4**, and **Framer Motion 13.1.0**. While the visual marketing sections and multi-step contact form UI are in place and `next build` compiles cleanly, the application is **not production-ready** due to critical security, SEO, functionality, lint, and branding gaps.

### Key Findings at a Glance
- **Production Readiness Score:** **40 / 100** (see Section P for transparent breakdown; no points awarded for unverified live visual rendering or unverified Notion form delivery).
- **Live Hosting Reality:** Despite the goal of removing Vercel dependencies, **the live domain `www.agentraa.me` is currently hosted on Vercel** (verified via DNS `CNAME` to `39e5b028424ba0c7.vercel-dns-017.com` and live HTTP `Server: Vercel` / `X-Vercel-Id: bom1::...` headers).
- **Critical Security Vulnerability:** `next@16.3.0` has a **critical** `npm audit` advisory range (`16.0.0 - 16.4.4`, fixed in `16.4.6`), alongside **5 high** and **7 moderate** vulnerabilities. The `/api/contact` endpoint also lacks rate limiting, CAPTCHA/bot protection, server-side input/length validation, and Notion `select` option validation.
- **Critical SEO Misconfiguration:** Both local `src/app/layout.tsx` and the live `https://www.agentraa.me/` HTML declare `<link rel="canonical" href="https://agentraa.com"/>` and `og:url` as `https://agentraa.com` instead of `https://www.agentraa.me/`. Both `/robots.txt` and `/sitemap.xml` return **404 Not Found**.
- **Broken/Mocked Interactive Feature:** `BookCallModal.tsx` (`#book-call`) is a placeholder that triggers `alert("Redirecting to Calendly...")` instead of real scheduling.
- **Unintegrated Official Logo:** `public/Agentraa Agency Orbital Logo.png` (`1536×1024`, ~1.11 MB, untracked in Git) is present in `public/` but **not referenced anywhere** in the codebase. The site still renders Lucide `<Bot />`, `<Sparkles />`, and a generated `"A"` favicon (`src/app/icon.tsx` on deprecated Edge runtime).
- **Lint Failures:** `npm run lint` fails with **15 problems (12 errors, 3 warnings)**, including a `react-hooks/set-state-in-effect` error in `Showcase.tsx` and `@typescript-eslint/no-explicit-any` in `src/app/api/contact/route.ts`.
- **Dead Code:** 8 of 18 components in `src/components/` are never imported or rendered anywhere.

---

## B. Current Technology Stack

| Layer | Technology | Version / Evidence |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js (App Router, Turbopack) | `16.3.0` (`package.json`) |
| **UI Library** | React & React DOM | `19.2.8` (`package.json`) |
| **Language** | TypeScript | `^5` (`strict: true` in `tsconfig.json`) |
| **Styling** | Tailwind CSS + PostCSS | `^4` (`tailwindcss`, `@tailwindcss/postcss` in `package.json`, `postcss.config.mjs`) |
| **Animations** | Framer Motion | `^13.1.0` (`package.json`) |
| **Icons** | Lucide React | `^1.31.0` (`package.json`) |
| **Class Utilities** | `clsx`, `tailwind-merge` | `^2.1.1`, `^3.6.0` (`src/lib/utils.ts`) |
| **Backend / API** | Next.js Route Handler (`Node.js` default) | `src/app/api/contact/route.ts` |
| **CRM / Database** | Notion API (`@notionhq/client`) | `^5.27.0` (`package.json`, `src/app/api/contact/route.ts`) |
| **Package Manager** | npm | `package-lock.json` present |
| **Linting** | ESLint + `eslint-config-next` | `^9` + `16.3.0` (`eslint.config.mjs`) |
| **Fonts** | `next/font/google` (`Inter`, `Outfit`) | `src/app/layout.tsx` |
| **Authentication** | None implemented | No auth packages, middleware, or sessions |
| **State Management** | React local `useState` / URL hash | No global store (Redux/Zustand/Context) |
| **Hosting (Verified Live)** | Vercel | DNS CNAME + `Server: Vercel` header |

---

## C. Complete Project Architecture

```text
y:\GIthubRepo\Agentraa\
├── .env.local                         # Local env vars (NOTION_API_KEY, NOTION_DATABASE_ID)
├── .gitignore                         # Ignores node_modules, .next, .env*, .vercel
├── AGENTS.md                          # Next.js 16 agent rules
├── CLAUDE.md                          # Minimal agent file (11 bytes)
├── eslint.config.mjs                  # ESLint flat config (core-web-vitals + typescript)
├── next.config.ts                     # Empty NextConfig object
├── next-env.d.ts                      # Next.js TypeScript declarations
├── package.json                       # Scripts & dependencies (name: "temp-app")
├── package-lock.json                  # Lockfile
├── postcss.config.mjs                 # @tailwindcss/postcss plugin
├── README.md                          # Default create-next-app boilerplate
├── tsconfig.json                      # TS config (@/* -> ./src/*)
├── public/
│   ├── Agentraa Agency Orbital Logo.png  # Untracked (1536x1024, 1.11 MB) - UNUSED
│   ├── file.svg                       # Default create-next-app asset - UNUSED
│   ├── globe.svg                      # Default create-next-app asset - UNUSED
│   └── window.svg                     # Default create-next-app asset - UNUSED
│   # Note: git status shows `D public/next.svg` and `D public/vercel.svg` (uncommitted deletions)
└── src/
    ├── app/
    │   ├── api/contact/route.ts       # POST handler -> Notion database page creation
    │   ├── globals.css                # Tailwind v4 @theme, glassmorphism, mobile CTA & overflow rules
    │   ├── icon.tsx                   # Dynamic Edge-runtime 32x32 PNG favicon ("A" on indigo)
    │   ├── layout.tsx                 # RootLayout, fonts, metadata, Navbar/Footer/FloatingCTA/BookCallModal
    │   └── page.tsx                   # Single-page entry composing 6 sections
    ├── components/
    │   ├── [ACTIVE] Navbar.tsx        # Fixed header + mobile slide-over drawer
    │   ├── [ACTIVE] Hero.tsx          # Hero copy, CTAs, 3 pillars, browser/WhatsApp mockups
    │   ├── [ACTIVE] WhatWeBuild.tsx   # 3-column service cards (Web, Mobile, WhatsApp)
    │   ├── [ACTIVE] Industries.tsx    # Interactive 5-industry workflow switcher + industry pills
    │   ├── [ACTIVE] HowItWorks.tsx    # Sticky left intro + 4-step vertical timeline
    │   ├── [ACTIVE] Showcase.tsx      # 3-tab demo (Website, Mobile App, auto-playing WhatsApp bot)
    │   ├── [ACTIVE] Contact.tsx       # 4-step lead capture form -> POST /api/contact
    │   ├── [ACTIVE] Footer.tsx        # Brand summary, anchor links, CTA, copyright
    │   ├── [ACTIVE] FloatingCTA.tsx   # Scroll-triggered fixed "Talk to Agentraa" pill
    │   ├── [ACTIVE] BookCallModal.tsx # Hash-triggered (#book-call) modal with mocked Calendly alert
    │   ├── [UNUSED] AutomationFinder.tsx
    │   ├── [UNUSED] BeforeAfter.tsx
    │   ├── [UNUSED] CaseStudies.tsx
    │   ├── [UNUSED] CTA.tsx
    │   ├── [UNUSED] Pricing.tsx
    │   ├── [UNUSED] ROICalculator.tsx
    │   ├── [UNUSED] TrustBar.tsx
    │   └── [UNUSED] WhyAgentraa.tsx
    └── lib/
        └── utils.ts                   # cn() helper (clsx + tailwind-merge)
```

### Routing Architecture
- **App Router** with 1 page route (`/`), 1 API route (`/api/contact`), and 1 metadata route (`/icon`).
- All navigation (`#solutions`, `#how-it-works`, `#industries`, `#contact`, `#demos`) uses **in-page hash anchors** on `/`.
- **No dedicated routes** exist for `/privacy`, `/terms`, `/about`, or `/blog`.

---

## D. Vercel Dependency Audit

No `@vercel/*` npm packages (e.g., `@vercel/analytics`, `@vercel/speed-insights`, `@vercel/og`) or `vercel.json` exist in the repository. However, the following Vercel-related references, runtime choices, and infrastructure dependencies were found:

| # | File / Resource | Exact Purpose | Required? | Safe to Remove? | Alternative Needed? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `public/vercel.svg` (currently `D` in `git status`) | Default `create-next-app` SVG asset; deleted in working tree but not yet committed | No | Yes (commit deletion) | None |
| 2 | `src/app/icon.tsx` (line 3: `export const runtime = 'edge'`) | Forces `/icon` onto Edge Runtime (legacy Vercel-first pattern; triggers Next.js 16 deprecation warning and disables static generation for `/icon`) | No | Yes | Replace with static `src/app/icon.png` or `public/favicon.ico` generated from the official logo |
| 3 | `.gitignore` (lines 36–37: `# vercel`, `.vercel`) | Ignores local `.vercel/` CLI link directory | No (harmless) | Yes, if not using Vercel CLI | None |
| 4 | `README.md` (lines 21, 30, 32, 34) | Default `create-next-app` documentation referencing Vercel fonts, Next.js GitHub, and "Deploy on Vercel" | No | Yes | Replace with project-specific README & deployment instructions |
| 5 | **Live DNS & Hosting** (`www.agentraa.me`, `agentraa.me`) | `www.agentraa.me` CNAMEs to `39e5b028424ba0c7.vercel-dns-017.com`; `agentraa.me` A-records point to `216.198.79.1` & `64.29.17.1` | **Yes (currently serving live traffic)** | **Not without migration** | Must provision new host (Cloudflare Pages/Workers, Netlify, Railway, VPS/Docker, etc.) and update DNS records |

---

## E. Logo & Branding Audit

### Current State
- **New Official Logo Present (Unused):** `public/Agentraa Agency Orbital Logo.png`
  - **Dimensions:** `1536 × 1024` px (3:2 landscape aspect ratio), `Format32bppArgb`, **1,159,506 bytes (~1.11 MB)**.
  - **Status:** Untracked in Git (`??`) and **not referenced** in any `.tsx`, `.css`, or metadata file.
- **Current In-App Branding:**
  - **Header (`src/components/Navbar.tsx:51-58`):** Renders a `40×40` indigo rounded square (`bg-indigo-600`) with Lucide `<Bot />` icon + `"Agentraa"` text.
  - **Mobile Drawer (`src/components/Navbar.tsx:120-125`):** Renders a `32×32` indigo square with `<Bot />` + `"Agentraa"` text.
  - **Footer (`src/components/Footer.tsx:13-19`):** Renders a `40×40` blurred indigo glow + Lucide `<Sparkles />` icon + `"Agentraa"` text (inconsistent with Navbar's `<Bot />`).
  - **Browser Favicon (`src/app/icon.tsx`):** Dynamically generates a `32×32` PNG with white `"A"` on `#4f46e5` using `ImageResponse`.
  - **Apple Touch Icon:** **Missing** (no `apple-icon.png` or `apple-touch-icon` metadata).
  - **PWA Icons / Manifest:** **Missing** (no `manifest.webmanifest` or `manifest.json`, no 192×192 / 512×512 icons).
  - **Open Graph & Twitter Images:** **Missing** (`src/app/layout.tsx` has `openGraph` and `twitter` blocks with no `images` array; verified live HTML has no `og:image`).

### Integration Locations for the New Official Logo
1. `src/components/Navbar.tsx` (desktop header & mobile drawer logo mark).
2. `src/components/Footer.tsx` (replace `<Sparkles />` placeholder with the official logo).
3. `src/app/icon.tsx` -> replace with static `src/app/icon.png` (and/or `src/app/favicon.ico`) cropped to a 1:1 square mark.
4. `src/app/apple-icon.png` (`180×180` PNG).
5. `src/app/manifest.ts` or `public/manifest.webmanifest` with `192×192` and `512×512` PWA icons.
6. `src/app/opengraph-image.png` (`1200×630`) and `twitter-image.png` (or `openGraph.images` / `twitter.images` in `src/app/layout.tsx`).

### Format, Dimension & Background Compatibility Notes
- **File Size:** At **1.11 MB**, `Agentraa Agency Orbital Logo.png` is far too heavy for navbar/footer use. Export optimized **SVG** (ideal for crisp scaling) or **WebP/PNG** variants sized appropriately (e.g., `~40–48px` `@2x` for navbar/footer, `32×32` / `48×48` for favicon, `180×180` for Apple touch icon).
- **Aspect Ratio:** The source file is `1536×1024` (3:2), whereas navbar/footer slots (`w-10 h-10`) and favicons are **1:1 square**. Placing a 3:2 image into a square box without adjusting container width or providing a square icon crop will distort or shrink it.
- **Dark/Light Background:** The site is dark-themed (`#050505` / `#0a0a0a`). Verify that the orbital logo has a transparent background and sufficient contrast on `#050505` (and provide a light-background variant for `og:image` / light-mode contexts if needed).

---

## F. Responsive UI/UX Audit

> **Verification Note:** Because `chrome_devtools` MCP was unavailable in this session, **live browser rendering across the 9 viewports (`320px`–`1920px`) is UNVERIFIED**. The findings below are **verified via static code analysis** of `src/app/globals.css`, `src/app/layout.tsx`, and all active components.

### Global & Breakpoint Architecture (`src/app/globals.css`, `src/app/layout.tsx`)
- `globals.css` enforces `min-width: 320px`, `overflow-x: clip` on `html, body`, `min-width: 0; max-width: 100%` on `main > section`, and `prefers-reduced-motion: reduce` overrides.
- **Issue — Scrollbar/Sticky Conflict Risk:** `layout.tsx:48` also sets `overflow-x-hidden` on `<body>`, while `HowItWorks.tsx:60` uses `position: sticky` (`sticky top-32`). On some browsers, `overflow-x: hidden` on an ancestor can break `position: sticky` (unlike `overflow-x: clip`).

### Component-by-Component Static Responsive Findings

| Component | Target Viewports | Verified Static Findings |
| :--- | :--- | :--- |
| **Navbar** (`Navbar.tsx`) | 320px–1920px | Hamburger button has `min-h-11 min-w-11` (44×44px, good touch target). Mobile drawer uses `w-[min(86vw,24rem)]` (`275px` at `320px`), `role="dialog"`, `aria-modal="true"`, Escape key close. **Gap:** Close (`X`) button inside drawer (`p-2`, `w-5 h-5` = ~36×36px) is below the 44×44px touch target minimum; no focus trap when drawer is open. |
| **Hero** (`Hero.tsx`) | 320px–430px, 768px–1024px | Headline uses `text-[clamp(2.4rem,8vw,3.25rem)] lg:text-7xl`, which scales cleanly from `320px` up. Value pillars switch at `min-[420px]:grid-cols-3`. **Potential Overlap/Clipping:** In the right-side visual (`Hero.tsx:100-157`), the browser mockup (`top-0 right-4 left-4 h-48`) and floating WhatsApp card (`bottom-0 right-0 w-56`, `sm:-bottom-10 sm:-right-4`) are both `position: absolute` inside `h-[300px]` at `320px`–`419px`. At `320px`, `w-56` (`224px`) + `h-48` (`192px`) inside `300px` height causes heavy overlap between the two mockups, and `sm:-right-4` extends `16px` past the container edge on `640px`–`1023px` (clipped by section `overflow-hidden`). |
| **WhatWeBuild** (`WhatWeBuild.tsx`) | 320px–1920px | Uses `grid-cols-1 lg:grid-cols-3`. Note: `lg` is `1024px`, so at `768px` (tablet) all 3 cards stack full-width in 1 column, creating a very tall vertical scroll; a `md:grid-cols-2 lg:grid-cols-3` or `md` adjustment could improve tablet density. Card #1 CTA has `min-h-11`, but Card #2 and Card #3 CTAs (`px-6 py-3` without `min-h-11`) rely on line-height (~48px). |
| **Industries** (`Industries.tsx`) | 320px–1920px | Uses `grid-cols-1 lg:grid-cols-12`. At `768px`–`1023px`, selector buttons stack above the visualization card. On `320px`–`430px`, industry buttons (`p-4`) and pills (`flex-wrap justify-center gap-4`) wrap cleanly. **Accessibility Gap:** Industry tabs use plain `<button>` without `role="tablist"` / `role="tab"` / `aria-selected` or `aria-live` on the dynamic workflow panel. |
| **HowItWorks** (`HowItWorks.tsx`) | 320px–1920px | Vertical timeline line is `hidden sm:block`, with mobile icons shown `sm:hidden`. At `320px`, `p-8` (`32px` padding each side) inside `glass-card` leaves `~224px` content width; `text-2xl` titles wrap cleanly. |
| **Showcase** (`Showcase.tsx`) | 320px–430px | **Potential Clipping at 320px:** In the "Mobile Apps" tab (`Showcase.tsx:155`), the phone mockup has fixed `w-[300px] h-[600px]`. On a `320px` viewport, `px-4` (`32px` total horizontal padding) leaves only `288px` of container width, so a `300px`-wide phone mockup **overflows its parent container by 12px** (clipped by `overflow-hidden` on the section). In "Website Development" tab (`Showcase.tsx:106`), `h-[450px]` with `px-8` (`32px`) is tight at `320px`. |
| **Contact** (`Contact.tsx`) | 320px–430px | 4-step form uses `p-6 md:p-10 lg:p-12`, single-column inputs (`py-4`), and `grid-cols-1 sm:grid-cols-2` for checkboxes. **Accessibility/UX Gap:** Step 3 uses a hidden `<input type="text" className="opacity-0 absolute w-0 h-0" required />` (`Contact.tsx:156`) for checkbox validation; browser native validation bubbles on a `0×0` hidden input can fail to focus or misposition on mobile Safari/Chrome. |
| **FloatingCTA** (`FloatingCTA.tsx` + `globals.css`) | 320px–1920px | Uses `.mobile-floating-cta` with `env(safe-area-inset-bottom)` and centers on `<768px`, moving to `bottom-6 right-6` on `>=768px`. Hides when `#contact` is in view. **Note:** When scrolled to `Footer`, `#contact` is above the viewport, so `FloatingCTA` reappears over the Footer on mobile and can overlap the copyright text. |
| **BookCallModal** (`BookCallModal.tsx`) | 320px–1920px | Centered modal (`max-w-lg`, `p-4 sm:p-6`, `p-8 sm:p-10`). At `320px`–`375px`, `p-8` (`32px`) + `text-3xl` title is slightly cramped; close button (`p-2`, `w-5 h-5`) is ~36×36px (<44px touch target). No focus trap. |
| **Footer** (`Footer.tsx`) | 320px–1920px | `grid-cols-1 md:grid-cols-12` stacks cleanly on mobile and uses 4 columns on `>=768px`. |

---

## G. Functional Features Audit

| Feature | Location | Classification | Evidence & Notes |
| :--- | :--- | :--- | :--- |
| **Header Navigation Links** | `src/components/Navbar.tsx` | **WORKING** (code-verified) | Smooth-scrolls to `#solutions`, `#how-it-works`, `#industries`, `#contact`. |
| **Mobile Navigation Drawer** | `src/components/Navbar.tsx` | **WORKING** (code-verified) | Opens/closes on toggle, backdrop click, link click, and `Escape` key. |
| **Industries Interactive Tabs** | `src/components/Industries.tsx` | **WORKING** (code-verified) | Switches between 5 industries (`restaurant`, `realestate`, `salon`, `agency`, `ecommerce`) with Framer Motion transitions. |
| **Showcase Interactive Tabs & Bot Demo** | `src/components/Showcase.tsx` | **PARTIALLY WORKING** | Tab switching works, and WhatsApp bot auto-plays 4 messages at 2.5s intervals, but triggers ESLint `react-hooks/set-state-in-effect` error and `react-hooks/exhaustive-deps` warning; also has no replay button after completion. |
| **Multi-Step Contact Form UI** | `src/components/Contact.tsx` | **PARTIALLY WORKING** | 4-step wizard with `POST /api/contact`. Uses `window.alert()` on error instead of inline error UI, and hidden `0×0` input for Step 3 validation. |
| **Contact Form Backend (`/api/contact`)** | `src/app/api/contact/route.ts` | **UNVERIFIED (End-to-End)** | Code integrates `@notionhq/client` (`notion.pages.create`) using `NOTION_API_KEY` and `NOTION_DATABASE_ID` (both keys exist in `.env.local`). Actual live submission to Notion was **not executed** (read-only audit). **Risk:** `Project Type` is mapped as a Notion `select` with joined string `"Business Website + Mobile App"` (`Contact.tsx:46`, `route.ts:78`), which will fail or create unexpected options if the Notion property is `multi_select` or has fixed `select` options. |
| **Book a Strategy Call Modal (`#book-call`)** | `src/components/BookCallModal.tsx` | **STATIC / MOCKED** | Clicking "Continue to Scheduling" runs `alert("Redirecting to Calendly...")` (`line 100`). Also, no visible button/link on the page currently links to `#book-call`. |
| **Floating CTA ("Talk to Agentraa")** | `src/components/FloatingCTA.tsx` | **WORKING** (code-verified) | Appears after `scrollY > 500`, hides when `#contact` is visible, smooth-scrolls to `#contact`. |
| **Email / Phone / WhatsApp Links** | Entire `src/` | **NOT IMPLEMENTED** | Zero `mailto:`, `tel:`, or `wa.me` links exist anywhere in the codebase. |
| **Legal Pages (Privacy / Terms)** | `src/components/Footer.tsx` | **NOT IMPLEMENTED** | Footer has only copyright notice; no Privacy Policy or Terms of Service links/pages. |

---

## H. Security Audit

1. **Exposed Secrets & Environment Variables:**
   - `.env.local` contains `NOTION_API_KEY` and `NOTION_DATABASE_ID` (values inspected without printing; `.env*` is in `.gitignore` and not committed).
   - No `NEXT_PUBLIC_` secrets or client-side credentials found.
2. **Dependency Vulnerabilities (`npm audit`):**
   - **13 vulnerabilities total (1 Critical, 5 High, 7 Moderate):**
     - **Critical:** `next` (`16.3.0`, affected `16.0.0 - 16.4.4`, fix in `16.4.6`) — includes RCE on Windows-hosted servers (`GHSA-p293-qw3h-jr36`), RCE in `next/og` `ImageResponse` (`GHSA-vcvr-r3jv-pc5j`, directly relevant because `src/app/icon.tsx` uses `ImageResponse`!), RCE in Image Optimization, SSRF, and cache poisoning advisories.
     - **High:** `sharp` (`<=0.35.5-rc.1`), `source-map-js` (`1.0.0 - 1.2.1`), `zod` (`<4.6.6`), `brace-expansion`, `js-yaml`.
     - **Moderate:** `minimatch` (via `@typescript-eslint/typescript-estree`).
3. **API Security (`/api/contact`):**
   - **No Rate Limiting:** Vulnerable to automated spam/bot flooding and Notion API quota exhaustion.
   - **No Bot / Spam Protection:** No honeypot field, Turnstile, or reCAPTCHA.
   - **No Server-Side Validation:** `src/app/api/contact/route.ts` destructures `request.json()` without Zod/schema validation, email format checks, or max-length limits (Notion `rich_text` rejects content >2000 chars).
   - **No Origin / CSRF Check:** Accepts `POST` from any origin.
   - **Error Handling:** Returns generic `{ error: "Failed to submit form to Notion." }` (good — doesn't leak stack traces to client), though `error: any` fails ESLint.
4. **Security Headers (Verified Live on `https://www.agentraa.me/`):**
   - **Present:** `Strict-Transport-Security: max-age=63072000`
   - **Missing:** `Content-Security-Policy` (CSP), `X-Frame-Options` (or CSP `frame-ancestors`), `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`.
   - **Permissive CORS:** Live response includes `Access-Control-Allow-Origin: *`.
5. **XSS / Unsafe Scripts / Source Maps:**
   - No `dangerouslySetInnerHTML`, `eval()`, or third-party `<script>` tags found in `src/`.
   - `next.config.ts` does not enable `productionBrowserSourceMaps: true` (default `false`).

---

## I. SEO & Website Metadata Audit

| Check | Status | Evidence |
| :--- | :--- | :--- |
| **Page Title** | Present | `"Agentraa \| Digital Solutions for Growing Businesses"` (`src/app/layout.tsx:20` & live HTML) |
| **Meta Description** | Present | `"Agentraa helps businesses grow with high-performing websites, mobile apps, and practical AI-powered automation built around the way they work."` |
| **Canonical URL** | **BROKEN / WRONG DOMAIN** | `src/app/layout.tsx:37` and live HTML output `<link rel="canonical" href="https://agentraa.com"/>` instead of `https://www.agentraa.me/`. |
| **Open Graph Metadata** | **INCOMPLETE / WRONG DOMAIN** | `og:url` is `https://agentraa.com` (`layout.tsx:26` & live HTML); **`og:image` is missing** (`NONE` on live site). |
| **Twitter Card Metadata** | **INCOMPLETE** | `card: "summary_large_image"` is set, but **`twitter:image` is missing**. |
| **`robots.txt`** | **MISSING (404)** | `GET https://www.agentraa.me/robots.txt` returned `404 Not Found`. |
| **`sitemap.xml`** | **MISSING (404)** | `GET https://www.agentraa.me/sitemap.xml` returned `404 Not Found`. |
| **Structured Data (JSON-LD)** | **MISSING** | No `Organization` or `WebSite` schema in `layout.tsx` or `page.tsx`. |
| **Heading Hierarchy** | Good (1 `<h1>`) | `Hero.tsx` has the sole `<h1>`; sections use `<h2>` and `<h3>`. |
| **Images & Alt Text** | N/A (No `<img>` tags) | Active site uses SVG icons and CSS mockups only. |
| **Favicon** | Placeholder | `src/app/icon.tsx` renders an indigo `"A"` square on Edge runtime instead of the official logo. |

---

## J. Performance Audit

### Build & Lint Command Results (Executed Read-Only)
- **`npm run lint` (`eslint`):** **FAILED (Exit Code 1)** — **15 problems (12 errors, 3 warnings)**:
  - `src/app/api/contact/route.ts:87:19` — `@typescript-eslint/no-explicit-any` (error)
  - `src/components/Showcase.tsx:36:5` — `react-hooks/set-state-in-effect` (error), `60:23` `react/no-unescaped-entities` (error), `5:46,88` unused imports `User`, `Monitor` (warnings), `47:6` `react-hooks/exhaustive-deps` (warning)
  - `src/components/BookCallModal.tsx:83:20` — `react/no-unescaped-entities` (error)
  - Unused components (`AutomationFinder.tsx`, `BeforeAfter.tsx`, `CTA.tsx`, `ROICalculator.tsx`, `WhyAgentraa.tsx`) — 7 `react/no-unescaped-entities` errors.
- **`npm run build` (`next build` — Next.js 16.3.0 Turbopack):** **PASSED** (Compiled in `12.4s`, TypeScript in `9.1s`, Static pages 4/4 in `3.3s`):
  - **Build Warnings:**
    - `⚠ The Edge Runtime is deprecated. You can use the "nodejs" runtime instead.` (from `src/app/icon.tsx`)
    - `⚠ Using edge runtime on a page currently disables static generation for that page`
  - **Routes:** `○ /` (Static), `○ /_not-found` (Static), `ƒ /api/contact` (Dynamic), `ƒ /icon` (Dynamic).
- **Measured Production Bundle (`.next/static/`):**
  - **Total JS chunks:** `765,282 bytes` (**747.35 KB** across chunk files)
  - **Total CSS (`2ygen5mdiwn6-.css`):** `67,161 bytes` (**65.59 KB**)
  - **Live HTML Payload:** `75,152 bytes` (~73.4 KB)

### Performance Observations
- **Font Loading:** Uses `next/font/google` (`Inter`, `Outfit`) — self-hosted and optimized, zero external Google Fonts render-blocking requests.
- **Heavy Client JS:** Almost every section (`Hero`, `WhatWeBuild`, `Industries`, `HowItWorks`, `Showcase`, `Contact`, `Navbar`, `FloatingCTA`, `BookCallModal`) is `"use client"` and imports `framer-motion`, increasing client hydration JS.
- **Unoptimized Unused Assets:** `public/Agentraa Agency Orbital Logo.png` is **1.11 MB**; `public/file.svg`, `globe.svg`, `window.svg` are unused boilerplate.
- **Dynamic `/icon` Overhead:** `src/app/icon.tsx` runs `ImageResponse` dynamically on Edge instead of serving a cached static icon file.
- **Core Web Vitals:** **UNVERIFIED** (requires live browser / Lighthouse run).

---

## K. Hosting & Deployment Audit

- **Verified Live Hosting Provider:** **Vercel** (`Server: Vercel`, `X-Vercel-Id: bom1::...`, `X-Vercel-Cache: HIT`).
- **DNS Configuration:**
  - `www.agentraa.me` → `CNAME` → `39e5b028424ba0c7.vercel-dns-017.com` (`64.29.17.65`, `216.198.79.65`).
  - `agentraa.me` (apex) → `A` → `216.198.79.1`, `64.29.17.1`.
- **SSL/HTTPS:** Active and valid (`HSTS max-age=63072000`).
- **Build & Runtime:** `npm run build` (`next build`), `npm run start` (`next start`), Node.js runtime (plus Edge runtime for `src/app/icon.tsx`). Because of `/api/contact`, **this is NOT a static-only (`output: 'export'`) site** — it requires a Node.js/serverless runtime unless `/api/contact` is moved to an external form/backend service.
- **CI/CD Configuration:** **Missing** (no `.github/workflows/` or CI pipeline in the repo).
- **Required Env Vars:** `NOTION_API_KEY`, `NOTION_DATABASE_ID`.
- **Vercel Removal Path:** To deploy cleanly without Vercel:
  1. Remove `export const runtime = 'edge'` from `src/app/icon.tsx` (or replace with static `icon.png`).
  2. Clean up `README.md`, `.gitignore` `.vercel` entry, and commit `public/vercel.svg` deletion.
  3. Choose a target host supporting Next.js App Router + `/api/contact` (e.g., Docker/VPS with `output: 'standalone'`, Cloudflare Workers via OpenNext, Railway, Render, or Fly.io) and update DNS A/CNAME records for `agentraa.me` and `www.agentraa.me`.

---

## L. Critical Issues

1. **Critical `next` Security Vulnerabilities (`16.3.0`):** `npm audit` flags `next` (`16.0.0 - 16.4.4`) with critical RCE/SSRF/cache-poisoning advisories (including `ImageResponse` RCE affecting `src/app/icon.tsx`).
2. **Wrong Canonical & Open Graph Domain (`agentraa.com` vs `www.agentraa.me`):** Search engines and social crawlers are being told the canonical URL is `https://agentraa.com`.
3. **Missing `robots.txt`, `sitemap.xml`, and `og:image`:** Both SEO crawl files return 404; social shares have no preview image.
4. **Unprotected `/api/contact` Endpoint:** No rate limiting, no CAPTCHA/honeypot, and no server-side schema/length validation.
5. **Mocked Scheduling Flow (`BookCallModal.tsx`):** Shows `alert("Redirecting to Calendly...")` instead of a real booking link/embed.
6. **ESLint Build Gate Failure:** `npm run lint` exits with 12 errors (including `react-hooks/set-state-in-effect` in `Showcase.tsx` and `no-explicit-any` in `route.ts`).
7. **Missing Security Headers:** No CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, or `Permissions-Policy`.

---

## M. Recommended Fixes (Prioritized Action Plan)

### P0 — Immediate (Security, SEO, Broken Features)
1. **Upgrade `next` to `>=16.4.6`** and run `npm audit fix` to resolve the critical and high advisories.
2. **Fix Canonical & Metadata in `src/app/layout.tsx`:** Set `metadataBase: new URL("https://www.agentraa.me")`, update `alternates.canonical` and `openGraph.url` to `https://www.agentraa.me/`, and add `openGraph.images` + `twitter.images`.
3. **Add `src/app/robots.ts` and `src/app/sitemap.ts`:** Generate valid `/robots.txt` and `/sitemap.xml` for `https://www.agentraa.me/`.
4. **Harden `/api/contact/route.ts`:** Add Zod validation (email format, string length limits <=2000 chars, enum checks for `teamSize`/`budget`), honeypot/Turnstile bot protection, and rate limiting.
5. **Resolve `BookCallModal.tsx`:** Either wire it to a real Calendly/Cal.com URL and link CTAs to it, or remove the dead modal.

### P1 — High Priority (Branding, Lint, Security Headers, UI)
6. **Integrate Official Logo (`Agentraa Agency Orbital Logo.png`):** Export optimized WebP/SVG/PNG sizes; update `Navbar.tsx`, `Footer.tsx`, `src/app/icon.png` (removing `src/app/icon.tsx` Edge runtime), `src/app/apple-icon.png`, `src/app/opengraph-image.png`, and `manifest.webmanifest`.
7. **Fix All ESLint Errors & Remove Dead Code:** Fix `Showcase.tsx`, `route.ts`, `BookCallModal.tsx`, and either delete or clean up the 8 unused components in `src/components/`.
8. **Add Security Headers in `next.config.ts` (`headers()`):** Configure `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.
9. **Fix Responsive Edge Cases:** Make `Showcase.tsx` mobile phone mockup `w-full max-w-[300px]` (prevents `320px` clipping), adjust `Hero.tsx` mobile mockup spacing, replace `Contact.tsx` hidden `0×0` input with accessible inline validation, and increase mobile drawer/modal close button sizes to `min-h-11 min-w-11`.

### P2 — Medium Priority (Migration, Legal, Performance)
10. **Non-Vercel Hosting Migration (if desired):** Add `output: 'standalone'` in `next.config.ts` (for Docker/VPS) or target adapter, clean up `README.md` / `.gitignore`, and update DNS for `agentraa.me` / `www.agentraa.me`.
11. **Add Legal & Direct Contact Channels:** Add `/privacy` and `/terms` pages linked in `Footer.tsx`, plus direct `mailto:` / WhatsApp contact links if desired.
12. **Add CI/CD:** Create a GitHub Actions workflow running `npm run lint`, `npx tsc --noEmit`, and `npm run build` on PRs.

---

## N. Missing Production Requirements

- `robots.txt` and `sitemap.xml`
- Privacy Policy (`/privacy`) and Terms of Service (`/terms`)
- Security headers (CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`)
- API rate limiting & spam/bot protection on `/api/contact`
- Automated test suite (unit, integration, or E2E tests — currently 0 tests exist)
- CI/CD pipeline (`.github/workflows/`)
- Error monitoring / observability (e.g., Sentry) and privacy-friendly analytics
- Real scheduling integration (Calendly / Cal.com)
- Official `og:image`, `apple-icon`, and PWA manifest/icons

---

## O. Estimated Implementation Complexity

| Workstream | Complexity | Rationale |
| :--- | :--- | :--- |
| **SEO & Metadata Fixes** (`layout.tsx`, `robots.ts`, `sitemap.ts`) | **Low** | ~15–30 lines of Next.js App Router metadata code. |
| **Logo & Branding Integration** (optimized exports + Navbar/Footer/icons) | **Low** | Straightforward asset optimization and component updates. |
| **Lint Fixes & Dead Code Cleanup** | **Low** | Mechanical ESLint fixes and removing 8 unused files. |
| **API Hardening & Contact Form UX** (Zod, rate limit, inline errors) | **Medium** | Requires schema validation, rate-limit store/logic, and Notion property alignment. |
| **Security Headers & Next.js Upgrade** | **Medium** | Upgrading `next` + testing CSP compatibility with Framer Motion inline styles. |
| **Non-Vercel Hosting & DNS Migration** | **Medium–High** | Provisioning new Node/container host, env vars, SSL, and DNS cutover with zero downtime. |

**Overall Complexity:** **Medium**

---

## P. Final Production Readiness Score

### Scoring Methodology (Strict — 0 Points for Unverified Items)

| Category | Max Points | Score | Justification |
| :--- | :---: | :---: | :--- |
| **1. Build & Code Quality** | 15 | **7** | `next build` passes (7 pts), but `npm run lint` fails with 12 errors + 8 unused components (0/8 for lint/cleanliness). |
| **2. Security & Dependencies** | 20 | **5** | No client-exposed secrets (5 pts); deducted for critical `next` CVE, missing security headers, and unprotected `/api/contact`. |
| **3. SEO & Metadata** | 15 | **3** | Title/description present (3 pts); deducted for wrong `agentraa.com` canonical/OG URL, 404 `robots.txt`/`sitemap.xml`, and missing `og:image`. |
| **4. Functionality & Integrations** | 15 | **7** | Navigation, Industries tabs, FloatingCTA, and Showcase tabs work in code (7 pts); `BookCallModal` is mocked, `/api/contact` Notion delivery is unverified. |
| **5. Responsive UI & Accessibility** | 10 | **6** | Solid Tailwind responsive grid + `globals.css` overflow/reduced-motion rules (6 pts); live 9-viewport rendering is **unverified** (0 pts for live visual verification). |
| **6. Branding & Assets** | 5 | **1** | Logo file exists in `public/` (1 pt) but is unintegrated, unoptimized (1.11 MB), and favicon is a placeholder `"A"`. |
| **7. Performance & Caching** | 10 | **6** | Static `/` prerendered, `next/font` self-hosted (6 pts); deducted for 747 KB JS chunks, dynamic Edge `/icon`, and unverified Core Web Vitals. |
| **8. Hosting, CI/CD & Compliance** | 10 | **5** | Live HTTPS/HSTS active on Vercel (5 pts); deducted for missing CI/CD, missing `/privacy` & `/terms`, and pending Vercel migration. |
| **Total** | **100** | **40 / 100** | *Strict verified-only score (0 points awarded for unverified live visual rendering or unverified Notion delivery).* |

**Verdict:** **Not Production-Ready (40/100).** Address P0 security, SEO domain, and API hardening items before driving production traffic or migrating off Vercel.
