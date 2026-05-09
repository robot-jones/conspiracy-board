import { getTodaysPuzzle } from "@/lib/puzzles";
import GameBoard from "@/components/GameBoard";

export default function Home() {
  const puzzle = getTodaysPuzzle();
  return <GameBoard puzzle={puzzle} />;
}
