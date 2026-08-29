/**
 * Centralized, locally-hosted image registry for Glloria's public-facing pages.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * The site previously referenced images through `/manus-storage/{key}` paths
 * served by a proprietary "Manus Forge" storage backend. That backend is
 * Manus-platform-specific infrastructure and is NOT available/configured on
 * this standalone Vercel deployment (see `server/_core/storageProxy.ts`,
 * which returns HTTP 500 whenever `BUILT_IN_FORGE_API_URL` /
 * `BUILT_IN_FORGE_API_KEY` are unset). As a result every `/manus-storage/*`
 * image URL 404s in production and the interface looks broken/unfinished.
 *
 * THESE ARE TEMPORARY PLACEHOLDER IMAGES, NOT REAL PROJECT PHOTOGRAPHY
 * ----------------------------------------------------------------------
 * All five images below are either:
 *   (a) AI-generated interior/cafe scenes used ONLY as tasteful visual
 *       placeholders until the studio supplies real, verified photography
 *       of its own executed projects, or
 *   (b) an intentionally abstract illustrated mark (founder avatar, logo)
 *       that does NOT depict a real photograph of any person or the
 *       studio's actual brand mark, to avoid misrepresenting anyone's
 *       identity or the business's real visual identity.
 * None of these should ever be described in copy as "real"/"executed"
 * project photos. `imageKind` values below are explicit about this.
 *
 * FILES ON DISK
 * -------------
 * All variants live in `client/public/images/` and are copied verbatim by
 * Vite into `dist/public/images/` at build time, so they are served as
 * plain static assets on Vercel — no remote image domain configuration,
 * no runtime dependency on any storage backend, and no additional Vercel
 * rewrite is required for them.
 *
 * HOW TO REPLACE AN IMAGE WITH THE REAL ONE LATER
 * ------------------------------------------------
 * 1. Obtain the final, approved photo (ideally already color-graded to
 *    match the site's warm ivory/terracotta/olive palette).
 * 2. Export it as WebP at the widths listed in this file's `srcSet` for
 *    that image (e.g. 480w/768w/1024w/1440w/1920w for the hero), matching
 *    the existing aspect ratio as closely as possible to avoid layout
 *    shift. `client/public/images/README.md` documents the exact
 *    filenames, dimensions, and aspect ratio expected for each slot.
 * 3. Overwrite the corresponding files in `client/public/images/` using
 *    the SAME filenames referenced in this file (or update the paths
 *    below if the new filenames differ).
 * 4. Update `alt`/`imageKind` copy in this file to describe the real photo.
 * 5. Run `pnpm build` and verify the new image renders correctly in both
 *    locales before deploying.
 *
 * No code changes are needed anywhere else in the app — every page reads
 * image data through this single file.
 */

export type LocalizedAlt = {
  ar: string;
  en: string;
};

export type ImageAsset = {
  /** Primary <img src> — largest/base resolution, used as the fallback. */
  src: string;
  /** srcSet string listing all available responsive widths. */
  srcSet: string;
  /** Intrinsic width of `src`, in pixels — required to prevent layout shift. */
  width: number;
  /** Intrinsic height of `src`, in pixels — required to prevent layout shift. */
  height: number;
  /** Bilingual alt text. */
  alt: LocalizedAlt;
  /**
   * Human-readable, bilingual note describing what this image actually is
   * (e.g. "temporary placeholder" vs "real executed project photo"). Shown
   * in image captions/figcaptions where applicable so visitors are never
   * misled about project authenticity.
   */
  imageKind: LocalizedAlt;
};

/**
 * Full-bleed homepage hero image.
 * File: client/public/images/hero-living-room-{width}w.webp
 * Source dimensions: 1920x1280 (3:2 aspect ratio)
 * Format: WebP, generated at 480w / 768w / 1024w / 1440w / 1920w
 * Status: TEMPORARY — AI-generated warm living room scene, not a real
 * Glloria project. Replace with a real hero photograph of an executed
 * project as soon as one is approved.
 */
export const heroImage: ImageAsset = {
  src: "/images/hero-living-room-1920w.webp",
  srcSet:
    "/images/hero-living-room-480w.webp 480w, " +
    "/images/hero-living-room-768w.webp 768w, " +
    "/images/hero-living-room-1024w.webp 1024w, " +
    "/images/hero-living-room-1440w.webp 1440w, " +
    "/images/hero-living-room-1920w.webp 1920w",
  width: 1920,
  height: 1280,
  alt: {
    ar: "مساحة معيشة دافئة بأسلوب تصميم Glloria — صورة توضيحية مؤقتة",
    en: "Warm living space in the Glloria design style — temporary placeholder image",
  },
  imageKind: {
    ar: "صورة توضيحية مؤقتة، وليست صورة تنفيذ فعلي",
    en: "Temporary placeholder image, not an executed project photo",
  },
};

