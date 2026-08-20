# ⚡ WorkFlow AI

> A bold, neon-on-dark productivity dashboard with four AI-powered tools that help you write faster, think clearer, and plan smarter — all in one place.

Built with [Lovable](https://lovable.dev) on a modern full-stack React + TypeScript stack. Every tool runs server-side through the Lovable AI Gateway, so your prompts are processed by a real LLM and the results stream back into a slick, animated UI.

---

## ✨ Features

WorkFlow AI ships **four** AI tools, each accessible from a single sidebar-navigated dashboard:

### 📧 Smart Email Generator
Drafts ready-to-send emails in seconds. Pick a tone (Professional, Friendly, Persuasive, Urgent…), describe the purpose, and get a polished email body — greeting to sign-off — with a one-click **Copy to Clipboard**.

### 🗒️ Meeting Notes Summarizer
Paste raw meeting notes and the AI returns structured output:
- A concise summary (under 120 words)
- Action items
- Decisions made
- Deadlines flagged

### 📅 AI Task Planner
Add your tasks with deadlines and priorities. The planner:
- Orders tasks from most to least urgent (with reasoning)
- Builds a realistic day/time-block schedule
- Gives focused productivity advice

### 🔍 AI Research Assistant
Drop in a topic or paste an article. The assistant returns:
- An executive summary (under 150 words)
- 3–6 key insights
- 3–5 concrete next-step recommendations

---

## 🎨 Design

- **Neon-on-dark** aesthetic with electric cyan/emerald accents on slate-navy surfaces
- **Space Grotesk** display type + **Plus Jakarta Sans** body for a modern, energetic feel
- Glowing pill navigation, hover-lifting tool cards, and gradient headlines
- Fully responsive — works great on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | TanStack Start v1 (full-stack React 19) |
| Build tool | Vite 7 |
| Styling | Tailwind CSS v4 (CSS-native `@theme` + custom utilities) |
| AI backend | Lovable AI Gateway (OpenAI GPT model) via server functions |
| Validation | Zod |
| Runtime | Edge / serverless (Cloudflare Workers) |

Server logic lives in type-safe `createServerFn` RPC handlers under `src/lib/`, so the browser calls typed functions — no hand-rolled REST or client-side API keys.

---

## 🚀 Getting Started

You need Node.js (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) if you don't have it).

```sh
git clone <your-repository-url>
cd workflow-ai
npm i
npm run dev
```

Open the local dev URL printed in your terminal.

> **Note:** AI features require a `LOVABLE_API_KEY`. When you run this project inside Lovable, the key is provided automatically. For local development, set it in your environment.

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── AppShell.tsx          # Sidebar + responsive header layout
│   └── ai-ui.tsx             # Shared UI: PageHeader, CopyButton, loaders, result panels
├── lib/
│   ├── ai-gateway.server.ts  # Low-level fetch to the Lovable AI Gateway + text extractor
│   ├── ai-workflows.server.ts # Per-tool prompts and JSON parsing
│   └── ai.functions.ts       # TanStack Start server functions (Zod-validated)
├── routes/
│   ├── __root.tsx            # App shell, fonts, global styles
│   ├── index.tsx             # Dashboard with feature cards
│   ├── email.tsx             # Smart Email Generator
│   ├── notes.tsx             # Meeting Notes Summarizer
│   ├── tasks.tsx             # AI Task Planner
│   └── research.tsx          # AI Research Assistant
└── styles.css                # Design tokens, theme, custom utilities
```

---

## 🧠 How the AI works

1. The browser calls a typed server function (e.g. `generateEmail`).
2. The server function validates input with Zod, then calls a workflow in `ai-workflows.server.ts`.
3. The workflow builds a prompt and sends it to the Lovable AI Gateway (`ai-gateway.server.ts`).
4. The gateway routes the request to the model and returns the text/JSON.
5. The server function returns the parsed result to the browser, where it renders with loading states and error handling.

No API keys ever reach the client — all AI calls happen server-side.

---

## 📦 Deployment

This project is built and deployed through Lovable. Every change you make in the Lovable editor is committed and pushed automatically. To publish a live URL, use **Publish** in the Lovable editor.

To self-host, connect the project to GitHub (Plus menu → GitHub → Connect project), clone it, and deploy the TanStack Start build to your preferred Edge-compatible host.

---

## 📄 License

This codebase is yours — do whatever you like with it. Built with [Lovable](https://lovable.dev).
