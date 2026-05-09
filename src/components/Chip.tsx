"use client";

import type { Subject } from "@/types";

interface Props {
  subject: Subject;
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export default function Chip({
  subject,
  selected = false,
  disabled = false,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        "inline-flex items-center gap-1.5 px-3.5 py-[5px] rounded-full",
        "text-[13px] font-mono tracking-[0.01em] border transition-all",
        "cursor-pointer disabled:cursor-not-allowed disabled:opacity-40",
        selected
          ? "border-thread bg-thread-light text-[#3C3489] dark:text-thread"
          : "border-pin bg-surface text-ink",
      ].join(" ")}
    >
      <span className="text-[15px]">{subject.symbol}</span>
      {subject.name}
    </button>
  );
}
