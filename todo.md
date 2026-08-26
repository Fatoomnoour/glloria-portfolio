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
