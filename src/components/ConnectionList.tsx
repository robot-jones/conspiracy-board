"use client";

import type { Connection, RelationshipType } from "@/types";

// Static lookup so Tailwind scans these literal class strings.
const BADGE_CLASSES: Record<RelationshipType, string> = {
  Controls: "bg-[#FCEBEB] text-[#E24B4A] border-[#E24B4A]",
  Masks: "bg-[#EEEDFE] text-[#7F77DD] border-[#7F77DD]",
  Signals: "bg-[#E1F5EE] text-[#1D9E75] border-[#1D9E75]",
  Harvests: "bg-[#FAEEDA] text-[#BA7517] border-[#BA7517]",
  "Is the same as": "bg-[#E6F1FB] text-[#378ADD] border-[#378ADD]",
  "Distracts from": "bg-[#FBEAF0] text-[#D4537E] border-[#D4537E]",
};

interface Props {
  connections: Connection[];
  onDelete: (index: number) => void;
}

export default function ConnectionList({ connections, onDelete }: Props) {
  return (
    <div className="bg-white border border-pin rounded-xl p-4">
      <div className="text-[10px] font-mono tracking-[0.12em] text-stone uppercase mb-2.5">
        Connections ({connections.length})
      </div>
      <div className="flex flex-col gap-1.5">
        {connections.map((conn, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-2.5 py-[7px] rounded-lg bg-white border border-[#E8E7E0] font-mono text-[12px]"
          >
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
            <button
              onClick={() => onDelete(i)}
              className="ml-auto text-ash hover:text-stone text-sm leading-none px-0.5 bg-transparent border-none cursor-pointer"
              aria-label="Delete connection"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
