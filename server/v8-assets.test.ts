import { describe, expect, it } from "vitest";
import { parseProjectGallery } from "@shared/gallery";

describe("project gallery parsing", () => {
  it("uses the cover when gallery JSON is missing or invalid", () => {
    expect(parseProjectGallery(null, "/cover.webp", "Cover image")).toEqual([
      { url: "/cover.webp", alt: "Cover image", order: 1 },
    ]);
    expect(parseProjectGallery("not-json", "/cover.webp", "Cover image")).toEqual([
      { url: "/cover.webp", alt: "Cover image", order: 1 },
    ]);
  });

  it("filters incomplete entries and sorts valid images by order", () => {
    expect(
      parseProjectGallery(
        JSON.stringify([
          { url: "/two.webp", alt: "Two", order: 2 },
          { url: "/missing-alt.webp", order: 1 },
          { url: "/one.webp", alt: "One", order: 1 },
        ]),
        "/cover.webp",
        "Cover image",
      ),
    ).toEqual([
      { url: "/one.webp", alt: "One", order: 1 },
      { url: "/two.webp", alt: "Two", order: 2 },
    ]);
  });
});
