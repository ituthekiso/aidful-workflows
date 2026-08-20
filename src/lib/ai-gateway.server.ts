const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/responses";
const MODEL = "openai/gpt-5.6-sol";

export class AiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type ResponsesPayload = {
  output_text?: string;
  output?: Array<{
    type?: string;
    content?: Array<{ type?: string; text?: string }>;
  }>;
  error?: { message?: string };
  message?: string;
};

function extractText(payload: ResponsesPayload): string {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }
  const parts: string[] = [];
  for (const item of payload.output ?? []) {
    for (const c of item.content ?? []) {
      if (typeof c.text === "string") parts.push(c.text);
    }
  }
  return parts.join("\n").trim();
}

export async function callAi(system: string, user: string): Promise<string> {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new AiError(500, "AI is not configured for this app.");

  const response = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": key,
    },
    body: JSON.stringify({
      model: MODEL,
      input: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!response.ok) {
    let message = `AI request failed (${response.status}).`;
    try {
      const body = (await response.json()) as ResponsesPayload;
      message = body.error?.message ?? body.message ?? message;
    } catch {
      /* keep default message */
    }
    if (response.status === 429) {
      message = "Too many requests right now. Please wait a moment and try again.";
    } else if (response.status === 402) {
      message = message || "AI credits are exhausted. Please add credits to continue.";
    }
    throw new AiError(response.status, message);
  }

  const payload = (await response.json()) as ResponsesPayload;
  const text = extractText(payload);
  if (!text) throw new AiError(502, "The AI returned an empty response. Please try again.");
  return text;
}

export function parseJsonBlock<T>(raw: string): T {
  let text = raw.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```[a-zA-Z]*\s*/, "").replace(/```$/, "").trim();
  }
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new AiError(502, "Could not read the AI response.");
  try {
    return JSON.parse(text.slice(start, end + 1)) as T;
  } catch {
    throw new AiError(502, "Could not read the AI response. Please try again.");
  }
}
