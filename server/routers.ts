import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { createProject, createTestimonial, deleteProject, deleteTestimonial, getProjectBySlug, listProjects, listTestimonials, updateProject, updateTestimonial } from "./db";

const projectFields = {
  slug: z.string().trim().min(2).max(160),
  title: z.string().trim().min(2).max(255),
  projectType: z.string().trim().min(2).max(120),
  designType: z.enum(["interior", "architectural"]),
  location: z.string().trim().min(2).max(160),
  year: z.coerce.number().int().min(1900).max(2200),
  imageUrl: z.string().trim().min(1),
  intro: z.string().trim().min(2),
  statement: z.string().trim().min(2),
  description: z.string().trim().min(2),
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

function assertTestimonialPublication(input: { approved?: boolean; consentConfirmed?: boolean; verificationStatus?: "pending" | "verified" | "rejected" }) {
  if (input.approved === true && (input.consentConfirmed !== true || input.verificationStatus !== "verified")) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "لا يمكن نشر التقييم قبل تأكيد موافقة العميل وحالة التحقق." });
  }
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
