import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "ar" | "en";

type LocaleContextValue = {
  locale: Locale;
  dir: "rtl" | "ltr";
  toggleLocale: () => void;
  t: (key: string) => string;
};

const copy: Record<string, { ar: string; en: string }> = {
  "nav.home": { ar: "الرئيسية", en: "Home" },
  "nav.projects": { ar: "الأعمال", en: "Work" },
  "nav.about": { ar: "عن هبة", en: "About Heba" },
  "nav.services": { ar: "الخدمات", en: "Services" },
  "nav.booking": { ar: "الحجز", en: "Book" },
  "nav.testimonials": { ar: "آراء العملاء", en: "Client voices" },
  "nav.primary": { ar: "احجزي استشارتك", en: "Book your consultation" },
  "nav.secondary": { ar: "شاهدي الأعمال", en: "View the work" },
  "nav.language": { ar: "English", en: "العربية" },
  "footer.contact": { ar: "تواصلي معنا", en: "Get in touch" },
  "footer.follow": { ar: "تابعينا", en: "Follow along" },
  "footer.statement": { ar: "مساحات تُشبه أصحابها،\nوتعيش معهم طويلاً.", en: "Spaces that feel like their owners,\nand live with them." },
  "footer.legal": { ar: "قانوني", en: "Legal" },
  "footer.privacy": { ar: "سياسة الخصوصية", en: "Privacy policy" },
  "footer.terms": { ar: "شروط الاستخدام", en: "Terms of use" },
  "booking.title": { ar: "نحدد موعداً", en: "Let's find a time" },
  "booking.titleAccent": { ar: "للبداية.", en: "to begin." },
  "booking.intro": { ar: "اختاري اليوم والوقت الأنسب لكِ. سنراجع التفاصيل أولاً، ثم نؤكد الموعد عبر WhatsApp قبل اعتماده.", en: "Choose a preferred day and time. We will review the details, then confirm availability with you on WhatsApp." },
  "booking.fullName": { ar: "الاسم الكامل", en: "Full name" },
  "booking.phone": { ar: "رقم الهاتف أو WhatsApp", en: "Phone or WhatsApp" },
  "booking.city": { ar: "المدينة / المنطقة", en: "City / area" },
  "booking.property": { ar: "نوع العقار", en: "Property type" },
  "booking.area": { ar: "المساحة التقريبية", en: "Approximate area" },
  "booking.service": { ar: "الخدمة المطلوبة", en: "Requested service" },
  "booking.budget": { ar: "الميزانية التقريبية", en: "Approximate budget" },
  "booking.date": { ar: "التاريخ المفضل", en: "Preferred date" },
  "booking.time": { ar: "الوقت المفضل", en: "Preferred time" },
  "booking.description": { ar: "وصف مختصر للمشروع", en: "Brief project description" },
  "booking.privacy": { ar: "أوافق على استخدام بياناتي للتواصل بخصوص هذا الطلب وفق سياسة الخصوصية.", en: "I agree that my details may be used to contact me about this request under the privacy policy." },
  "booking.submit": { ar: "إرسال طلب الموعد", en: "Submit consultation request" },
  "booking.successEyebrow": { ar: "تم استلام طلبك", en: "Request received" },
  "booking.successTitle": { ar: "سنراجع التفاصيل", en: "We will review the details" },
  "booking.successAccent": { ar: "ونتواصل معكِ.", en: "and get back to you." },
  "booking.successBody": { ar: "سيتم مراجعة طلبك والتواصل معك عبر WhatsApp لتأكيد التوفر والموعد النهائي.", en: "Your request will be reviewed and we will contact you through WhatsApp to confirm availability and the final appointment." },
  "booking.back": { ar: "العودة للتواصل", en: "Back to contact" },
  "booking.edit": { ar: "تعديل الطلب", en: "Edit request" },
  "booking.confirm": { ar: "تأكيد عبر WhatsApp", en: "Confirm via WhatsApp" },
  "projects.filterLabel": { ar: "تصفية حسب نوع التصميم", en: "Filter by design discipline" },
  "projects.all": { ar: "كل الأعمال", en: "All work" },
  "projects.interior": { ar: "تصميم داخلي", en: "Interior design" },
  "projects.architectural": { ar: "تصميم معماري", en: "Architecture" },
  "projects.count": { ar: "مشاريع", en: "projects" },
  "projects.emptyTitle": { ar: "هذا القسم", en: "This archive" },
  "projects.emptyAccent": { ar: "سيكبر قريباً.", en: "will grow soon." },
  "projects.emptyBody": { ar: "لا توجد أعمال منشورة تحت هذا التصنيف بعد. ستظهر هنا بمجرد إضافتها من لوحة الإدارة.", en: "There are no published projects in this discipline yet. New work added from the admin studio will appear here." },
  "projects.emptyCta": { ar: "احجزي استشارتك", en: "Book your consultation" },
  "testimonials.eyebrow": { ar: "آراء العملاء", en: "Client voices" },
  "testimonials.title": { ar: "الثقة تبدأ", en: "Trust begins" },
  "testimonials.accent": { ar: "من تجربة حقيقية.", en: "with a real experience." },
  "testimonials.body": { ar: "نشارك تجارب العملاء السابقين بعد اعتماد نصوصهم وموافقتهم على النشر.", en: "We share client experiences only after their words are approved and they consent to publication." },
  "testimonials.empty": { ar: "تجارب العملاء المعتمدة ستظهر هنا.", en: "Approved client experiences will appear here." },
  "testimonials.cta": { ar: "احجزي استشارتك", en: "Book your consultation" },
  "faq.title": { ar: "أسئلة قبل البداية", en: "Questions before we begin" },
  "faq.subtitle": { ar: "إجابات واضحة قبل أول خطوة.", en: "Clear answers before the first step." },
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => (localStorage.getItem("glloria-locale") as Locale) || "ar");
  const dir: "rtl" | "ltr" = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    localStorage.setItem("glloria-locale", locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [dir, locale]);

  const value = useMemo(() => ({ locale, dir, toggleLocale: () => setLocale((current) => current === "ar" ? "en" : "ar"), t: (key: string) => copy[key]?.[locale] ?? key }), [dir, locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside LocaleProvider");
  return value;
}

export function localeCopy(key: string, locale: Locale) {
  return copy[key]?.[locale] ?? key;
}
