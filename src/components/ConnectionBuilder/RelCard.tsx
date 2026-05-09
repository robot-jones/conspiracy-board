"use client";

import type { RelationshipType } from "@/types";
import { RELATIONSHIP_DESCRIPTIONS } from "@/types";

// Static lookup so Tailwind scans these literal class strings.
const SELECTED_CLASSES: Record<RelationshipType, string> = {
  Controls: "border-[#E24B4A] bg-[#FCEBEB] text-[#E24B4A]",
  Masks: "border-[#7F77DD] bg-[#EEEDFE] text-[#7F77DD]",
  Signals: "border-[#1D9E75] bg-[#E1F5EE] text-[#1D9E75]",
  Harvests: "border-[#BA7517] bg-[#FAEEDA] text-[#BA7517]",
  "Is the same as": "border-[#378ADD] bg-[#E6F1FB] text-[#378ADD]",
  "Distracts from": "border-[#D4537E] bg-[#FBEAF0] text-[#D4537E]",
};

const DESC_SELECTED_CLASSES: Record<RelationshipType, string> = {
  Controls: "text-[#E24B4A]",
  Masks: "text-[#7F77DD]",
  Signals: "text-[#1D9E75]",
  Harvests: "text-[#BA7517]",
  "Is the same as": "text-[#378ADD]",
  "Distracts from": "text-[#D4537E]",
};

interface Props {
  type: RelationshipType;
  selected: boolean;
  onClick: () => void;
}

export default function RelCard({ type, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex flex-col items-start gap-0.5 px-3.5 py-2 rounded-lg",
        "text-[12px] font-mono border cursor-pointer transition-all min-w-[120px]",
        selected ? SELECTED_CLASSES[type] : "border-pin bg-white text-ink",
      ].join(" ")}
    >
      <span className="text-[11px] font-bold tracking-[0.07em]">
        {type.toUpperCase()}
      </span>
      <span
        className={`text-[10px] font-normal ${selected ? DESC_SELECTED_CLASSES[type] : "text-stone"}`}
      >
        {RELATIONSHIP_DESCRIPTIONS[type]}
      </span>
    </button>
  );
}
