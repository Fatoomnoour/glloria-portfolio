/* Glloria Design Direction: Warm Editorial Atelier — the portfolio is a curated archive, not a generic card grid. */
import { useState } from "react";
import { ArrowUpLeft, SlidersHorizontal } from "lucide-react";
import { Link } from "wouter";

export const projects = [
  { slug: "private-residence", number: "01", category: "سكني", type: "RESIDENTIAL", title: "بيت بين الضوء والظل", location: "قنا، مصر", year: "2024", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85", intro: "بيت هادئ لعائلة تحب اجتماع التفاصيل حول مائدة واحدة." },
  { slug: "cafe-namaa", number: "02", category: "تجاري", type: "HOSPITALITY", title: "مقهى نماء", location: "قنا، مصر", year: "2023", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85", intro: "مساحة صغيرة تحمل إحساساً كبيراً بالترحيب." },
  { slug: "quiet-bedroom", number: "03", category: "سكني", type: "RESIDENTIAL", title: "غرفة هادئة", location: "قنا، مصر", year: "2024", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85", intro: "زاوية يومية صُممت لتبطئ إيقاع اليوم." },
];

const filters = ["كل الأعمال", "سكني", "تجاري"];

export default function Projects() {
  const [active, setActive] = useState("كل الأعمال");
  const visible = projects.filter((project) => active === "كل الأعمال" || project.category === active);

  return (
    <div className="archive-page section-pad page-transition">
      <div className="page-intro-row">
        <div className="section-marker"><span>03</span><span>THE ARCHIVE</span></div>
        <div className="page-intro-copy"><p className="eyebrow">أعمال مختارة / 2023—2024</p><h1>كل مشروع<br /><em>له نبرة خاصة.</em></h1><p>نختار لكل مكان لغته، ثم نترك للتفاصيل مهمة أن تتكلم.</p></div>
      </div>
      <div className="archive-toolbar"><div className="filter-label"><SlidersHorizontal size={15} /> تصفية حسب النوع</div><div className="filter-group" role="tablist" aria-label="تصفية الأعمال">{filters.map((filter) => <button key={filter} className={active === filter ? "active" : ""} onClick={() => setActive(filter)} role="tab" aria-selected={active === filter}>{filter}</button>)}</div><span className="archive-count">{String(visible.length).padStart(2, "0")} مشاريع</span></div>
      <div className="archive-grid">
        {visible.map((project, index) => (
          <Link href={`/projects/${project.slug}`} className={`archive-card ${index === 0 ? "archive-card-featured" : ""}`} key={project.slug}>
            <div className="archive-image"><img src={project.image} alt={project.title} /><span className="project-arrow"><ArrowUpLeft size={18} strokeWidth={1.4} /></span></div>
            <div className="project-meta"><span>{project.number} / {project.type}</span><span>{project.location} · {project.year}</span></div>
            <div className="archive-card-bottom"><h2>{project.title}</h2><p>{project.intro}</p></div>
          </Link>
        ))}
      </div>
      <div className="archive-footnote"><span>GLL / PROJECTS</span><span>كل الصور والمشاريع المعروضة هنا جزء من أرشيف Glloria.</span></div>
    </div>
  );
}
