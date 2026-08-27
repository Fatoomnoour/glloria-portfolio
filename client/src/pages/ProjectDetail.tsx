/* Glloria Design Direction: Warm Editorial Atelier — managed project pages stay image-led and truthful. */
import { useState } from "react";
import { ArrowUpLeft, Check, ChevronLeft } from "lucide-react";
import { Link, useRoute } from "wouter";
import { trpc } from "../lib/trpc";
import ShareActions from "../components/ShareActions";
import { useLocale } from "../contexts/LocaleContext";
import { parseProjectGallery } from "@shared/gallery";
import NotFound from "./NotFound";
import { getPublicProjectRenderState, hasApprovedCaseStudy, hasBeforeAfterPair, type PublicManagedProject } from "@shared/project";

type CaseStudyProject = PublicManagedProject & {
  challenge?: string | null;
  concept?: string | null;
  materials?: string | null;
  palette?: string | null;
  serviceScope?: string | null;
  beforeImageUrl?: string | null;
  beforeImageAlt?: string | null;
  afterImageUrl?: string | null;
  afterImageAlt?: string | null;
  caseStudyApproved?: boolean | null;
};

function ProjectGallery({ gallery, projectType, imageKind, ar, markerNumber }: { gallery: Array<{ url: string; alt: string; order: number }>; projectType: string; imageKind: string; ar: boolean; markerNumber: string }) {
  return (
    <section className="detail-gallery section-pad" aria-labelledby="image-archive-title">
      <div className="section-marker" id="image-archive-title"><span>{markerNumber}</span><span>IMAGE ARCHIVE</span></div>
      <div className="gallery-grid">
        {gallery.map((image, index) => (
          <figure key={`${image.url}-${image.order}`}>
            <a className="gallery-image-link" href={image.url} target="_blank" rel="noreferrer" aria-label={`${ar ? "فتح الصورة بالحجم الكامل" : "Open full-size image"}: ${image.alt}`}>
              <img src={image.url} alt={image.alt} loading={index ? "lazy" : "eager"} />
            </a>
            <figcaption><span>0{index + 1} / {projectType}</span><span>{imageKind}</span></figcaption>
          </figure>
        ))}
      </div>
      {!gallery.length && <p className="sr-only">{ar ? "لا توجد صور متاحة لهذا المشروع." : "No images are available for this project."}</p>}
    </section>
  );
}

function MaterialExplorer({ materials, ar }: { materials: string; ar: boolean }) {
  const items = materials.split(/[,،\n]+/).map((item) => item.trim()).filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);
  if (!items.length) return null;
  return <div className="material-explorer" aria-labelledby="materials-title"><div className="before-after-heading"><p className="eyebrow" id="materials-title">{ar ? "الخامات المذكورة" : "MATERIAL NOTES"}</p><span>{ar ? "اختاري عنصراً" : "Select an element"}</span></div><div className="material-list" role="tablist" aria-label={ar ? "الخامات المذكورة في المشروع" : "Materials named in this project"}>{items.map((item, index) => <button type="button" role="tab" aria-selected={activeIndex === index} className={activeIndex === index ? "active" : ""} onClick={() => setActiveIndex(index)} key={`${item}-${index}`}>{item}</button>)}</div><p className="material-selected" aria-live="polite">{items[activeIndex]}</p></div>;
}

