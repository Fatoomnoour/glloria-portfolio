export function parseBookingIdFromSearch(search: string): number | null {
  const value = Number(new URLSearchParams(search).get("booking"));
  return Number.isInteger(value) && value > 0 ? value : null;
}

