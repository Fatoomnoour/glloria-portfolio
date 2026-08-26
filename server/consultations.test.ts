import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function contextFor(role: "user" | "admin" | null): TrpcContext {
  return {
    user: role ? {
      id: 8,
      openId: `${role}-consultation-test`,
      name: "Consultation Test",
      email: "test@example.com",
      loginMethod: "test",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    } : null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

const validRequest = {
  fullName: "عميلة اختبار",
  phone: "+201097430973",
  email: "",
  city: "قنا",
  propertyType: "شقة",
  area: "120 م²",
  service: "تصميم داخلي",
  budget: "أحتاج إلى توجيه",
  preferredDate: "2026-09-01",
  preferredTime: "10:00",
  description: "طلب اختبار داخلي للتأكد من قواعد التحقق فقط.",
  privacyConsent: true as const,
  honeypot: "",
};

describe("consultation procedures", () => {
  it("blocks regular users from reading private bookings", async () => {
    const caller = appRouter.createCaller(contextFor("user"));
    await expect(caller.consultations.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("rejects a filled honeypot before touching the database", async () => {
    const caller = appRouter.createCaller(contextFor(null));
    await expect(caller.consultations.create({ ...validRequest, honeypot: "website-link" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("requires explicit privacy consent in the public input", async () => {
    const caller = appRouter.createCaller(contextFor(null));
    await expect(caller.consultations.create({ ...validRequest, privacyConsent: false as never })).rejects.toThrow();
  });
});
