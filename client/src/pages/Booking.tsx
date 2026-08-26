/* Glloria Design Direction: Warm Editorial Atelier — booking is a calm consultation note, not a transactional dashboard. */
import { FormEvent, useMemo, useState } from "react";
import { ArrowUpLeft, CalendarDays, Check, Clock3, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useLocale } from "../contexts/LocaleContext";
import { trpc } from "../lib/trpc";

const timeOptions = [
  { value: "10:00", ar: "10:00 صباحاً", en: "10:00 AM" },
  { value: "12:00", ar: "12:00 ظهراً", en: "12:00 PM" },
  { value: "14:00", ar: "02:00 مساءً", en: "2:00 PM" },
  { value: "16:00", ar: "04:00 مساءً", en: "4:00 PM" },
];
const whatsappNumber = "201097430973";

type BookingState = {
  name: string;
  phone: string;
  email: string;
  city: string;
  property: string;
  area: string;
  service: string;
  budget: string;
  date: string;
  time: string;
  description: string;
  privacy: boolean;
  honeypot: string;
};

const initialBooking: BookingState = {
  name: "",
  phone: "",
  email: "",
  city: "",
  property: "",
  area: "",
  service: "",
  budget: "",
  date: "",
  time: timeOptions[0].value,
  description: "",
  privacy: false,
  honeypot: "",
};

