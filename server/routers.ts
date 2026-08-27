import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import {
  createConsultationRequest,
  createProject,
  createTestimonial,
  deleteProject,
  deleteTestimonial,
  getConsultationRequest,
  getConsultationStats,
  getAnalyticsTimeline,
  getProjectBySlug,
  listConsultationRequests,
  listProjects,
  listTestimonials,
  updateConsultationRequest,
  updateProject,
  updateTestimonial,
} from "./db";

const projectFields = {
  slug: z.string().trim().min(2).max(160),
  title: z.string().trim().min(2).max(255),
  projectType: z.string().trim().min(2).max(120),
  designType: z.enum(["interior", "architectural"]),
  location: z.string().trim().min(2).max(160),
  year: z.coerce.number().int().min(1900).max(2200).optional().nullable(),
  imageUrl: z.string().trim().min(1),
  imageAlt: z.string().trim().max(500).optional().or(z.literal("")),
  galleryJson: z.string().trim().max(50000).optional().or(z.literal("")),
  imageKind: z.string().trim().max(120).optional().or(z.literal("")),
  intro: z.string().trim().min(2),
  statement: z.string().trim().min(2),
  description: z.string().trim().min(2),
  challenge: z.string().trim().max(5000).nullable().optional(),
  concept: z.string().trim().max(5000).nullable().optional(),
  materials: z.string().trim().max(5000).nullable().optional(),
  palette: z.string().trim().max(2000).nullable().optional(),
  serviceScope: z.string().trim().max(3000).nullable().optional(),
  beforeImageUrl: z.string().trim().max(2000).nullable().optional(),
  beforeImageAlt: z.string().trim().max(500).nullable().optional(),
  afterImageUrl: z.string().trim().max(2000).nullable().optional(),
  afterImageAlt: z.string().trim().max(500).nullable().optional(),
  caseStudyApproved: z.boolean().default(false),
  published: z.boolean().default(true),
};

const testimonialFields = {
  clientName: z.string().trim().min(2).max(160),
  clientRole: z.string().trim().max(160).optional().or(z.literal("")),
  quote: z.string().trim().min(10),
  rating: z.coerce.number().int().min(1).max(5),
  projectName: z.string().trim().max(255).optional().or(z.literal("")),
  imageUrl: z.string().trim().optional().or(z.literal("")),
  consentConfirmed: z.boolean().default(false),
  verificationStatus: z.enum(["pending", "verified", "rejected"]).default("pending"),
  approved: z.boolean().default(false),
};

const consultationStatus = z.enum(["new", "reviewing", "contacted", "confirmed", "completed", "cancelled"]);
const consultationInput = z.object({
  fullName: z.string().trim().min(2).max(160),
  phone: z.string().trim().min(7).max(40).regex(/^\+?[0-9 ()-]{7,}$/),
  email: z.string().trim().email().max(320).optional().or(z.literal("")),
  city: z.string().trim().min(2).max(160),
  propertyType: z.string().trim().min(2).max(160),
  area: z.string().trim().min(1).max(80),
  service: z.string().trim().min(2).max(180),
  budget: z.string().trim().min(2).max(160),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  preferredTime: z.string().trim().min(2).max(10),
  description: z.string().trim().min(10).max(5000),
  aestheticPreference: z.string().trim().max(500).nullable().optional(),
  privacyConsent: z.literal(true),
  honeypot: z.string().max(120).optional().default(""),
});

type TestimonialPublicationInput = { approved?: boolean; consentConfirmed?: boolean; verificationStatus?: "pending" | "verified" | "rejected" };
function assertTestimonialPublication(input: TestimonialPublicationInput) {
  if (input.approved === true && (input.consentConfirmed !== true || input.verificationStatus !== "verified")) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "لا يمكن نشر التقييم قبل تأكيد موافقة العميل وحالة التحقق." });
  }
}

