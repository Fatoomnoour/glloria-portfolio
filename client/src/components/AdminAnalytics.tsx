import { useMemo, useState } from "react";
import { BarChart3, CalendarDays, FolderKanban, Loader2, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { ANALYTICS_RANGES, type AnalyticsRange } from "../../../shared/analytics";
import { useLocale } from "../contexts/LocaleContext";
import { trpc } from "../lib/trpc";

function getBookingConfig(locale: "ar" | "en") {
  return {
    bookings: { label: locale === "ar" ? "الحجوزات" : "Bookings", theme: { light: "#b65e45", dark: "#d38b70" } },
    confirmed: { label: locale === "ar" ? "المؤكدة" : "Confirmed", theme: { light: "#7b8064", dark: "#b6bd95" } },
  };
}

function getProjectConfig(locale: "ar" | "en") {
  return {
    interiorProjects: { label: locale === "ar" ? "تصميم داخلي" : "Interior design", theme: { light: "#b65e45", dark: "#d38b70" } },
    architecturalProjects: { label: locale === "ar" ? "تصميم معماري" : "Architecture", theme: { light: "#7b8064", dark: "#b6bd95" } },
  };
}

function monthLabel(month: string, locale: "ar" | "en") {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${month}-01T00:00:00Z`));
}

export default function AdminAnalytics() {
  const { locale } = useLocale();
  const [range, setRange] = useState<AnalyticsRange>(12);
  const queryInput = useMemo(() => ({ months: range }), [range]);
  const analyticsQuery = trpc.analytics.overview.useQuery(queryInput);
  const points = analyticsQuery.data?.points ?? [];
  const totals = useMemo(() => points.reduce((summary, point) => ({
    bookings: summary.bookings + point.bookings,
    projects: summary.projects + point.projects,
  }), { bookings: 0, projects: 0 }), [points]);

  const rangeLabel = (value: AnalyticsRange) => locale === "ar" ? `${value} شهراً` : `${value} months`;
  const formatValue = (value: number) => new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US").format(value);
  const bookingConfig = useMemo(() => getBookingConfig(locale), [locale]);
  const projectConfig = useMemo(() => getProjectConfig(locale), [locale]);
  const chartData = points.map((point) => ({ ...point, label: monthLabel(point.month, locale) }));

  return <section className="admin-analytics" aria-labelledby="analytics-title">
    <div className="admin-analytics-head">
      <div>
        <span className="admin-kicker">GLLORIA / PERFORMANCE</span>
        <h2 id="analytics-title">{locale === "ar" ? "نبض الاستوديو" : "Studio pulse"}</h2>
        <p>{locale === "ar" ? "قراءة هادئة لنمو الحجوزات والأعمال، مبنية على البيانات المحفوظة فعلياً." : "A quiet view of booking activity and archive growth, based on saved records."}</p>
      </div>
      <div className="analytics-range" role="group" aria-label={locale === "ar" ? "الفترة الزمنية" : "Time range"}>
        {ANALYTICS_RANGES.map((value) => <button key={value} type="button" className={range === value ? "active" : ""} onClick={() => setRange(value)} aria-pressed={range === value}>{rangeLabel(value)}</button>)}
      </div>
    </div>

    <div className="analytics-kpis">
      <div className="analytics-kpi"><span><CalendarDays size={15} /> {locale === "ar" ? "إجمالي الحجوزات" : "Bookings in range"}</span><strong>{formatValue(totals.bookings)}</strong><small><TrendingUp size={13} /> {locale === "ar" ? "حسب الفترة المختارة" : "Selected time range"}</small></div>
      <div className="analytics-kpi"><span><FolderKanban size={15} /> {locale === "ar" ? "المشاريع المضافة" : "Projects added"}</span><strong>{formatValue(totals.projects)}</strong><small><BarChart3 size={13} /> {locale === "ar" ? "يشمل المنشور والمسودة" : "Published and draft records"}</small></div>
    </div>

    {analyticsQuery.isLoading ? <div className="analytics-state"><Loader2 className="spin" size={20} /> {locale === "ar" ? "جاري تحميل التحليلات..." : "Loading analytics..."}</div> : analyticsQuery.isError ? <div className="analytics-state analytics-error">{locale === "ar" ? "تعذر تحميل التحليلات حالياً. حاولي تحديث الصفحة." : "Analytics could not be loaded. Please refresh the page."}</div> : <div className="analytics-chart-grid">
      <article className="analytics-card analytics-card-wide">
        <div className="analytics-card-head"><div><span className="admin-kicker">INQUIRIES / TREND</span><h3>{locale === "ar" ? "الحجوزات بمرور الوقت" : "Bookings over time"}</h3></div><span className="analytics-card-note">{locale === "ar" ? "كل الحالات" : "All statuses"}</span></div>
        <ChartContainer className="analytics-chart" config={bookingConfig}>
          <LineChart accessibilityLayer data={chartData} margin={{ top: 12, right: 12, left: -8, bottom: 2 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={10} minTickGap={22} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={28} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend verticalAlign="top" height={30} />
            <Line type="monotone" dataKey="bookings" stroke="var(--color-bookings)" strokeWidth={2.5} dot={{ r: 3, strokeWidth: 0, fill: "var(--color-bookings)" }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="confirmed" stroke="var(--color-confirmed)" strokeWidth={2} dot={{ r: 3, strokeWidth: 0, fill: "var(--color-confirmed)" }} activeDot={{ r: 5 }} />
          </LineChart>
        </ChartContainer>
      </article>

      <article className="analytics-card analytics-card-wide">
        <div className="analytics-card-head"><div><span className="admin-kicker">ARCHIVE / GROWTH</span><h3>{locale === "ar" ? "المشاريع بمرور الوقت" : "Projects over time"}</h3></div><span className="analytics-card-note">{locale === "ar" ? "حسب النوع" : "By discipline"}</span></div>
        <ChartContainer className="analytics-chart" config={projectConfig}>
          <BarChart accessibilityLayer data={chartData} margin={{ top: 12, right: 12, left: -8, bottom: 2 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={10} minTickGap={22} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={28} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend verticalAlign="top" height={30} />
            <Bar dataKey="interiorProjects" stackId="projects" fill="var(--color-interiorProjects)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="architecturalProjects" stackId="projects" fill="var(--color-architecturalProjects)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </article>
    </div>}
  </section>;
}
