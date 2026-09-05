/* Glloria booking: private-by-default recovery, verified project referral, and a calm five-step consultation flow. */
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpLeft,
  CalendarDays,
  Check,
  ChevronLeft,
  Clock3,
  Loader2,
} from "lucide-react";
import { Link } from "wouter";
import { useLocale } from "../contexts/LocaleContext";
import { trpc } from "../lib/trpc";
import { buildBookingConfirmationUrl } from "../../../shared/whatsapp";
import {
  getBookingPresentationStage,
  isBookingStepComplete,
  parseBookingAttribution,
  type BookingStep,
} from "../../../shared/booking";
import { useSeo } from "../hooks/useSeo";

const times = [
  { value: "10:00", ar: "10:00 صباحاً", en: "10:00 AM" },
  { value: "12:00", ar: "12:00 ظهراً", en: "12:00 PM" },
  { value: "14:00", ar: "02:00 مساءً", en: "2:00 PM" },
  { value: "16:00", ar: "04:00 مساءً", en: "4:00 PM" },
];
const keys = [
  "booking.stepContact",
  "booking.stepSpace",
  "booking.stepScope",
  "booking.stepSchedule",
  "booking.stepReview",
] as const;
const stageLabels = {
  ar: ["بداية المشروع", "توجّه المساحة", "المراجعة والإرسال"],
  en: ["Your project", "Your space", "Review & send"],
};
const draftKey = "glloria:booking-preferences:v1";
const resumable = [
  "city",
  "property",
  "area",
  "service",
  "budget",
  "date",
  "time",
  "aestheticPreference",
] as const;
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
const initial: BookingState = {
  name: "",
  phone: "",
  email: "",
  city: "",
  property: "",
  area: "",
  service: "",
  budget: "",
  date: "",
  time: times[0].value,
  description: "",
  aestheticPreference: "",
  privacy: false,
  honeypot: "",
};

function readDraft() {
  if (typeof window === "undefined") return {};
  try {
    const source = JSON.parse(
      window.sessionStorage.getItem(draftKey) || "{}"
    ) as Record<string, unknown>;
    return Object.fromEntries(
      resumable.map(key => [
        key,
        typeof source[key] === "string" ? source[key] : "",
      ])
    );
  } catch {
    return {};
  }
}

