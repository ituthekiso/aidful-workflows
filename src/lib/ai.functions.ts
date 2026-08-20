import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  runEmail,
  runNotes,
  runPlanner,
  runResearch,
  type EmailInput,
  type PlannerTask,
} from "./ai-workflows.server";

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        recipient: z.string().min(1),
        subject: z.string().min(1),
        purpose: z.string().min(1),
        tone: z.string().min(1),
      })
      .parse(input),
  )
  .handler(async ({ data }) => ({ email: await runEmail(data as EmailInput) }));

export const summarizeNotes = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ notes: z.string().min(10) }).parse(input))
  .handler(async ({ data }) => runNotes(data.notes));

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        tasks: z
          .array(
            z.object({
              name: z.string().min(1),
              deadline: z.string(),
              priority: z.string(),
            }),
          )
          .min(1),
      })
      .parse(input),
  )
  .handler(async ({ data }) => runPlanner(data.tasks as PlannerTask[]));

export const researchTopic = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ topic: z.string().min(3) }).parse(input))
  .handler(async ({ data }) => runResearch(data.topic));
