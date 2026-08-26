/* Glloria Design Direction: Warm Editorial Atelier — an asymmetric lookbook landing page where material, image, and quiet copy lead. */
import { ArrowDownLeft, ArrowUpLeft, Check, MoveUpLeft } from "lucide-react";
import { Link } from "wouter";
import TestimonialsSection from "../components/TestimonialsSection";

const heroImage = "/manus-storage/glloria-hero_b9a954a0.jpg";
const hebaPortrait = "/manus-storage/heba-portrait_08a10116.png";
const projectImages = {
  dining: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
  cafe: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
  bedroom: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
};

const services = [
  { number: "01", title: "تصميم داخلي", english: "INTERIOR DESIGN", text: "من الفكرة الأولى إلى لوحة الألوان وتفاصيل المكان؛ نصمم فراغاً متكاملاً يشبه إيقاع حياتك." },
  { number: "02", title: "تصوّر ثلاثي الأبعاد", english: "3D VISUALIZATION", text: "نحوّل التصور إلى صورة يمكن رؤيتها والإحساس بها قبل أن تبدأ أي خطوة في الموقع." },
  { number: "03", title: "تنفيذ وإشراف", english: "EXECUTION", text: "اختيار الخامات، متابعة التفاصيل، والتنسيق مع فريق التنفيذ حتى تصل الفكرة إلى مكانها الصحيح." },
];