export default function Booking() {
  useSeo({ page: "booking", path: "/booking" });
  const { t, locale } = useLocale();
  const ar = locale === "ar";
  const [booking, setBooking] = useState<BookingState>(initial);
  const [step, setStep] = useState<BookingStep>(1);
  const [stepError, setStepError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [attribution] = useState(() =>
    parseBookingAttribution(
      typeof window === "undefined" ? "" : window.location.search
    )
  );
  const sourceProject = trpc.projects.bySlug.useQuery(
    { slug: attribution.sourceProjectSlug || "" },
    { enabled: Boolean(attribution.sourceProjectSlug) }
  );
  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);
  const selectedTime =
    times.find(item => item.value === booking.time) || times[0];
  const presentationStage = getBookingPresentationStage(step);
  const labels = ar ? stageLabels.ar : stageLabels.en;
  const draft = {
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
  const set = (key: keyof BookingState, value: string | boolean) =>
    setBooking(state => ({ ...state, [key]: value }));
  const create = trpc.consultations.create.useMutation({
    onSuccess: result => {
      window.sessionStorage.removeItem(draftKey);
      setBookingId(result.id);
      setSubmitted(true);
    },
  });

  useEffect(() => {
    const recovered = readDraft();
    if (Object.values(recovered).some(Boolean))
      setBooking(state => ({ ...state, ...recovered }));
  }, []);
  useEffect(() => {
    const safe = Object.fromEntries(resumable.map(key => [key, booking[key]]));
    if (Object.values(safe).some(Boolean))
      window.sessionStorage.setItem(draftKey, JSON.stringify(safe));
  }, [booking]);
  const next = () => {
    if (!isBookingStepComplete(step, draft)) return setStepError(true);
    setStepError(false);
    setStep(value => Math.min(5, value + 1) as BookingStep);
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!isBookingStepComplete(5, draft) || booking.honeypot.trim())
      return setStepError(true);
    setStepError(false);
    create.mutate({
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
      sourceProjectSlug: sourceProject.data?.slug || null,
      utmSource: attribution.utmSource,
      utmMedium: attribution.utmMedium,
      utmCampaign: attribution.utmCampaign,
      privacyConsent: true,
      honeypot: booking.honeypot,
    });
  };
  const options = (
    items: string[],
    value: string,
    setter: (value: string) => void,
    label: string
  ) => (
    <label>
      {label}
      <select
        required
        autoFocus
        value={value}
        onChange={event => setter(event.target.value)}
      >
        <option value="">{ar ? "اختر" : "Choose"}</option>
        {items.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
  const fields =
    step === 1 ? (
      <>
        <label>
          {t("booking.fullName")}
          <input
            required
            autoFocus
            value={booking.name}
            onChange={e => set("name", e.target.value)}
            placeholder={ar ? "مثال: هبة أحمد" : "Your full name"}
          />
        </label>
        <label>
          {t("booking.phone")}
          <input
            required
            type="tel"
            value={booking.phone}
            onChange={e => set("phone", e.target.value)}
            placeholder="+20 ..."
          />
        </label>
        <label>
          {ar ? "البريد الإلكتروني (اختياري)" : "Email (optional)"}
          <input
            type="email"
            value={booking.email}
            onChange={e => set("email", e.target.value)}
            placeholder="hello@example.com"
          />
        </label>
      </>
    ) : step === 2 ? (
      <>
        <label>
          {t("booking.city")}
          <input
            required
            autoFocus
            value={booking.city}
            onChange={e => set("city", e.target.value)}
            placeholder={ar ? "قنا / القاهرة / ..." : "City or area"}
          />
        </label>
        {options(
          ar
            ? [
                "شقة",
                "فيلا / منزل",
                "مكتب / عيادة",
                "مطعم / كافيه",
                "مشروع تجاري آخر",
              ]
            : [
                "Apartment",
                "Villa / house",
                "Office / clinic",
                "Restaurant / café",
                "Other commercial project",
              ],
          booking.property,
          value => set("property", value),
          t("booking.property")
        )}
        <label>
          {t("booking.area")}
          <input
            required
            value={booking.area}
            onChange={e => set("area", e.target.value)}
            placeholder={ar ? "مثال: 180 م²" : "e.g. 180 m²"}
          />
        </label>
      </>
    ) : step === 3 ? (
      <>
        {options(
          ar
            ? [
                "تصميم داخلي ورندر 3D",
                "تصميم معماري وواجهات",
                "إشراف هندسي",
                "تنفيذ وتسليم مفتاح",
                "استشارة أونلاين",
              ]
            : [
                "Interior design & 3D",
                "Architecture & façades",
                "Engineering supervision",
                "Turnkey execution",
                "Online consultation",
              ],
          booking.service,
          value => set("service", value),
          t("booking.service")
        )}
        {options(
          ar
            ? [
                "أقل من 100,000 ج.م",
                "100,000 — 250,000 ج.م",
                "250,000 — 500,000 ج.م",
                "أكثر من 500,000 ج.م",
                "ما زلت أحتاج إلى توجيه",
              ]
            : [
                "Under EGP 100,000",
                "EGP 100,000 — 250,000",
                "EGP 250,000 — 500,000",
                "Over EGP 500,000",
                "I need guidance",
              ],
          booking.budget,
          value => set("budget", value),
          t("booking.budget")
        )}
        <label>
          {t("booking.aesthetic")}
          <input
            value={booking.aestheticPreference}
            onChange={e => set("aestheticPreference", e.target.value)}
            placeholder={t("booking.aestheticPlaceholder")}
          />
        </label>
      </>
    ) : step === 4 ? (
      <>
        <label>
          {t("booking.date")}
          <input
            required
            autoFocus
            type="date"
            min={minDate}
            value={booking.date}
            onChange={e => set("date", e.target.value)}
          />
        </label>
        <label>
          {t("booking.time")}
          <select
            value={booking.time}
            onChange={e => set("time", e.target.value)}
          >
            {times.map(item => (
              <option key={item.value} value={item.value}>
                {ar ? item.ar : item.en}
              </option>
            ))}
          </select>
        </label>
        <label className="booking-wide">
          {t("booking.description")}
          <textarea
            required
            rows={5}
            value={booking.description}
            onChange={e => set("description", e.target.value)}
            placeholder={
              ar
                ? "ما الذي تتخيله للمكان؟"
                : "Tell us about your space and goals."
            }
          />
        </label>
      </>
    ) : (
      <div className="booking-review">
        <div className="booking-review-intro">
          <p className="eyebrow">{t("booking.review")}</p>
          <p>{t("booking.reviewHint")}</p>
        </div>
        <dl>
          {[
            [t("booking.fullName"), booking.name],
            [t("booking.phone"), booking.phone],
            [t("booking.city"), booking.city],
            [t("booking.property"), booking.property],
            [t("booking.area"), booking.area],
            [t("booking.service"), booking.service],
            [t("booking.budget"), booking.budget],
            [t("booking.date"), booking.date],
            [t("booking.time"), ar ? selectedTime.ar : selectedTime.en],
            [
              t("booking.aesthetic"),
              booking.aestheticPreference || (ar ? "لم تحدد" : "Not specified"),
            ],
          ].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <label className="privacy-check">
          <input
            required
            type="checkbox"
            checked={booking.privacy}
            onChange={e => set("privacy", e.target.checked)}
          />
          <span>
            {t("booking.privacy")}{" "}
            <Link href="/privacy">
              {ar ? "سياسة الخصوصية" : "Privacy policy"}
            </Link>
          </span>
        </label>
      </div>
    );
  const whatsappUrl = buildBookingConfirmationUrl({
    locale,
    bookingId,
    name: booking.name,
    phone: booking.phone,
    city: booking.city,
    service: booking.service,
    date: booking.date,
    time: ar ? selectedTime.ar : selectedTime.en,
  });
  return (
    <div className="booking-page section-pad page-transition">
      <div className="contact-top">
        <div className="section-marker">
          <span>07</span>
          <span>BOOK A CONSULTATION</span>
        </div>
        <Link className="booking-back" href="/contact">
          {t("booking.back")} <ArrowUpLeft size={15} />
        </Link>
      </div>
      <div className="booking-layout">
        <div className="booking-copy">
          <p className="eyebrow">
            {ar
              ? "استشارة هندسية / 45 دقيقة"
              : "Engineering consultation / 45 minutes"}
          </p>
          <h1>
            {t("booking.title")}
            <br />
            <em>{t("booking.titleAccent")}</em>
          </h1>
          <p>{t("booking.intro")}</p>
          {sourceProject.data && (
            <p className="booking-project-context">
              <span>{ar ? "المشروع الملهم" : "Inspired by"}</span>
              <strong>{sourceProject.data.title}</strong>
            </p>
          )}
          <div className="booking-notes">
            <span>
              <CalendarDays size={16} />{" "}
              {ar ? "موعد مرن حسب التوفر" : "Flexible availability"}
            </span>
            <span>
              <Clock3 size={16} />{" "}
              {ar ? "مكالمة أو لقاء أونلاين" : "Call or online meeting"}
            </span>
          </div>
        </div>
        <div className="booking-panel">
          {submitted ? (
            <div className="success-message booking-success">
              <div className="success-icon">
                <Check size={21} />
              </div>
              <p className="eyebrow">{t("booking.successEyebrow")}</p>
              <h2>
                {t("booking.successTitle")}
                <br />
                <em>{t("booking.successAccent")}</em>
              </h2>
              <p>{t("booking.successBody")}</p>
              <p className="booking-whatsapp-note">
                {t("booking.whatsappHandoff")}
              </p>
              <a
                className="dark-button"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                {t("booking.confirm")} <ArrowUpLeft size={18} />
              </a>
            </div>
          ) : (
            <form onSubmit={submit}>
              <p
                id="booking-step-announcer"
                className="sr-only"
                aria-live="polite"
              >
                {ar
                  ? `المرحلة ${presentationStage.stage} من 3، خطوة ${step} من 5: ${t(keys[step - 1])}`
                  : `Stage ${presentationStage.stage} of 3, step ${step} of 5: ${t(keys[step - 1])}`}
              </p>
              <div className="form-heading">
                <span>CONSULTATION / 0{presentationStage.stage}</span>
                <h2>{labels[presentationStage.stage - 1]}</h2>
              </div>
              <p className="booking-stage-detail">
                {ar
                  ? `جزء ${presentationStage.position} من ${presentationStage.totalPositions}`
                  : `Part ${presentationStage.position} of ${presentationStage.totalPositions}`}
              </p>
              <ol
                className="booking-progress booking-progress--stages"
                aria-label={
                  ar ? "مراحل طلب الاستشارة" : "Consultation request stages"
                }
              >
                {labels.map((label, index) => (
                  <li
                    key={label}
                    className={
                      index + 1 === presentationStage.stage
                        ? "active"
                        : index + 1 < presentationStage.stage
                          ? "complete"
                          : ""
                    }
                    aria-current={
                      index + 1 === presentationStage.stage ? "step" : undefined
                    }
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <b>{label}</b>
                  </li>
                ))}
              </ol>
              <div className="booking-step-fields">{fields}</div>
              <label className="booking-honeypot" aria-hidden="true">
                Website
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={booking.honeypot}
                  onChange={e => set("honeypot", e.target.value)}
                />
              </label>
              {stepError && (
                <p className="form-error" role="alert">
                  {t("booking.requiredStep")}
                </p>
              )}
              {create.isError && (
                <p className="form-error" role="alert">
                  {ar
                    ? "تعذر إرسال الطلب حالياً. حاول مرة أخرى أو تواصل معنا عبر WhatsApp."
                    : "We could not send your request. Please try again or contact us on WhatsApp."}
                </p>
              )}
              <div className="booking-step-actions">
                {step > 1 && (
                  <button
                    className="text-link booking-previous"
                    type="button"
                    onClick={() => {
                      setStepError(false);
                      setStep(value => (value - 1) as BookingStep);
                    }}
                  >
                    <ArrowDownRight size={16} /> {t("booking.previous")}
                  </button>
                )}
                {step < 5 ? (
                  <button
                    className="dark-button form-submit"
                    type="button"
                    onClick={next}
                  >
                    {t("booking.next")} <ChevronLeft size={17} />
                  </button>
                ) : (
                  <button
                    className="dark-button form-submit"
                    type="submit"
                    disabled={create.isPending}
                  >
                    {create.isPending ? (
                      <Loader2 className="spin" size={18} />
                    ) : (
                      <ArrowUpLeft size={17} />
                    )}{" "}
                    {create.isPending
                      ? ar
                        ? "جارٍ الإرسال"
                        : "Sending"
                      : t("booking.submit")}
                  </button>
                )}
              </div>
              <p className="form-note">
                {ar
                  ? "تُحفظ تفضيلات المساحة فقط مؤقتاً على هذا الجهاز؛ لا نحفظ الاسم أو الهاتف أو الوصف محلياً."
                  : "Only space preferences are temporarily saved on this device; name, phone, and description are never stored locally."}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
