import { describe, expect, it } from "vitest";
import {
  buildContactInquiryMessage,
  buildContactInquiryUrl,
} from "../../../shared/whatsapp";

/**
 * Regression guard for the second critical audit finding: the contact form's
 * submit handler was `event.preventDefault(); setSent(true);` — it displayed
 * "your details reached Glloria" while discarding every enquiry.
 *
 * The form now hands the visitor off to WhatsApp with their details prefilled,
 * so these tests assert the handoff payload actually carries the input.
 */
describe("contact WhatsApp handoff", () => {
  const details = {
    locale: "ar" as const,
    name: "أحمد مصطفى",
    phone: "+201234567890",
    projectType: "مطعم / كافيه",
    message: "أرغب في تشطيب كافيه مساحته 120 متر في قنا.",
  };

  it("includes every submitted field in the Arabic message", () => {
    const message = buildContactInquiryMessage(details);
    expect(message).toContain("أحمد مصطفى");
    expect(message).toContain("+201234567890");
    expect(message).toContain("مطعم / كافيه");
    expect(message).toContain("تشطيب كافيه");
  });

  it("includes every submitted field in the English message", () => {
    const message = buildContactInquiryMessage({
      ...details,
      locale: "en",
      name: "Ahmed Mostafa",
      projectType: "Restaurant / café",
      message: "I want to fit out a 120 sqm café in Qena.",
    });
    expect(message).toContain("Ahmed Mostafa");
    expect(message).toContain("+201234567890");
    expect(message).toContain("Restaurant / café");
    expect(message).toContain("120 sqm");
  });

  it("omits the project type line when it was left empty", () => {
    const message = buildContactInquiryMessage({ ...details, projectType: "" });
    expect(message).not.toContain("نوع المشروع");
    expect(message).toContain("أحمد مصطفى");
  });

  it("builds an encoded wa.me url pointing at the studio number", () => {
    const url = buildContactInquiryUrl(details);
    expect(url.startsWith("https://wa.me/201066646397?text=")).toBe(true);
    expect(url).not.toContain(" ");
    expect(decodeURIComponent(url)).toContain("أحمد مصطفى");
  });
});
