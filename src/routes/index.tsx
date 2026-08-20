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
      <section className="surface-card relative overflow-hidden p-8 sm:p-12">
        <div className="brand-gradient float-blob pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full opacity-30 blur-3xl" />
        <div className="brand-gradient float-blob pointer-events-none absolute -bottom-28 -left-16 h-56 w-56 rounded-full opacity-20 blur-3xl [animation-delay:-4s]" />
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Your AI workspace
        </span>
        <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Do a full work day
          <br />
          <span className="gradient-text">in half the time.</span>
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          Emails, meeting notes, plans and research — four AI tools, zero busywork. Pick one and go.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/email"
            className="brand-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03]"
          >
            Start creating
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/tasks"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Plan my day
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          <span className="text-accent">Instant drafts</span>
          <span className="text-accent">Zero setup</span>
          <span className="text-accent">Smart summaries</span>
        </div>
      </section>

      <h2 className="mt-12 mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        AI tools
      </h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {features.map(({ to, icon: Icon, title, description, cta }) => (
          <Link
            key={to}
            to={to}
            className="surface-card glow-hover group relative flex flex-col overflow-hidden p-6 hover:-translate-y-1"
          >
            <div className="brand-gradient absolute inset-x-0 top-0 h-1 opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="brand-gradient mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 group-hover:rotate-6">
              <Icon className="h-5 w-5 text-primary-foreground" />
            </span>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{description}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
              {cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
