import type { Puzzle } from "@/types";
import day001 from "./day-001";

const puzzles: Puzzle[] = [day001];

export function getTodaysPuzzle(): Puzzle {
  // TODO: implement daily rotation keyed to a fixed epoch date
  return puzzles[0];
}
