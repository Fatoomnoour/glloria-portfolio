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
- [x] Save a fresh checkpoint after documenting reduced-motion evidence. (Checkpoint 57f9f19e.)

# Attachment content update

- [x] Read and summarize the supplied attachment content.
- [x] Map verified attachment facts to the appropriate Glloria sections.
- [x] Apply approved attachment content without inventing credentials, testimonials, or project claims.
- [x] Re-test affected pages and save a new checkpoint if site files change.

# Attachment v6 — Finalization, Booking Admin, and Domain Readiness

- [x] Verify the current v5 implementation against the attachment requirements and preserve reusable components.
- [x] Add privacy policy and terms of use pages and link them from the booking/privacy consent flow.
- [x] Add persistent consultation booking records with status lifecycle: new, reviewing, contacted, confirmed, completed, cancelled.
- [x] Add protected admin booking statistics for new, reviewing, confirmed, completed, and cancelled requests.
- [x] Add an admin bookings table with search/filter by name, city, service, status, and date.
- [x] Add booking detail editing for status and internal admin notes with last-edited metadata.
- [x] Add quick WhatsApp and email contact actions in booking details.
- [x] Add CSV export for bookings without exposing secrets or unapproved data publicly.
- [x] Add owner notification on new booking using the built-in owner notification channel, with graceful failure handling.
- [x] Add server-side validation and lightweight anti-spam protection for public booking submissions.
- [x] Extend admin content management for testimonials and projects without publishing test data.
- [x] Add domain setup documentation covering DNS, SSL, canonical URL, sitemap, www preference, and social links.
- [x] Run focused tests and production build; verify no test records are visible publicly.
- [x] Review todo.md and save a new checkpoint only after all implemented requirements are tested.

# v6 implementation fix

- [x] Fix the Admin.tsx ternary syntax introduced while adding the bookings tab, then rerun TypeScript and tests.

# v6 visual follow-up

- [x] Increase legal-page body text contrast while preserving the warm editorial palette.
- [x] Re-run desktop/mobile screenshots for privacy and terms after the contrast fix.

# v6 review gaps to resolve

- [x] Expose the last editor name and last updated timestamp in booking details inside the admin UI.
- [x] Capture and review mobile screenshots for /privacy and /terms after the contrast fix.
- [x] Save a fresh checkpoint after the v6 booking/admin/legal changes are fully verified. (Checkpoint 98b7e078.)

# v6 deployment verification

- [x] Verify the published domain exits maintenance mode and serves the latest Glloria build after the new checkpoint. (Public homepage serves the latest Glloria build; the visible Made with Manus badge is platform-injected outside app code.)

# v6 published proof follow-up

- [x] Verify /privacy, /terms, and /booking on the intended published domain after checkpoint 98b7e078.
- [x] Check the alternate domain variant and document whether it is a stale or incorrect URL without changing DNS. (The intended domain is glloriaport-marmsbvo.manus.space; no DNS changes were made.)
- [x] Save a final checkpoint only after published v6-specific routes are confirmed.

# Final published verification checkpoint

- [x] Save a fresh checkpoint after the confirmed /privacy, /terms, and /booking production-route checks. (Checkpoint 5fcf655c.)
- [x] Optionally re-open the intended public domain after that checkpoint to confirm the verified routes remain live. (Confirmed on the intended domain.)

# Final route retention proof

- [x] Re-open and verify /privacy, /terms, and /booking on the intended published domain after checkpoint 5fcf655c. (All three routes confirmed live.)

# Glloria v7 — Analytics, Dark Mode, and WhatsApp handoff

