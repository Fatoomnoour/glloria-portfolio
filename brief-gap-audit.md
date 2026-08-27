# Glloria brief gap audit

## Already present in v9

The application already has the Warm Editorial palette, Alexandria and IBM Plex Sans Arabic, bilingual RTL/LTR switching, dark mode, a mobile menu, consultation booking persistence, protected admin screens, analytics, WhatsApp handoff, truthful empty testimonials behavior, original WebDev galleries, provenance labels, SEO metadata, and public/privacy boundaries. The two approved projects are live as minimal image-led pages: `Interior` and `BOSKA`.

The supplied portrait is now an optimized WebP in permanent storage and the supplied home-story quote is present in the About section. No new credentials were inferred from the supplied materials.

## Gaps addressed in this refinement

The new brief called for a more explicit responsive Hero order, a restrained repeated editorial marquee, and reusable viewport reveal motion. The Hero was adjusted so mobile content reads title, description, primary booking CTA, secondary work CTA, and then image. A slow marquee was added after the Hero, and a shared Intersection Observer component now reveals sections without adding layout-heavy animation. The `prefers-reduced-motion` path disables both reveal transitions and marquee movement.

## Remaining non-blocking limitations

The current app still loads the production React bundle as one large first-party chunk, so Lighthouse Performance remains below the requested 90+ target on the managed runtime. Some Lighthouse Best Practices warnings come from the runtime or external resources, including StorageProxy/font fetch behavior and source-map/deprecation diagnostics. These should be treated as follow-up optimization work rather than hidden or misreported.
