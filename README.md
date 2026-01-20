# Gemini Clone (Universal Chat Interface)

A high-fidelity, model-agnostic chat interface inspired by Google Gemini. Built with performance, scalability, and developer experience in mind.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)

## ✨ key Features

-   **🎨 Premium UI**: Polished interface mimicking Gemini, built with `shadcn/ui` and Tailwind CSS.
-   **🔌 Flexible Model Socket**: Dynamically switch between AI models (Gemini, OpenAI, SiliconFlow, etc.) via `opencode.json`.
-   **⚡️ Edge Compatible**: Optimized for Cloudflare Pages and Vercel Edge Runtime.
-   **🏗️ Clean Architecture**:
    -   **Client**: Zustand for robust global state management.
    -   **Server**: Zod validation for secure API interactions.
    -   **Backend**: Supabase-ready structure for auth and persistence.
-   **📝 Rich Content**: Full Markdown support with streaming responses.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **State Management**: Zustand
-   **Validation**: Zod
-   **AI SDK**: Vercel AI SDK
-   **UI Components**: shadcn/ui (Radix UI)
-   **Database/Auth**: Supabase (Client configured)

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   npm / yarn / pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/gemini-clone.git
    cd gemini-clone
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env.local` file and add your API keys (matching `opencode.json`):
    ```env
    GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
    OPENAI_API_KEY=your_key_here
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
    ```

4.  **Configure Models (Optional):**
    Edit `opencode.json` to add or remove model providers.

5.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🌐 Deployment

### Cloudflare Pages (Recommended for Edge)
This project includes an adapter for Cloudflare Pages.
1.  Connect your repository to Cloudflare Pages.
2.  Set **Build Command** to: `npm run pages:build`
3.  Set **Output Directory** to: `.vercel/output/static`
4.  Add environment variables in the dashboard.

### Vercel
1.  Install Vercel CLI: `npm i -g vercel`
2.  Run `vercel` to deploy.

## 📂 Project Structure

```
src/
├── app/
│   ├── actions/       # Server Actions
│   ├── api/           # API Routes (Edge compatible)
│   └── page.tsx       # Main Chat Interface
├── components/
│   ├── chat/          # Chat-specific components
│   └── ui/            # Reusable UI components (shadcn)
├── lib/
│   ├── db/            # Supabase client & schema
│   ├── store/         # Zustand stores
│   ├── validations/   # Zod schemas
│   └── model-registry # AI Provider logic
└── ...
```

## 📄 License

This project is licensed under the MIT License.
