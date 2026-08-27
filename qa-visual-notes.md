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
