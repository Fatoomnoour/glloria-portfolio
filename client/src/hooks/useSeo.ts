import { useEffect } from "react";
import { useLocale } from "../contexts/LocaleContext";
import { applySeo, type SeoInput } from "../lib/seo";

/**
 * Per-page titles and descriptions.
 *
 * Written for local intent rather than brand vanity: an Egyptian searching
 * "مهندسة ديكور قنا" or "تشطيب شقق قنا" should see the service and the city in
 * the first 60 characters, because that is all Google renders. Descriptions
 * stay near 155 characters so they are not truncated in the result.
 */
type SeoCopy = { title: string; description: string };

export const seoCopy: Record<string, { ar: SeoCopy; en: SeoCopy }> = {
  home: {
    ar: {
      title: "Glloria | تصميم داخلي وتشطيب في قنا — م. هبة الدمراني",
      description:
        "استوديو Glloria للتصميم الداخلي والمعماري في قنا. تصميم ورندر ثلاثي الأبعاد وإشراف هندسي وتنفيذ للشقق والفيلات والمطاعم والعيادات. احجز استشارة.",
    },
    en: {
      title: "Glloria | Interior Design & Fit-Out in Qena — Heba El Damarany",
      description:
        "Glloria is an interior and architectural design studio in Qena, Egypt. 3D visualisation, engineering supervision and turnkey execution for homes, restaurants and clinics.",
    },
  },
  projects: {
    ar: {
      title: "الأعمال | مشاريع تصميم داخلي وتنفيذ — Glloria",
      description:
        "أرشيف مشاريع Glloria: مطاعم وكافيهات، عيادات ومراكز تجميل، شقق وفيلات سكنية — بين التصميم والرندر والتنفيذ الفعلي.",
    },
    en: {
      title: "Work | Interior Design & Fit-Out Projects — Glloria",
      description:
        "The Glloria project archive: restaurants and cafés, clinics and beauty centres, apartments and villas — across design, visualisation and executed work.",
    },
  },
  booking: {
    ar: {
      title: "احجز استشارة هندسية | Glloria — قنا",
      description:
        "احجز استشارة 45 دقيقة مع م. هبة الدمراني لمناقشة مشروعك: المساحة والميزانية ونطاق العمل. متاحة أونلاين أو في الاستوديو بقنا.",
    },
    en: {
      title: "Book an Engineering Consultation | Glloria — Qena",
      description:
        "Book a 45-minute consultation with Heba El Damarany to discuss your space, budget and scope. Available online or at the Qena studio.",
    },
  },
  contact: {
    ar: {
      title: "تواصل معنا | Glloria — تصميم داخلي بقنا",
      description:
        "تواصل مع استوديو Glloria بقنا هاتفياً أو عبر واتساب أو البريد الإلكتروني. نرد على كل استفسار خلال 24 ساعة.",
    },
    en: {
      title: "Contact | Glloria — Interior Design in Qena",
      description:
        "Reach the Glloria studio in Qena by phone, WhatsApp or email. We reply to every enquiry within 24 hours.",
    },
  },
  privacy: {
    ar: {
      title: "سياسة الخصوصية | Glloria",
      description:
        "كيف يجمع استوديو Glloria بياناتك ويستخدمها ويحميها عند طلب استشارة أو التواصل معنا.",
    },
    en: {
      title: "Privacy Policy | Glloria",
      description:
        "How Glloria collects, uses and protects your data when you request a consultation or contact the studio.",
    },
  },
  terms: {
    ar: {
      title: "شروط الاستخدام | Glloria",
      description: "شروط استخدام موقع Glloria وخدمات الاستشارة والتصميم.",
    },
    en: {
      title: "Terms of Use | Glloria",
      description:
        "Terms governing use of the Glloria website and its consultation and design services.",
    },
  },
  notFound: {
    ar: {
      title: "الصفحة غير موجودة | Glloria",
      description:
        "الصفحة المطلوبة غير موجودة. عد إلى الرئيسية أو تصفّح الأعمال.",
    },
    en: {
      title: "Page Not Found | Glloria",
      description:
        "The page you requested does not exist. Return home or browse the work.",
    },
  },
};

type UseSeoOptions = Omit<SeoInput, "title" | "description" | "locale"> & {
  /** Key into `seoCopy`; omit when passing an explicit title/description. */
  page?: keyof typeof seoCopy;
  title?: string;
  description?: string;
};

export function useSeo(options: UseSeoOptions) {
  const { locale } = useLocale();
  const { page, title, description, path, image, imageAlt, type, noIndex } =
    options;

  const copy = page ? seoCopy[page][locale] : undefined;
  const resolvedTitle = title ?? copy?.title ?? "Glloria";
  const resolvedDescription = description ?? copy?.description ?? "";

  useEffect(() => {
    applySeo({
      title: resolvedTitle,
      description: resolvedDescription,
      path,
      image,
      imageAlt,
      type,
      locale,
      noIndex,
    });
  }, [
    resolvedTitle,
    resolvedDescription,
    path,
    image,
    imageAlt,
    type,
    locale,
    noIndex,
  ]);
}