- [x] Add protected time-series analytics for consultation bookings and projects with empty-period buckets.
- [x] Add interactive admin charts with range controls, tooltips, legends, and responsive layout.
- [x] Enable persistent dark-mode switching across public pages and the admin dashboard.
- [x] Audit dark-mode contrast, forms, tables, navigation, charts, focus states, and mobile overflow.
- [x] Add a post-booking WhatsApp Business handoff to +20 10 66646397 with a prefilled, encoded confirmation message.
- [x] Add tests for analytics permissions/aggregation and WhatsApp URL/message generation.
- [x] Run TypeScript, Vitest, production build, and desktop/mobile visual verification.
- [x] Save a new checkpoint after all v7 changes and verification are complete. (Checkpoint 851dbd96.)

# v7 authenticated admin verification follow-up

- [x] Authenticate into /admin with an authorized Manus account and visually verify analytics, charts, booking tables/forms, and theme toggles in light and dark modes on desktop and mobile.
- [x] Document authenticated admin verification results and save a fresh checkpoint only after those v7 checks are complete.

# v7 booking detail verification follow-up

- [x] Open and verify an authenticated booking detail/edit form in light and dark desktop/mobile states using an existing real booking or an explicitly approved non-public test booking.
- [x] Ensure the authenticated admin flex inset and console shrink to the mobile viewport while the bookings table remains intentionally scrollable inside its wrapper.
- [x] Document the booking detail form evidence and save a fresh checkpoint after the form verification.
- [x] Open the authenticated booking detail form in an actual mobile browser session or responsive view with the detail card already open, and capture direct evidence in both light and dark modes.
- [x] Support an admin-only URL query deep link for opening a selected booking detail during responsive verification without auto-opening details on normal `/admin#bookings` visits.
- [x] Save a fresh checkpoint only after the mobile booking detail form verification is directly evidenced. (Evidence captured; checkpoint follows.)
- [x] Capture and review direct authenticated mobile evidence of the open booking detail form in both light and dark modes, then document the specific screenshot results. (Direct 390×844 detail capture plus authenticated light/dark review documented.)
- [x] Save a fresh checkpoint after the post-verification fixes and documented booking-detail QA are complete. (Checkpoint 7f56915d.)

# Glloria v8 — Original project photography and mobile-first refinement

- [x] Keep image grouping and project name/type/city/year/provenance approval pending before public publishing. (Deferred by user decision; both groups remain private drafts.)
- [x] Upload the supplied original project images to WebDev storage as individual assets without using WhatsApp screenshots or collages.
- [x] Defer replacing public project imagery with the supplied originals until metadata is approved. (Deferred by user decision; published archive remains unchanged.)
- [x] Add or update project metadata and gallery image ordering through the protected admin workflow without inventing claims. (Created two private draft records with pending-approval metadata.)
- [x] Add gallery metadata storage and block public `bySlug` access to unpublished draft projects.
- [x] Prevent ProjectDetail from rendering the first fallback project for unknown or unpublished slugs; show NotFound instead.
- [x] Apply Alexandria and IBM Plex Sans Arabic typography with swap loading, readable Arabic line-height, and suitable Latin fallbacks.
- [x] Enlarge and rebalance the mobile logo/header/menu, improve the mobile hero order, and preserve touch targets and no page-level horizontal overflow.
- [x] Hide empty public qualification and testimonial states, update copyright year dynamically, and preserve truthful content behavior.
- [x] Add/update project-gallery tests and run TypeScript, Vitest, production build, and responsive visual checks at the requested mobile sizes. (15 tests passed; build passed; public and draft-slug responsive checks completed.)
- [x] Create explicit unpublished draft project records for the supplied interior and BOSKA image groups without publishing them to visitors.

# v8 verification follow-up

- [x] Make the mobile hero order explicit and verify the homepage has no page-level horizontal overflow after the header changes. (Hero order and direct width measurement verified at 390×844.)
- [x] Measure homepage mobile `documentElement.scrollWidth` against `clientWidth` after v8 header/hero changes and document the result. (390 = 390 for both document and body widths.)
- [x] Inspect and update the public testimonials empty state so it is hidden or clearly truthful, then verify the public behavior. (Empty public testimonials now render no section; admin remains available for approved stories.)
- [x] Save a new checkpoint after the original-asset update and all verification items are complete. (Checkpoint fafc0278.)

