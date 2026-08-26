/* Glloria Design Direction: Warm Editorial Atelier — a calm, human inquiry page with tactile fields and a clear conversation CTA. */
import { FormEvent, useState } from "react";
import { ArrowUpLeft, CalendarDays, Check, Instagram, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };

  return (
    <div className="contact-page page-transition section-pad">
      <div className="contact-top"><div className="section-marker"><span>08</span><span>LET'S TALK</span></div><p className="contact-location"><MapPin size={15} /> قنا، مصر <span>·</span> نعمل على مشاريع مختارة</p></div>
      <div className="contact-layout">
        <div className="contact-copy"><p className="eyebrow">تواصلي مع Glloria</p><h1>المكان الذي<br /><em>تتخيلينه يبدأ هنا.</em></h1><p>أرسلي لنا بعض التفاصيل عن مشروعك، وسنعود إليكِ خلال 24 ساعة لنسمع الحكاية كاملة.</p><div className="contact-booking-link"><CalendarDays size={15} /><div><span>جاهزة للبدء؟</span><a href="/booking">احجزي استشارتك مباشرة <ArrowUpLeft size={15} /></a></div></div><div className="contact-details"><a href="https://wa.me/201097430973" target="_blank" rel="noreferrer"><span><Phone size={15} /> WhatsApp</span><b>+20 109 743 0973</b></a><a href="mailto:hello@glloria.studio"><span>البريد الإلكتروني</span><b>hello@glloria.studio</b></a><a href="https://www.instagram.com/glloriaaa" target="_blank" rel="noreferrer"><span><Instagram size={15} /> Instagram</span><b>@glloriaaa</b></a></div></div>
        <div className="inquiry-panel">{sent ? <div className="success-message"><div className="success-icon"><Check size={21} /></div><p className="eyebrow">تم استلام رسالتك</p><h2>شكراً لأنكِ<br /><em>بدأتِ الحكاية.</em></h2><p>وصلت التفاصيل إلى Glloria. سنعود إليكِ قريباً.</p><button className="text-link" onClick={() => setSent(false)}>إرسال رسالة أخرى <ArrowUpLeft size={17} /></button></div> : <form onSubmit={handleSubmit}><div className="form-heading"><span>INQUIRY / 01</span><h2>احكي لنا عن مشروعك.</h2></div><label>الاسم الكامل<input required name="name" placeholder="مثال: هبة أحمد" /></label><label>رقم الهاتف أو WhatsApp<input required name="phone" type="tel" placeholder="+20 ..." /></label><label>نوع المشروع<select name="type" defaultValue=""><option value="" disabled>اختاري نوع المشروع</option><option>منزل / شقة</option><option>مكتب / عيادة</option><option>مطعم / كافيه</option><option>مشروع تجاري آخر</option></select></label><label>رسالتك<textarea required name="message" rows={4} placeholder="ما الذي تتخيلينه للمكان؟" /></label><button className="dark-button form-submit" type="submit">إرسال الاستفسار <ArrowUpLeft size={18} strokeWidth={1.4} /></button><p className="form-note">لن نستخدم بياناتك إلا للتواصل بخصوص مشروعك.</p></form>}</div>
      </div>
    </div>
  );
}