const steps = [
  ["01", "نستمع", "مكالمة قصيرة نفهم فيها المكان، احتياجاته، وما تريدين أن تشعري به داخله."],
  ["02", "نكتشف", "زيارة وقياسات وقراءة للضوء والحركة والخامات التي سيبنى عليها التصميم."],
  ["03", "نصمم", "كونسبت واضح، moodboard، وتفاصيل بصرية تجعل القرار أسهل وأكثر اطمئناناً."],
  ["04", "نُنجز", "تنسيق وتنفيذ ومتابعة دقيقة حتى يصبح التصميم جزءاً طبيعياً من يومك."],
];

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero section-pad">
        <div className="hero-index editorial-index"><span>01</span><span>THE BEGINNING</span></div>
        <div className="hero-copy">
          <p className="eyebrow">Glloria / Interior Design Studio</p>
          <h1>مساحات<br /><em>تُشبه أصحابها.</em></h1>
          <p className="hero-intro">نصمم بيوتاً وأماكن عمل تحمل حكاية أصحابها؛ بهدوء، بدقة، وبعين ترى التفاصيل الصغيرة.</p>
          <a className="text-link" href="#projects">اكتشفي الأعمال <ArrowDownLeft size={17} strokeWidth={1.4} /></a>
        </div>
        <div className="hero-visual-wrap">
          <div className="hero-visual-frame"><img src={heroImage} alt="مساحة معيشة بتصميم Glloria" /></div>
          <div className="hero-caption"><span>01 / 04</span><span>Private Residence · Qena</span></div>
        </div>
        <div className="hero-side-note">DESIGNED FOR LIVING<br />NOT JUST LOOKING</div>
      </section>

      <section className="manifesto section-pad" id="about">
        <div className="section-marker"><span>02</span><span>THE STUDIO</span></div>
        <div className="manifesto-copy">
          <p className="eyebrow">عن Glloria</p>
          <h2>البيت ليس خلفية.<br /><em>إنه جزء من الحكاية.</em></h2>
          <p>في Glloria، نبدأ من الإنسان قبل المساحة. من عاداته، ذوقه، الضوء الذي يحبه، والأشياء التي يريد أن تبقى حوله. ثم نترجم كل ذلك إلى تصميم متوازن؛ جميل في الصورة، ومريح في الحياة اليومية.</p>
          <Link className="text-link" href="/projects">شاهدي طريقة تفكيرنا <MoveUpLeft size={17} strokeWidth={1.4} /></Link>
        </div>
        <div className="manifesto-aside founder-card">
          <div className="founder-portrait"><img src={hebaPortrait} alt="المهندسة هبة الدمراني — مؤسسة Glloria" /></div>
          <p className="founder-caption">Heba El Damarany<br /><span>FOUNDER / GLLORIA STUDIO</span></p>
          <div className="studio-seal"><img src="/manus-storage/glloria-logo_c03b6188.png" alt="شعار Glloria" /></div>
        </div>
      </section>

      <section className="projects-preview section-pad" id="projects">
        <div className="section-heading">
          <div className="section-marker"><span>03</span><span>SELECTED WORK</span></div>
          <div className="heading-side"><p>أعمال مختارة</p><Link className="text-link" href="/projects">كل المشاريع <ArrowUpLeft size={16} strokeWidth={1.4} /></Link></div>
        </div>
        <div className="project-feature-grid">
          <Link href="/projects/private-residence" className="project-card project-card-large">
            <div className="project-image"><img src={projectImages.dining} alt="منزل خاص — غرفة الطعام" /><span className="project-arrow"><ArrowUpLeft size={19} strokeWidth={1.4} /></span></div>
            <div className="project-meta"><span>01 / PRIVATE RESIDENCE</span><span>قنا، مصر · 2024</span></div>
            <h3>بيت بين الضوء<br /><em>والظل.</em></h3>
          </Link>
          <div className="project-stack">
            <Link href="/projects/cafe-namaa" className="project-card">
              <div className="project-image"><img src={projectImages.cafe} alt="مقهى نماء — تصميم داخلي" /><span className="project-arrow"><ArrowUpLeft size={17} strokeWidth={1.4} /></span></div>
              <div className="project-meta"><span>02 / HOSPITALITY</span><span>قنا، مصر · 2023</span></div>
              <h3>مقهى <em>نماء.</em></h3>
            </Link>
            <Link href="/projects/quiet-bedroom" className="project-card project-card-mini">
              <div className="project-image"><img src={projectImages.bedroom} alt="غرفة نوم هادئة — تصميم Glloria" /><span className="project-arrow"><ArrowUpLeft size={17} strokeWidth={1.4} /></span></div>
              <div className="project-meta"><span>03 / PRIVATE RESIDENCE</span><span>2024</span></div>
              <h3>غرفة هادئة.</h3>
            </Link>
          </div>
        </div>
      </section>

      <section className="services section-pad" id="services">
        <div className="section-marker"><span>04</span><span>WHAT WE DO</span></div>
        <div className="services-header"><p className="eyebrow">الخدمات</p><h2>من أول سؤال<br /><em>إلى آخر تفصيلة.</em></h2></div>
        <div className="services-list">
          {services.map((service) => (
            <div className="service-row" key={service.number}>
              <span className="service-number">{service.number}</span>
              <h3>{service.title}<small>{service.english}</small></h3>
              <p>{service.text}</p>
              <ArrowUpLeft className="service-arrow" size={19} strokeWidth={1.25} />
            </div>
          ))}
        </div>
        <Link href="/contact" className="clay-button">اطلبي استشارتك <ArrowUpLeft size={17} strokeWidth={1.4} /></Link>
      </section>

      <section className="process section-pad">
        <div className="section-marker"><span>05</span><span>THE PROCESS</span></div>
        <div className="process-intro"><p className="eyebrow">طريقة العمل</p><h2>واضحة، إنسانية،<br /><em>ومصممة لكِ.</em></h2></div>
        <div className="process-list">
          {steps.map(([number, title, text]) => (
            <div className="process-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>
          ))}
        </div>
      </section>

      <TestimonialsSection />

      <section className="closing-cta section-pad">
        <div className="closing-ornament" aria-hidden="true"><span /><span /><span /></div>
        <p className="eyebrow">المشروع القادم قد يكون هنا</p>
        <h2>احكي لنا عن المكان<br /><em>الذي تتخيلينه.</em></h2>
        <Link href="/booking" className="dark-button">احجزي استشارتك <ArrowUpLeft size={18} strokeWidth={1.4} /></Link>
        <div className="closing-foot"><span>Glloria / Qena</span><span><Check size={14} /> نرد خلال 24 ساعة</span></div>
      </section>
    </div>
  );
}
