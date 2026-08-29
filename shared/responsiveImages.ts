export type ResponsiveImageSource = {
  width: number;
  height: number;
  srcSet: string;
};

const responsiveImages: Record<string, ResponsiveImageSource> = {
  // --- Locally-hosted placeholder images (see client/src/data/projectImages.ts) ---
  "/images/hero-living-room-1920w.webp": {
    width: 1920,
    height: 1280,
    srcSet:
      "/images/hero-living-room-480w.webp 480w, /images/hero-living-room-768w.webp 768w, /images/hero-living-room-1024w.webp 1024w, /images/hero-living-room-1440w.webp 1440w, /images/hero-living-room-1920w.webp 1920w",
  },
  "/images/project-private-residence-1200w.webp": {
    width: 1200,
    height: 800,
    srcSet:
      "/images/project-private-residence-480w.webp 480w, /images/project-private-residence-768w.webp 768w, /images/project-private-residence-960w.webp 960w, /images/project-private-residence-1200w.webp 1200w",
  },
  "/images/project-boska-cafe-1200w.webp": {
    width: 1200,
    height: 800,
    srcSet:
      "/images/project-boska-cafe-480w.webp 480w, /images/project-boska-cafe-768w.webp 768w, /images/project-boska-cafe-960w.webp 960w, /images/project-boska-cafe-1200w.webp 1200w",
  },
  "/images/founder-portrait-placeholder-800w.webp": {
    width: 800,
    height: 1200,
    srcSet:
      "/images/founder-portrait-placeholder-480w.webp 480w, /images/founder-portrait-placeholder-640w.webp 640w, /images/founder-portrait-placeholder-800w.webp 800w",
  },
  // --- Legacy Manus Forge entries (kept for the existing test suite and any
  // legacy /manus-storage/* references still stored in the database from
  // before this migration; the Manus Forge backend itself is not configured
  // on this Vercel deployment, so these will only resolve if the storage
  // proxy is configured) ---
  "/manus-storage/glloria-hero_b9a954a0.jpg": {
    width: 1920,
    height: 1280,
    srcSet:
      "/manus-storage/glloria-hero_b9a954a0-480w_267a621d.webp 480w, /manus-storage/glloria-hero_b9a954a0-768w_a675766d.webp 768w, /manus-storage/glloria-hero_b9a954a0-1024w_f062b299.webp 1024w, /manus-storage/glloria-hero_b9a954a0-1440w_a7253a60.webp 1440w, /manus-storage/glloria-hero_b9a954a0-1920w_cc235f67.webp 1920w",
  },
  "/manus-storage/heba-portrait-clean_30012c25.png": {
    width: 1536,
    height: 2304,
    srcSet:
      "/manus-storage/heba-portrait-clean_30012c25-480w_0087a34c.webp 480w, /manus-storage/heba-portrait-clean_30012c25-768w_4ef273b6.webp 768w, /manus-storage/heba-portrait-clean_30012c25-1024w_d7d19b16.webp 1024w, /manus-storage/heba-portrait-clean_30012c25-1440w_ce46a537.webp 1440w, /manus-storage/heba-portrait-clean_30012c25-1536w_b1a2588a.webp 1536w",
  },
  "/manus-storage/original-01_ebedc055.webp": {
    width: 960,
    height: 540,
    srcSet:
      "/manus-storage/original-01_ebedc055-480w_45ad0107.webp 480w, /manus-storage/original-01_ebedc055-768w_5e42a905.webp 768w, /manus-storage/original-01_ebedc055-960w_1d548240.webp 960w",
  },
  "/manus-storage/original-02_48bd427b.webp": {
    width: 845,
    height: 960,
    srcSet:
      "/manus-storage/original-02_48bd427b-480w_a71873b4.webp 480w, /manus-storage/original-02_48bd427b-768w_55cc6f39.webp 768w, /manus-storage/original-02_48bd427b-845w_7866b3e9.webp 845w",
  },
  "/manus-storage/original-03_b3baf9ed.webp": {
    width: 960,
    height: 640,
    srcSet:
      "/manus-storage/original-03_b3baf9ed-480w_bc6001a0.webp 480w, /manus-storage/original-03_b3baf9ed-768w_77673f72.webp 768w, /manus-storage/original-03_b3baf9ed-960w_227bd752.webp 960w",
  },
  "/manus-storage/original-04_ab2cc12f.webp": {
    width: 960,
    height: 540,
    srcSet:
      "/manus-storage/original-04_ab2cc12f-480w_f1cd6c64.webp 480w, /manus-storage/original-04_ab2cc12f-768w_71f146e2.webp 768w, /manus-storage/original-04_ab2cc12f-960w_3b0775db.webp 960w",
  },
  "/manus-storage/original-05_2f557110.webp": {
    width: 1080,
    height: 720,
    srcSet:
      "/manus-storage/original-05_2f557110-480w_c06307ac.webp 480w, /manus-storage/original-05_2f557110-768w_685eecb2.webp 768w, /manus-storage/original-05_2f557110-1024w_524d1389.webp 1024w, /manus-storage/original-05_2f557110-1080w_a610466c.webp 1080w",
  },
  "/manus-storage/original-06_4259bbc2.webp": {
    width: 1800,
    height: 799,
    srcSet:
      "/manus-storage/original-06_4259bbc2-480w_3cb62164.webp 480w, /manus-storage/original-06_4259bbc2-768w_3371ff18.webp 768w, /manus-storage/original-06_4259bbc2-1024w_5942ccc9.webp 1024w, /manus-storage/original-06_4259bbc2-1440w_06d379bc.webp 1440w, /manus-storage/original-06_4259bbc2-1800w_0acefd88.webp 1800w",
  },
  "/manus-storage/original-07_b62af2fd.webp": {
    width: 960,
    height: 640,
    srcSet:
      "/manus-storage/original-07_b62af2fd-480w_9a8d73e2.webp 480w, /manus-storage/original-07_b62af2fd-768w_37f4c9bf.webp 768w, /manus-storage/original-07_b62af2fd-960w_854016d8.webp 960w",
  },
  "/manus-storage/original-08_d27efcd4.webp": {
    width: 1080,
    height: 720,
    srcSet:
      "/manus-storage/original-08_d27efcd4-480w_f3bdceb3.webp 480w, /manus-storage/original-08_d27efcd4-768w_35146163.webp 768w, /manus-storage/original-08_d27efcd4-1024w_55be4dd9.webp 1024w, /manus-storage/original-08_d27efcd4-1080w_f3787b2e.webp 1080w",
  },
  "/manus-storage/original-09_d2082a9f.webp": {
    width: 720,
    height: 960,
    srcSet:
      "/manus-storage/original-09_d2082a9f-480w_91a7966c.webp 480w, /manus-storage/original-09_d2082a9f-720w_bef55ce9.webp 720w",
  },
  "/manus-storage/original-10_ca05b1e1.webp": {
    width: 1800,
    height: 1350,
    srcSet:
      "/manus-storage/original-10_ca05b1e1-480w_70b39350.webp 480w, /manus-storage/original-10_ca05b1e1-768w_163e0a2a.webp 768w, /manus-storage/original-10_ca05b1e1-1024w_4eb6cec0.webp 1024w, /manus-storage/original-10_ca05b1e1-1440w_595fa95b.webp 1440w, /manus-storage/original-10_ca05b1e1-1800w_f88a371f.webp 1800w",
  },
  "/manus-storage/original-11_3267d16e.webp": {
    width: 720,
    height: 960,
    srcSet:
      "/manus-storage/original-11_3267d16e-480w_f2eeab8b.webp 480w, /manus-storage/original-11_3267d16e-720w_b019fbd8.webp 720w",
  },
  "/manus-storage/original-12_9b3638d7.webp": {
    width: 1080,
    height: 720,
    srcSet:
      "/manus-storage/original-12_9b3638d7-480w_07fa2204.webp 480w, /manus-storage/original-12_9b3638d7-768w_8d6f9809.webp 768w, /manus-storage/original-12_9b3638d7-1024w_c7ac7994.webp 1024w, /manus-storage/original-12_9b3638d7-1080w_67f24f67.webp 1080w",
  },
  "/manus-storage/original-13_6eb3eca8.webp": {
    width: 960,
    height: 720,
    srcSet:
      "/manus-storage/original-13_6eb3eca8-480w_9b3f87d9.webp 480w, /manus-storage/original-13_6eb3eca8-768w_864d7b68.webp 768w, /manus-storage/original-13_6eb3eca8-960w_5d1050d7.webp 960w",
  },
  "/manus-storage/original-14_af87a651.webp": {
    width: 960,
    height: 720,
    srcSet:
      "/manus-storage/original-14_af87a651-480w_6c55d532.webp 480w, /manus-storage/original-14_af87a651-768w_239dda0a.webp 768w, /manus-storage/original-14_af87a651-960w_9068c3ea.webp 960w",
  },
  "/manus-storage/original-15_3706c622.webp": {
    width: 960,
    height: 720,
    srcSet:
      "/manus-storage/original-15_3706c622-480w_38f4d6a2.webp 480w, /manus-storage/original-15_3706c622-768w_17b60c24.webp 768w, /manus-storage/original-15_3706c622-960w_21276d2a.webp 960w",
  },
  "/manus-storage/original-16_a92e87f8.webp": {
    width: 720,
    height: 960,
    srcSet:
      "/manus-storage/original-16_a92e87f8-480w_3fc888bd.webp 480w, /manus-storage/original-16_a92e87f8-720w_305ac3a3.webp 720w",
  },
  "/manus-storage/original-17_9a149bbf.webp": {
    width: 960,
    height: 720,
    srcSet:
      "/manus-storage/original-17_9a149bbf-480w_79f38515.webp 480w, /manus-storage/original-17_9a149bbf-768w_4d8ca057.webp 768w, /manus-storage/original-17_9a149bbf-960w_d52a80ca.webp 960w",
  },
};

export function getResponsiveImageSource(src: string) {
  return responsiveImages[src];
}
