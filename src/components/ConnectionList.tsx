"use client";

import type { Connection, RelationshipType, Solution } from "@/types";
import { isConnectionMatched } from "@/lib/scoring";

// Static lookup so Tailwind scans these literal class strings.
const BADGE_CLASSES: Record<RelationshipType, string> = {
  Controls:        "bg-[#FCEBEB] dark:bg-[#3D1212] text-[#E24B4A] dark:text-[#FF7575] border-[#E24B4A]",
  Masks:           "bg-[#EEEDFE] dark:bg-[#252244] text-[#7F77DD] dark:text-[#A09AEE] border-[#7F77DD]",
  Signals:         "bg-[#E1F5EE] dark:bg-[#0E2E20] text-[#1D9E75] dark:text-[#3EC99A] border-[#1D9E75]",
  Harvests:        "bg-[#FAEEDA] dark:bg-[#2E1A00] text-[#BA7517] dark:text-[#E0972A] border-[#BA7517]",
  "Is the same as":"bg-[#E6F1FB] dark:bg-[#0E2035] text-[#378ADD] dark:text-[#60AAFF] border-[#378ADD]",
  "Distracts from":"bg-[#FBEAF0] dark:bg-[#3A0E20] text-[#D4537E] dark:text-[#FF80A8] border-[#D4537E]",
};

interface Props {
  connections: Connection[];
  onDelete: (index: number) => void;
  submitted?: boolean;
  solution?: Solution;
}

export default function ConnectionList({ connections, onDelete, submitted, solution }: Props) {
  return (
    <div className="bg-surface border border-pin rounded-xl p-4">
      <div className="text-[10px] font-mono tracking-[0.12em] text-stone uppercase mb-2.5">
        Connections ({connections.length})
      </div>
      <div className="flex flex-col gap-1.5">
        {connections.map((conn, i) => {
          const matched = submitted && solution ? isConnectionMatched(conn, solution) : null;
          return (
            <div
              key={i}
              className="flex items-center gap-2 px-2.5 py-[7px] rounded-lg bg-surface border border-pin font-mono text-[12px]"
            >
              {matched !== null && (
                <span className={matched ? "text-[#1D9E75]" : "text-[#E24B4A]"}>
                  {matched ? "✓" : "✗"}
                </span>
              )}
              <span className="text-ink">
                {conn.source.symbol} {conn.source.name}
              </span>
              <span
                className={`px-2 py-0.5 rounded-[10px] text-[10px] font-bold tracking-[0.06em] border border-opacity-25 ${BADGE_CLASSES[conn.type]}`}
              >
                {conn.type.toUpperCase()}
              </span>
              <span className="text-ink">
                {conn.target.symbol} {conn.target.name}
              </span>
              {!submitted && (
                <button
                  onClick={() => onDelete(i)}
                  className="ml-auto text-ash hover:text-stone text-sm leading-none px-0.5 bg-transparent border-none cursor-pointer"
                  aria-label="Delete connection"
                >
                  ×
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
