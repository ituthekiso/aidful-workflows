import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ListChecks, Mail, NotebookPen, Search, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WorkFlow AI — Smart Productivity Assistant" },
      {
        name: "description",
        content:
          "One workspace for AI email drafting, meeting note summaries, task planning and research insights.",
      },
      { property: "og:title", content: "WorkFlow AI — Smart Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Draft emails, summarize meetings, plan tasks and research topics — all in one AI workspace.",
      },
    ],
  }),
  component: Dashboard,
});

const features = [
  {
    to: "/email" as const,
    icon: Mail,
    title: "Smart Email Generator",
    description: "Turn a few notes into a polished email in a formal, friendly or persuasive tone.",
    cta: "Draft an email",
  },
  {
    to: "/notes" as const,
    icon: NotebookPen,
    title: "Meeting Notes Summarizer",
    description: "Extract a summary, action items, decisions and deadlines from messy notes.",
    cta: "Summarize notes",
  },
  {
    to: "/tasks" as const,
    icon: ListChecks,
    title: "AI Task Planner",
    description: "Rank your tasks by urgency and get a realistic daily or weekly schedule.",
    cta: "Plan my day",
  },
  {
    to: "/research" as const,
    icon: Search,
    title: "AI Research Assistant",
    description: "Summarize any topic or article, surface key insights and get next steps.",
    cta: "Start research",
  },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-5xl">
      <section className="surface-card relative overflow-hidden p-8">
        <div className="brand-gradient absolute inset-x-0 top-0 h-1" />
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Your AI workspace
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Get through your work day faster
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          WorkFlow AI brings writing, meetings, planning and research into one place. Pick a tool
          below and let the assistant handle the heavy lifting.
        </p>
      </section>

      <h2 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        AI tools
      </h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {features.map(({ to, icon: Icon, title, description, cta }) => (
          <Link
            key={to}
            to={to}
            className="surface-card group flex flex-col p-6 transition-transform hover:-translate-y-0.5"
          >
            <span className="brand-gradient mb-4 flex h-11 w-11 items-center justify-center rounded-xl">
              <Icon className="h-5 w-5 text-primary-foreground" />
            </span>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{description}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
              {cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
