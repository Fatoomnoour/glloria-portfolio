export function parseBookingIdFromSearch(search: string): number | null {
  const value = Number(new URLSearchParams(search).get("booking"));
  return Number.isInteger(value) && value > 0 ? value : null;
}

export type BookingAttribution = {
  sourceProjectSlug: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
};

const readSearchValue = (params: URLSearchParams, key: string, maximum: number) => {
  const value = params.get(key)?.trim();
  return value && value.length <= maximum ? value : null;
};

/**
 * Parses only the campaign fields we explicitly retain. We do not collect a
 * referrer, IP, ad click id, or any browser fingerprint in the booking flow.
 */
export function parseBookingAttribution(search: string): BookingAttribution {
  const params = new URLSearchParams(search);
  const candidateProject = readSearchValue(params, "project", 160);
  return {
    sourceProjectSlug: candidateProject && /^[a-z0-9-]+$/i.test(candidateProject) ? candidateProject.toLowerCase() : null,
    utmSource: readSearchValue(params, "utm_source", 100),
    utmMedium: readSearchValue(params, "utm_medium", 100),
    utmCampaign: readSearchValue(params, "utm_campaign", 160),
  };
}

export type BookingValidationDraft = {
  fullName?: string;
  phone?: string;
  city?: string;
  propertyType?: string;
  area?: string;
  service?: string;
  budget?: string;
  preferredDate?: string;
  preferredTime?: string;
  description?: string;
  privacyConsent?: boolean;
};

export type BookingStep = 1 | 2 | 3 | 4 | 5;

const hasValue = (value: string | undefined) => Boolean(value?.trim());

export function isBookingStepComplete(step: BookingStep, draft: BookingValidationDraft) {
  if (step === 1) return hasValue(draft.fullName) && hasValue(draft.phone);
  if (step === 2) return hasValue(draft.city) && hasValue(draft.propertyType) && hasValue(draft.area);
  if (step === 3) return hasValue(draft.service) && hasValue(draft.budget);
  if (step === 4) return hasValue(draft.preferredDate) && hasValue(draft.preferredTime) && Boolean(draft.description?.trim() && draft.description.trim().length >= 10);
  return draft.privacyConsent === true;
}
