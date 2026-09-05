import { describe, expect, it } from "vitest";
import { parseBookingAttribution } from "../shared/booking";

describe("parseBookingAttribution", () => {
  it("keeps the explicit project and approved UTM dimensions", () => {
    expect(
      parseBookingAttribution(
        "?project=Private-Residence&utm_source=instagram&utm_medium=organic&utm_campaign=room-stories"
      )
    ).toEqual({
      sourceProjectSlug: "private-residence",
      utmSource: "instagram",
      utmMedium: "organic",
      utmCampaign: "room-stories",
    });
  });

  it("drops malformed and oversize attribution values", () => {
    expect(
      parseBookingAttribution(
        `?project=private%20residence&utm_source=${"x".repeat(101)}&utm_medium=&utm_campaign=${"y".repeat(161)}`
      )
    ).toEqual({
      sourceProjectSlug: null,
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
    });
  });
});
