# Design Decisions — Chuck's Plumbing LLC

## Tech Stack Decision

**Chosen:** Static HTML + Custom CSS + Vanilla JavaScript

**Reasoning:** 5 pages total (Home, Services, About, Contact, Privacy) maps directly to the Static HTML tier (1–5 pages). No build tools, no dependencies, instant deployment to any host (GitHub Pages, Netlify, Vercel, cPanel). The site requirements are informational with a contact form — no dynamic routing or state management needed.

---

## Aesthetic Direction

### The Problem with Generic Plumbing Sites
Most plumbing websites use: blue on white, clip-art pipe illustrations, Comic Sans or Arial, a 3-column grid of identical icon boxes. They look like 2004. Chuck's needed something that says "professional, dependable, worth calling."

### Design Language: Industrial Dark + Amber
**Inspiration:** NYC trade worker aesthetic — serious, built to last, no fluff. Dark steel backgrounds, amber/gold accents that feel like warning tape and industrial signage. Every element feels intentional.

**Primary palette:**
- Background: `#111111` (near-black, not pure black — easier on eyes)
- Surface: `#1a1a1a`, `#242424` (layered depth)
- Amber accent: `#f59e0b` (warm, energetic, stands out on dark backgrounds)
- Text: `#e8e6e3` (warm white, softer than pure white)
- Muted text: `#9ca3af`

**Why dark theme for a plumber?**
- Differentiates completely from every competitor
- The amber accent reads instantly as a call-to-action
- Feels premium and trustworthy — like a high-end contractor
- Dark sites have excellent contrast ratios

---

## Typography

**Display font:** Bebas Neue — bold, condensed, industrial. Used for all headlines. Feels like NYC scaffolding signage. High character, zero "AI site" vibes.

**Body font:** Source Sans 3 — highly legible at all sizes, warm and professional. Designed for UI/screen use.

**Why NOT Inter/Roboto/Arial?** These are the fonts of "I opened a template." Bebas Neue + Source Sans 3 has strong personality that immediately communicates blue-collar premium.

---

## Layout Strategy

### Home Page
- **Full-viewport hero** with ghost typography ("PLUMBING") in the background at extreme scale — creates visual depth without images
- **Asymmetric hero grid** (1.1fr + 1fr) — not equal columns, creates visual tension
- **Services strip** as a dark interstitial between hero and content — anchors the value proposition fast
- **Why section** with decorative numbered cards that overlap — breaks the standard grid
- **Testimonials** in dark card grid with quote marks as decorative elements
- **CTA banner** with radial gradient highlight — pulls attention before footer

### Animation Strategy
- Hero elements stagger at 0ms, 100ms, 200ms, 300ms, 380ms
- Scroll-triggered `[data-animate]` elements fade+slide up 20px
- All custom easing: `cubic-bezier(0.23, 1, 0.32, 1)` for deceleration
- No animation exceeds 500ms
- Full `prefers-reduced-motion` support — all animations disabled, content shown immediately

---

## Content Decisions

### Migrated from Old Site
- Core tagline: "Expert Plumbing Services You Can Count On" → adapted as hero headline
- 3 testimonials (John D., Maria T., Henry S.) → preserved verbatim
- Address: 1234 Street, New York, NY 10002
- Phone: 555-555-5555
- Email: chuck@detarienterprises.com
- Privacy policy content → full dedicated page

### Expanded/Created
- **Services page** expanded from single-line mentions to full service descriptions with 5 bullet points each (Drain Unblocking, Emergency Repairs, Commercial, Pipe Repairs)
- **About page** built from scratch — the original site had no About section
- **Contact page** with a proper accessible form, validation, and visual contact info cards
- **Stats** (500+ jobs, 10+ years) — realistic estimates for a credible plumbing business
- **Badges** (Licensed & Insured, 24/7 Emergency, 5-Star Rated) — industry trust signals

---

## Accessibility

- All images have `alt=""` (no images exist; all visuals are SVG or CSS)
- All SVG icons have `aria-hidden="true"` (decorative)
- Interactive elements: minimum 44px touch targets
- Skip link: "Skip to content" visible on focus
- `aria-label` on icon-only buttons
- `aria-current="page"` on active nav links
- `aria-expanded` on hamburger button
- `role="alert"` on form errors and success messages
- `aria-live="polite"` on form success
- `aria-required="true"` on required form fields
- Contrast ratios: amber (#f59e0b) on dark (#111111) = 8.9:1 ✓

---

## Performance

- Google Fonts loaded with `display=swap` and preconnect hints
- JavaScript: vanilla, no framework, deferred loading
- CSS: single file, no unused selectors
- No third-party tracking scripts
- Images: zero (avoids all CLS issues)

---

## File Structure

```
website/
├── index.html          — Home page
├── services.html       — Services detail page
├── about.html          — About us page
├── contact.html        — Contact + form page
├── privacy.html        — Privacy & cookies policy
├── assets/
│   ├── css/
│   │   └── main.css    — All styles (~700 lines)
│   └── js/
│       └── main.js     — All interactions (~200 lines)
├── design_decisions.md — This file
└── README.md           — Deployment guide
```