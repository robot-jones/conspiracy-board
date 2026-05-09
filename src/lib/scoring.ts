import type { Connection, Solution } from "@/types";

export function scoreAttempt(
  playerConnections: Connection[],
  solution: Solution
): { matched: number; total: number } {
  const matched = solution.connections.filter((sc) =>
    playerConnections.some(
      (pc) =>
        pc.source.name === sc.source.name &&
        pc.type === sc.type &&
        pc.target.name === sc.target.name
    )
  ).length;
  return { matched, total: solution.connections.length };
}

export function isConnectionMatched(
  connection: Connection,
  solution: Solution
): boolean {
  return solution.connections.some(
    (sc) =>
      sc.source.name === connection.source.name &&
      sc.type === connection.type &&
      sc.target.name === connection.target.name
  );
}

export function getMissedConnections(
  playerConnections: Connection[],
  solution: Solution
): Connection[] {
  return solution.connections.filter(
    (sc) =>
      !playerConnections.some(
        (pc) =>
          pc.source.name === sc.source.name &&
          pc.type === sc.type &&
          pc.target.name === sc.target.name
      )
  );
}