export default function Booking() {
  const { t, locale } = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [booking, setBooking] = useState<BookingState>(initialBooking);
  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);
  const selectedTime = timeOptions.find((item) => item.value === booking.time) ?? timeOptions[0];
  const createConsultation = trpc.consultations.create.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`${locale === "ar" ? "مرحباً Glloria، أود تأكيد طلب استشارة." : "Hello Glloria, I would like to confirm a consultation request."}\n${t("booking.fullName")}: ${booking.name}\n${t("booking.phone")}: ${booking.phone}\n${locale === "ar" ? "البريد الإلكتروني" : "Email"}: ${booking.email || "—"}\n${t("booking.city")}: ${booking.city}\n${t("booking.property")}: ${booking.property}\n${t("booking.area")}: ${booking.area}\n${t("booking.service")}: ${booking.service}\n${t("booking.budget")}: ${booking.budget}\n${t("booking.date")}: ${booking.date} — ${locale === "ar" ? selectedTime.ar : selectedTime.en}\n${t("booking.description")}: ${booking.description}`)}`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!booking.privacy || booking.honeypot.trim()) return;
    createConsultation.mutate({
      fullName: booking.name,
      phone: booking.phone,
      email: booking.email,
      city: booking.city,
      propertyType: booking.property,
      area: booking.area,
      service: booking.service,
      budget: booking.budget,
      preferredDate: booking.date,
      preferredTime: booking.time,
      description: booking.description,
      privacyConsent: true,
      honeypot: booking.honeypot,
    });
  };

  const setField = (field: keyof BookingState, value: string | boolean) => setBooking((current) => ({ ...current, [field]: value }));
  const copy = locale === "ar";

  return (
    <div className="booking-page section-pad page-transition">
      <div className="contact-top">
        <div className="section-marker"><span>07</span><span>BOOK A CONSULTATION</span></div>
        <Link className="booking-back" href="/contact">{t("booking.back")} <ArrowUpLeft size={15} /></Link>
      </div>
      <div className="booking-layout">
        <div className="booking-copy">
          <p className="eyebrow">{copy ? "استشارة هندسية / 45 دقيقة" : "Engineering consultation / 45 minutes"}</p>
          <h1>{t("booking.title")}<br /><em>{t("booking.titleAccent")}</em></h1>
          <p>{t("booking.intro")}</p>
          <div className="booking-notes"><span><CalendarDays size={16} /> {copy ? "موعد مرن حسب التوفر" : "Flexible availability"}</span><span><Clock3 size={16} /> {copy ? "مكالمة أو لقاء أونلاين" : "Call or online meeting"}</span></div>
        </div>
        <div className="booking-panel">
          {submitted ? (
            <div className="success-message booking-success">
              <div className="success-icon"><Check size={21} /></div>
              <p className="eyebrow">{t("booking.successEyebrow")}</p>
              <h2>{t("booking.successTitle")}<br /><em>{t("booking.successAccent")}</em></h2>
              <p>{t("booking.successBody")}</p>
              <a className="dark-button" href={whatsappUrl} target="_blank" rel="noreferrer">{t("booking.confirm")} <ArrowUpLeft size={18} /></a>
              <button className="text-link booking-reset" onClick={() => { setSubmitted(false); setBooking(initialBooking); }}>{t("booking.edit")} <ArrowUpLeft size={16} /></button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-heading"><span>CONSULTATION / 01</span><h2>{copy ? "اختاري وقتك." : "Tell us about the project."}</h2></div>
              <div className="booking-form-grid">
                <label>{t("booking.fullName")}<input required value={booking.name} onChange={(event) => setField("name", event.target.value)} placeholder={copy ? "مثال: هبة أحمد" : "Your full name"} /></label>
                <label>{t("booking.phone")}<input required type="tel" value={booking.phone} onChange={(event) => setField("phone", event.target.value)} placeholder="+20 ..." /></label>
                <label>{copy ? "البريد الإلكتروني (اختياري)" : "Email (optional)"}<input type="email" value={booking.email} onChange={(event) => setField("email", event.target.value)} placeholder="hello@example.com" /></label>
                <label>{t("booking.city")}<input required value={booking.city} onChange={(event) => setField("city", event.target.value)} placeholder={copy ? "قنا / القاهرة / ..." : "City or area"} /></label>
                <label>{t("booking.property")}<select required value={booking.property} onChange={(event) => setField("property", event.target.value)}><option value="">{copy ? "اختاري نوع العقار" : "Choose property type"}</option><option>{copy ? "شقة" : "Apartment"}</option><option>{copy ? "فيلا / منزل" : "Villa / house"}</option><option>{copy ? "مكتب / عيادة" : "Office / clinic"}</option><option>{copy ? "مطعم / كافيه" : "Restaurant / café"}</option><option>{copy ? "مشروع تجاري آخر" : "Other commercial project"}</option></select></label>
                <label>{t("booking.area")}<input required value={booking.area} onChange={(event) => setField("area", event.target.value)} placeholder={copy ? "مثال: 180 م²" : "e.g. 180 m²"} /></label>
                <label>{t("booking.service")}<select required value={booking.service} onChange={(event) => setField("service", event.target.value)}><option value="">{copy ? "اختاري الخدمة" : "Choose a service"}</option><option>{copy ? "تصميم داخلي ورندر 3D" : "Interior design & 3D"}</option><option>{copy ? "تصميم معماري وواجهات" : "Architecture & façades"}</option><option>{copy ? "إشراف هندسي" : "Engineering supervision"}</option><option>{copy ? "تنفيذ وتسليم مفتاح" : "Turnkey execution"}</option><option>{copy ? "استشارة أونلاين" : "Online consultation"}</option></select></label>
                <label>{t("booking.budget")}<select required value={booking.budget} onChange={(event) => setField("budget", event.target.value)}><option value="">{copy ? "اختاري نطاقاً تقريبياً" : "Choose an approximate range"}</option><option>{copy ? "أقل من 100,000 ج.م" : "Under EGP 100,000"}</option><option>{copy ? "100,000 — 250,000 ج.م" : "EGP 100,000 — 250,000"}</option><option>{copy ? "250,000 — 500,000 ج.م" : "EGP 250,000 — 500,000"}</option><option>{copy ? "أكثر من 500,000 ج.م" : "Over EGP 500,000"}</option><option>{copy ? "ما زلت أحتاج إلى توجيه" : "I need guidance"}</option></select></label>
              </div>
              <div className="booking-fields"><label>{t("booking.date")}<input required type="date" min={minDate} value={booking.date} onChange={(event) => setField("date", event.target.value)} /></label><label>{t("booking.time")}<select value={booking.time} onChange={(event) => setField("time", event.target.value)}>{timeOptions.map((time) => <option key={time.value} value={time.value}>{copy ? time.ar : time.en}</option>)}</select></label></div>
              <label>{t("booking.description")}<textarea required rows={5} value={booking.description} onChange={(event) => setField("description", event.target.value)} placeholder={copy ? "ما الذي تتخيلينه للمكان؟" : "Tell us briefly about your space and goals."} /></label>
              <label className="privacy-check"><input required type="checkbox" checked={booking.privacy} onChange={(event) => setField("privacy", event.target.checked)} /><span>{t("booking.privacy")} <Link href="/privacy">{copy ? "سياسة الخصوصية" : "Privacy policy"}</Link></span></label>
              <label className="booking-honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={booking.honeypot} onChange={(event) => setField("honeypot", event.target.value)} /></label>
              {createConsultation.isError && <p className="form-error">{copy ? "تعذر إرسال الطلب حالياً. حاولي مرة أخرى أو تواصلي معنا عبر WhatsApp." : "We could not send your request. Please try again or contact us on WhatsApp."}</p>}
              <button className="dark-button form-submit" type="submit" disabled={createConsultation.isPending}>{createConsultation.isPending ? <Loader2 className="spin" size={18} /> : <ArrowUpLeft size={18} strokeWidth={1.4} />} {createConsultation.isPending ? (copy ? "جارٍ الإرسال" : "Sending") : t("booking.submit")}</button>
              <p className="form-note">{copy ? "سيتم مراجعة طلبك أولاً، ثم التواصل معك عبر WhatsApp لتأكيد التوفر والموعد النهائي." : "We will review your request and contact you through WhatsApp to confirm availability and the final appointment."}</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
