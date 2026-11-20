# Job Radar (working name)

Early-career tech job radar for the UK, Spain, Germany, France and the Netherlands.
It pulls internship, graduate and junior listings straight from company job-board feeds. An AI agent then reads each listing to work out who can apply: level, role family, graduation year, languages, visa / right to work, deadline.

## Stack
- Next.js 16 (App Router) + TypeScript + React, styled with Tailwind CSS 4. This Next.js version is newer than most training data: follow @AGENTS.md and check `node_modules/next/dist/docs/` before writing Next.js code.
- Supabase (Postgres + auth)
- Vercel (hosting + scheduled jobs)
- PostHog (analytics)
- Python only inside `evals/`

## Target layout
- `app/`: pages and API routes
- `lib/crawler/`: one adapter per job-board system (Greenhouse, Lever, Ashby, Workable, SmartRecruiters, Personio, Recruitee, Teamtailor)
- `lib/extract/`: AI extraction agent and prompts
- `evals/`: hand-labelled listings, scoring scripts, results
- `supabase/migrations/`: database schema changes
- `docs/decisions.md` and `docs/what-broke.md`: feed the README

If create-next-app refuses because the folder isn't empty, scaffold in a temp folder and move the files in. Keep `CLAUDE.md`, `CLAUDE.local.md`, `private/` and `docs/`.

## Hard rules
- Data only from public job-board feeds and APIs. No LinkedIn scraping, no logging in to sites, no auto-applying.
- The crawler respects rate limits and sends a user agent with a contact URL.
- Secrets live only in `.env.local`, which is never committed.
- Log LLM token usage and cost on every extraction run. User-facing AI features get per-user metering and caps.
- Any change to extraction prompts or the model means rerunning the evals and updating the README results table.
- Never commit `CLAUDE.local.md` or `private/`. Keep both in `.gitignore`.

## How to work in this repo
1. Before writing code, explain the plan in plain words and list the files you'll create or change. Wait for an OK.
2. Keep changes small: one commit per logical change, with a clear message.
3. After changing code, sum up each changed file in 1–2 plain sentences: what it does and how it connects to the rest.
4. When something breaks, explain the likely cause and give a hint first. Give the full fix only when asked.
5. For dashboard steps (Supabase, Vercel, PostHog, Google Search Console), give numbered click-by-click steps and say why each one exists.
6. Log every significant decision in `docs/decisions.md` (decision, options, why). Log failures and their fixes in `docs/what-broke.md`.

## Commands
- `npm run dev`: local dev server at http://localhost:3000, reloads on save.
- `npm run build`: production build, the same one Vercel runs. Run it before pushing.
- `npm run lint`: ESLint with Next.js's recommended rules.
- `npm start`: serve the production build locally (after `npm run build`).
- Test, run crawler, run evals: not set up yet (crawler is step 3, evals step 5).
