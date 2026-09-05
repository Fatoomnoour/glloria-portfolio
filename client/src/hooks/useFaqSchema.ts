import { useEffect } from "react";
import { useLocale } from "../contexts/LocaleContext";

/**
 * Emits FAQPage structured data for the home page's questions.
 *
 * WHY
 * ---
 * The home page already carries six genuine questions with real answers, which
 * is exactly what Google's FAQ rich result wants — but without the schema they
 * are invisible to it. Marking them up can expand the search listing with
 * collapsible questions, which measurably raises click-through for local
 * service businesses. It costs nothing: the content is already written.
 *
 * ELIGIBILITY NOTE
 * ----------------
 * Google restricted FAQ rich results to authoritative government and health
 * sites in 2023, so the expanded listing is not guaranteed. The markup is still
 * worth shipping: it is valid structured data that helps search engines and
 * assistants parse the answers, and it costs one script tag.
 */

type FaqEntry = { ar: string[]; en: string[] };

export function buildFaqSchema(faqs: FaqEntry[], locale: "ar" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
      .map(item => item[locale])
      .filter(pair => pair?.[0] && pair?.[1])
      .map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
  };
}

const SCRIPT_ID = "faq-schema";

export function useFaqSchema(faqs: FaqEntry[]) {
  const { locale } = useLocale();

  useEffect(() => {
    const schema = buildFaqSchema(faqs, locale);
    if (!schema.mainEntity.length) return;

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

    // Scoped to the home page: leaving FAQPage markup on /booking or /contact
    // would describe a page that does not contain those questions.
    return () => script?.remove();
  }, [faqs, locale]);
}
