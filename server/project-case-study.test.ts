import { describe, expect, it } from "vitest";
import {
  hasApprovedCaseStudy,
  hasBeforeAfterPair,
  type PublicManagedProject,
} from "@shared/project";

const baseProject: PublicManagedProject = {
  slug: "interior",
  projectType: "INTERIOR",
  title: "Private Residence",
  location: "",
  year: null,
  imageUrl: "/manus-storage/original.webp",
  imageAlt: "Original project image",
  galleryJson: null,
  imageKind: "Executed project",
};

describe("public case-study gating", () => {
  it("keeps optional case-study content private until explicitly approved", () => {
    expect(
      hasApprovedCaseStudy({ ...baseProject, concept: "Approved concept" })
    ).toBe(false);
    expect(
      hasApprovedCaseStudy({ ...baseProject, caseStudyApproved: true })
    ).toBe(false);
    expect(
      hasApprovedCaseStudy({
        ...baseProject,
        caseStudyApproved: true,
        concept: "Approved concept",
      })
    ).toBe(true);
  });

  it("requires a complete before/after pair with descriptive alternatives", () => {
    const complete = {
      ...baseProject,
      beforeImageUrl: "/before.webp",
      beforeImageAlt: "Room before the intervention",
      afterImageUrl: "/after.webp",
      afterImageAlt: "Room after the intervention",
    };
    expect(hasBeforeAfterPair(complete)).toBe(true);
    expect(hasBeforeAfterPair({ ...complete, afterImageAlt: "" })).toBe(false);
    expect(hasApprovedCaseStudy({ ...complete, caseStudyApproved: true })).toBe(
      true
    );
  });
});
