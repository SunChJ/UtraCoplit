# AGENT.md - Project Context & Principles

> **Purpose**: This document provides high-density context for AI agents working on this project. Read this first to understand the "Why", "What", and "How".

## 1. Vision (First Principles)
We are building a **Universal Chat Interface** (Gemini Clone) that is:
-   **Model-Agnostic**: De-couples the UI from the LLM provider. The "Model Socket" (`opencode.json`) is the core abstraction.
-   **Stateless & Scalable**: The application logic prefers client-side state for UI (Zustand) and Server Actions for logic, ensuring Edge compatibility (Cloudflare).
-   **High-Fidelity**: The UI must mimic the premium feel of Gemini (animations, spacing, typography).

## 2. Architecture (Client-Server-Backend)

The system follows a strict layered architecture to ensure separation of concerns:

### Layer 1: Client (Browser)
-   **Role**: Interaction, Optimistic UI, Global State.
-   **Stack**: React, Tailwind CSS, **Zustand**.
-   **Key State**: `useChatStore` (Model selection, Sidebar toggle).
-   **Constraint**: No direct database access. API calls via Hooks/Actions.

### Layer 2: Server (Edge/Node)
-   **Role**: Validation, Orchestration, Streaming.
-   **Stack**: Next.js App Router, **Zod**, Vercel AI SDK.
-   **Input**: JSON from Client.
-   **Output**: `TextStream` (AI response) or JSON (Data).
-   **Validation**: ALL inputs must be validated via Schema (`lib/validations/chat.ts`).

### Layer 3: Backend (Data)
-   **Role**: Persistence, Identity.
-   **Stack**: **Supabase** (Postgres + Auth).
-   **Access**: Via `@supabase/ssr` client in Server Actions.

## 3. The "Flexible Model Socket"
The project's unique feature is dynamic model switching.
-   **Config**: `opencode.json` defines providers.
-   **Inference**: `lib/model-registry.ts` maps config to Vercel AI SDK instances.
-   **Rule**: In Production (Edge), config is **Read-Only**. Dynamic switching happens via passing `modelId` in the API request body.

## 4. Tech Stack & Conventions
-   **Framework**: Next.js 14+ (App Router).
-   **Language**: TypeScript (Strict).
-   **Styling**: Tailwind CSS (Utility-first).
-   **UI Library**: shadcn/ui.
-   **Linting**: ESLint.

## 5. Map of Interest
-   `src/lib/store/chat-store.ts`: Global UI state.
-   `src/lib/model-registry.ts`: The brain of the Model Socket.
-   `src/app/api/chat/route.ts`: Main inference loop.
-   `opencode.json`: Model configuration.

## 6. Deployment
-   **Target**: Cloudflare Pages / Vercel.
-   **Constraint**: No filesystem write output at runtime.
