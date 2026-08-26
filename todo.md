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

- [x] Inspect available Google Calendar integration and choose a secure booking architecture without exposing credentials. (Deferred by client decision.)
- [x] Add any mandatory calendar secrets or OAuth configuration through the project secret workflow. (Deferred until Heba confirms the account.)
- [x] Store consultation requests with appointment status and calendar event metadata. (Deferred until calendar integration is approved.)
- [x] Create the Google Calendar availability and booking flow, with conflict handling and confirmation messaging. (Deferred; WhatsApp booking remains active.)
- [x] Add Arabic/English locale state, accessible language toggle, translated navigation, booking, archive, and core public content.
- [x] Preserve RTL for Arabic and switch to LTR for English without breaking layout or typography.
- [x] Add a subtle loading transition when switching portfolio filters, including reduced-motion support.
- [x] Add/update Vitest coverage for booking conflict behavior and locale/filter helpers. (Calendar conflict test deferred with calendar integration.)
- [x] Verify calendar authorization/booking states, bilingual navigation, filter animation, mobile layout, TypeScript, tests, and production build. (Calendar states deferred; remaining v4 items verified.)
- [x] Review todo.md and save a new published checkpoint. (Calendar portion deferred by client decision.)

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

- [x] Re-verify the final published site for the “Made with Manus” badge and document whether it is platform-injected or removable from project code.
- [x] Add explicit per-image provenance labels: executed project, 3D visualisation, or reference imagery.
- [x] Keep About Heba factual by adding approved qualification/experience fields or a truthful “details to be supplied” treatment without inventing credentials.
- [x] Perform focused browser-level checks for external links, booking submission, project routes, keyboard focus, labels, and responsive behavior after v5 changes. (Routes, form layout, labels, and responsive states verified; external destinations remain standard outbound links.)
- [x] Save a new published v5 checkpoint only after the above checks are complete.

# Deferred by client decision

- [x] Revisit Google Calendar OAuth or Appointment Schedule integration only after Heba confirms the Google account and preferred booking method. (Deferred by client decision.)
- [x] When revisited, add calendar availability, conflict handling, appointment event metadata, and calendar-specific tests. (Deferred by client decision.)

# Glloria v5 — Post-publish verification follow-up

- [x] Add explicit prefers-reduced-motion handling for archive filter loading and case-study transitions.
- [x] Re-test the language toggle and filter transition on the running site; document deferred calendar states.
- [x] Verify the final published attribution behavior and external link destinations after the latest checkpoint. (Attribution is platform-injected; app links are present and use the intended destinations.)
- [x] Perform a keyboard/focus pass and submit the rewritten booking form in the browser. (Required validation and visible focus verified; no external message sent.)
- [x] Save a fresh checkpoint only after this follow-up verification is complete.

# Final evidence gaps before v5 follow-up checkpoint

- [x] Re-test the published /projects filter transition and reduced-motion fallback with a direct browser state check.
- [x] Successfully submit the rewritten booking form with locale-matched values and confirmed privacy consent, then verify the success state.
- [x] Save a new checkpoint after the two checks above are evidenced.

# Final reduced-motion evidence

- [x] Verify reduced-motion behavior on the published /projects page through an emulated preference or document the browser-tool limitation explicitly. (CSS rule verified; browser tool cannot emulate OS preference.)
- [ ] Save a fresh checkpoint after documenting reduced-motion evidence.
