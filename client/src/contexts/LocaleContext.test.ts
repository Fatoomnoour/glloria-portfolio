import { describe, expect, it } from "vitest";
import { localeCopy } from "./LocaleContext";
import { getVisibleProjects, projects } from "../pages/Projects";

describe("Glloria locale and archive helpers", () => {
  it("returns the requested Arabic and English CTA copy", () => {
    expect(localeCopy("nav.primary", "ar")).toBe("احجز استشارتك");
    expect(localeCopy("nav.primary", "en")).toBe("Book your consultation");
  });

  it("filters the archive by interior and architectural disciplines", () => {
    expect(getVisibleProjects(projects, "all")).toHaveLength(2);
    expect(getVisibleProjects(projects, "interior")).toHaveLength(2);
    expect(getVisibleProjects(projects, "architectural")).toHaveLength(0);
  });
});
