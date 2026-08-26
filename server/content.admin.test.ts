import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createUserContext(role: "user" | "admin"): TrpcContext {
  return {
    user: {
      id: 7,
      openId: "test-user",
      name: "Test User",
      email: "test@example.com",
      loginMethod: "test",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("admin content procedures", () => {
  it("blocks a regular user from reading the admin project list", async () => {
    const caller = appRouter.createCaller(createUserContext("user"));
    await expect(caller.projects.adminList()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("blocks a regular user from creating a testimonial", async () => {
    const caller = appRouter.createCaller(createUserContext("user"));
    await expect(caller.testimonials.create({
      clientName: "A real client",
      clientRole: "Home owner",
      quote: "A verified experience supplied with consent.",
      rating: 5,
      projectName: "Private Residence",
      imageUrl: "",
      approved: false,
    })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});

  it("rejects public approval without explicit verification and consent", async () => {
    const caller = appRouter.createCaller(createUserContext("admin"));
    await expect(caller.testimonials.create({
      clientName: "Verified later",
      clientRole: "Home owner",
      quote: "This content must not publish without a verification record.",
      rating: 5,
      projectName: "Private Residence",
      imageUrl: "",
      consentConfirmed: false,
      verificationStatus: "pending",
      approved: true,
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