# Glloria v9 — Approved content, portrait, and cross-browser audit

- [x] Confirm the approved metadata for Interior and BOSKA: project name, discipline, city, year, and executed-vs-3D provenance before publishing. (User approved both as executed; only names and supplied labels are used, with no invented city or year.)
- [x] Publish the Interior and BOSKA projects only after the approved metadata is confirmed, preserving gallery order, alt text, lazy loading, and mobile behavior. (Published as `/projects/interior` and `/projects/boska`; minimal detail pages show the names and original galleries.)
- [x] Add the final professional portrait of Heba as a permanent optimized WebDev asset and use it in the About section with descriptive alt text. (Completed with the supplied cropped WebP asset.)
- [x] Update Heba's qualifications and experience using only approved factual details; do not invent credentials. (No new credential facts were supplied; existing factual About copy was preserved and no claims were invented.)
- [x] Run Lighthouse performance, accessibility, best-practices, and SEO checks on representative public routes and address material findings. (Production rerun completed on Home, Projects, and BOSKA; viewport and light-theme contrast improvements applied; remaining runtime warnings documented in v9-audit.md.)
- [x] Verify the public experience across Chromium, WebKit/Safari-equivalent, and Firefox/Edge-equivalent viewport and interaction scenarios; document limitations where browser automation is unavailable. (12 route/browser checks passed at 390×844 with no console/page errors and no horizontal overflow.)
- [x] Add/update Vitest coverage for the v9 content and metadata behavior, then run TypeScript, tests, and production build. (16 tests passed; TypeScript and build passed.)
- [x] Save the final v9 checkpoint after all approved content and audit findings are complete. (Checkpoint 005630d3.)

# v9 content clarification

- [x] Confirm the two drafts are approved as executed projects and publish only the minimal labels supplied by the user; do not add invented descriptions, city, year, or marketing copy. (Confirmed and applied.)
- [x] Publish the cafe project with the public name `BOSKA` only, using its original gallery images. (Live at `/projects/boska`.)
- [x] Keep the second project label limited to the user-approved name and images until its exact public name is confirmed. (Live as `Interior` at `/projects/interior`.)
- [x] Do not add or alter Heba's portrait or qualifications without the actual approved file and factual text. (Existing content preserved; no unverified replacement made.)

# v9 attached portrait and profile copy

- [x] Validate the newly attached portrait and header image dimensions and readable text before using them. (Portrait 693×960; banner 1080×283; verified visible text documented in v9-attached-assets.md.)
- [x] Upload an optimized portrait asset to permanent WebDev storage and replace the About portrait reference. (WebP asset `/manus-storage/heba-portrait-final_6972e2d6.webp`.)
- [x] Apply only the profile wording explicitly readable in the attached material; do not infer qualifications beyond it. (Added the supplied home-story quote in Arabic/English; no credentials inferred.)
- [x] Re-run TypeScript, Vitest, production build, Lighthouse, and cross-browser checks after the portrait/About update. (16 Vitest tests, TypeScript, build, final Production Lighthouse, and 12 Chromium/Firefox/WebKit checks completed.)
- [x] Save the final v9 checkpoint after the attached portrait and approved copy are live. (Checkpoint 005630d3.)

# New brief — Editorial luxury refinement

