# Glloria v3 — Implementation Checklist

- [x] Upgrade the static project to the full-stack web-db-user template.
- [x] Define persistent project and testimonial models with explicit ownerId ownership and status fields.
- [x] Generate and apply the database migration without destructive changes.
- [x] Add protected admin procedures for listing, creating, editing, and deleting projects and testimonials.
- [x] Reuse the provided DashboardLayout for a protected management page.
- [x] Add admin forms for project metadata, design discipline, images, and testimonial approval state.
- [x] Prevent unapproved or unverified testimonials from appearing on the public site; require explicit consent and verified status before publication.
- [x] Update direct WhatsApp contact destinations to 201097430973 in booking, contact, footer, and floating CTA; preserve generic WhatsApp share for project link sharing.
- [x] Extend portfolio filtering to include interior and architectural design categories.
- [x] Verify auth redirects, protected mutations, public queries, filtering, WhatsApp links, and mobile layout.
- [x] Run tests, TypeScript check, and production build.
- [x] Capture representative screenshots and save a new published checkpoint.

# Glloria v3 — Verification Gaps To Resolve

- [x] Add explicit admin ownership fields to projects and testimonials, backfill safely, and migrate the schema.tabase.
- [x] Add an explicit verification record/state for testimonials so public approval requires verified content and consent rather than only a checkbox.
- [x] Verify the new WhatsApp number in Contact.tsx and every direct booking/contact path; keep project sharing as a generic share action.
- [x] Add browser-level verification evidence for auth redirect state, admin page rendering, filter controls, and WhatsApp destinations.
- [x] Run pnpm build after the full-stack/admin changes.
- [x] Save a new v3 checkpoint after all gaps are resolved.

# Glloria v3 — Final Verification To Resolve

- [x] Verify the unauthenticated /admin flow, project filter switching, and direct WhatsApp link targets through the running app.
- [x] Save a new published v3 checkpoint after final verification.

# Glloria v4 — Calendar, Bilingual UX, and Motion

- [ ] Inspect available Google Calendar integration and choose a secure booking architecture without exposing credentials.
- [ ] Add any mandatory calendar secrets or OAuth configuration through the project secret workflow.
- [ ] Store consultation requests with appointment status and calendar event metadata.
- [ ] Create the Google Calendar availability and booking flow, with conflict handling and confirmation messaging.
- [ ] Add Arabic/English locale state, accessible language toggle, translated navigation, booking, archive, and core public content.
- [ ] Preserve RTL for Arabic and switch to LTR for English without breaking layout or typography.
- [ ] Add a subtle loading transition when switching portfolio filters, including reduced-motion support.
- [ ] Add/update Vitest coverage for booking conflict behavior and locale/filter helpers.
- [ ] Verify calendar authorization/booking states, bilingual navigation, filter animation, mobile layout, TypeScript, tests, and production build.
- [ ] Review todo.md and save a new published checkpoint.

# Glloria v5 — Professional UX, Booking, Case Studies, SEO

- [x] Audit the published site and current reusable components against the requested UX improvements.
- [x] Remove any public “Made with Manus” branding from the final user-facing experience.
- [x] Standardize primary CTAs to “احجزي استشارتك” and secondary work CTA to “شاهدي الأعمال”.
- [x] Refine the testimonials area into a compact, truthful empty state with no coming-soon language and a ready layout for approved real testimonials.
- [x] Expand the booking form with city, property type, approximate area, service, budget, preferred date/time, project description, and privacy consent.
- [x] Add a clear success state explaining review and WhatsApp follow-up.
- [x] Add FAQ content covering price, duration, service area, remote work, design/execution timelines, and design vs supervision vs execution.
- [x] Upgrade all three project pages into professional case studies with brief, challenge, concept, materials, multiple images, before/after availability state, and executed-vs-3D labels.
- [x] Strengthen About Heba with biography, qualifications/experience, design philosophy, suitable project types, and professional portrait.
- [x] Improve mobile overflow, navigation, Arabic type scale, WhatsApp prominence, form usability, and image loading performance.
- [x] Add descriptive image alt text, requested SEO title, Open Graph/social sharing metadata, and local business structured data.
- [x] Verify WhatsApp, Instagram, Facebook, booking, project routes, accessibility, responsive layouts, TypeScript, tests, and production build.
- [x] Review todo.md and save a new published checkpoint.

# Glloria v5 — Verification Gaps

- [ ] Re-verify the final published site for the “Made with Manus” badge and document whether it is platform-injected or removable from project code.
- [ ] Add explicit per-image provenance labels: executed project, 3D visualisation, or reference imagery.
- [ ] Keep About Heba factual by adding approved qualification/experience fields or a truthful “details to be supplied” treatment without inventing credentials.
- [ ] Perform focused browser-level checks for external links, booking submission, project routes, keyboard focus, labels, and responsive behavior after v5 changes.
- [ ] Save a new published v5 checkpoint only after the above checks are complete.
