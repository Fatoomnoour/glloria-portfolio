/* Glloria Design Direction: Warm Editorial Atelier — a calm, human inquiry page with tactile fields and a clear conversation CTA. */
import { FormEvent, useState } from "react";
import {
  ArrowUpLeft,
  CalendarDays,
  Check,
  Instagram,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "wouter";
import { useLocale } from "../contexts/LocaleContext";
import {
  buildContactInquiryUrl,
  buildGeneralWhatsAppUrl,
} from "../../../shared/whatsapp";

export default function Contact() {
  const { locale, t } = useLocale();
  const isArabic = locale === "ar";
  const [sent, setSent] = useState(false);
  const [handoffUrl, setHandoffUrl] = useState("");
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const url = buildContactInquiryUrl({
      locale,
      name: String(data.get("name") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      projectType: String(data.get("type") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    });
    setHandoffUrl(url);
    setSent(true);
    // Open the prefilled WhatsApp thread straight away. If the browser blocks
    // the popup, the confirmation panel still renders the same link so the
    // enquiry is never silently lost.
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="contact-page page-transition section-pad">
      <div className="contact-top">
        <div className="section-marker">
          <span>08</span>
          <span>LET'S TALK</span>
        </div>
        <p className="contact-location">
          <MapPin size={15} /> {isArabic ? "قنا، مصر" : "Qena, Egypt"}{" "}
          <span>·</span>{" "}
          {isArabic ? "نعمل على مشاريع مختارة" : "Selected projects only"}
        </p>
      </div>
      <div className="contact-layout">
        <div className="contact-copy">
          <p className="eyebrow">
            {isArabic ? "تواصلي مع Glloria" : "Get in touch with Glloria"}
          </p>
          <h1>
            {isArabic ? (
              <>
                المكان الذي
                <br />
                <em>تتخيلينه يبدأ هنا.</em>
              </>
            ) : (
              <>
                The place you imagine
                <br />
                <em>begins here.</em>
              </>
            )}
          </h1>
          <p>
            {isArabic
              ? "أرسلي لنا بعض التفاصيل عن مشروعك، وسنعود إليكِ خلال 24 ساعة لنسمع الحكاية كاملة."
              : "Share a few details about your project and we will be in touch within 24 hours to hear the full story."}
          </p>
          <div className="contact-booking-link">
            <CalendarDays size={15} />
            <div>
              <span>{isArabic ? "جاهزة للبدء؟" : "Ready to begin?"}</span>
              <Link href="/booking">
                {t("nav.primary")} <ArrowUpLeft size={15} />
              </Link>
            </div>
          </div>
          <div className="contact-details">
            <a
              href={buildGeneralWhatsAppUrl(locale)}
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <Phone size={15} /> WhatsApp
              </span>
              <b>+20 10 666 46397</b>
            </a>
            <a href="mailto:hello@glloria.studio">
              <span>{isArabic ? "البريد الإلكتروني" : "Email"}</span>
              <b>hello@glloria.studio</b>
            </a>
            <a
              href="https://www.instagram.com/glloriaaa"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <Instagram size={15} /> Instagram
              </span>
              <b>@glloriaaa</b>
            </a>
            <a
              href="https://www.facebook.com/glloriaaa"
              target="_blank"
              rel="noreferrer"
            >
              <span>Facebook</span>
              <b>facebook.com/glloriaaa</b>
            </a>
          </div>
        </div>
        <div className="inquiry-panel">
          {sent ? (
            <div className="success-message">
              <div className="success-icon">
                <Check size={21} />
              </div>
              <p className="eyebrow">
                {isArabic ? "رسالتك جاهزة للإرسال" : "Your message is ready"}
              </p>
              <h2>
                {isArabic ? (
                  <>
                    خطوة أخيرة
                    <br />
                    <em>على واتساب.</em>
                  </>
                ) : (
                  <>
                    One last step
                    <br />
                    <em>on WhatsApp.</em>
                  </>
                )}
              </h2>
              <p>
                {isArabic
                  ? "فتحنا واتساب برسالة معبّأة بتفاصيلك. اضغط إرسال داخل واتساب حتى تصل إلى Glloria، ونرد خلال 24 ساعة."
                  : "WhatsApp has opened with your details prefilled. Press send inside WhatsApp so it reaches Glloria — we reply within 24 hours."}
              </p>
              {handoffUrl && (
                <a
                  className="dark-button"
                  href={handoffUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {isArabic ? "فتح واتساب مرة أخرى" : "Open WhatsApp again"}{" "}
                  <ArrowUpLeft size={18} strokeWidth={1.4} />
                </a>
              )}
              <button className="text-link" onClick={() => setSent(false)}>
                {isArabic ? "إرسال رسالة أخرى" : "Send another message"}{" "}
                <ArrowUpLeft size={17} />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-heading">
                <span>INQUIRY / 01</span>
                <h2>
                  {isArabic
                    ? "احكي لنا عن مشروعك."
                    : "Tell us about your project."}
                </h2>
              </div>
              <label>
                {isArabic ? "الاسم الكامل" : "Full name"}
                <input
                  required
                  name="name"
                  placeholder={isArabic ? "مثال: هبة أحمد" : "Your full name"}
                />
              </label>
              <label>
                {isArabic ? "رقم الهاتف أو WhatsApp" : "Phone or WhatsApp"}
                <input required name="phone" type="tel" placeholder="+20 ..." />
              </label>
              <label>
                {isArabic ? "نوع المشروع" : "Project type"}
                <select name="type" defaultValue="" required>
                  <option value="" disabled>
                    {isArabic ? "اختاري نوع المشروع" : "Choose a project type"}
                  </option>
                  <option>
                    {isArabic ? "منزل / شقة" : "House / apartment"}
                  </option>
                  <option>
                    {isArabic ? "مكتب / عيادة" : "Office / clinic"}
                  </option>
                  <option>
                    {isArabic ? "مطعم / كافيه" : "Restaurant / café"}
                  </option>
                  <option>
                    {isArabic ? "مشروع تجاري آخر" : "Other commercial project"}
                  </option>
                </select>
              </label>
              <label>
                {isArabic ? "رسالتك" : "Your message"}
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder={
                    isArabic
                      ? "ما الذي تتخيلينه للمكان؟"
                      : "Tell us what you imagine for the space."
                  }
                />
              </label>
              <button className="dark-button form-submit" type="submit">
                {isArabic ? "إرسال عبر واتساب" : "Send via WhatsApp"}{" "}
                <ArrowUpLeft size={18} strokeWidth={1.4} />
              </button>
              <p className="form-note">
                {isArabic
                  ? "سيفتح واتساب برسالة جاهزة بتفاصيلك — راجعها واضغط إرسال. لن نستخدم بياناتك إلا للتواصل بخصوص مشروعك."
                  : "WhatsApp opens with your details prefilled — review it and press send. Your details are used only to contact you about this project."}
              </p>
            </form>
          )}
        </div>
      </div>
      <section className="location-section" aria-labelledby="location-title">
        <div className="section-marker">
          <span>09</span>
          <span>STUDIO LOCATION</span>
        </div>
        <div className="location-section-content">
          <p className="eyebrow">
            GLLORIA / {isArabic ? "الموقع" : "LOCATION"}
          </p>
          <h2 id="location-title">{isArabic ? "قنا، مصر" : "Qena, Egypt"}</h2>
          <p>
            {isArabic
              ? "مشاريع مختارة، وتواصل يبدأ من مساحة واضحة."
              : "Selected projects, with every conversation beginning from a clear brief."}
          </p>
        </div>
      </section>
    </div>
  );
}
