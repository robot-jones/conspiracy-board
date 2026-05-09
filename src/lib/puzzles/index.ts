import type { Puzzle } from "@/types";
import day001 from "./day-001";

const puzzles: Puzzle[] = [day001];

export function getTodaysPuzzle(): Puzzle {
  const today = new Date().toISOString().split("T")[0];
  return puzzles.find((p) => p.date === today) ?? puzzles[0];
}
