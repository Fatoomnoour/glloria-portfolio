# `client/public/images/` — Local Image Assets

All images in this folder are locally-hosted static files, served directly
by Vercel from the built `dist/public/images/` output — no runtime storage
backend, no remote image domain configuration, and no Vercel rewrite is
required for them to load.

Metadata (alt text, dimensions, srcSet, "temporary placeholder" notices) for
every image below is centralized in
`client/src/data/projectImages.ts`. Update that file's comments and the
files here together whenever an image is replaced.

## Current files (all TEMPORARY placeholders — see notice below)

| Filename pattern | Used for | Dimensions | Aspect ratio |
|---|---|---|---|
| `hero-living-room-{480,768,1024,1440,1920}w.webp` | Homepage hero (full-bleed) | base 1920×1280 | 3:2 |
| `project-private-residence-{480,768,960,1200}w.webp` | "Private Residence" project card/cover | base 1200×800 | 3:2 |
| `project-boska-cafe-{480,768,960,1200}w.webp` | "Boska Café & Restaurant" project card/cover | base 1200×800 | 3:2 |
| `founder-portrait-placeholder-{480,640,800}w.webp` | "About Heba" founder portrait | base 800×1200 | 2:3 |
| `glloria-logo-placeholder-512.webp` | Header brand mark, studio seal, favicon, OG image | 512×512 | 1:1 |

## ⚠️ Important: these are placeholders, not real project photography

- The three interior/café scenes (`hero-living-room-*`, `project-private-residence-*`,
  `project-boska-cafe-*`) are AI-generated illustrative interior-design
  images. They are **not** photographs of Glloria's actual executed
  projects. They exist only so the live site is never broken/empty while
  real project photography is being gathered and approved.
- `founder-portrait-placeholder-*` is a deliberately abstract, illustrated
  line-art image — **not a photograph of a real person**. Using a stock
  photo of a stranger and labeling them "Heba El Damarany, founder" would
  misrepresent a real person's identity, so an abstract illustration was
  used instead until a real, approved portrait is supplied.
- `glloria-logo-placeholder-512.webp` is a placeholder monogram, not the
  studio's real/final brand logo.

## Replacing a placeholder with the real asset

1. Get the final, approved image (photo or logo file).
2. Export it as WebP at the widths listed in the table above, keeping the
   same aspect ratio as closely as possible (this avoids layout shift,
   since `width`/`height` are hard-coded in `projectImages.ts` to match the
   current placeholder dimensions).
3. Overwrite the files in this folder using the **same filenames**, or
   update the `src`/`srcSet` paths in `client/src/data/projectImages.ts`
   if you use different filenames.
4. Update the `alt` and `imageKind` bilingual text in
   `client/src/data/projectImages.ts` to describe the real image.
5. Run `pnpm build` locally and verify the new image renders correctly in
   both Arabic and English before deploying.

No other code changes are required — every page that displays these images
reads exclusively from `client/src/data/projectImages.ts`.
