export function parseBookingIdFromSearch(search: string): number | null {
  const value = Number(new URLSearchParams(search).get("booking"));
  return Number.isInteger(value) && value > 0 ? value : null;
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
