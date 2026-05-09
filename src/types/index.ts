export type RelationshipType =
  | "Controls"
  | "Masks"
  | "Signals"
  | "Harvests"
  | "Is the same as"
  | "Distracts from";

export const RELATIONSHIP_TYPES: RelationshipType[] = [
  "Controls",
  "Masks",
  "Signals",
  "Harvests",
  "Is the same as",
  "Distracts from",
];

export interface Subject {
  name: string;
  symbol: string;
}

export interface Connection {
  source: Subject;
  type: RelationshipType;
  target: Subject;
}

export interface ConnectionBuilder {
  active: boolean;
  source: Subject | null;
  type: RelationshipType | null;
  target: Subject | null;
}

export const INITIAL_BUILDER: ConnectionBuilder = {
  active: false,
  source: null,
  type: null,
  target: null,
};

export type BuilderStatus =
  | "IDLE"
  | "SOURCE"
  | "RELATIONSHIP"
  | "TARGET"
  | "COMPLETE";

export function getBuilderStatus(builder: ConnectionBuilder): BuilderStatus {
  if (!builder.active) return "IDLE";
  if (!builder.source) return "SOURCE";
  if (!builder.type) return "RELATIONSHIP";
  if (!builder.target) return "TARGET";
  return "COMPLETE";
}

export interface Puzzle {
  day: number;
  subjects: Subject[];
}

// Hex color values for each relationship type — used directly in SVG attributes and
// in static Tailwind arbitrary-value lookup maps within components.
export const RELATIONSHIP_COLORS: Record<
  RelationshipType,
  { color: string; bg: string }
> = {
  Controls: { color: "#E24B4A", bg: "#FCEBEB" },
  Masks: { color: "#7F77DD", bg: "#EEEDFE" },
  Signals: { color: "#1D9E75", bg: "#E1F5EE" },
  Harvests: { color: "#BA7517", bg: "#FAEEDA" },
  "Is the same as": { color: "#378ADD", bg: "#E6F1FB" },
  "Distracts from": { color: "#D4537E", bg: "#FBEAF0" },
};

export const RELATIONSHIP_DESCRIPTIONS: Record<RelationshipType, string> = {
  Controls: "directs or compels",
  Masks: "conceals or disguises",
  Signals: "transmits information to",
  Harvests: "extracts something from",
  "Is the same as": "secretly identical to",
  "Distracts from": "diverts attention away from",
};