/**
 * "Private Residence" project card / cover image (used on Home + Projects
 * archive + Project Detail page for slug "interior").
 * File: client/public/images/project-private-residence-{width}w.webp
 * Source dimensions: 1200x800 (3:2 aspect ratio)
 * Format: WebP, generated at 480w / 768w / 960w / 1200w
 * Status: TEMPORARY placeholder — replace with verified photography of the
 * actual Private Residence project once available.
 */
export const privateResidenceImage: ImageAsset = {
  src: "/images/project-private-residence-1200w.webp",
  srcSet:
    "/images/project-private-residence-480w.webp 480w, " +
    "/images/project-private-residence-768w.webp 768w, " +
    "/images/project-private-residence-960w.webp 960w, " +
    "/images/project-private-residence-1200w.webp 1200w",
  width: 1200,
  height: 800,
  alt: {
    ar: "منزل خاص — صورة توضيحية مؤقتة لمساحة معيشة دافئة",
    en: "Private Residence — temporary placeholder image of a warm living space",
  },
  imageKind: {
    ar: "بانتظار اعتماد صور التنفيذ الفعلي",
    en: "Pending approval of real executed-project photography",
  },
};

/**
 * "Boska Café & Restaurant" project card / cover image (used on Home +
 * Projects archive + Project Detail page for slug "boska").
 * File: client/public/images/project-boska-cafe-{width}w.webp
 * Source dimensions: 1200x800 (3:2 aspect ratio)
 * Format: WebP, generated at 480w / 768w / 960w / 1200w
 * Status: TEMPORARY placeholder — replace with verified photography of the
 * actual Boska Café & Restaurant project once available.
 */
export const boskaCafeImage: ImageAsset = {
  src: "/images/project-boska-cafe-1200w.webp",
  srcSet:
    "/images/project-boska-cafe-480w.webp 480w, " +
    "/images/project-boska-cafe-768w.webp 768w, " +
    "/images/project-boska-cafe-960w.webp 960w, " +
    "/images/project-boska-cafe-1200w.webp 1200w",
  width: 1200,
  height: 800,
  alt: {
    ar: "BOSKA كافيه ومطعم — صورة توضيحية مؤقتة لمساحة كافيه دافئة",
    en: "Boska Café & Restaurant — temporary placeholder image of a warm café space",
  },
  imageKind: {
    ar: "بانتظار اعتماد صور التنفيذ الفعلي",
    en: "Pending approval of real executed-project photography",
  },
};

/**
 * Founder ("About Heba") portrait placeholder.
 * File: client/public/images/founder-portrait-placeholder-{width}w.webp
 * Source dimensions: 800x1200 (2:3 aspect ratio)
 * Format: WebP, generated at 480w / 640w / 800w
 * Status: TEMPORARY, and DELIBERATELY ABSTRACT/ILLUSTRATED — this is a
 * single-line-art illustration, NOT a photograph of any real person. It
 * was chosen specifically to avoid presenting a stock photo of a stranger
 * as if they were Heba El Damarany. Replace with her real, approved
 * portrait photo as soon as one is provided.
 */
export const founderPortraitImage: ImageAsset = {
  src: "/images/founder-portrait-placeholder-800w.webp",
  srcSet:
    "/images/founder-portrait-placeholder-480w.webp 480w, " +
    "/images/founder-portrait-placeholder-640w.webp 640w, " +
    "/images/founder-portrait-placeholder-800w.webp 800w",
  width: 800,
  height: 1200,
  alt: {
    ar: "رسم توضيحي مجرد يمثل مؤسسة Glloria بشكل مؤقت، وليس صورة فوتوغرافية حقيقية",
    en: "Abstract illustrated placeholder representing Glloria's founder — not a real photograph",
  },
  imageKind: {
    ar: "رسم توضيحي مؤقت بانتظار صورة شخصية حقيقية معتمدة",
    en: "Temporary illustrated placeholder pending an approved real portrait",
  },
};

/**
 * Site logo / brand mark placeholder (header brand lockup, founder-card
 * studio seal, favicon, and Open Graph image reference in index.html).
 * File: client/public/images/glloria-logo-placeholder-512.webp
 * Source dimensions: 512x512 (1:1 aspect ratio)
 * Format: WebP, single size (logo does not need responsive variants)
 * Status: TEMPORARY placeholder monogram — replace with the studio's real
 * logo file once supplied.
 */
export const logoImage: ImageAsset = {
  src: "/images/glloria-logo-placeholder-512.webp",
  srcSet: "/images/glloria-logo-placeholder-512.webp 512w",
  width: 512,
  height: 512,
  alt: {
    ar: "شعار Glloria المؤقت",
    en: "Glloria placeholder logo",
  },
  imageKind: {
    ar: "شعار مؤقت بانتظار اعتماد الهوية البصرية النهائية",
    en: "Temporary placeholder logo pending the final approved brand identity",
  },
};
