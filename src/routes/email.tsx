import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Mail, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CopyButton,
  ErrorNotice,
  LoadingPanel,
  PageHeader,
  ResultSection,
  errorMessage,
} from "@/components/ai-ui";
import { generateEmail } from "@/lib/ai.functions";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — WorkFlow AI" },
      {
        name: "description",
        content:
          "Generate formal, friendly or persuasive work emails in seconds with the WorkFlow AI email assistant.",
      },
      { property: "og:title", content: "Smart Email Generator — WorkFlow AI" },
      {
        property: "og:description",
        content: "Draft polished, ready-to-send work emails with AI in any tone.",
      },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("Formal");

  const run = useServerFn(generateEmail);
  const mutation = useMutation({
    mutationFn: (data: { recipient: string; subject: string; purpose: string; tone: string }) =>
      run({ data }),
  });

  const disabled = !recipient.trim() || !subject.trim() || !purpose.trim() || mutation.isPending;

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        eyebrow="Communication"
        title="Smart Email Generator"
        description="Describe who you're writing to and why. WorkFlow AI drafts a complete, ready-to-send email in the tone you choose."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <form
          className="surface-card space-y-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate({
              recipient: recipient.trim(),
              subject: subject.trim(),
              purpose: purpose.trim(),
              tone,
            });
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient</Label>
            <Input
              id="recipient"
              placeholder="Sarah Mokoena, Head of Operations"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Q3 budget review meeting"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose of the email</Label>
            <Textarea
              id="purpose"
              rows={5}
              placeholder="Ask her to approve the revised budget and confirm a 30-minute review slot this week."
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger id="tone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Formal">Formal</SelectItem>
                <SelectItem value="Friendly">Friendly</SelectItem>
                <SelectItem value="Persuasive">Persuasive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={disabled}>
            {mutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Mail className="h-4 w-4" />
            )}
            {mutation.isPending ? "Generating…" : "Generate email"}
          </Button>
        </form>

        <div className="space-y-4">
          {mutation.isError && <ErrorNotice message={errorMessage(mutation.error)} />}
          {mutation.isPending && <LoadingPanel message="Writing your email…" />}
          {mutation.data && !mutation.isPending && (
            <ResultSection
              title="Generated email"
              action={<CopyButton value={mutation.data.email} />}
            >
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {mutation.data.email}
              </pre>
            </ResultSection>
          )}
          {!mutation.data && !mutation.isPending && !mutation.isError && (
            <div className="surface-card p-6 text-sm text-muted-foreground">
              Your generated email will appear here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
