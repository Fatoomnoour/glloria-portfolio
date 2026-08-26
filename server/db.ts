import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertProject,
  InsertTestimonial,
  projects,
  testimonials,
  InsertUser,
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
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function listProjects(designType?: "interior" | "architectural", includeUnpublished = false) {
  const db = await getDb();
  if (!db) return [];
  const filters = [];
  if (designType) filters.push(eq(projects.designType, designType));
  if (!includeUnpublished) filters.push(eq(projects.published, true));
  return db.select().from(projects).where(filters.length ? and(...filters) : undefined).orderBy(desc(projects.createdAt));
}

export async function getProjectBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  return result[0];
}

export async function createProject(project: InsertProject) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(projects).values(project);
  return getProjectBySlug(project.slug);
}

export async function updateProject(id: number, project: Partial<InsertProject>) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(projects).set(project).where(eq(projects.id, id));
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
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
  return db.select().from(testimonials).where(approvedOnly ? and(eq(testimonials.approved, true), eq(testimonials.consentConfirmed, true), eq(testimonials.verificationStatus, "verified")) : undefined).orderBy(desc(testimonials.createdAt));
}

export async function createTestimonial(testimonial: InsertTestimonial) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(testimonials).values(testimonial);
  return listTestimonials(false);
}

export async function updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>) {
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
