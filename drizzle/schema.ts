import { boolean, foreignKey, index, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/** Core user table backing Manus OAuth and admin authorization. */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  ownerId: int("ownerId").notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  projectType: varchar("projectType", { length: 120 }).notNull(),
  designType: mysqlEnum("designType", ["interior", "architectural"]).notNull(),
  location: varchar("location", { length: 160 }).notNull(),
  year: int("year").notNull(),
  imageUrl: text("imageUrl").notNull(),
  intro: text("intro").notNull(),
  statement: text("statement").notNull(),
  description: text("description").notNull(),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  ownerFk: foreignKey({ columns: [table.ownerId], foreignColumns: [users.id] }),
  designTypeIdx: index("projects_design_type_idx").on(table.designType),
  publishedIdx: index("projects_published_idx").on(table.published),
}));

export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  ownerId: int("ownerId").notNull(),
  clientName: varchar("clientName", { length: 160 }).notNull(),
  clientRole: varchar("clientRole", { length: 160 }),
  quote: text("quote").notNull(),
  rating: int("rating").notNull(),
  projectName: varchar("projectName", { length: 255 }),
  imageUrl: text("imageUrl"),
  consentConfirmed: boolean("consentConfirmed").default(false).notNull(),
  verificationStatus: mysqlEnum("verificationStatus", ["pending", "verified", "rejected"]).default("pending").notNull(),
  approved: boolean("approved").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  ownerFk: foreignKey({ columns: [table.ownerId], foreignColumns: [users.id] }),
  approvedIdx: index("testimonials_approved_idx").on(table.approved),
  verificationIdx: index("testimonials_verification_idx").on(table.verificationStatus),
}));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;
