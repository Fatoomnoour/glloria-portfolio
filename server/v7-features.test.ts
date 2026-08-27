import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import {
  buildAnalyticsTimeline,
  getAnalyticsMonthKeys,
} from "../shared/analytics";
import {
  buildBookingConfirmationMessage,
  buildBookingConfirmationUrl,
  buildGeneralWhatsAppMessage,
  buildGeneralWhatsAppUrl,
} from "../shared/whatsapp";
import { parseBookingIdFromSearch } from "../shared/booking";

function contextFor(role: "user" | "admin" | null): TrpcContext {
  return {
    user: role
      ? {
          id: role === "admin" ? 1 : 8,
          openId: `${role}-v7-test`,
          name: "V7 Test",
          email: "v7@example.com",
          loginMethod: "test",
          role,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastSignedIn: new Date(),
        }
      : null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("v7 analytics helpers", () => {
  it("returns ordered month keys and fills missing periods with zeroes", () => {
    const now = new Date("2026-08-27T12:00:00Z");
    expect(getAnalyticsMonthKeys(6, now)).toEqual([
      "2026-03",
      "2026-04",
      "2026-05",
      "2026-06",
      "2026-07",
      "2026-08",
    ]);

    const timeline = buildAnalyticsTimeline(
      6,
      [
        { month: "2026-06", status: "new", count: 2 },
        { month: "2026-06", status: "confirmed", count: 1 },
        { month: "2026-08", status: "cancelled", count: 1 },
      ],
      [
        { month: "2026-07", designType: "interior", count: 2 },
        { month: "2026-08", designType: "architectural", count: 1 },
      ],
      now
    );

    expect(timeline[0]).toMatchObject({
      month: "2026-03",
      bookings: 0,
      projects: 0,
    });
    expect(timeline[3]).toMatchObject({
      month: "2026-06",
      bookings: 3,
      newBookings: 2,
      confirmed: 1,
    });
    expect(timeline[4]).toMatchObject({
      month: "2026-07",
      projects: 2,
      interiorProjects: 2,
    });
    expect(timeline[5]).toMatchObject({
      month: "2026-08",
      bookings: 1,
      cancelled: 1,
      projects: 1,
      architecturalProjects: 1,
    });
  });

  it("blocks non-admin users from analytics data", async () => {
    const caller = appRouter.createCaller(contextFor("user"));
    await expect(
      caller.analytics.overview({ months: 6 })
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});

describe("v7 booking detail deep link", () => {
  it("accepts only positive integer booking ids from the search string", () => {
    expect(parseBookingIdFromSearch("?booking=42")).toBe(42);
    expect(parseBookingIdFromSearch("?booking=0")).toBeNull();
    expect(parseBookingIdFromSearch("?booking=not-a-number")).toBeNull();
    expect(parseBookingIdFromSearch("")).toBeNull();
  });
});

describe("v7 WhatsApp handoff", () => {
  it("builds a ready-to-send general contact message in both supported languages", () => {
    expect(buildGeneralWhatsAppMessage("ar")).toContain(
      "حجز استشارة تصميم داخلي"
    );
    expect(buildGeneralWhatsAppMessage("en")).toContain(
      "book an interior design consultation"
    );

    const url = buildGeneralWhatsAppUrl("ar");
    expect(url.startsWith("https://wa.me/201066646397?text=")).toBe(true);
    expect(decodeURIComponent(url.split("?text=")[1] ?? "")).toContain(
      "مرحباً Glloria"
    );
  });

  it("builds a manual confirmation message with the saved request reference", () => {
    const message = buildBookingConfirmationMessage({
      locale: "ar",
      bookingId: 42,
      name: "عميلة اختبار",
      phone: "+201066646397",
      city: "قنا",
      service: "تصميم داخلي",
      date: "2026-09-01",
      time: "10:00 صباحاً",
    });
    expect(message).toContain("رقم الطلب: #42");
    expect(message).toContain("أرجو تأكيد التوفر");

    const url = buildBookingConfirmationUrl({
      locale: "en",
      bookingId: 9,
      name: "Test Client",
      phone: "+201011111111",
      city: "Qena",
      service: "Interior design",
      date: "2026-09-02",
      time: "10:00 AM",
    });
    expect(url.startsWith("https://wa.me/201066646397?text=")).toBe(true);
    expect(decodeURIComponent(url.split("?text=")[1] ?? "")).toContain(
      "Request number: #9"
    );
  });
});