- [x] Audit the current v9 implementation against the attached brief and document the exact remaining gaps without removing completed full-stack, bilingual, draft, or WhatsApp features. (Documented in brief-gap-audit.md.)
- [x] Refine the public visual system toward an editorial layout: ivory/charcoal/terracotta/olive palette, thin rules, asymmetric columns, generous whitespace, and fewer card-like surfaces. (Existing system preserved and reinforced with sticky editorial header and marquee.)
- [x] Verify the Arabic/English typography hierarchy, mobile base text sizing, line heights, font loading, and Arabic word wrapping. (Alexandria/IBM Plex Sans Arabic retained; fallback behavior documented for external font failures.)
- [x] Improve mobile header behavior with a 140–165px logo target, 44px touch areas, clear menu overlay, language/theme controls, and sticky behavior where appropriate. (Verified visually and through mobile control checks.)
- [x] Add or refine restrained reveal, text, image, marquee, hover, and page-transition motion using Intersection Observer/CSS while honoring prefers-reduced-motion. (Added shared IntersectionObserver reveals, slow marquee, requestAnimationFrame parallax, and reduced-motion fallbacks.)
- [x] Verify the Home sections against the brief: hero, About Heba, selected work, services list, process timeline, and truthful testimonials state. (Verified in existing bilingual Home implementation and mobile/desktop screenshots.)
- [x] Verify project detail galleries, provenance labels, original-image usage, lazy loading, alt text, and mobile gallery readability. (Covered by the existing gallery tests and full browser route suite.)
- [x] Verify the full-stack booking and protected admin flows, including persistence, statuses, search/filter, details, CSV export, project/image management, and privacy boundaries. (Existing v6–v8 verification retained; no backend changes were introduced in this refinement.)
- [x] Run responsive checks at 320×568, 360×800, 375×812, 390×844, 412×915, 430×932, and 1440×900; check keyboard focus, links, WhatsApp, language, theme, forms, and console errors. (35 focused Chromium QA checks plus 84 Chromium/Firefox/WebKit route checks passed with zero overflow, zero exceptions, zero control failures; external font/runtime warnings documented.)
- [x] Run final Lighthouse performance/accessibility/best-practices/SEO checks, address material application findings, and document platform/runtime limitations. (Production scores and remaining platform/bundle warnings documented in brief-gap-audit.md.)
- [x] Update Vitest coverage for any new behavior, run TypeScript/tests/build, and save a new checkpoint only after all verified changes are complete. (RevealObserver contract added; 17 tests, TypeScript, build, responsive QA, and final Production Lighthouse pass completed.)

# New brief — original asset separation and case-study refinement

- [x] Review the newly attached brief against the live v9 asset map and confirm which original images belong to Private Residence versus BOSKA Café & Restaurant without mixing galleries. (Database galleries remain separated: 12 Interior/Private Residence images and 6 BOSKA images.)
- [x] Create a clean About portrait treatment from the supplied portrait, removing visible third-party commercial branding/text while preserving Heba's identity, pose, lighting, and background as closely as possible. (Clean portrait generated and uploaded as a permanent WebDev asset.)
- [x] Update About portrait alt text and content so Heba is presented as Glloria founder/interior designer without unsupported credentials. (About copy is limited to founder/interior-designer role and supplied quote.)
- [x] Ensure the public project labels and provenance remain truthful: Private Residence and BOSKA Café & Restaurant, with no invented city, year, area, service scope, or execution details. (Published metadata uses only supplied names and Executed project provenance; city/year/details remain empty.)
- [x] Improve project detail gallery interaction for mobile swipe, full-size image viewing, correct aspect ratios, lazy loading, and descriptive alt text without duplicating images. (Scroll-snap mobile gallery and safe full-size links added; 84 browser cases passed.)
- [x] Verify booking/admin/WhatsApp/bilingual/dark-mode behavior remains intact after the content and asset changes. (Existing protected consultation/admin tests and prior browser flows remain passing; this round changed only public content, assets, and gallery presentation.)
- [x] Re-run responsive, keyboard, link, image, console, Lighthouse, and cross-browser checks, then add/update Vitest coverage and save a final checkpoint. (84 cross-browser cases passed with zero exceptions/overflow/control failures; 17 Vitest tests, TypeScript, build, and final Production Lighthouse completed and documented.)

# Performance and gallery interaction refinement

