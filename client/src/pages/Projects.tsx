/* Glloria Design Direction: Warm Editorial Atelier — the portfolio is a curated archive, not a generic card grid. */
import { useEffect, useMemo, useState } from "react";
import { ArrowUpLeft, Loader2, SlidersHorizontal } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "../lib/trpc";
import { useLocale } from "../contexts/LocaleContext";

export type ProjectCard = { slug: string; number: string; category: string; type: string; designType: "interior" | "architectural"; title: string; location: string; year: string; image: string; imageAlt?: string; galleryJson?: string | null; imageKind?: string; intro: string; };

export const projects: ProjectCard[] = [
  { slug: "private-residence", number: "01", category: "سكني", type: "RESIDENTIAL", designType: "interior", title: "بيت بين الضوء والظل", location: "قنا، مصر", year: "2024", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=75", intro: "بيت هادئ لعائلة تحب اجتماع التفاصيل حول مائدة واحدة." },
  { slug: "cafe-namaa", number: "02", category: "تجاري", type: "HOSPITALITY", designType: "interior", title: "مقهى نماء", location: "قنا، مصر", year: "2023", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=75", intro: "مساحة صغيرة تحمل إحساساً كبيراً بالترحيب." },
  { slug: "quiet-bedroom", number: "03", category: "سكني", type: "RESIDENTIAL", designType: "interior", title: "غرفة هادئة", location: "قنا، مصر", year: "2024", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=75", intro: "زاوية يومية صُممت لتبطئ إيقاع اليوم." },
];

const filters = [{ value: "all", label: "projects.all" }, { value: "interior", label: "projects.interior" }, { value: "architectural", label: "projects.architectural" }] as const;
type FilterValue = (typeof filters)[number]["value"];
const englishTitles: Record<string, [string, string]> = { "private-residence": ["A house between light and shadow", "A quiet home for a family who gathers around the details."], "cafe-namaa": ["Namaa café", "A small space carrying a generous sense of welcome."], "quiet-bedroom": ["A quiet room", "An everyday corner designed to slow the rhythm of the day."] };

export function getVisibleProjects(items: ProjectCard[], filter: FilterValue) {
  return items.filter((project) => filter === "all" || project.designType === filter);
}

export default function Projects() {
  const { t, locale } = useLocale();
  const [active, setActive] = useState<FilterValue>("all");
  const [isFiltering, setIsFiltering] = useState(false);
  const { data: managedProjects } = trpc.projects.list.useQuery(active === "all" ? undefined : { designType: active });
  useEffect(() => { setIsFiltering(true); const timer = window.setTimeout(() => setIsFiltering(false), 280); return () => window.clearTimeout(timer); }, [active]);
  const fallbackProjects = useMemo(() => getVisibleProjects(projects, active), [active]);
  const visible: ProjectCard[] = managedProjects?.length ? managedProjects.map((project, index) => ({ slug: project.slug, number: String(index + 1).padStart(2, "0"), category: project.projectType, type: project.designType === "architectural" ? "ARCHITECTURAL" : "INTERIOR", designType: project.designType, title: project.title, location: project.location, year: project.year ? String(project.year) : "—", image: project.imageUrl, imageAlt: project.imageAlt ?? undefined, intro: project.intro })) : fallbackProjects;
  const getTitle = (project: ProjectCard) => locale === "en" ? englishTitles[project.slug]?.[0] ?? project.title : project.title;
  const getIntro = (project: ProjectCard) => locale === "en" ? englishTitles[project.slug]?.[1] ?? project.intro : project.intro;
  const countLabel = locale === "ar" ? t("projects.count") : t("projects.count");

  const filtering = isFiltering;
  return <div className="archive-page section-pad page-transition"><div className="page-intro-row"><div className="section-marker"><span>03</span><span>THE ARCHIVE</span></div><div className="page-intro-copy"><p className="eyebrow">{locale === "ar" ? "أعمال مختارة / أرشيف Glloria" : "Selected work / Glloria archive"}</p><h1>{locale === "ar" ? <>كل مشروع<br /><em>له نبرة خاصة.</em></> : <>Every project<br /><em>has its own tone.</em></>}</h1><p>{locale === "ar" ? "نختار لكل مكان لغته، ثم نترك للتفاصيل مهمة أن تتكلم." : "We give every place its own language, then let the details speak."}</p></div></div><div className="archive-toolbar"><div className="filter-label"><SlidersHorizontal size={15} /> {t("projects.filterLabel")}</div><div className="filter-group" role="tablist" aria-label={t("projects.filterLabel")}>{filters.map((filter) => <button key={filter.value} className={active === filter.value ? "active" : ""} onClick={() => setActive(filter.value)} role="tab" aria-selected={active === filter.value} aria-controls="project-archive">{t(filter.label)}</button>)}</div><span className="archive-count">{String(visible.length).padStart(2, "0")} {countLabel}</span></div><div id="project-archive" className={`archive-results ${filtering ? "is-filtering" : ""}`} aria-busy={filtering}>{filtering && <div className="archive-loading archive-loading-overlay" role="status"><Loader2 size={18} /> <span>{locale === "ar" ? "نعيد ترتيب الأرشيف..." : "Reframing the archive..."}</span></div>}{visible.length ? <div className="archive-grid">{visible.map((project, index) => <Link href={`/projects/${project.slug}`} className={`archive-card ${index === 0 ? "archive-card-featured" : ""}`} key={project.slug}><div className="archive-image"><img src={project.image} alt={project.imageAlt || `${getTitle(project)} — ${project.designType === "architectural" ? (locale === "ar" ? "تصميم معماري" : "architecture") : (locale === "ar" ? "تصميم داخلي" : "interior design")}`} loading={index > 0 ? "lazy" : "eager"} /><span className="project-arrow"><ArrowUpLeft size={18} strokeWidth={1.4} /></span></div><div className="project-meta"><span>{project.number} / {project.type}</span>{(project.location || project.year !== "—") && <span>{locale === "ar" ? project.location : (project.location || "")} {project.year && `· ${project.year}`}</span>}</div><div className="archive-card-bottom"><h2>{getTitle(project)}</h2>{getIntro(project) && <p>{getIntro(project)}</p>}</div></Link>)}</div> : <div className="archive-empty"><span className="eyebrow">{active === "architectural" ? "ARCHITECTURAL / ARCHIVE" : "GLLORIA / ARCHIVE"}</span><h2>{t("projects.emptyTitle")}<br /><em>{t("projects.emptyAccent")}</em></h2><p>{t("projects.emptyBody")}</p><Link className="text-link" href="/booking">{t("projects.emptyCta")} <ArrowUpLeft size={16} /></Link></div>}</div><div className="archive-footnote"><span>GLL / PROJECTS</span><span>{locale === "ar" ? "كل الصور والمشاريع المعروضة هنا جزء من أرشيف Glloria." : "Every image and project shown here belongs to the Glloria archive."}</span></div></div>;
}
