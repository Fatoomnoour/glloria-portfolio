/* Glloria Design Direction: Warm Editorial Atelier — booking is a calm consultation note, not a transactional dashboard. */
import { FormEvent, useMemo, useState } from "react";
import { ArrowUpLeft, CalendarDays, Check, Clock3 } from "lucide-react";
import { Link } from "wouter";

const timeOptions = ["10:00 صباحاً", "12:00 ظهراً", "02:00 مساءً", "04:00 مساءً"];
const whatsappNumber = "201000000000";

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [booking, setBooking] = useState({ name: "", phone: "", date: "", time: timeOptions[0], type: "استشارة تصميم داخلي" });
  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`مرحباً Glloria، أود تأكيد طلب استشارة. الاسم: ${booking.name}، الهاتف: ${booking.phone}، النوع: ${booking.type}، الموعد المفضل: ${booking.date} - ${booking.time}`)}`;
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };

  return (
    <div className="booking-page section-pad page-transition">
      <div className="contact-top"><div className="section-marker"><span>07</span><span>BOOK A CONSULTATION</span></div><Link className="booking-back" href="/contact">العودة للتواصل <ArrowUpLeft size={15} /></Link></div>
      <div className="booking-layout">
        <div className="booking-copy"><p className="eyebrow">استشارة هندسية / 45 دقيقة</p><h1>نحدد موعداً<br /><em>للبداية.</em></h1><p>اختاري اليوم والوقت الأنسب لكِ. سنراجع التفاصيل أولاً، ثم نؤكد الموعد عبر WhatsApp قبل اعتماده.</p><div className="booking-notes"><span><CalendarDays size={16} /> موعد مرن حسب التوفر</span><span><Clock3 size={16} /> مكالمة أو لقاء أونلاين</span></div></div>
        <div className="booking-panel">{submitted ? <div className="success-message booking-success"><div className="success-icon"><Check size={21} /></div><p className="eyebrow">طلبك جاهز للتأكيد</p><h2>خطوة صغيرة<br /><em>وتبدأ الحكاية.</em></h2><p>أرسلي التفاصيل عبر WhatsApp لتأكيد التوفر والموعد النهائي.</p><a className="dark-button" href={whatsappUrl} target="_blank" rel="noreferrer">تأكيد عبر WhatsApp <ArrowUpLeft size={18} /></a><button className="text-link booking-reset" onClick={() => setSubmitted(false)}>تعديل الموعد <ArrowUpLeft size={16} /></button></div> : <form onSubmit={handleSubmit}><div className="form-heading"><span>CONSULTATION / 01</span><h2>اختاري وقتك.</h2></div><label>الاسم الكامل<input required value={booking.name} onChange={(event) => setBooking({ ...booking, name: event.target.value })} placeholder="مثال: هبة أحمد" /></label><label>رقم الهاتف أو WhatsApp<input required type="tel" value={booking.phone} onChange={(event) => setBooking({ ...booking, phone: event.target.value })} placeholder="+20 ..." /></label><label>نوع الاستشارة<select value={booking.type} onChange={(event) => setBooking({ ...booking, type: event.target.value })}><option>استشارة تصميم داخلي</option><option>مراجعة مخطط أو توزيع</option><option>استشارة تشطيبات وخامات</option></select></label><div className="booking-fields"><label>التاريخ المفضل<input required type="date" min={minDate} value={booking.date} onChange={(event) => setBooking({ ...booking, date: event.target.value })} /></label><label>الوقت المفضل<select value={booking.time} onChange={(event) => setBooking({ ...booking, time: event.target.value })}>{timeOptions.map((time) => <option key={time}>{time}</option>)}</select></label></div><button className="dark-button form-submit" type="submit">إرسال طلب الموعد <ArrowUpLeft size={18} strokeWidth={1.4} /></button><p className="form-note">هذا الطلب لا يحجز موعداً نهائياً قبل تأكيد التوفر عبر WhatsApp.</p></form>}</div>
      </div>
    </div>
  );
}
