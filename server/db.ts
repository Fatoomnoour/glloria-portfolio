import { and, count, desc, eq, gte, like, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  buildAnalyticsTimeline,
  type AnalyticsRange,
  type BookingAggregateRow,
  type ProjectAggregateRow,
} from "../shared/analytics";
import {
  InsertConsultationRequest,
  InsertProject,
  InsertTestimonial,
  InsertUser,
  consultationRequests,
  projects,
  testimonials,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  type TextField = (typeof textFields)[number];
  const assignNullable = (field: TextField) => {
    const value = user[field];
    if (value === undefined) return;
    const normalized = value ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  };
  textFields.forEach(assignNullable);
  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  values.lastSignedIn ??= new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
  await db
    .insert(users)
    .values(values)
    .onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function listProjects(
  designType?: "interior" | "architectural",
  includeUnpublished = false
) {
  const db = await getDb();
  if (!db) return [];
  const filters = [];
  if (designType) filters.push(eq(projects.designType, designType));
  if (!includeUnpublished) filters.push(eq(projects.published, true));
  return db
    .select()
    .from(projects)
    .where(filters.length ? and(...filters) : undefined)
    .orderBy(desc(projects.createdAt));
}

export async function getProjectBySlug(
  slug: string,
  includeUnpublished = false
) {
  const db = await getDb();
  if (!db) return undefined;
  const conditions = [eq(projects.slug, slug)];
  if (!includeUnpublished) conditions.push(eq(projects.published, true));
  const result = await db
    .select()
    .from(projects)
    .where(and(...conditions))
    .limit(1);
  return result[0];
}

export async function createProject(project: InsertProject) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(projects).values(project);
  return getProjectBySlug(project.slug, true);
}

export async function updateProject(
  id: number,
  project: Partial<InsertProject>
) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(projects).set(project).where(eq(projects.id, id));
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);
  return result[0];
}

export async function deleteProject(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.delete(projects).where(eq(projects.id, id));
  return { success: true as const };
}

export async function listTestimonials(approvedOnly = true) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(testimonials)
    .where(
      approvedOnly
        ? and(
            eq(testimonials.approved, true),
            eq(testimonials.consentConfirmed, true),
            eq(testimonials.verificationStatus, "verified")
          )
        : undefined
    )
    .orderBy(desc(testimonials.createdAt));
}

export async function createTestimonial(testimonial: InsertTestimonial) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(testimonials).values(testimonial);
  return listTestimonials(false);
}

export async function updateTestimonial(
  id: number,
  testimonial: Partial<InsertTestimonial>
) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(testimonials).set(testimonial).where(eq(testimonials.id, id));
  return listTestimonials(false);
}

export async function deleteTestimonial(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.delete(testimonials).where(eq(testimonials.id, id));
  return { success: true as const };
}

export type ConsultationFilters = {
  search?: string;
  city?: string;
  service?: string;
  status?:
    | "new"
    | "reviewing"
    | "contacted"
    | "confirmed"
    | "completed"
    | "cancelled";
  date?: string;
};

function consultationWhere(filters: ConsultationFilters = {}) {
  const conditions = [];
  if (filters.search) {
    const value = `%${filters.search}%`;
    conditions.push(like(consultationRequests.fullName, value));
  }
  if (filters.city)
    conditions.push(like(consultationRequests.city, `%${filters.city}%`));
  if (filters.service)
    conditions.push(eq(consultationRequests.service, filters.service));
  if (filters.status)
    conditions.push(eq(consultationRequests.status, filters.status));
  if (filters.date)
    conditions.push(eq(consultationRequests.preferredDate, filters.date));
  return conditions.length ? and(...conditions) : undefined;
}

export async function createConsultationRequest(
  request: InsertConsultationRequest
) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const result = await db.insert(consultationRequests).values(request);
  const id = Number(result[0].insertId);
  return getConsultationRequest(id);
}

export async function listConsultationRequests(
  filters: ConsultationFilters = {}
) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(consultationRequests)
    .where(consultationWhere(filters))
    .orderBy(desc(consultationRequests.createdAt));
}

export async function getConsultationRequest(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select({
      request: consultationRequests,
      lastEditorName: users.name,
      lastEditorEmail: users.email,
    })
    .from(consultationRequests)
    .leftJoin(users, eq(consultationRequests.lastEditedBy, users.id))
    .where(eq(consultationRequests.id, id))
    .limit(1);
  if (!result[0]) return undefined;
  return {
    ...result[0].request,
    lastEditorName: result[0].lastEditorName,
    lastEditorEmail: result[0].lastEditorEmail,
  };
}

export async function updateConsultationRequest(
  id: number,
  data: Partial<InsertConsultationRequest>
) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db
    .update(consultationRequests)
    .set(data)
    .where(eq(consultationRequests.id, id));
  return getConsultationRequest(id);
}

export async function getConsultationStats() {
  const db = await getDb();
  const empty = {
    total: 0,
    new: 0,
    reviewing: 0,
    contacted: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  } as const;
  if (!db) return empty;
  const rows = await db
    .select({ status: consultationRequests.status, count: count() })
    .from(consultationRequests)
    .groupBy(consultationRequests.status);
  const stats = { ...empty } as Record<string, number>;
  for (const row of rows) stats[row.status] = Number(row.count);
  stats.total = rows.reduce((total, row) => total + Number(row.count), 0);
  return stats;
}

export async function getAnalyticsTimeline(months: AnalyticsRange) {
  const db = await getDb();
  const now = new Date();
  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (months - 1), 1)
  );
  if (!db) {
    return {
      range: months,
      points: buildAnalyticsTimeline(months, [], [], now),
    };
  }

  const bookingMonth = sql<string>`DATE_FORMAT(createdAt, '%Y-%m')`;
  const projectMonth = sql<string>`DATE_FORMAT(createdAt, '%Y-%m')`;
  const bookingRows = await db
    .select({
      month: bookingMonth,
      status: consultationRequests.status,
      count: count(),
    })
    .from(consultationRequests)
    .where(gte(consultationRequests.createdAt, start))
    .groupBy(bookingMonth, consultationRequests.status);
  const projectRows = await db
    .select({
      month: projectMonth,
      designType: projects.designType,
      count: count(),
    })
    .from(projects)
    .where(gte(projects.createdAt, start))
    .groupBy(projectMonth, projects.designType);

  return {
    range: months,
    points: buildAnalyticsTimeline(
      months,
      bookingRows as BookingAggregateRow[],
      projectRows as ProjectAggregateRow[],
      now
    ),
  };
}
