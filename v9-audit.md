# Glloria v9 — Performance and Browser Audit

## Scope

The audit covered the local WebDev preview after publishing the approved project records and the minimal project-detail rendering. Tested routes were `/`, `/projects`, `/projects/boska`, and `/projects/interior`, with a mobile viewport of 390×844 for browser compatibility.

## Lighthouse

Lighthouse 13.4.1 was run against the local preview using the desktop preset. The local preview is a development server, so its JavaScript payload and timing scores are not equivalent to the deployed production build. The results are retained as a baseline rather than a production SLA.

| Route | Performance | Accessibility | Best practices | SEO |
|---|---:|---:|---:|---:|
| `/` | 59 | 83 | 81 | 100 |
| `/projects` | 59 | 87 | 81 | 100 |
| `/projects/boska` | 47 | 83 | 81 | 100 |

The main performance opportunities were development-bundle size and LCP timing. Lighthouse estimated roughly 2.3–2.4 MiB of unused JavaScript and reported LCP around 5.9–6.4 seconds in the development preview. The main accessibility findings were color contrast, touch-target sizing, and the previous restrictive `maximum-scale=1` viewport setting. The viewport restriction was removed, and the light-theme muted/clay colors were darkened modestly to improve contrast while preserving the visual system.

## Browser compatibility

Playwright ran the same four routes in Chromium, Firefox, and WebKit at 390×844. All 12 route/browser combinations loaded the expected document title, had `scrollWidth === clientWidth === 390`, and produced no captured console or page errors. The projects archive exposed both `BOSKA` and `Interior`, and each project detail route loaded its original gallery. Lazy loading means not every below-fold image is decoded at the instant of the check; the test therefore records both total image count and successfully decoded image count.

The test used the local preview. A production Lighthouse rerun should be performed after the final checkpoint is live, because development-mode timing and bundle diagnostics are intentionally noisier than deployed output.

## Content note

The public records now use only the supplied approved labels: `BOSKA` and `Interior`, both marked as executed, with no invented city, year, narrative, or project claims. The final professional portrait file and approved qualifications text were not supplied in this task, so the existing portrait and factual About copy remain unchanged rather than being replaced with unverified content.
