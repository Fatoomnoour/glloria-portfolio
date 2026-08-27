# Visual QA Notes — 2026-08-27

## Desktop 1440×900

- Home: the warm editorial hero reads as an image-led spread with generous negative space, thin rules, and underline CTAs; no filled card grid is visible in the first viewport.
- Projects: archive hierarchy is clear, with an asymmetric two-project image composition and an understated filter row; no rounded card panels are visible in the first viewport.
- Booking: the form and explanatory copy are arranged as a two-column editorial spread. The controls use thin rules rather than boxed surfaces; form labels remain legible at desktop width.
- Persistent WhatsApp entry remains visually quiet and secondary, consistent with the editorial direction.

## Follow-up

- Run the same checks at 390×844 and verify that the navigation, form controls, focus styles, and image galleries do not introduce horizontal overflow.
- Run production build, tests, and route smoke checks after the final CSS and documentation changes.

## Mobile 390×844

At the 390px viewport, Home presents the text-first hero order followed by the image, Projects keeps the archive/filter hierarchy readable, and the Interior detail page exposes a clear return path and project title. Booking begins with the consultation promise and moves into the form without a dense card shell. The 404 view also remains on-brand rather than falling back to a generic component. No horizontal overflow is visible in the captured viewports; the hamburger target is comfortably reachable and the fixed WhatsApp affordance remains visible.

## Post-fix regression check

The desktop and 390px captures of `/projects/interior` and `/projects/boska` show the managed original cover image, approved title, provenance label, and quiet share row without the previous fallback case-study copy. The unknown route displays the branded 404 page rather than a first-project fallback. The mobile project pages remain within the viewport and retain the fixed WhatsApp action.

## Typography and motion regression check

After `font-display=optional` and `useLayoutEffect`, desktop and 390px captures retain the Alexandria/IBM Plex Sans Arabic hierarchy, project photography, editorial rules, and mobile form flow. No horizontal overflow is visible in the reviewed routes, and the public CTA/WhatsApp affordance remains reachable without adding filled card surfaces.

## Approved-plan phase 2 baseline check

A 1440×900 Home capture after the Warm Editorial interaction update shows the hero image with a restrained lower-corner organic curve, balanced Arabic headline hierarchy, visible bilingual navigation, and a small scroll cue leading to the studio story. The cue behaves as an editorial link rather than a filled card, and no visual regression or new surface density was observed.

## Approved-plan phase 3 check

The 1440×900 archive capture shows the existing asymmetric lookbook with the new curved image silhouettes and no card-wall regression. The BOSKA detail capture remains image-led with title, project label, sharing controls, and original hero photography. Because the database records currently have `caseStudyApproved = false`, the optional case-study section correctly remains absent rather than displaying empty headings or invented copy.

## Approved-plan phase 4–5 check

Desktop captures show the consultation wizard as a progressive editorial form: step title, five-step progress, and contact fields are separated with thin rules rather than dense cards. The Contact page keeps the existing WhatsApp and social actions and now ends with a restrained Qena location section. The 390×844 captures show the mobile header, hero, wizard fields, and location section without visible horizontal overflow; the progress labels remain legible and the next action is reachable after the fields.

## Attachment 12 — shell and hero check

The redesigned desktop hero now uses the approved original hero image as a full-bleed composition with a low-contrast cinematic wash and readable editorial copy. The floating translucent header remains distinct from the image while retaining language, theme, and booking controls. At 390×844, the capsule header remains clear and the Arabic headline, primary consultation action, secondary work action, captions, and scroll cue stay readable within the viewport.

## Attachment 12 — editorial sections check

The full desktop capture shows a more open magazine-spread relationship between the selected project images, their labels, the founder portrait, and the line-based services/process sections. The mobile capture preserves this hierarchy with the portrait visible, organic image edges, compact process markers, readable Arabic headings, and no horizontal overflow visible in the full-page view.

## Attachment 12 — booking and contact check

The refreshed Booking page keeps the five-step consultation wizard clear beside its editorial explanation, with thin-rule input fields and no card grid. Contact retains its direct inquiry flow, WhatsApp/email/social actions, and the approved Qena location label in the same visual system. Both desktop captures preserve readable contrast and the footer remains concise.

## Project-to-booking attribution check

Desktop and 390px captures of `/projects/interior` and the linked booking URL confirm that the published project remains image-led and that the booking page identifies **Private Residence** as the inspiring project without crowding the header or step-one fields. The reference is visually separated as a small editorial note, and no horizontal overflow is visible in the mobile capture.
