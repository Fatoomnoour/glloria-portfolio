import { describe, expect, it } from "vitest";
import { REVEAL_SELECTOR } from "./RevealObserver";

describe("RevealObserver motion contract", () => {
  it("targets public page sections without including admin surfaces", () => {
    expect(REVEAL_SELECTOR).toContain(".home-page > section");
    expect(REVEAL_SELECTOR).toContain(".archive-page > *");
    expect(REVEAL_SELECTOR).toContain(".detail-page > *");
    expect(REVEAL_SELECTOR).toContain(".booking-page > *");
    expect(REVEAL_SELECTOR).not.toContain(".admin-console");
  });
});
