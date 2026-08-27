import { describe, expect, it } from "vitest";
import {
  getBookingPresentationStage,
  isBookingStepComplete,
  type BookingValidationDraft,
} from "@shared/booking";

const completeDraft: BookingValidationDraft = {
  fullName: "Heba Ahmed",
  phone: "+201000000000",
  city: "Qena",
  propertyType: "Apartment",
  area: "180 m²",
  service: "Interior design",
  budget: "EGP 100,000 — 250,000",
  preferredDate: "2026-09-12",
  preferredTime: "10:00",
  description:
    "We are renovating a family living space and need a calm, practical direction.",
  privacyConsent: true,
};

describe("booking wizard validation", () => {
  it("requires contact details before leaving step one", () => {
    expect(isBookingStepComplete(1, completeDraft)).toBe(true);
    expect(isBookingStepComplete(1, { ...completeDraft, phone: "" })).toBe(
      false
    );
  });

  it("requires space and scope fields in their respective steps", () => {
    expect(isBookingStepComplete(2, completeDraft)).toBe(true);
    expect(isBookingStepComplete(2, { ...completeDraft, area: "" })).toBe(
      false
    );
    expect(isBookingStepComplete(3, { ...completeDraft, budget: "" })).toBe(
      false
    );
  });

  it("requires a meaningful project description before scheduling is complete", () => {
    expect(isBookingStepComplete(4, completeDraft)).toBe(true);
    expect(
      isBookingStepComplete(4, { ...completeDraft, description: "short" })
    ).toBe(false);
  });

  it("requires explicit privacy consent at the final review step", () => {
    expect(isBookingStepComplete(5, completeDraft)).toBe(true);
    expect(
      isBookingStepComplete(5, { ...completeDraft, privacyConsent: false })
    ).toBe(false);
  });

  it("groups the five persisted steps into three public-facing stages", () => {
    expect(getBookingPresentationStage(1)).toEqual({
      stage: 1,
      position: 1,
      totalPositions: 2,
    });
    expect(getBookingPresentationStage(2)).toEqual({
      stage: 1,
      position: 2,
      totalPositions: 2,
    });
    expect(getBookingPresentationStage(3)).toEqual({
      stage: 2,
      position: 1,
      totalPositions: 2,
    });
    expect(getBookingPresentationStage(4)).toEqual({
      stage: 2,
      position: 2,
      totalPositions: 2,
    });
    expect(getBookingPresentationStage(5)).toEqual({
      stage: 3,
      position: 1,
      totalPositions: 1,
    });
  });
});
