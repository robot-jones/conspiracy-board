# The Conspiracy Board

A daily puzzle game where you build a conspiracy theory — connecting strange, unrelated items with a set of typed relationships to construct a single, unified theory.

Every day brings 10 new subjects. Your job is to connect them using a hand of relationship types, building a directed graph that tells a coherent (or beautifully incoherent) story. At the end of the day, your board is scored on connectivity, internal consistency, and whether it all points to a single Unified They.

---

## How It Works

You're given 10 subjects — things like `🐦 Pigeons`, `🕰️ Daylight Saving`, `🧂 Salt`. Using the Connection Builder, you link them with typed relationships:

| Relationship | Meaning |
|---|---|
| **Controls** | One thing directs or compels the other |
| **Masks** | One conceals or disguises the other |
| **Signals** | One transmits information to the other |
| **Harvests** | One extracts something from the other |
| **Is the same as** | They are secretly identical |
| **Distracts from** | One diverts attention away from the other |

Connections are directional: `📡 Radio Towers → Signals → 🐦 Pigeons` is different from `🐦 Pigeons → Signals → 📡 Radio Towers`.

---

## Scoring

Boards are scored across three dimensions:

- **Connectivity** — did you connect all 10 subjects, or leave orphan nodes?
- **Consistency** — do your relationship types contradict each other?
- **Convergence** — does your board imply a single unified cause behind everything?

A **Wildcard Bonus** is awarded for a connection the seed theory didn't anticipate but that holds up logically.

---

## Project Structure
```
conspiracy-board/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home — renders the daily puzzle
│   │   └── globals.css
│   ├── components/
│   │   ├── Board.tsx           # SVG canvas — renders connections as a directed graph
│   │   ├── ConnectionBuilder/  # Step-through UI for building a connection
│   │   ├── ConnectionList.tsx  # Read-only list of confirmed connections
│   │   └── Chip.tsx            # Subject chip used in source/target selection
│   ├── types/
│   │   └── index.ts            # Subject, Connection, ConnectionBuilder, Puzzle types
│   └── lib/
│       └── puzzles/            # Daily puzzle definitions (subjects + seed connections)
├── public/
├── next.config.ts
├── tsconfig.json
├── CLAUDE.md
└── README.md
```

---

## Getting Started

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Design Decisions

**Fixed node-graph layout.** Subjects are arranged in a fixed ellipse on the board. Free-form drag-and-drop is a planned future feature.

**No single correct answer.** The puzzle has a hidden seed theory, but your board doesn't need to match it. Scoring rewards internal logic, not convergence with the "right" answer.

**Connection Builder as a state machine.** Building a connection steps through `SOURCE → RELATIONSHIP → TARGET → COMPLETE`. Each step is cancellable; the builder validates before committing.
