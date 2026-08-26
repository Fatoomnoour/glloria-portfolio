/* Glloria Design Direction: Warm Editorial Atelier — case studies read like calm architecture-editorial spreads with captions and proof. */
import { ArrowDownLeft, ArrowUpLeft, Check, ChevronLeft } from "lucide-react";
import { Link, useRoute } from "wouter";
import { trpc } from "../lib/trpc";
import { projects } from "./Projects";
import ShareActions from "../components/ShareActions";

const details: Record<string, { statement: string; description: string; services: string[]; palette: string[]; image: string; }> = {
  "private-residence": { statement: "بيتٌ يترك للضوء مكاناً كي يتنفس.", description: "كان المطلوب بيتاً عائلياً لا يبدو ثقيلاً رغم كثرة الاستخدام. بدأنا من غرفة الطعام كقلب للمشهد، ثم بنينا حولها مساحات دافئة بخامات طبيعية وحركة سهلة بين مناطق اليوم.", services: ["Interior Design", "Space Planning", "Material Selection", "Site Supervision"], palette: ["Warm ivory", "Walnut", "Fired clay"], image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85" },
  "cafe-namaa": { statement: "مساحة صغيرة، وذاكرة كبيرة.", description: "في نماء، كان التحدي أن يشعر المكان بالاتساع والترحيب من دون أن يفقد شخصيته. استخدمنا الأقواس، الضوء الطبيعي، وخامات صادقة تصنع خلفية لطيفة للحظات اليومية.", services: ["Brand Space", "Interior Design", "3D Visualization", "Execution"], palette: ["Limewash", "Natural oak", "Muted olive"], image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85" },
  "quiet-bedroom": { statement: "غرفة تجعل نهاية اليوم أهدأ.", description: "تصميم غرفة نوم بمفردات قليلة ومدروسة: حائط منحني، نسيج طبيعي، إضاءة منخفضة، وتفصيلة طينية تمنح المكان دفئه من غير ضوضاء.", services: ["Interior Design", "Lighting Mood", "Styling"], palette: ["Linen", "Plaster", "Terracotta"], image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85" },
};

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:slug");
  const slug = params?.slug ?? "";
  const { data: managedProject } = trpc.projects.bySlug.useQuery({ slug }, { enabled: Boolean(slug) });
  const fallback = projects.find((item) => item.slug === slug) ?? projects[0];
  const project = managedProject ? { number: "01", type: managedProject.designType === "architectural" ? "ARCHITECTURAL" : "INTERIOR", title: managedProject.title, location: managedProject.location, year: String(managedProject.year), image: managedProject.imageUrl, slug: managedProject.slug } : fallback;
  const detail = managedProject ? { statement: managedProject.statement, description: managedProject.description, services: [managedProject.projectType, managedProject.designType === "architectural" ? "Architectural Design" : "Interior Design", "Material Selection"], palette: ["Warm ivory", "Natural material", "Fired clay"], image: managedProject.imageUrl } : details[project.slug];

  return (
    <div className="detail-page page-transition">
      <div className="detail-back section-pad"><Link href="/projects"><ChevronLeft size={16} /> العودة إلى الأعمال</Link><span>GLL / {project.number}</span></div>
      <section className="detail-hero section-pad"><div className="detail-hero-copy"><p className="eyebrow">{project.type} / {project.location} / {project.year}</p><h1>{project.title}<br /><em>{detail.statement}</em></h1><p className="detail-intro">{detail.description}</p><a className="text-link" href="#story">اقرئي قصة المشروع <ArrowDownLeft size={17} strokeWidth={1.4} /></a><ShareActions title={project.title} /></div><figure className="detail-hero-image"><img src={detail.image} alt={project.title} /><figcaption><span>{project.number} / {project.type}</span><span>Glloria Studio Archive</span></figcaption></figure></section>
      <section className="detail-story section-pad" id="story"><div className="section-marker"><span>01</span><span>THE STORY</span></div><div className="story-columns"><div><p className="eyebrow">الفكرة</p><h2>حين تصبح الخامة<br /><em>جزءاً من الإحساس.</em></h2></div><div className="story-body"><p>{detail.description}</p><p>كل قرار هنا له وظيفة مزدوجة: أن يخدم اليوم العادي، وأن يظل جميلاً حين يتغير الضوء. لذلك جاءت التفاصيل قليلة، لكن حضورها واضح.</p></div></div></section>
      <section className="detail-info section-pad"><div className="info-block"><span className="footer-label">الخدمات</span>{detail.services.map((service) => <span className="info-line" key={service}>{service}</span>)}</div><div className="info-block"><span className="footer-label">المفردات</span>{detail.palette.map((color) => <span className="info-line" key={color}>{color}</span>)}</div><div className="info-block info-mark"><div className="monogram-small"><span /></div><span>GLLORIA<br />INTERIORS / STUDIO</span></div></section>
      <section className="detail-next section-pad"><p className="eyebrow">المشروع التالي</p><Link href="/projects" className="next-link">شاهدِي بقية الأرشيف <ArrowUpLeft size={19} /></Link></section>
      <section className="detail-cta section-pad"><Check size={18} /><p>لديكِ مساحة تريدين أن تحكي عنها؟</p><Link href="/booking" className="dark-button">احجزي استشارتك <ArrowUpLeft size={17} /></Link></section>
    </div>
  );
}
