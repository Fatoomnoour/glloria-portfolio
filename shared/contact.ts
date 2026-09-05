/**
 * Single source of truth for Glloria's public contact details.
 *
 * WHY CENTRALISED
 * ---------------
 * The phone number previously existed as three unrelated literals: the wa.me
 * digits in shared/whatsapp.ts, a display string on the contact page, and a
 * third copy inside the LocalBusiness JSON-LD in index.html. Two of them were
 * grouped as "+20 10 666 46397", which is not how an Egyptian mobile number is
 * written and is not valid E.164 either — search engines and phone dialers both
 * care about that. Keeping one module means the number can never drift again.
 *
 * FORMATS
 *   e164     "+201066646397"     schema.org `telephone`, `tel:` links
 *   display  "+20 10 6664 6397"  human-readable, Egyptian mobile grouping
 *   waDigits "201066646397"      wa.me deep links (no plus, no spaces)
 */

const NATIONAL_DIGITS = "1066646397"; // Egyptian mobile, without the leading 0
const COUNTRY_CODE = "20";

export const GLLORIA_PHONE = {
  /** E.164 — the only format schema.org and `tel:` should ever receive. */
  e164: `+${COUNTRY_CODE}${NATIONAL_DIGITS}`,
  /** Egyptian mobile grouping: +20 10 6664 6397 */
  display: `+${COUNTRY_CODE} ${NATIONAL_DIGITS.slice(0, 2)} ${NATIONAL_DIGITS.slice(2, 6)} ${NATIONAL_DIGITS.slice(6)}`,
  /** Bare digits for wa.me deep links. */
  waDigits: `${COUNTRY_CODE}${NATIONAL_DIGITS}`,
} as const;

export const GLLORIA_EMAIL = "hello@glloria.studio";

export const GLLORIA_SOCIAL = {
  instagram: "https://www.instagram.com/glloriaaa",
  facebook: "https://www.facebook.com/glloriaaa",
} as const;

/** `tel:` href — dialers reject spaces, so this must stay E.164. */
export const telHref = `tel:${GLLORIA_PHONE.e164}`;
export const mailtoHref = `mailto:${GLLORIA_EMAIL}`;
