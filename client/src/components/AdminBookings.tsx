import { useMemo, useState } from "react";
import { CalendarCheck, Download, ExternalLink, Mail, MessageCircle, Save, Search } from "lucide-react";
import { trpc } from "../lib/trpc";
import { parseBookingIdFromSearch } from "@shared/booking";

type Status = "new" | "reviewing" | "contacted" | "confirmed" | "completed" | "cancelled";

const statusLabels: Record<Status, string> = {
  new: "جديد",
  reviewing: "قيد المراجعة",
  contacted: "تم التواصل",
  confirmed: "مؤكد",
  completed: "مكتمل",
  cancelled: "ملغي",
};

const emptyFilters = { search: "", city: "", service: "", status: undefined as Status | undefined, date: "" };

function initialSelectedBookingId() {
  if (typeof window === "undefined") return null;
  return parseBookingIdFromSearch(window.location.search);
}

function downloadCsv(rows: Array<Record<string, unknown>>) {
  const headers = ["ID", "Created at", "Full name", "Phone", "Email", "City", "Property", "Area", "Service", "Budget", "Preferred date", "Preferred time", "Status", "Admin notes"];
  const values = rows.map((row) => [row.id, row.createdAt, row.fullName, row.phone, row.email, row.city, row.propertyType, row.area, row.service, row.budget, row.preferredDate, row.preferredTime, row.status, row.adminNotes]);
  const escape = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const csv = [headers, ...values].map((line) => line.map(escape).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `glloria-consultations-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminBookings() {
  const [filters, setFilters] = useState(emptyFilters);
  const [selectedId, setSelectedId] = useState<number | null>(initialSelectedBookingId);
  const [statusDraft, setStatusDraft] = useState<Status>("new");
  const [notesDraft, setNotesDraft] = useState("");
  const queryInput = useMemo(() => ({ search: filters.search || undefined, city: filters.city || undefined, service: filters.service || undefined, status: filters.status, date: filters.date || undefined }), [filters]);
  const bookingsQuery = trpc.consultations.list.useQuery(queryInput);
  const statsQuery = trpc.consultations.stats.useQuery();
  const exportQuery = trpc.consultations.export.useQuery(queryInput, { enabled: false });
  const detailQuery = trpc.consultations.get.useQuery({ id: selectedId ?? 0 }, { enabled: selectedId !== null });
  const updateMutation = trpc.consultations.update.useMutation({ onSuccess: () => { bookingsQuery.refetch(); statsQuery.refetch(); detailQuery.refetch(); } });
  const rows = bookingsQuery.data ?? [];

  const openDetail = (id: number) => {
    const booking = rows.find((item) => item.id === id);
    setSelectedId(id);
    setStatusDraft((booking?.status ?? "new") as Status);
    setNotesDraft(booking?.adminNotes ?? "");
  };
  const saveDetail = () => { if (selectedId !== null) updateMutation.mutate({ id: selectedId, status: statusDraft, adminNotes: notesDraft }); };
  const exportRows = async () => { const result = await exportQuery.refetch(); if (result.data) downloadCsv(result.data as unknown as Array<Record<string, unknown>>); };

  return <div className="admin-bookings">
    <div className="admin-bookings-head"><div><span className="admin-kicker">INQUIRIES / LIVE PIPELINE</span><h2>طلبات الاستشارات</h2><p>كل طلب جديد محفوظ داخلياً ولا يعتبر الموعد مؤكداً إلا بعد تحديث حالته.</p></div><button className="admin-secondary" onClick={exportRows} disabled={exportQuery.isFetching}><Download size={15} /> {exportQuery.isFetching ? "جاري التصدير" : "تصدير CSV"}</button></div>
    <div className="booking-stats-grid">{(["total", "new", "reviewing", "confirmed", "completed", "cancelled"] as const).map((key) => <div className="booking-stat" key={key}><span>{key === "total" ? "كل الطلبات" : statusLabels[key]}</span><strong>{statsQuery.data?.[key] ?? 0}</strong></div>)}</div>
    <div className="booking-filters"><label><Search size={15} /><span className="sr-only">بحث بالاسم</span><input value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value })} placeholder="ابحثي بالاسم" /></label><label><span className="sr-only">المدينة</span><input value={filters.city} onChange={(event) => setFilters({ ...filters, city: event.target.value })} placeholder="المدينة" /></label><label><span className="sr-only">الخدمة</span><input value={filters.service} onChange={(event) => setFilters({ ...filters, service: event.target.value })} placeholder="الخدمة" /></label><label><span className="sr-only">الحالة</span><select value={filters.status ?? ""} onChange={(event) => setFilters({ ...filters, status: (event.target.value || undefined) as Status | undefined })}><option value="">كل الحالات</option>{Object.entries(statusLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label><label><span className="sr-only">التاريخ</span><input type="date" value={filters.date} onChange={(event) => setFilters({ ...filters, date: event.target.value })} /></label></div>
    <div className="bookings-table-wrap"><table className="bookings-table"><thead><tr><th>#</th><th>العميل</th><th>التواصل</th><th>الخدمة / المدينة</th><th>الموعد المقترح</th><th>الحالة</th><th><span className="sr-only">إجراء</span></th></tr></thead><tbody>{bookingsQuery.isLoading ? <tr><td colSpan={7} className="table-empty">جاري تحميل الطلبات...</td></tr> : rows.length ? rows.map((booking) => <tr key={booking.id}><td className="mono-cell">#{String(booking.id).padStart(4, "0")}</td><td><strong>{booking.fullName}</strong><small>{booking.propertyType} · {booking.area}</small></td><td><a href={`https://wa.me/${booking.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"><MessageCircle size={13} /> WhatsApp</a>{booking.email && <a href={`mailto:${booking.email}`}><Mail size={13} /> Email</a>}</td><td><strong>{booking.service}</strong><small>{booking.city}</small></td><td><strong>{booking.preferredDate}</strong><small>{booking.preferredTime}</small></td><td><span className={`status-pill status-${booking.status}`}>{statusLabels[booking.status as Status]}</span></td><td><button className="table-action" onClick={() => openDetail(booking.id)}>فتح التفاصيل <ExternalLink size={13} /></button></td></tr>) : <tr><td colSpan={7} className="table-empty"><CalendarCheck size={20} /><span>لا توجد طلبات محفوظة بعد.</span></td></tr>}</tbody></table></div>
    {selectedId !== null && <div className="booking-detail-card"><div className="booking-detail-head"><div><span className="admin-kicker">REQUEST / #{String(selectedId).padStart(4, "0")}</span><h3>{detailQuery.data?.fullName ?? "تفاصيل الطلب"}</h3>{detailQuery.data && <p className="booking-last-edited">آخر تعديل: {detailQuery.data.updatedAt.toLocaleString("ar-EG", { dateStyle: "medium", timeStyle: "short" })} · {detailQuery.data.lastEditorName || "مدير الإدارة"}</p>}</div><button className="admin-secondary" onClick={() => setSelectedId(null)}>إغلاق</button></div>{detailQuery.data && <div className="booking-detail-grid"><div><span>الهاتف</span><strong>{detailQuery.data.phone}</strong></div><div><span>البريد</span><strong>{detailQuery.data.email || "—"}</strong></div><div><span>العقار</span><strong>{detailQuery.data.propertyType}</strong></div><div><span>المساحة</span><strong>{detailQuery.data.area}</strong></div><div><span>الميزانية</span><strong>{detailQuery.data.budget}</strong></div><div><span>الموعد</span><strong>{detailQuery.data.preferredDate} · {detailQuery.data.preferredTime}</strong></div><div className="booking-detail-wide"><span>وصف المشروع</span><p>{detailQuery.data.description}</p></div><label>حالة الطلب<select value={statusDraft} onChange={(event) => setStatusDraft(event.target.value as Status)}>{Object.entries(statusLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label><label className="booking-detail-wide">ملاحظات داخلية<textarea rows={4} value={notesDraft} onChange={(event) => setNotesDraft(event.target.value)} placeholder="أضيفي ملاحظات المتابعة هنا" /></label></div>}<div className="booking-detail-actions"><a className="admin-secondary" href={`https://wa.me/${detailQuery.data?.phone.replace(/\D/g, "") || ""}`} target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp</a>{detailQuery.data?.email && <a className="admin-secondary" href={`mailto:${detailQuery.data.email}`}><Mail size={15} /> Email</a>}<button className="admin-primary" onClick={saveDetail} disabled={updateMutation.isPending}><Save size={15} /> {updateMutation.isPending ? "جاري الحفظ" : "حفظ الحالة والملاحظات"}</button></div></div>}
  </div>;
}
