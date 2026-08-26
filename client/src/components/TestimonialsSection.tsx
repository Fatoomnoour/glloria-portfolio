/* Glloria Design Direction: Warm Editorial Atelier — trust is earned through verified voices, not decorative social proof. */
import { ArrowUpLeft, Quote, Star } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "../lib/trpc";
import { useLocale } from "../contexts/LocaleContext";

export default function TestimonialsSection() {
  const { data: testimonials, isLoading } = trpc.testimonials.list.useQuery();
  const { t, locale } = useLocale();
  const hasTestimonials = Boolean(testimonials?.length);
  return <section className={`testimonials section-pad ${hasTestimonials ? "has-testimonials" : "is-quiet"}`} id="testimonials"><div className="section-marker"><span>07</span><span>CLIENT VOICES</span></div><div className="testimonials-layout"><div className="testimonial-heading"><p className="eyebrow">{t("testimonials.eyebrow")}</p><h2>{t("testimonials.title")}<br /><em>{t("testimonials.accent")}</em></h2><p>{t("testimonials.body")}</p><Link className="text-link" href="/booking">{t("testimonials.cta")} <ArrowUpLeft size={16} /></Link></div><div className={hasTestimonials ? "testimonial-grid" : "testimonial-empty"}>{isLoading ? <div className="testimonial-loading"><div className="quote-mark"><Quote size={18} /></div><span>{locale === "ar" ? "جاري تحميل الشهادات..." : "Loading client stories..."}</span></div> : hasTestimonials ? testimonials?.map((item) => <article className="testimonial-card" key={item.id}><div className="testimonial-card-top"><div className="quote-mark"><Quote size={18} /></div><div className="testimonial-stars" aria-label={`${item.rating} / 5`}>{Array.from({ length: item.rating }).map((_, index) => <Star key={index} size={14} fill="currentColor" />)}</div></div><blockquote>“{item.quote}”</blockquote><div className="testimonial-author"><strong>{item.clientName}</strong><span>{[item.clientRole, item.projectName].filter(Boolean).join(" · ") || (locale === "ar" ? "عميل Glloria" : "Glloria client")}</span></div><span className="verified-note">VERIFIED CLIENT STORY</span></article>) : <div className="testimonial-quiet"><div className="quote-mark"><Quote size={20} /></div><p>{t("testimonials.empty")}</p><span className="verified-note">REAL CLIENT STORIES / PRIVATE BY DEFAULT</span></div>}</div></div></section>;
}