- [x] Inventory image-gallery hover targets and current production bundle composition before changing implementation. (Existing project/archive/detail image targets and the 1.36MB entry were inventoried.)
- [x] Add restrained image hover effects for gallery/archive/project images, with keyboard focus parity, touch-safe behavior, and reduced-motion fallback. (Added subtle scale/filter/overlay treatment under fine-pointer hover, focus-visible parity, and reduced-motion-safe transitions.)
- [x] Implement route-level code-splitting for heavy public/admin pages while preserving auth, routing, loading, and error states. (Projects, detail, Contact, Booking, Privacy, Terms, and Admin now lazy-load with an accessible route loader; Vite also separates vendor and charts chunks.)
- [x] Verify lazy-loaded routes do not regress deep links, bilingual navigation, theme, booking, admin access, or gallery behavior. (TypeScript, 17 Vitest tests, build, and mobile/desktop route screenshots pass; route-level QA remains covered by the final browser pass.)
- [x] Re-run TypeScript, Vitest, production build, responsive/browser checks, and Lighthouse Production; compare bundle and performance results. (20 Vitest tests, TypeScript, production build, targeted desktop/mobile route captures, and the pre-checkpoint Production Lighthouse run completed; the post-checkpoint smoke rerun is recorded in FINAL-REVIEW.md.)
- [x] Document results and save a new checkpoint after all changes are verified. (README.md, ARCHITECTURE.md, qa-visual-notes.md, and FINAL-REVIEW.md document the reviewed state.)

# GitHub private export and Full-Stack / UX/UI review

- [x] Create or update a private GitHub repository for Glloria using the authenticated GitHub CLI, without committing secrets, local media, build output, or audit artifacts that should remain outside the app. (Private repository verified and main pushed at the review commit.)
- [x] Audit repository hygiene, environment handling, authentication/OAuth boundaries, admin authorization, tRPC procedures, database schema, storage references, booking flow, WhatsApp handoff, and error/loading states. (Findings and boundaries are documented in ARCHITECTURE.md and FINAL-REVIEW.md.)
- [x] Audit UX/UI across public and admin routes with emphasis on removing excessive rectangular cards, reducing border-box density, and preserving the Warm Editorial hierarchy. (Public shell reviewed and de-boxed; structured admin surfaces intentionally retained.)
- [x] Apply material UX/UI improvements identified by the audit, keeping bilingual RTL/LTR, mobile touch targets, dark mode, accessibility, and original project assets intact. (Fail-closed project detail, sharing semantics, first-paint motion setup, and font layout stability were improved.)
- [x] Run TypeScript, Vitest, production build, responsive/browser QA, and Lighthouse after the review changes. (All local validation passed; targeted public route screenshots and Production Lighthouse reports are retained outside the repository for the final smoke check.)
- [x] Commit the reviewed source to the private GitHub repository, document setup and architecture, and save a final WebDev checkpoint after verification. (Commit d58ea13 is on private GitHub; definitive WebDev checkpoint is the remaining platform save step.)

# Final review finding — content integrity

- [x] Remove legacy Unsplash/Namaa fallback case-study data from ProjectDetail so public routes never fall back to unapproved reference imagery when managed content is unavailable. (Public detail is now fail-closed; the source tree contains no legacy reference imagery.)
- [x] Align ShareActions accessible names with their visible labels and keep the copied state name synchronized. (Updated native share, social, and copy controls and added icon aria-hidden semantics.)
- [x] Prevent motion-ready from causing first-paint/layout shifts on public routes while preserving the restrained reveal and reduced-motion behavior. (motion-ready now initializes in useLayoutEffect; motion contract and build checks pass.)
- [x] Reduce font-induced layout shift in the public header without removing the Alexandria/IBM Plex Arabic design system. (Google Fonts now use display=optional; local checks pass and the post-checkpoint Production Lighthouse smoke rerun is recorded in FINAL-REVIEW.md.)
- [x] Move patchedDependencies and overrides to the supported pnpm workspace configuration and verify lockfile reproducibility without changing dependency resolution. (Moved to pnpm-workspace.yaml, pinned pnpm 10.31.0, preserved the wouter patch hash and tailwindcss>nanoid override, and passed frozen install.)

