# The Conspiracy Board — Claude Code Instructions

## What This Project Is

A daily browser puzzle game. Players connect 10 subjects using typed, directional relationships to build a conspiracy theory graph. Think Wordle meets a corkboard covered in red string.

The game is in early development. The core connection-building UI exists; puzzles, scoring, and sharing are not yet built.

---

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS
- No backend yet — puzzles are currently hardcoded in `src/lib/puzzles/`

---

## Architecture

### Core Types (`src/types/index.ts`)

The type system is the source of truth. Key things to know:

- `ConnectionBuilder` is a **state machine** — its `status` is derived from which properties are set, not stored explicitly. Do not add a `status` field; read `builder.status` instead.
- `Connection` is **immutable once confirmed** — connections in the list cannot be edited, only deleted.
- The board is **display-only** — `Board.tsx` takes `connections[]` as a prop and renders; it holds no state.

### Connection Builder Status Flow

```
(nothing set)  →  SOURCE selected  →  RELATIONSHIP selected  →  TARGET selected  →  COMPLETE
     ↓                  ↓                      ↓                       ↓               ↓
show prompt      show subjects           show rel cards          show subjects    show confirm
```

Cancel at any step resets the entire builder to its initial state.

### Target Filtering Rules

When in the TARGET step, exclude:
1. The subject already selected as `source`
2. Any subject for which a connection `source → type → target` already exists in the confirmed list

---

## Next.js Conventions

### Server vs. Client Components

The App Router defaults everything to Server Components. This game's interactive pieces all require client-side state, so the following must have `"use client"` at the top:

- `Board.tsx` (SVG renders from props, but may be wrapped in a client parent)
- All `ConnectionBuilder/` components
- `ConnectionList.tsx`
- `Chip.tsx`

Prefer pushing `"use client"` as far down the tree as possible. `src/app/page.tsx` can remain a Server Component if it passes static puzzle data down to a client wrapper component.

### Import Alias

Use `@/` for all imports from `src/`. Example: `import { Subject } from '@/types'`.

### Routing

The game is a single route (`/`). If a results or archive page is added later, use the App Router file conventions (`src/app/results/page.tsx`, etc.).

### Possible AGENTS.md

If your `create-next-app` scaffold included an `AGENTS.md` (and a `CLAUDE.md` referencing it), check it before making changes — it contains Next.js-specific guidance for coding agents.

---

## Conventions

- **Components are dumb.** State lives in a client wrapper in `src/app/page.tsx` (or a future context). Components receive props and emit callbacks.
- **Tailwind for styles.** Do not introduce inline styles or CSS modules for new components.
- **TypeScript strict mode is on.** No `any`, no non-null assertions without a comment explaining why.
- **Relationship types are the canonical enum.** Do not hardcode relationship strings outside of `src/types/index.ts`.

---

## What's Not Built Yet

- Puzzle data layer (daily puzzle fetching, rotation)
- Scoring logic
- Results / share card
- The board's arrow labels truncate poorly for "Is the same as" — abbreviate to "Same as" on the SVG canvas only

---

## Things to Avoid

- Do not add drag-and-drop to the board. It's a planned future feature and should not be started until the core game loop is complete.
- Do not add a backend or database until the puzzle format is finalized.
- Do not modify the `ConnectionBuilder` status derivation logic without understanding the full state machine — it's intentionally stateless.
- Do not use the Pages Router (`/pages` directory). This project uses the App Router exclusively.
