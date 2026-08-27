# Glloria Complete Redesign — Delta Audit

## Baseline

Checkpoint `a390e6a0` already provides an asymmetric Warm Editorial public interface, Arabic/English RTL/LTR switching, a frosted sticky header, original project imagery, restrained reveal/parallax motion, dark mode, an accessible five-step booking workflow, protected content administration, and a verified-testimonial gate.

## Material deltas from attachment 12

| Requested direction | Existing baseline | Planned refinement |
|---|---|---|
| Floating translucent navigation | Sticky, translucent header already exists | Make the desktop shell feel more deliberately floating above the hero while preserving its accessibility and mobile menu behavior. |
| Full-bleed, cinematic hero | Current hero is asymmetric with a framed original image | Increase visual immersion using the existing approved hero asset, a low-contrast cinematic overlay, and controlled type/image overlap. No new or synthetic project imagery will be introduced. |
| Lookbook instead of card grid | Archive and home work use asymmetric media-first layouts | Strengthen editorial hierarchy, image-edge treatment, and open metadata; preserve filters backed by actual project types only. |
| Designer narrative and minimalist statistics | Founder portrait and factual role copy are available; no verified metrics are available | Improve portrait/narrative composition only. Project counts and experience-year statistics remain absent until verified source data is supplied. |
| Services and process as lists/timeline | Both are already line-based rather than card-based | Improve rhythm, hover/focus clarity, and directional reading without changing factual service descriptions. |
| Testimonials slider | Verified-only carousel already exists | Retain the gate; refine only its visual integration. No reviews, ratings, or client stories will be seeded. |
| Contact and booking | Persistent wizard, WhatsApp handoff, and direct contact are already built | Align input treatment and CTA composition with the refreshed public system. |

## Scope protection

The redesign will not add unverified city/service claims, fabricated projects, reviews, ratings, before/after imagery, qualifications, client names, project totals, years of experience, or auto-sent WhatsApp messages. Existing tRPC, Drizzle, OAuth, and database boundaries are retained; the work is presentation-first unless a data contract genuinely needs change.

## Validation summary

The final implementation passed `pnpm test` with **26** tests, `pnpm check`, and `pnpm build`. Targeted desktop and 390px mobile captures verified the floating header, cinematic hero, text hierarchy, original project imagery, founder portrait, services/process presentation, booking wizard, contact flow, and footer. A source scan confirmed that no legacy Unsplash/Namaa fallback references remain. The existing main-app bundle advisory remains documented; public route-level chunks and the separately loaded admin/chart chunks are preserved.