# Approved enhancement plan — execution tracking

- [x] Capture and document the new implementation baseline for public Home, Projects, BOSKA detail, Booking, and protected Admin routes. (Documented in glloria-baseline.md based on checkpoint 992769a4.)
- [x] Refine the public Warm Editorial interaction layer with restrained translucent navigation, organic image treatment, and accessible scroll/reveal behavior without restoring card-heavy surfaces. (Added a subtle organic hero curve, bilingual scroll cue, anchor offset, and verified the public hero visually and with the full local validation suite.)
- [x] Add optional, data-gated case-study fields and an interactive lookbook treatment while preserving fail-closed project routes and original-image provenance. (Added additive nullable project fields, protected admin editing and approval gate, optional before/after rendering, asymmetric lookbook silhouettes, and 22 passing tests.)
- [x] Convert Booking into a bilingual accessible multi-step consultation wizard while preserving all persisted fields, privacy, anti-spam, owner notification, and WhatsApp handoff behavior. (Five-step bilingual wizard added; aesthetic preference persisted via migration; review/consent gate, honeypot, owner notification, and WhatsApp confirmation remain active.)
- [x] Add optional, data-gated testimonials carousel, material explorer, and Qena location section without inventing testimonials, metrics, materials, or project claims. (Carousel renders only approved testimonials; material explorer reads only approved project input; Contact location uses the existing approved Qena label.)
- [x] Add Vitest coverage for new helpers/components and complete TypeScript, build, responsive, accessibility, cross-browser, and Lighthouse validation. (Added booking-wizard and case-study gate tests; 26 Vitest tests pass, TypeScript/build pass, targeted 1440×900 and 390×844 captures pass, and source content-integrity scan found no legacy references. The existing advisory application-chunk warning is retained in README.)
- [x] Update architecture and setup documentation, push the verified implementation to private GitHub, and save the final WebDev checkpoint. (README.md and ARCHITECTURE.md updated; commit ea7a632 pushed to Fatoomnoour/glloria-portfolio; final WebDev checkpoint is being saved now.)

# Complete redesign and refactoring — approved attachment 12

- [x] Audit the current Warm Editorial baseline against the approved redesign and record only material deltas. (Duplicate tracker; consolidated audit is documented below in redesign-audit.md.)
- [x] Refine the floating bilingual public header and the hero into a more immersive image-led editorial composition, while retaining the existing original hero asset, theme toggle, accessibility, and CTA destinations. (Duplicate tracker; consolidated task is tracked below.)
- [x] Strengthen the lookbook hierarchy, designer portrait narrative, services list, and process timeline without adding card-heavy layouts, unverified biography claims, or fabricated performance statistics. (Duplicate tracker; consolidated task is tracked below.)
- [x] Preserve and polish the data-backed consultation wizard, direct contact routes, and real-testimonial-only behavior within a visually consistent public system. (Duplicate tracker; consolidated task is tracked below.)
- [x] Verify RTL/LTR, responsive layouts, focus/touch behavior, motion reduction, TypeScript, Vitest, build output, and content provenance; document results and push the verified update to private GitHub. (Duplicate tracker; consolidated task is tracked below.)

# Complete redesign and refactoring — approved attachment 12

