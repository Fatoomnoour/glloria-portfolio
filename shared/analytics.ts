export const ANALYTICS_RANGES = [6, 12, 24] as const;
export type AnalyticsRange = (typeof ANALYTICS_RANGES)[number];

export type BookingStatus =
  | "new"
  | "reviewing"
  | "contacted"
  | "confirmed"
  | "completed"
  | "cancelled";

export type DesignType = "interior" | "architectural";

export type AnalyticsTimelinePoint = {
  month: string;
  bookings: number;
  newBookings: number;
  reviewing: number;
  contacted: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  projects: number;
  interiorProjects: number;
  architecturalProjects: number;
};

export type BookingAggregateRow = {
  month: string;
  status: BookingStatus;
  count: number;
};

export type ProjectAggregateRow = {
  month: string;
  designType: DesignType;
  count: number;
};

function toMonthKey(date: Date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function getAnalyticsMonthKeys(months: AnalyticsRange, now = new Date()): string[] {
  const anchor = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  return Array.from({ length: months }, (_, index) => {
    const date = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth() - (months - index - 1), 1));
    return toMonthKey(date);
  });
}

export function buildAnalyticsTimeline(
  months: AnalyticsRange,
  bookingRows: BookingAggregateRow[],
  projectRows: ProjectAggregateRow[],
  now = new Date(),
): AnalyticsTimelinePoint[] {
  const monthKeys = getAnalyticsMonthKeys(months, now);
  const timeline = new Map<string, AnalyticsTimelinePoint>(
    monthKeys.map((month) => [month, {
      month,
      bookings: 0,
      newBookings: 0,
      reviewing: 0,
      contacted: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
      projects: 0,
      interiorProjects: 0,
      architecturalProjects: 0,
    }]),
  );

  for (const row of bookingRows) {
    const point = timeline.get(row.month);
    if (!point) continue;
    const count = Number(row.count) || 0;
    point.bookings += count;
    if (row.status === "new") point.newBookings += count;
    if (row.status === "reviewing") point.reviewing += count;
    if (row.status === "contacted") point.contacted += count;
    if (row.status === "confirmed") point.confirmed += count;
    if (row.status === "completed") point.completed += count;
    if (row.status === "cancelled") point.cancelled += count;
  }

  for (const row of projectRows) {
    const point = timeline.get(row.month);
    if (!point) continue;
    const count = Number(row.count) || 0;
    point.projects += count;
    if (row.designType === "interior") point.interiorProjects += count;
    if (row.designType === "architectural") point.architecturalProjects += count;
  }

  return monthKeys.map((month) => timeline.get(month)!);
}
