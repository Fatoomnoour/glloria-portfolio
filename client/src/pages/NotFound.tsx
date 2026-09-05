/* Glloria Design Direction: Warm Editorial Atelier — even an empty route should feel considered, quiet, and editorial. */
import { ArrowUpLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useLocale } from "../contexts/LocaleContext";
import { useSeo } from "../hooks/useSeo";

export default function NotFound() {
  const { locale } = useLocale();
  const [location] = useLocation();
  const ar = locale === "ar";

  // A 404 must never be indexed, and it must never be canonicalised to itself
  // as a real page — otherwise every mistyped or stale inbound link becomes a
  // thin page competing with the real ones.
  useSeo({ page: "notFound", path: location, noIndex: true });

  return (
    <div className="not-found section-pad page-transition">
      <span className="eyebrow">GLL / 404</span>
      <h1>
        {ar ? (
          <>
            هذه الصفحة
            <br />
            <em>لم تُرسم بعد.</em>
          </>
        ) : (
          <>
            This page
            <br />
            <em>has not been drawn yet.</em>
          </>
        )}
      </h1>
      <p>
        {ar
          ? "لكن يمكننا العودة إلى المساحة الرئيسية، أو تصفّح الأعمال."
          : "But we can head back to the main space, or browse the work."}
      </p>
      <div className="not-found-actions">
        <Link href="/" className="dark-button">
          {ar ? "العودة للرئيسية" : "Back home"} <ArrowUpLeft size={17} />
        </Link>
        <Link href="/projects" className="text-link">
          {ar ? "تصفّح الأعمال" : "Browse the work"} <ArrowUpLeft size={16} />
        </Link>
      </div>
    </div>
  );
}
