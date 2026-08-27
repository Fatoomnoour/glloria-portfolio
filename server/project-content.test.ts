import { describe, expect, it } from "vitest";
import {
  getPublicProjectRenderState,
  toNullablePublicProject,
  type PublicManagedProject,
} from "@shared/project";

const project: PublicManagedProject = {
  slug: "interior",
  projectType: "Interior",
  title: "Private Residence",
  location: "",
  year: null,
  imageUrl: "/manus-storage/interior-cover.webp",
  imageAlt: "Private Residence project image",
  galleryJson: null,
  imageKind: "Executed project",
};

describe("public project rendering policy", () => {
  it("normalizes a missing public project to null for query consumers", () => {
    expect(toNullablePublicProject(undefined)).toBeNull();
    expect(toNullablePublicProject(project)).toBe(project);
  });

  it("keeps the detail route in a loading state while the managed query is pending", () => {
    expect(getPublicProjectRenderState(true, undefined)).toBe("loading");
    expect(getPublicProjectRenderState(true, project)).toBe("loading");
  });

  it("returns not-found instead of using an unapproved fallback when the query is empty", () => {
    expect(getPublicProjectRenderState(false, undefined)).toBe("not-found");
    expect(getPublicProjectRenderState(false, null)).toBe("not-found");
  });

  it("renders ready only for a managed project record", () => {
    expect(getPublicProjectRenderState(false, project)).toBe("ready");
  });
});
