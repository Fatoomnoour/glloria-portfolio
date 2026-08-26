/* Glloria Design Direction: Warm Editorial Atelier — even an empty route should feel considered, quiet, and editorial. */
import { ArrowUpLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return <div className="not-found section-pad page-transition"><span className="eyebrow">GLL / 404</span><h1>هذه الصفحة<br /><em>لم تُرسم بعد.</em></h1><p>لكن يمكننا العودة إلى المساحة الرئيسية.</p><Link href="/" className="dark-button">العودة للرئيسية <ArrowUpLeft size={17} /></Link></div>;
}
