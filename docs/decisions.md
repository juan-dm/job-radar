# Decisions

One entry per significant decision: what was decided, the options considered, and why.

## Template
### YYYY-MM-DD: Decision title
- **Decision:**
- **Options considered:**
- **Why:**

---

### 2026-11-20: Project files live at the repo root
- **Decision:** Moved everything out of a nested `job-radar-starter/` folder so the git root and the project root are the same folder.
- **Options considered:** Keep the nesting and set Vercel's Root Directory to the subfolder; move `.git` down into the subfolder; flatten.
- **Why:** Claude Code only loads `CLAUDE.md` from the folder it starts in, and create-next-app and Vercel both expect `package.json` at the root. Flattening fixed all three with no extra settings to remember.

### 2026-11-20: Everything hosted in the EU, Supabase and Vercel side by side
- **Decision:** Supabase in Frankfurt (`eu-central-1`), Vercel functions in Frankfurt (`fra1`), PostHog on EU Cloud.
- **Options considered:** London for Supabase and Vercel; provider defaults (Vercel functions in Washington DC, PostHog in the US).
- **Why:** Users are in the UK and EU, so keeping their data in the EU makes GDPR simpler. Putting functions and the database in the same city avoids a cross-Atlantic round trip (about 90 ms) on every query once pages read from the database. Frankfurt is central to four of the five target countries.

### 2026-11-20: Start on vercel.app, buy the domain before going public
- **Decision:** Run on `job-radar-beryl-three.vercel.app` for now. Buy a domain before step 6.
- **Options considered:** Buy a domain now; buy before going public.
- **Why:** "Job Radar" is still a working name. Buying before step 6 means Google indexes the real address from the start, so there are no redirects or lost rankings later.

### 2026-11-20: Tailwind CSS for styling
- **Decision:** Tailwind CSS 4, as set up by create-next-app.
- **Options considered:** Plain CSS files; CSS Modules; Tailwind.
- **Why:** It's create-next-app's default and the most common choice with Next.js. Styles sit next to the markup, so a component can be read in one file.

### 2026-11-20: PostHog in cookieless mode, Production only
- **Decision:** `cookieless_mode: "always"`, EU servers, `defaults` pinned to `"2026-08-30"`, and the key set only in Vercel Production.
- **Options considered:** Normal cookies plus a consent banner; `"on_reject"` (cookies only if the visitor accepts, which needs a banner); cookieless always.
- **Why:** No cookie banner is needed before launch, and local or preview traffic doesn't skew the numbers. Pinning `defaults` means tracking only changes when we choose. Trade-off: without cookies, an anonymous visitor who returns on another day may count as new, which affects the 4-week retention metric in step 7. Revisit then (identify signed-in users, or switch to `"on_reject"` with a banner).