function consultationNotificationContent(input: z.infer<typeof consultationInput>) {
  return [
    `الاسم: ${input.fullName}`,
    `الهاتف: ${input.phone}`,
    input.email ? `البريد: ${input.email}` : null,
    `المدينة: ${input.city}`,
    `العقار: ${input.propertyType}`,
    `المساحة: ${input.area}`,
    `الخدمة: ${input.service}`,
    `الميزانية: ${input.budget}`,
    `الموعد المقترح: ${input.preferredDate} — ${input.preferredTime}`,
    `الوصف: ${input.description}`,
    input.aestheticPreference ? `الإحساس المطلوب: ${input.aestheticPreference}` : null,
  ].filter(Boolean).join("\n");
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  consultations: router({
    create: publicProcedure.input(consultationInput).mutation(async ({ input }) => {
      if (input.honeypot.trim()) throw new TRPCError({ code: "BAD_REQUEST", message: "تعذر قبول الطلب." });
      const request = await createConsultationRequest({ ...input, email: input.email || null, aestheticPreference: input.aestheticPreference || null, honeypot: null, status: "new" });
      const notified = await notifyOwner({ title: `طلب استشارة جديد — ${input.fullName}`, content: consultationNotificationContent(input) });
      return { success: true as const, id: request?.id ?? null, notified };
    }),
    list: adminProcedure.input(z.object({ search: z.string().trim().max(160).optional(), city: z.string().trim().max(160).optional(), service: z.string().trim().max(180).optional(), status: consultationStatus.optional(), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional() }).optional()).query(({ input }) => listConsultationRequests(input ?? {})),
    get: adminProcedure.input(z.object({ id: z.number().int().positive() })).query(({ input }) => getConsultationRequest(input.id)),
    stats: adminProcedure.query(() => getConsultationStats()),
    update: adminProcedure.input(z.object({ id: z.number().int().positive(), status: consultationStatus, adminNotes: z.string().max(5000).optional().or(z.literal("")) })).mutation(({ ctx, input }) => updateConsultationRequest(input.id, { status: input.status, adminNotes: input.adminNotes || null, lastEditedBy: ctx.user.id })),
    export: adminProcedure.input(z.object({ search: z.string().trim().max(160).optional(), city: z.string().trim().max(160).optional(), service: z.string().trim().max(180).optional(), status: consultationStatus.optional(), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional() }).optional()).query(({ input }) => listConsultationRequests(input ?? {})),
  }),
  analytics: router({
    overview: adminProcedure.input(z.object({ months: z.union([z.literal(6), z.literal(12), z.literal(24)]).optional() }).optional()).query(({ input }) => getAnalyticsTimeline(input?.months ?? 12)),
  }),
  projects: router({
    list: publicProcedure.input(z.object({ designType: z.enum(["interior", "architectural"]).optional() }).optional()).query(({ input }) => listProjects(input?.designType)),
    bySlug: publicProcedure.input(z.object({ slug: z.string().min(1) })).query(({ input }) => getProjectBySlug(input.slug)),
    adminList: adminProcedure.query(() => listProjects(undefined, true)),
    create: adminProcedure.input(z.object(projectFields)).mutation(({ ctx, input }) => createProject({ ...input, ownerId: ctx.user.id })),
    update: adminProcedure.input(z.object({ id: z.number().int().positive(), data: z.object(projectFields).partial() })).mutation(({ input }) => updateProject(input.id, input.data)),
    delete: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ input }) => deleteProject(input.id)),
  }),
  testimonials: router({
    list: publicProcedure.query(() => listTestimonials(true)),
    adminList: adminProcedure.query(() => listTestimonials(false)),
    create: adminProcedure.input(z.object(testimonialFields)).mutation(({ ctx, input }) => { assertTestimonialPublication(input); return createTestimonial({ ...input, ownerId: ctx.user.id }); }),
    update: adminProcedure.input(z.object({ id: z.number().int().positive(), data: z.object(testimonialFields).partial() })).mutation(({ input }) => { assertTestimonialPublication(input.data); return updateTestimonial(input.id, input.data); }),
    delete: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ input }) => deleteTestimonial(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
