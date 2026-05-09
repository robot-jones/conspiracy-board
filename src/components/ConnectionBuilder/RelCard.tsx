"use client";

import type { RelationshipType } from "@/types";
import { RELATIONSHIP_DESCRIPTIONS } from "@/types";

// Static lookup so Tailwind scans these literal class strings.
const SELECTED_CLASSES: Record<RelationshipType, string> = {
  Controls:        "border-[#E24B4A] bg-[#FCEBEB] dark:bg-[#3D1212] text-[#E24B4A] dark:text-[#FF7575]",
  Masks:           "border-[#7F77DD] bg-[#EEEDFE] dark:bg-[#252244] text-[#7F77DD] dark:text-[#A09AEE]",
  Signals:         "border-[#1D9E75] bg-[#E1F5EE] dark:bg-[#0E2E20] text-[#1D9E75] dark:text-[#3EC99A]",
  Harvests:        "border-[#BA7517] bg-[#FAEEDA] dark:bg-[#2E1A00] text-[#BA7517] dark:text-[#E0972A]",
  "Is the same as":"border-[#378ADD] bg-[#E6F1FB] dark:bg-[#0E2035] text-[#378ADD] dark:text-[#60AAFF]",
  "Distracts from":"border-[#D4537E] bg-[#FBEAF0] dark:bg-[#3A0E20] text-[#D4537E] dark:text-[#FF80A8]",
};

const DESC_SELECTED_CLASSES: Record<RelationshipType, string> = {
  Controls:        "text-[#E24B4A] dark:text-[#FF7575]",
  Masks:           "text-[#7F77DD] dark:text-[#A09AEE]",
  Signals:         "text-[#1D9E75] dark:text-[#3EC99A]",
  Harvests:        "text-[#BA7517] dark:text-[#E0972A]",
  "Is the same as":"text-[#378ADD] dark:text-[#60AAFF]",
  "Distracts from":"text-[#D4537E] dark:text-[#FF80A8]",
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
        selected ? SELECTED_CLASSES[type] : "border-pin bg-surface text-ink",
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
