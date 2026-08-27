export const GLLORIA_CONFIRMATION_WHATSAPP_NUMBER = "201066646397";

export type WhatsAppLocale = "ar" | "en";

export function buildGeneralWhatsAppMessage(locale: WhatsAppLocale) {
  return locale === "ar"
    ? "مرحباً Glloria، أود حجز استشارة تصميم داخلي ومعرفة الخطوات المتاحة."
    : "Hello Glloria, I would like to book an interior design consultation and learn about the next steps.";
}

export function buildGeneralWhatsAppUrl(locale: WhatsAppLocale) {
  return `https://wa.me/${GLLORIA_CONFIRMATION_WHATSAPP_NUMBER}?text=${encodeURIComponent(buildGeneralWhatsAppMessage(locale))}`;
}

export type BookingConfirmationDetails = {
  locale: WhatsAppLocale;
  bookingId: number | null;
  name: string;
  phone: string;
  city: string;
  service: string;
  date: string;
  time: string;
};

export function buildBookingConfirmationMessage(
  details: BookingConfirmationDetails
) {
  const reference = details.bookingId ? `#${details.bookingId}` : "";
  if (details.locale === "ar") {
    return [
      "مرحباً Glloria، أود متابعة طلب الاستشارة.",
      reference ? `رقم الطلب: ${reference}` : null,
      `الاسم: ${details.name}`,
      `الهاتف: ${details.phone}`,
      `المدينة: ${details.city}`,
      `الخدمة: ${details.service}`,
      `الموعد المقترح: ${details.date} — ${details.time}`,
      "أرجو تأكيد التوفر والموعد النهائي.",
    ]
      .filter(Boolean)
      .join("\n");
  }

  return [
    "Hello Glloria, I would like to follow up on my consultation request.",
    reference ? `Request number: ${reference}` : null,
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    `City: ${details.city}`,
    `Service: ${details.service}`,
    `Preferred time: ${details.date} — ${details.time}`,
    "Please confirm availability and the final appointment.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildBookingConfirmationUrl(
  details: BookingConfirmationDetails
) {
  const message = buildBookingConfirmationMessage(details);
  return `https://wa.me/${GLLORIA_CONFIRMATION_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
