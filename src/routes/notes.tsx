import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, NotebookPen } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BulletList,
  CopyButton,
  ErrorNotice,
  LoadingPanel,
  PageHeader,
  ResultSection,
  errorMessage,
} from "@/components/ai-ui";
import { summarizeNotes } from "@/lib/ai.functions";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — WorkFlow AI" },
      {
        name: "description",
        content:
          "Turn long meeting notes into a short summary with action items, decisions and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — WorkFlow AI" },
      {
        property: "og:description",
        content: "Paste raw meeting notes and get a clean summary, actions, decisions and dates.",
      },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const [notes, setNotes] = useState("");
  const run = useServerFn(summarizeNotes);
  const mutation = useMutation({ mutationFn: (value: string) => run({ data: { notes: value } }) });
  const result = mutation.data;

  const fullText = result
    ? [
        `Summary:\n${result.summary}`,
        `Action items:\n${result.actionItems.join("\n")}`,
        `Decisions:\n${result.decisions.join("\n")}`,
        `Deadlines:\n${result.deadlines.join("\n")}`,
      ].join("\n\n")
    : "";

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        eyebrow="Meetings"
        title="Meeting Notes Summarizer"
        description="Paste raw notes or a transcript. WorkFlow AI extracts the summary, action items, decisions and deadlines."
      />

      <form
        className="surface-card space-y-4 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate(notes.trim());
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="notes">Meeting notes</Label>
          <Textarea
            id="notes"
            rows={10}
            placeholder="Paste your meeting notes or transcript here…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={notes.trim().length < 10 || mutation.isPending}>
          {mutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <NotebookPen className="h-4 w-4" />
          )}
          {mutation.isPending ? "Summarizing…" : "Summarize notes"}
        </Button>
      </form>

      <div className="mt-6 space-y-4">
        {mutation.isError && <ErrorNotice message={errorMessage(mutation.error)} />}
        {mutation.isPending && <LoadingPanel message="Reading your notes…" />}
        {result && !mutation.isPending && (
          <>
            <ResultSection title="Summary" action={<CopyButton value={fullText} label="Copy all" />}>
              <p className="text-sm leading-relaxed">{result.summary}</p>
            </ResultSection>
            <div className="grid gap-4 md:grid-cols-2">
              <ResultSection title="Action items">
                <BulletList items={result.actionItems} empty="No action items found." />
              </ResultSection>
              <ResultSection title="Decisions made">
                <BulletList items={result.decisions} empty="No decisions recorded." />
              </ResultSection>
              <ResultSection title="Deadlines">
                <BulletList items={result.deadlines} empty="No deadlines mentioned." />
              </ResultSection>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
