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
};

export type PublicProjectRenderState = "loading" | "not-found" | "ready";

export function getPublicProjectRenderState(isLoading: boolean, project: PublicManagedProject | null | undefined): PublicProjectRenderState {
  if (isLoading) return "loading";
  return project ? "ready" : "not-found";
}
