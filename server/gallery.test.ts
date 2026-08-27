import { describe, expect, it } from "vitest";
import { moveGalleryIndex } from "@shared/gallery";

describe("lightbox gallery navigation", () => {
  it("moves forward and wraps after the last image", () => {
    expect(moveGalleryIndex(1, 1, 3)).toBe(2);
    expect(moveGalleryIndex(2, 1, 3)).toBe(0);
  });

  it("moves backward and wraps before the first image", () => {
    expect(moveGalleryIndex(0, -1, 3)).toBe(2);
    expect(moveGalleryIndex(0, -4, 3)).toBe(2);
  });

  it("fails safely for an empty gallery", () => {
    expect(moveGalleryIndex(0, 1, 0)).toBe(0);
    expect(moveGalleryIndex(0, 1, -1)).toBe(0);
  });
});
