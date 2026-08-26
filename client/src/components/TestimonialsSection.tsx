/* Glloria Design Direction: Warm Editorial Atelier — trust is earned through verified voices, not decorative social proof. */
import { ArrowUpLeft, Quote } from "lucide-react";
import { Link } from "wouter";

export default function TestimonialsSection() {
  return (
    <section className="testimonials section-pad" id="testimonials">
      <div className="section-marker"><span>06</span><span>CLIENT VOICES</span></div>
      <div className="testimonials-layout">
        <div className="testimonial-heading"><p className="eyebrow">آراء العملاء</p><h2>الثقة تبدأ<br /><em>من تجربة حقيقية.</em></h2><p>سنشارك هنا تجارب العملاء السابقين بعد اعتماد نصوصهم وموافقتهم على النشر. لأن كل مساحة لها قصة، وصاحبها هو الأصدق في حكايتها.</p><Link className="text-link" href="/contact">كوني جزءاً من الحكاية <ArrowUpLeft size={16} /></Link></div>
        <div className="testimonial-empty"><div className="quote-mark"><Quote size={20} /></div><span className="rating-placeholder">التقييمات الموثقة ستضاف هنا بعد الاعتماد</span><h3>مساحتكِ قد تكون<br /><em>الصوت القادم.</em></h3><p>التقييمات والشهادات المعروضة هنا ستكون من عملاء حقيقيين فقط، بعد الحصول على موافقتهم.</p><span className="verified-note">VERIFIED CLIENT STORIES / COMING SOON</span></div>
      </div>
    </section>
  );
}
