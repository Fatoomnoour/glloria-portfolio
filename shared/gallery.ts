export type GalleryImage = {
  url: string;
  alt: string;
  order: number;
};

export function parseProjectGallery(raw: string | null | undefined, coverUrl: string, fallbackAlt: string) {
  if (!raw?.trim()) return [{ url: coverUrl, alt: fallbackAlt, order: 1 }];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [{ url: coverUrl, alt: fallbackAlt, order: 1 }];
    const images = parsed
      .map((item, index): GalleryImage | null => {
        if (!item || typeof item !== "object") return null;
        const candidate = item as Record<string, unknown>;
        const url = typeof candidate.url === "string" ? candidate.url.trim() : "";
        const alt = typeof candidate.alt === "string" ? candidate.alt.trim() : "";
        if (!url || !alt) return null;
        const order = typeof candidate.order === "number" && Number.isFinite(candidate.order) ? candidate.order : index + 1;
        return { url, alt, order };
      })
      .filter((item): item is GalleryImage => Boolean(item))
      .sort((a, b) => a.order - b.order);
    return images.length ? images : [{ url: coverUrl, alt: fallbackAlt, order: 1 }];
  } catch {
    return [{ url: coverUrl, alt: fallbackAlt, order: 1 }];
  }
}