function CaseStudySections({ project, ar }: { project: CaseStudyProject; ar: boolean }) {
  if (!hasApprovedCaseStudy(project)) return null;

  const blocks = [
    { label: ar ? "التحدي التصميمي" : "THE DESIGN CHALLENGE", value: project.challenge },
    { label: ar ? "فكرة التصميم" : "THE DESIGN IDEA", value: project.concept },
    { label: ar ? "الألوان والخامات" : "PALETTE & MATERIALS", value: project.materials || project.palette },
    { label: ar ? "نطاق العمل" : "SCOPE OF WORK", value: project.serviceScope },
  ].filter((block): block is { label: string; value: string } => Boolean(block.value?.trim()));

  return (
    <section className="case-study-sections section-pad" aria-labelledby="case-study-title">
      <div className="case-study-intro">
        <div className="section-marker" id="case-study-title"><span>02</span><span>{ar ? "دراسة المشروع" : "CASE STUDY"}</span></div>
        <p className="eyebrow">{ar ? "قراءة التصميم" : "A CLOSER READING"}</p>
        <h2>{ar ? <>تفاصيل<br /><em>المساحة.</em></> : <>Inside<br /><em>the space.</em></>}</h2>
      </div>
      <div className="case-study-content">
        {blocks.map((block) => (
          <article className="case-study-block" key={block.label}>
            <p className="eyebrow">{block.label}</p>
            <p>{block.value}</p>
          </article>
        ))}
        {project.materials?.trim() && <MaterialExplorer materials={project.materials} ar={ar} />}
        {hasBeforeAfterPair(project) && (
          <div className="before-after-wrap" aria-labelledby="before-after-title">
            <div className="before-after-heading">
              <p className="eyebrow" id="before-after-title">{ar ? "قبل / بعد" : "BEFORE / AFTER"}</p>
              <span>{ar ? "صور موثقة للمقارنة" : "Documented comparison"}</span>
            </div>
            <div className="before-after-grid">
              <figure><img src={project.beforeImageUrl!} alt={project.beforeImageAlt!} loading="lazy" /><figcaption>{ar ? "قبل" : "Before"}</figcaption></figure>
              <figure><img src={project.afterImageUrl!} alt={project.afterImageAlt!} loading="lazy" /><figcaption>{ar ? "بعد" : "After"}</figcaption></figure>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:slug");
  const slug = params?.slug ?? "";
  const { locale } = useLocale();
  const ar = locale === "ar";
  const { data: managedProject, isLoading } = trpc.projects.bySlug.useQuery({ slug }, { enabled: Boolean(slug) });

  const renderState = getPublicProjectRenderState(isLoading, managedProject as PublicManagedProject | null | undefined);
  if (renderState === "loading") return <div className="route-loader" role="status" aria-live="polite"><span className="route-loader-mark" aria-hidden="true" /><span>Glloria / loading</span></div>;
  if (renderState === "not-found") return <NotFound />;

  const project = managedProject as CaseStudyProject;
  const coverAlt = project.imageAlt || `${project.title} — ${ar ? "صورة المشروع" : "project image"}`;
  const gallery = parseProjectGallery(project.galleryJson, project.imageUrl, coverAlt);
  const imageKind = project.imageKind || (ar ? "صورة المشروع" : "Project image");
  const projectType = project.projectType || "INTERIOR";
  const projectNumber = project.slug === "boska" ? "02" : "01";
  const projectMeta = [projectType, project.location, project.year ? String(project.year) : ""].filter(Boolean).join(" / ");
  const showCaseStudy = hasApprovedCaseStudy(project);

  return (
    <div className="detail-page page-transition">
      <div className="detail-back section-pad"><Link href="/projects"><ChevronLeft size={16} /> {ar ? "العودة إلى الأعمال" : "Back to work"}</Link><span>GLL / {projectNumber}</span></div>
      <section className="detail-hero section-pad">
        <div className="detail-hero-copy"><p className="eyebrow">{projectMeta}</p><h1>{project.title}</h1><ShareActions title={project.title} /></div>
        <figure className="detail-hero-image"><img src={project.imageUrl} alt={coverAlt} fetchPriority="high" /><figcaption><span>{projectNumber} / {projectType}</span><span>{imageKind}</span></figcaption></figure>
      </section>
      <CaseStudySections project={project} ar={ar} />
      <ProjectGallery gallery={gallery} projectType={projectType} imageKind={imageKind} ar={ar} markerNumber={showCaseStudy ? "03" : "02"} />
      <section className="detail-next section-pad"><p className="eyebrow">{ar ? "الأرشيف" : "THE ARCHIVE"}</p><Link href="/projects" className="next-link">{ar ? "شاهدي بقية الأرشيف" : "View the full archive"} <ArrowUpLeft size={19} /></Link></section>
      <section className="detail-cta section-pad"><Check size={18} /><p>{ar ? "أعجبك إحساس هذه المساحة؟" : "Does this space feel like you?"}</p><Link href={`/booking?project=${encodeURIComponent(project.slug)}`} className="dark-button">{ar ? "أريد مساحة بهذا الإحساس" : "I want a space with this feeling"} <ArrowUpLeft size={17} /></Link></section>
    </div>
  );
}
