import { callAi, parseJsonBlock } from "./ai-gateway.server";

export type EmailInput = {
  recipient: string;
  subject: string;
  purpose: string;
  tone: string;
};

export async function runEmail(input: EmailInput): Promise<string> {
  return callAi(
    "You are an expert business communication writer. Write complete, ready-to-send emails. Return only the email body text (including greeting and sign-off), no commentary, no markdown fences.",
    `Write an email.
Recipient: ${input.recipient}
Subject: ${input.subject}
Purpose: ${input.purpose}
Tone: ${input.tone}

Keep it concise, well structured and professional for the chosen tone.`,
  );
}

export type NotesResult = {
  summary: string;
  actionItems: string[];
  decisions: string[];
  deadlines: string[];
};

export async function runNotes(notes: string): Promise<NotesResult> {
  const raw = await callAi(
    'You analyse meeting notes. Reply with JSON only, shape: {"summary": string, "actionItems": string[], "decisions": string[], "deadlines": string[]}. Use empty arrays when nothing applies. Keep the summary under 120 words.',
    `Meeting notes:\n\n${notes}`,
  );
  const parsed = parseJsonBlock<Partial<NotesResult>>(raw);
  return {
    summary: parsed.summary ?? "",
    actionItems: parsed.actionItems ?? [],
    decisions: parsed.decisions ?? [],
    deadlines: parsed.deadlines ?? [],
  };
}

export type PlannerTask = {
  name: string;
  deadline: string;
  priority: string;
};

export type PlannerResult = {
  order: Array<{ task: string; reason: string }>;
  schedule: Array<{ period: string; items: string[] }>;
  advice: string;
};

export async function runPlanner(tasks: PlannerTask[]): Promise<PlannerResult> {
  const list = tasks
    .map((t) => `- ${t.name} | deadline: ${t.deadline || "none"} | priority: ${t.priority}`)
    .join("\n");

  const raw = await callAi(
    'You are a productivity planner. Reply with JSON only, shape: {"order": [{"task": string, "reason": string}], "schedule": [{"period": string, "items": string[]}], "advice": string}. Order tasks from most to least urgent. The schedule should be realistic, grouped by day or time block. Keep advice under 60 words.',
    `Today's date: ${new Date().toISOString().slice(0, 10)}\n\nTasks:\n${list}`,
  );
  const parsed = parseJsonBlock<Partial<PlannerResult>>(raw);
  return {
    order: parsed.order ?? [],
    schedule: parsed.schedule ?? [],
    advice: parsed.advice ?? "",
  };
}

export type ResearchResult = {
  summary: string;
  insights: string[];
  recommendations: string[];
};

export async function runResearch(topic: string): Promise<ResearchResult> {
  const raw = await callAi(
    'You are a research analyst. Reply with JSON only, shape: {"summary": string, "insights": string[], "recommendations": string[]}. Provide 3-6 insights and 3-5 concrete next steps. Keep the summary under 150 words.',
    `Research topic or article to analyse:\n\n${topic}`,
  );
  const parsed = parseJsonBlock<Partial<ResearchResult>>(raw);
  return {
    summary: parsed.summary ?? "",
    insights: parsed.insights ?? [],
    recommendations: parsed.recommendations ?? [],
  };
}
