"use client";

import { useState } from "react";
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
  onClearAll?: () => void;
  submitted?: boolean;
  solution?: Solution;
}

export default function ConnectionList({ connections, onDelete, onClearAll, submitted, solution }: Props) {
  const [confirming, setConfirming] = useState(false);

  const handleClearClick = () => setConfirming(true);
  const handleClearConfirm = () => { setConfirming(false); onClearAll?.(); };
  const handleClearCancel = () => setConfirming(false);

  return (
    <div className="bg-surface border border-pin rounded-xl p-4">
      <div className="flex items-center justify-between mb-2.5">
        <div className="text-[10px] font-mono tracking-[0.12em] text-stone uppercase">
          Connections ({connections.length})
        </div>
        {!submitted && onClearAll && (
          confirming ? (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-stone">SURE?</span>
              <button
                onClick={handleClearConfirm}
                className="text-[10px] font-mono tracking-[0.06em] text-[#E24B4A] hover:text-[#C0392B] bg-transparent border-none cursor-pointer"
              >
                YES
              </button>
              <button
                onClick={handleClearCancel}
                className="text-[10px] font-mono tracking-[0.06em] text-stone hover:text-ink bg-transparent border-none cursor-pointer"
              >
                NO
              </button>
            </div>
          ) : (
            <button
              onClick={handleClearClick}
              className="text-[10px] font-mono tracking-[0.06em] text-[#E24B4A] hover:text-[#C0392B] bg-transparent border-none cursor-pointer"
            >
              CLEAR ALL
            </button>
          )
        )}
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
