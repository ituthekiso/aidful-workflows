import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Search } from "lucide-react";
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
import { researchTopic } from "@/lib/ai.functions";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — WorkFlow AI" },
      {
        name: "description",
        content:
          "Summarize a topic or article, surface key insights and get practical recommended next steps.",
      },
      { property: "og:title", content: "AI Research Assistant — WorkFlow AI" },
      {
        property: "og:description",
        content: "Fast research summaries, insights and next steps powered by AI.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const run = useServerFn(researchTopic);
  const mutation = useMutation({ mutationFn: (value: string) => run({ data: { topic: value } }) });
  const result = mutation.data;

  const fullText = result
    ? [
        `Summary:\n${result.summary}`,
        `Key insights:\n${result.insights.join("\n")}`,
        `Recommendations:\n${result.recommendations.join("\n")}`,
      ].join("\n\n")
    : "";

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        eyebrow="Research"
        title="AI Research Assistant"
        description="Enter a topic or paste an article. WorkFlow AI returns a summary, the key insights and recommended next steps."
      />

      <form
        className="surface-card space-y-4 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate(topic.trim());
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="topic">Topic or article</Label>
          <Textarea
            id="topic"
            rows={9}
            placeholder="e.g. Remote onboarding best practices for engineering teams — or paste an entire article."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={topic.trim().length < 3 || mutation.isPending}>
          {mutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          {mutation.isPending ? "Researching…" : "Analyse topic"}
        </Button>
      </form>

      <div className="mt-6 space-y-4">
        {mutation.isError && <ErrorNotice message={errorMessage(mutation.error)} />}
        {mutation.isPending && <LoadingPanel message="Gathering insights…" />}
        {result && !mutation.isPending && (
          <>
            <ResultSection title="Summary" action={<CopyButton value={fullText} label="Copy all" />}>
              <p className="text-sm leading-relaxed">{result.summary}</p>
            </ResultSection>
            <div className="grid gap-4 md:grid-cols-2">
              <ResultSection title="Key insights">
                <BulletList items={result.insights} empty="No insights returned." />
              </ResultSection>
              <ResultSection title="Recommended next steps">
                <BulletList items={result.recommendations} empty="No recommendations returned." />
              </ResultSection>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
