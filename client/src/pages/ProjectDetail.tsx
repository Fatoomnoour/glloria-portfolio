/* Glloria Design Direction: Warm Editorial Atelier — managed project pages stay image-led and truthful. */
import { ArrowUpLeft, Check, ChevronLeft } from "lucide-react";
import { Link, useRoute } from "wouter";
import { trpc } from "../lib/trpc";
import ShareActions from "../components/ShareActions";
import { useLocale } from "../contexts/LocaleContext";
import { parseProjectGallery } from "@shared/gallery";
import NotFound from "./NotFound";
import { getPublicProjectRenderState, type PublicManagedProject } from "@shared/project";

function ProjectGallery({ gallery, projectType, imageKind, ar }: { gallery: Array<{ url: string; alt: string; order: number }>; projectType: string; imageKind: string; ar: boolean }) {
  return <section className="detail-gallery section-pad"><div className="section-marker"><span>02</span><span>IMAGE ARCHIVE</span></div><div className="gallery-grid">{gallery.map((image, index) => <figure key={`${image.url}-${image.order}`}><a className="gallery-image-link" href={image.url} target="_blank" rel="noreferrer" aria-label={`${ar ? "فتح الصورة بالحجم الكامل" : "Open full-size image"}: ${image.alt}`}><img src={image.url} alt={image.alt} loading={index ? "lazy" : "eager"} /></a><figcaption><span>0{index + 1} / {projectType}</span><span>{imageKind}</span></figcaption></figure>)}</div>{!gallery.length && <p className="sr-only">{ar ? "لا توجد صور متاحة لهذا المشروع." : "No images are available for this project."}</p>}</section>;
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

  const project = managedProject as PublicManagedProject;
  const coverAlt = project.imageAlt || `${project.title} — ${ar ? "صورة المشروع" : "project image"}`;
  const gallery = parseProjectGallery(project.galleryJson, project.imageUrl, coverAlt);
  const imageKind = project.imageKind || (ar ? "صورة المشروع" : "Project image");
  const projectType = project.projectType || "INTERIOR";
  const projectNumber = project.slug === "boska" ? "02" : "01";
  const projectMeta = [projectType, project.location, project.year ? String(project.year) : ""].filter(Boolean).join(" / ");

  return <div className="detail-page page-transition">
    <div className="detail-back section-pad"><Link href="/projects"><ChevronLeft size={16} /> {ar ? "العودة إلى الأعمال" : "Back to work"}</Link><span>GLL / {projectNumber}</span></div>
    <section className="detail-hero section-pad">
      <div className="detail-hero-copy"><p className="eyebrow">{projectMeta}</p><h1>{project.title}</h1><ShareActions title={project.title} /></div>
      <figure className="detail-hero-image"><img src={project.imageUrl} alt={coverAlt} fetchPriority="high" /><figcaption><span>{projectNumber} / {projectType}</span><span>{imageKind}</span></figcaption></figure>
    </section>
    <ProjectGallery gallery={gallery} projectType={projectType} imageKind={imageKind} ar={ar} />
    <section className="detail-next section-pad"><p className="eyebrow">{ar ? "الأرشيف" : "THE ARCHIVE"}</p><Link href="/projects" className="next-link">{ar ? "شاهدي بقية الأرشيف" : "View the full archive"} <ArrowUpLeft size={19} /></Link></section>
    <section className="detail-cta section-pad"><Check size={18} /><p>{ar ? "لديكِ مساحة تريدين أن تحكي عنها؟" : "Have a space you want to talk about?"}</p><Link href="/booking" className="dark-button">{ar ? "احجزي استشارتك" : "Book your consultation"} <ArrowUpLeft size={17} /></Link></section>
  </div>;
}