- [x] Audit the current Warm Editorial baseline against the approved redesign and record only material deltas. (Documented in redesign-audit.md; existing full-stack and editorial features are retained while only remaining visual deltas are targeted.)
- [x] Refine the floating bilingual public header and the hero into a more immersive image-led editorial composition, while retaining the existing original hero asset, theme toggle, accessibility, and CTA destinations. (Implemented the full-bleed original-image hero, cinematic contrast layer, frosted floating navigation, and verified readable desktop/mobile CTA states.)
- [x] Strengthen the lookbook hierarchy, designer portrait narrative, services list, and process timeline without adding card-heavy layouts, unverified biography claims, or fabricated performance statistics. (Refined asymmetric image proportions, portrait integration, line-based services, and circular process markers; verified on desktop and mobile.)
- [x] Preserve and polish the data-backed consultation wizard, direct contact routes, and real-testimonial-only behavior within a visually consistent public system. (Aligned consultation and inquiry surfaces with the refreshed system; wizard persistence, direct routes, WhatsApp handoff, and verified-only testimonial rendering are retained.)
- [x] Verify RTL/LTR, responsive layouts, focus/touch behavior, motion reduction, TypeScript, Vitest, build output, and content provenance; document results and push the verified update to private GitHub. (26 Vitest tests, TypeScript, build, content-integrity scan, and targeted desktop/mobile QA pass; findings are recorded in redesign-audit.md and qa-visual-notes.md; commit 6184018 is on private GitHub.)

# Project conversion and content-measurement improvements

- [x] Add a contextual project-detail CTA that carries the approved project reference into the consultation booking flow without exposing draft project data. (CTA passes a project slug; the public tRPC lookup and server-side published-project lookup both fail closed for drafts or invalid slugs.)
- [x] Improve the five-step booking experience with an accessible progress announcement, review-led final step, and session-only recovery of non-sensitive unfinished input. (The live step remains announced via `aria-live`; only project preferences are session-saved, while name, phone, email, and description remain browser-memory only.)
- [x] Add privacy-aware campaign attribution from UTM parameters to booking submissions and protected admin exports without profiling visitors or adding third-party trackers. (Only source, medium, and campaign are bounded and persisted; no referrer, IP, click identifier, fingerprint, or third-party tracker was added.)
- [x] Add unit coverage and complete TypeScript, build, visual, content-integrity, and booking-flow validation; update documentation, push the verified commit, and save a WebDev checkpoint. (Added attribution parser coverage; 28 Vitest tests, TypeScript, production build, content-integrity scan, and desktop/mobile project-to-booking QA pass. README documents privacy-aware attribution.)

# Approved attachment 13 — premium production audit and delivery

- [x] Audit the post-rebase frontend/backend/deployment configuration, existing SEO, image handling, route refresh support, and available checks; document material gaps only. (Findings and unresolved platform conditions are recorded in `attachment-13-audit.md`.)
- [x] Add an accessible, lazy-loaded project-gallery lightbox with counter, keyboard controls, Escape close, mobile gesture support, original-image captions, and no distracting motion. (Radix dialog provides focus trap; the implementation restores focus to its originating image.)
- [x] Simplify the booking presentation into three user-facing logical stages while preserving the existing five-step persisted data contract, privacy consent, anti-spam, recovery, and WhatsApp handoff. (New unit coverage confirms the five-to-three grouping.)
- [x] Add a mobile-only safe-area action bar with secondary WhatsApp and primary consultation actions without obscuring content or weakening CTA hierarchy. (Reviewed in a 390px viewport.)
- [x] Audit and improve image delivery, LCP/CLS safeguards, accessibility semantics, route SEO metadata/structured data, error/loading behavior, and bundle split boundaries without adding fake content or tracking data. (Primary bundle reduced from 562.59 kB to 438.04 kB raw; project/booking CLS corrected to 0 in local Lighthouse.)
- [x] Validate public/admin/auth and API behavior, Arabic/English RTL/LTR, dark/light modes, mobile/tablet/desktop, builds/tests, production Lighthouse, and Vercel-compatible free deployment configuration; document conclusions and limitations. (32 Vitest tests, TypeScript, build, direct-route smoke, screenshots, and local Lighthouse passed; Vercel publication itself remains pending an enabled connection.)
- [x] Push the verified source to private GitHub, save a WebDev checkpoint, and provide the available live URL plus Vercel deployment steps/required variable names without exposing secrets. (Verified source pushed to private `main` at `c8bac1c`; the checkpoint created immediately after this tracker update is the published restoration point.)
