/* Glloria Design Direction: Warm Editorial Atelier — booking is a calm consultation note, not a transactional dashboard. */
import { FormEvent, useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpLeft, CalendarDays, Check, ChevronLeft, Clock3, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useLocale } from "../contexts/LocaleContext";
import { trpc } from "../lib/trpc";
import { buildBookingConfirmationUrl } from "../../../shared/whatsapp";
import { isBookingStepComplete, type BookingStep } from "../../../shared/booking";

type TimeOption = { value: string; ar: string; en: string };
const timeOptions: TimeOption[] = [
  { value: "10:00", ar: "10:00 صباحاً", en: "10:00 AM" },
  { value: "12:00", ar: "12:00 ظهراً", en: "12:00 PM" },
  { value: "14:00", ar: "02:00 مساءً", en: "2:00 PM" },
  { value: "16:00", ar: "04:00 مساءً", en: "4:00 PM" },
];

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
  aestheticPreference: string;
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
  aestheticPreference: "",
  privacy: false,
  honeypot: "",
};

const stepKeys = ["booking.stepContact", "booking.stepSpace", "booking.stepScope", "booking.stepSchedule", "booking.stepReview"] as const;

export default function Booking() {
  const { t, locale } = useLocale();
  const copy = locale === "ar";
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [booking, setBooking] = useState<BookingState>(initialBooking);
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [stepError, setStepError] = useState(false);
  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);
  const selectedTime = timeOptions.find((item) => item.value === booking.time) ?? timeOptions[0];
  const createConsultation = trpc.consultations.create.useMutation({
    onSuccess: (result) => {
      setBookingId(result.id);
      setSubmitted(true);
    },
  });

  const whatsappUrl = buildBookingConfirmationUrl({
    locale,
    bookingId,
    name: booking.name,
    phone: booking.phone,
    city: booking.city,
    service: booking.service,
    date: booking.date,
    time: locale === "ar" ? selectedTime.ar : selectedTime.en,
  });

  const draftForValidation = {
    fullName: booking.name,
    phone: booking.phone,
    city: booking.city,
    propertyType: booking.property,
    area: booking.area,
    service: booking.service,
    budget: booking.budget,
    preferredDate: booking.date,
    preferredTime: booking.time,
    description: booking.description,
    privacyConsent: booking.privacy,
  };

  const moveNext = () => {
    if (!isBookingStepComplete(currentStep, draftForValidation)) {
      setStepError(true);
      return;
    }
    setStepError(false);
    setCurrentStep((step) => Math.min(5, step + 1) as BookingStep);
  };

  const movePrevious = () => {
    setStepError(false);
    setCurrentStep((step) => Math.max(1, step - 1) as BookingStep);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isBookingStepComplete(5, draftForValidation) || booking.honeypot.trim()) {
      setStepError(true);
      return;
    }
    setStepError(false);
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
      aestheticPreference: booking.aestheticPreference || null,
      privacyConsent: true,
      honeypot: booking.honeypot,
    });
  };

  const setField = (field: keyof BookingState, value: string | boolean) => setBooking((current) => ({ ...current, [field]: value }));

  const renderStep = () => {
    if (currentStep === 1) {
      return <div className="booking-step-fields"><label>{t("booking.fullName")}<input required autoFocus value={booking.name} onChange={(event) => setField("name", event.target.value)} placeholder={copy ? "مثال: هبة أحمد" : "Your full name"} /></label><label>{t("booking.phone")}<input required type="tel" value={booking.phone} onChange={(event) => setField("phone", event.target.value)} placeholder="+20 ..." /></label><label>{copy ? "البريد الإلكتروني (اختياري)" : "Email (optional)"}<input type="email" value={booking.email} onChange={(event) => setField("email", event.target.value)} placeholder="hello@example.com" /></label></div>;
    }
    if (currentStep === 2) {
      return <div className="booking-step-fields"><label>{t("booking.city")}<input required autoFocus value={booking.city} onChange={(event) => setField("city", event.target.value)} placeholder={copy ? "قنا / القاهرة / ..." : "City or area"} /></label><label>{t("booking.property")}<select required value={booking.property} onChange={(event) => setField("property", event.target.value)}><option value="">{copy ? "اختاري نوع العقار" : "Choose property type"}</option><option value={copy ? "شقة" : "Apartment"}>{copy ? "شقة" : "Apartment"}</option><option value={copy ? "فيلا / منزل" : "Villa / house"}>{copy ? "فيلا / منزل" : "Villa / house"}</option><option value={copy ? "مكتب / عيادة" : "Office / clinic"}>{copy ? "مكتب / عيادة" : "Office / clinic"}</option><option value={copy ? "مطعم / كافيه" : "Restaurant / café"}>{copy ? "مطعم / كافيه" : "Restaurant / café"}</option><option value={copy ? "مشروع تجاري آخر" : "Other commercial project"}>{copy ? "مشروع تجاري آخر" : "Other commercial project"}</option></select></label><label>{t("booking.area")}<input required value={booking.area} onChange={(event) => setField("area", event.target.value)} placeholder={copy ? "مثال: 180 م²" : "e.g. 180 m²"} /></label></div>;
    }
    if (currentStep === 3) {
      return <div className="booking-step-fields"><label>{t("booking.service")}<select required autoFocus value={booking.service} onChange={(event) => setField("service", event.target.value)}><option value="">{copy ? "اختاري الخدمة" : "Choose a service"}</option><option value={copy ? "تصميم داخلي ورندر 3D" : "Interior design & 3D"}>{copy ? "تصميم داخلي ورندر 3D" : "Interior design & 3D"}</option><option value={copy ? "تصميم معماري وواجهات" : "Architecture & façades"}>{copy ? "تصميم معماري وواجهات" : "Architecture & façades"}</option><option value={copy ? "إشراف هندسي" : "Engineering supervision"}>{copy ? "إشراف هندسي" : "Engineering supervision"}</option><option value={copy ? "تنفيذ وتسليم مفتاح" : "Turnkey execution"}>{copy ? "تنفيذ وتسليم مفتاح" : "Turnkey execution"}</option><option value={copy ? "استشارة أونلاين" : "Online consultation"}>{copy ? "استشارة أونلاين" : "Online consultation"}</option></select></label><label>{t("booking.budget")}<select required value={booking.budget} onChange={(event) => setField("budget", event.target.value)}><option value="">{copy ? "اختاري نطاقاً تقريبياً" : "Choose an approximate range"}</option><option value={copy ? "أقل من 100,000 ج.م" : "Under EGP 100,000"}>{copy ? "أقل من 100,000 ج.م" : "Under EGP 100,000"}</option><option value={copy ? "100,000 — 250,000 ج.م" : "EGP 100,000 — 250,000"}>{copy ? "100,000 — 250,000 ج.م" : "EGP 100,000 — 250,000"}</option><option value={copy ? "250,000 — 500,000 ج.م" : "EGP 250,000 — 500,000"}>{copy ? "250,000 — 500,000 ج.م" : "EGP 250,000 — 500,000"}</option><option value={copy ? "أكثر من 500,000 ج.م" : "Over EGP 500,000"}>{copy ? "أكثر من 500,000 ج.م" : "Over EGP 500,000"}</option><option value={copy ? "ما زلت أحتاج إلى توجيه" : "I need guidance"}>{copy ? "ما زلت أحتاج إلى توجيه" : "I need guidance"}</option></select></label><label>{t("booking.aesthetic")}<input value={booking.aestheticPreference} onChange={(event) => setField("aestheticPreference", event.target.value)} placeholder={t("booking.aestheticPlaceholder")} /></label></div>;
    }
    if (currentStep === 4) {
      return <div className="booking-step-fields"><div className="booking-fields"><label>{t("booking.date")}<input required autoFocus type="date" min={minDate} value={booking.date} onChange={(event) => setField("date", event.target.value)} /></label><label>{t("booking.time")}<select value={booking.time} onChange={(event) => setField("time", event.target.value)}>{timeOptions.map((time) => <option key={time.value} value={time.value}>{copy ? time.ar : time.en}</option>)}</select></label></div><label>{t("booking.description")}<textarea required rows={5} value={booking.description} onChange={(event) => setField("description", event.target.value)} placeholder={copy ? "ما الذي تتخيلينه للمكان؟" : "Tell us briefly about your space and goals."} /></label></div>;
    }

    const reviewRows = [
      [t("booking.fullName"), booking.name],
      [t("booking.phone"), booking.phone],
      [t("booking.city"), booking.city],
      [t("booking.property"), booking.property],
      [t("booking.area"), booking.area],
      [t("booking.service"), booking.service],
      [t("booking.budget"), booking.budget],
      [t("booking.date"), booking.date],
      [t("booking.time"), copy ? selectedTime.ar : selectedTime.en],
      [t("booking.aesthetic"), booking.aestheticPreference || (copy ? "لم تحدد" : "Not specified")],
    ];
    return <div className="booking-review"><div className="booking-review-intro"><p className="eyebrow">{t("booking.review")}</p><p>{t("booking.reviewHint")}</p></div><dl>{reviewRows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}<div className="booking-review-wide"><dt>{t("booking.description")}</dt><dd>{booking.description}</dd></div></dl><label className="privacy-check"><input required type="checkbox" checked={booking.privacy} onChange={(event) => setField("privacy", event.target.checked)} /><span>{t("booking.privacy")} <Link href="/privacy">{copy ? "سياسة الخصوصية" : "Privacy policy"}</Link></span></label></div>;
  };

  return <div className="booking-page section-pad page-transition"><div className="contact-top"><div className="section-marker"><span>07</span><span>BOOK A CONSULTATION</span></div><Link className="booking-back" href="/contact">{t("booking.back")} <ArrowUpLeft size={15} /></Link></div><div className="booking-layout"><div className="booking-copy"><p className="eyebrow">{copy ? "استشارة هندسية / 45 دقيقة" : "Engineering consultation / 45 minutes"}</p><h1>{t("booking.title")}<br /><em>{t("booking.titleAccent")}</em></h1><p>{t("booking.intro")}</p><div className="booking-notes"><span><CalendarDays size={16} /> {copy ? "موعد مرن حسب التوفر" : "Flexible availability"}</span><span><Clock3 size={16} /> {copy ? "مكالمة أو لقاء أونلاين" : "Call or online meeting"}</span></div></div><div className="booking-panel">{submitted ? <div className="success-message booking-success"><div className="success-icon"><Check size={21} /></div><p className="eyebrow">{t("booking.successEyebrow")}</p><h2>{t("booking.successTitle")}<br /><em>{t("booking.successAccent")}</em></h2><p>{t("booking.successBody")}</p><p className="booking-whatsapp-note">{t("booking.whatsappHandoff")}</p><a className="dark-button" href={whatsappUrl} target="_blank" rel="noreferrer">{t("booking.confirm")} <ArrowUpLeft size={18} /></a><button className="text-link booking-reset" onClick={() => { setSubmitted(false); setBookingId(null); setCurrentStep(1); setBooking(initialBooking); }}>{t("booking.edit")} <ArrowUpLeft size={16} /></button></div> : <form onSubmit={handleSubmit}><div className="form-heading"><span>CONSULTATION / 0{currentStep}</span><h2>{t(stepKeys[currentStep - 1])}</h2></div><ol className="booking-progress" aria-label={copy ? "خطوات طلب الاستشارة" : "Consultation request steps"}>{stepKeys.map((key, index) => <li key={key} className={index + 1 === currentStep ? "active" : index + 1 < currentStep ? "complete" : ""} aria-current={index + 1 === currentStep ? "step" : undefined}><span>{String(index + 1).padStart(2, "0")}</span><b>{t(key)}</b></li>)}</ol>{renderStep()}<label className="booking-honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={booking.honeypot} onChange={(event) => setField("honeypot", event.target.value)} /></label>{stepError && <p className="form-error" role="alert">{t("booking.requiredStep")}</p>}{createConsultation.isError && <p className="form-error" role="alert">{copy ? "تعذر إرسال الطلب حالياً. حاولي مرة أخرى أو تواصلي معنا عبر WhatsApp." : "We could not send your request. Please try again or contact us on WhatsApp."}</p>}<div className="booking-step-actions">{currentStep > 1 && <button className="text-link booking-previous" type="button" onClick={movePrevious}><ArrowDownRight size={16} /> {t("booking.previous")}</button>}{currentStep < 5 ? <button className="dark-button form-submit" type="button" onClick={moveNext}>{t("booking.next")} <ChevronLeft size={17} /></button> : <button className="dark-button form-submit" type="submit" disabled={createConsultation.isPending}>{createConsultation.isPending ? <Loader2 className="spin" size={18} /> : <ArrowUpLeft size={17} strokeWidth={1.4} />} {createConsultation.isPending ? (copy ? "جارٍ الإرسال" : "Sending") : t("booking.submit")}</button>}</div><p className="form-note">{copy ? "سيتم مراجعة طلبك أولاً، ثم التواصل معك عبر WhatsApp لتأكيد التوفر والموعد النهائي." : "We will review your request and contact you through WhatsApp to confirm availability and the final appointment."}</p></form>}</div></div></div>;
}
