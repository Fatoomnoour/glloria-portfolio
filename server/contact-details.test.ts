import { describe, expect, it } from "vitest";
import { GLLORIA_PHONE, telHref } from "../shared/contact";
import { GLLORIA_CONFIRMATION_WHATSAPP_NUMBER } from "../shared/whatsapp";

/**
 * The number used to live as three unrelated literals, two of which were
 * grouped "+20 10 666 46397" — neither valid E.164 nor correct Egyptian mobile
 * grouping. schema.org `telephone` and `tel:` links both need E.164, so these
 * tests pin every format to one another.
 */
describe("Glloria phone number", () => {
  it("exposes a valid E.164 number", () => {
    expect(GLLORIA_PHONE.e164).toBe("+201066646397");
    expect(GLLORIA_PHONE.e164).toMatch(/^\+[1-9]\d{7,14}$/);
  });

  it("groups the display form as an Egyptian mobile", () => {
    expect(GLLORIA_PHONE.display).toBe("+20 10 6664 6397");
  });

  it("keeps every format built from the same digits", () => {
    const digitsOf = (value: string) => value.replace(/\D/g, "");
    expect(digitsOf(GLLORIA_PHONE.display)).toBe(digitsOf(GLLORIA_PHONE.e164));
    expect(GLLORIA_PHONE.waDigits).toBe(digitsOf(GLLORIA_PHONE.e164));
  });

  it("keeps the WhatsApp deep-link number in sync", () => {
    expect(GLLORIA_CONFIRMATION_WHATSAPP_NUMBER).toBe(GLLORIA_PHONE.waDigits);
    expect(GLLORIA_CONFIRMATION_WHATSAPP_NUMBER).not.toContain("+");
    expect(GLLORIA_CONFIRMATION_WHATSAPP_NUMBER).not.toContain(" ");
  });

  it("builds a dialable tel: href with no spaces", () => {
    expect(telHref).toBe("tel:+201066646397");
    expect(telHref).not.toContain(" ");
  });
});
