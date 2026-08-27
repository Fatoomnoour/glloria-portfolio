# Glloria implementation baseline

## Snapshot

The starting point for the approved enhancement plan is WebDev checkpoint `992769a4`, with the reviewed source exported to private GitHub. The application is React 19 + Vite + Express + tRPC + Drizzle/MySQL-compatible storage, with Wouter route matching, LocaleContext RTL/LTR switching, ThemeContext dark mode, protected admin procedures, and permanent WebDev/S3 asset references.

## Public baseline

The public routes are Home (`/`), archive (`/projects`), managed detail pages (`/projects/interior` and `/projects/boska`), Booking (`/booking`), Contact (`/contact`), Privacy (`/privacy`), and Terms (`/terms`). The public shell is intentionally image-led and de-boxed. It uses the approved original project galleries, fail-closed project details, descriptive image alternatives, lazy loading, full-size gallery links, WhatsApp handoff, and truthful empty testimonials behavior.

The existing Home already contains the editorial hero, founder/About story, selected work, services, process timeline, FAQ, closing CTA, marquee, reveal motion, and reduced-motion handling. The archive provides `all`, `interior`, and `architectural` filters. Booking persists the full consultation request and provides privacy consent, honeypot protection, owner notification, a success state, and a browser-only prefilled WhatsApp handoff.

## Admin baseline

The `/admin` route uses the provided DashboardLayout and server-side admin authorization. It supports project and testimonial management, booking search/filter/detail editing, status lifecycle, CSV export, owner notification visibility, protected analytics timelines, and light/dark theme states. Public procedures exclude drafts and unapproved/unverified testimonials.

## Existing measured evidence

The prior production Lighthouse evidence recorded Home at 48 Performance / 90 Accessibility / 77 Best Practices / 100 SEO, Projects at 52 / 92 / 77 / 100, and BOSKA at 62 / 90 / 77 / 100. The principal known performance constraints were the first-party application bundle, runtime/server latency, external font/runtime conditions, and image discovery. These numbers are historical baselines, not a claim about the current run; they will be rerun after the approved changes.

The prior browser QA covered the requested mobile widths from 320×568 through 430×932 and desktop 1440×900 across Chromium, Firefox, and WebKit-equivalent scenarios, with no recorded horizontal overflow or application exceptions. New work must preserve those invariants.

## Non-negotiable guardrails

The new implementation must not invent project facts, metrics, testimonials, ratings, material claims, before/after imagery, credentials, or client identities. Optional sections remain absent when their data is not approved. No media bytes or secrets belong in GitHub; uploads use permanent storage references, and any new mutation remains protected at the tRPC boundary.
