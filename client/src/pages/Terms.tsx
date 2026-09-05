import { ArrowUpLeft } from "lucide-react";
import { Link } from "wouter";
import { useLocale } from "../contexts/LocaleContext";
import { useSeo } from "../hooks/useSeo";

export default function Terms() {
  useSeo({ page: "terms", path: "/terms" });
  const { locale } = useLocale();
  const ar = locale === "ar";
  return (
    <div className="legal-page section-pad page-transition">
      <div className="legal-top">
        <span className="eyebrow">GLLORIA / {ar ? "الشروط" : "TERMS"}</span>
        <Link className="text-link" href="/booking">
          {ar ? "العودة للحجز" : "Back to booking"} <ArrowUpLeft size={16} />
        </Link>
      </div>
      <h1>
        {ar ? "قبل أن" : "Before we"}
        <br />
        <em>{ar ? "نبدأ." : "begin."}</em>
      </h1>
      <div className="legal-copy">
        <h2>{ar ? "طلبات الحجز" : "Booking requests"}</h2>
        <p>
          {ar
            ? "إرسال النموذج هو طلب مبدئي وليس تأكيداً للموعد. تتم مراجعة التفاصيل ثم التواصل معك عبر WhatsApp لتأكيد التوفر والموعد النهائي."
            : "Submitting the form is an initial request, not a confirmed appointment. We review the details and contact you through WhatsApp to confirm availability and the final appointment."}
        </p>
        <h2>{ar ? "طبيعة الخدمات" : "Service scope"}</h2>
        <p>
          {ar
            ? "يتم تحديد نطاق الاستشارة أو التصميم أو الإشراف أو التنفيذ بعد مراجعة احتياجات المشروع والاتفاق على التفاصيل المناسبة قبل بدء العمل."
            : "The scope of consultation, design, supervision, or execution is agreed after reviewing the project needs and confirming the appropriate details before work begins."}
        </p>
        <h2>{ar ? "المحتوى والصور" : "Content and imagery"}</h2>
        <p>
          {ar
            ? "المشاريع والصور المعروضة تمثل أرشيف Glloria، وتُضاف معلومات التنفيذ أو التصور ثلاثي الأبعاد حسب مصدرها المعتمد."
            : "Projects and images shown represent the Glloria archive; executed or 3D-visualisation status is stated according to its approved source."}
        </p>
        <p className="legal-updated">
          {ar ? "آخر تحديث: أغسطس 2026" : "Last updated: August 2026"}
        </p>
      </div>
    </div>
  );
}
