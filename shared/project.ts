export type PublicManagedProject = {
  slug: string;
  projectType: string;
  title: string;
  location: string;
  year: number | null;
  imageUrl: string;
  imageAlt: string | null;
  galleryJson: string | null;
  imageKind: string | null;
  caseStudyApproved?: boolean | null;
  challenge?: string | null;
  concept?: string | null;
  materials?: string | null;
  palette?: string | null;
  serviceScope?: string | null;
  beforeImageUrl?: string | null;
  beforeImageAlt?: string | null;
  afterImageUrl?: string | null;
  afterImageAlt?: string | null;
};

export type PublicProjectRenderState = "loading" | "not-found" | "ready";

/** React Query query functions must resolve to a concrete value, never undefined. */
export function toNullablePublicProject<T>(project: T | undefined): T | null {
  return project ?? null;
}

export function getPublicProjectRenderState(
  isLoading: boolean,
  project: PublicManagedProject | null | undefined
): PublicProjectRenderState {
  if (isLoading) return "loading";
  return project ? "ready" : "not-found";
}

function hasText(value: string | null | undefined) {
  return Boolean(value?.trim());
}

export function hasApprovedCaseStudy(
  project: PublicManagedProject | null | undefined
) {
  if (!project?.caseStudyApproved) return false;
  return (
    [
      project.challenge,
      project.concept,
      project.materials,
      project.palette,
      project.serviceScope,
    ].some(hasText) || hasBeforeAfterPair(project)
  );
}

export function hasBeforeAfterPair(
  project: PublicManagedProject | null | undefined
) {
  return Boolean(
    project?.beforeImageUrl?.trim() &&
      project.beforeImageAlt?.trim() &&
      project.afterImageUrl?.trim() &&
      project.afterImageAlt?.trim()
  );
}
