/* Glloria Design Direction: Warm Editorial Atelier — the portfolio is a curated archive, not a generic card grid. */
import { useMemo, useState } from "react";
import { ArrowUpLeft, SlidersHorizontal } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "../lib/trpc";

export type ProjectCard = { slug: string; number: string; category: string; type: string; designType: "interior" | "architectural"; title: string; location: string; year: string; image: string; intro: string; };

export const projects: ProjectCard[] = [
  { slug: "private-residence", number: "01", category: "سكني", type: "RESIDENTIAL", designType: "interior", title: "بيت بين الضوء والظل", location: "قنا، مصر", year: "2024", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85", intro: "بيت هادئ لعائلة تحب اجتماع التفاصيل حول مائدة واحدة." },
  { slug: "cafe-namaa", number: "02", category: "تجاري", type: "HOSPITALITY", designType: "interior", title: "مقهى نماء", location: "قنا، مصر", year: "2023", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85", intro: "مساحة صغيرة تحمل إحساساً كبيراً بالترحيب." },
  { slug: "quiet-bedroom", number: "03", category: "سكني", type: "RESIDENTIAL", designType: "interior", title: "غرفة هادئة", location: "قنا، مصر", year: "2024", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85", intro: "زاوية يومية صُممت لتبطئ إيقاع اليوم." },
];

const filters = [
  { value: "all", label: "كل الأعمال" },
  { value: "interior", label: "تصميم داخلي" },
  { value: "architectural", label: "تصميم معماري" },
] as const;

type FilterValue = (typeof filters)[number]["value"];

export default function Projects() {
  const [active, setActive] = useState<FilterValue>("all");
  const { data: managedProjects } = trpc.projects.list.useQuery(active === "all" ? undefined : { designType: active });
  const fallbackProjects = useMemo(() => projects.filter((project) => active === "all" || project.designType === active), [active]);
  const visible: ProjectCard[] = managedProjects?.length ? managedProjects.map((project, index) => ({ slug: project.slug, number: String(index + 1).padStart(2, "0"), category: project.projectType, type: project.designType === "architectural" ? "ARCHITECTURAL" : "INTERIOR", designType: project.designType, title: project.title, location: project.location, year: String(project.year), image: project.imageUrl, intro: project.intro })) : fallbackProjects;

  return (
    <div className="archive-page section-pad page-transition">
      <div className="page-intro-row"><div className="section-marker"><span>03</span><span>THE ARCHIVE</span></div><div className="page-intro-copy"><p className="eyebrow">أعمال مختارة / أرشيف Glloria</p><h1>كل مشروع<br /><em>له نبرة خاصة.</em></h1><p>نختار لكل مكان لغته، ثم نترك للتفاصيل مهمة أن تتكلم.</p></div></div>
      <div className="archive-toolbar"><div className="filter-label"><SlidersHorizontal size={15} /> تصفية حسب نوع التصميم</div><div className="filter-group" role="tablist" aria-label="تصفية الأعمال">{filters.map((filter) => <button key={filter.value} className={active === filter.value ? "active" : ""} onClick={() => setActive(filter.value)} role="tab" aria-selected={active === filter.value}>{filter.label}</button>)}</div><span className="archive-count">{String(visible.length).padStart(2, "0")} مشاريع</span></div>
      {visible.length ? <div className="archive-grid">{visible.map((project, index) => <Link href={`/projects/${project.slug}`} className={`archive-card ${index === 0 ? "archive-card-featured" : ""}`} key={project.slug}><div className="archive-image"><img src={project.image} alt={project.title} /><span className="project-arrow"><ArrowUpLeft size={18} strokeWidth={1.4} /></span></div><div className="project-meta"><span>{project.number} / {project.type}</span><span>{project.location} · {project.year}</span></div><div className="archive-card-bottom"><h2>{project.title}</h2><p>{project.intro}</p></div></Link>)}</div> : <div className="archive-empty"><span className="eyebrow">{active === "architectural" ? "ARCHITECTURAL / ARCHIVE" : "GLLORIA / ARCHIVE"}</span><h2>هذا القسم<br /><em>سيكبر قريباً.</em></h2><p>لا توجد أعمال منشورة تحت هذا التصنيف بعد. ستظهر هنا بمجرد إضافتها من لوحة الإدارة.</p><Link className="text-link" href="/booking">ابدئي مشروعاً جديداً <ArrowUpLeft size={16} /></Link></div>}
      <div className="archive-footnote"><span>GLL / PROJECTS</span><span>كل الصور والمشاريع المعروضة هنا جزء من أرشيف Glloria.</span></div>
    </div>
  );
}
