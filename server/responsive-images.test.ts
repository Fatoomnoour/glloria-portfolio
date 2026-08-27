import { describe, expect, it } from "vitest";
import { getResponsiveImageSource } from "../shared/responsiveImages";

describe("responsive image asset map", () => {
  it("provides dimensions and responsive sources for verified hero and project originals", () => {
    const hero = getResponsiveImageSource(
      "/manus-storage/glloria-hero_b9a954a0.jpg"
    );
    const project = getResponsiveImageSource(
      "/manus-storage/original-01_ebedc055.webp"
    );

    expect(hero).toMatchObject({ width: 1920, height: 1280 });
    expect(hero?.srcSet).toContain("1920w");
    expect(project).toMatchObject({ width: 960, height: 540 });
    expect(project?.srcSet).toContain("480w");
  });

  it("leaves an unregistered optional source to the original-image fallback", () => {
    expect(
      getResponsiveImageSource("/manus-storage/unregistered.webp")
    ).toBeUndefined();
  });
});
