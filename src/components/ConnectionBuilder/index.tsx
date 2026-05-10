"use client";

import type {
  ConnectionBuilder,
  BuilderStatus,
  Subject,
  RelationshipType,
} from "@/types";
import { RELATIONSHIP_TYPES, RELATIONSHIP_COLORS } from "@/types";
import Chip from "@/components/Chip";
import RelCard from "./RelCard";

const STEPS: Exclude<BuilderStatus, "IDLE">[] = [
  "SOURCE",
  "RELATIONSHIP",
  "TARGET",
  "COMPLETE",
];

const STEP_LABELS: Record<BuilderStatus, string> = {
  IDLE: "Connection Builder",
  SOURCE: "Select source",
  RELATIONSHIP: "Select relationship",
  TARGET: "Select target",
  COMPLETE: "Confirm connection",
};

interface Props {
  builder: ConnectionBuilder;
  status: BuilderStatus;
  subjects: Subject[];
  availableTargets: Subject[];
  onStart: () => void;
  onSelectSource: (subject: Subject) => void;
  onSelectType: (type: RelationshipType) => void;
  onSelectTarget: (subject: Subject) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConnectionBuilderUI({
  builder,
  status,
  subjects,
  availableTargets,
  onStart,
  onSelectSource,
  onSelectType,
  onSelectTarget,
  onConfirm,
  onCancel,
}: Props) {
  const isActive = status !== "IDLE";
  const stepIndex = isActive
    ? STEPS.indexOf(status as Exclude<BuilderStatus, "IDLE">)
    : -1;

  return (
    <div className="bg-surface border border-pin rounded-xl p-4 mb-4">
      <div className="flex justify-between items-center mb-3.5">
        <div className="text-[10px] font-mono tracking-[0.12em] text-stone uppercase">
          {isActive ? `Step: ${STEP_LABELS[status]}` : STEP_LABELS.IDLE}
        </div>
        {isActive && (
          <button
            onClick={onCancel}
            className="text-[11px] font-mono tracking-[0.06em] text-[#E24B4A] hover:text-[#C0392B] bg-transparent border-none cursor-pointer"
          >
            CANCEL
          </button>
        )}
      </div>

      {/* Progress bar */}
      {isActive && (
        <div className="flex gap-1 mb-3.5">
          {STEPS.map((step, i) => (
            <div
              key={step}
              className={[
                "flex-1 h-[3px] rounded-sm transition-colors",
                i < stepIndex
                  ? "bg-thread"
                  : i === stepIndex
                    ? "bg-[#AFA9EC]"
                    : "bg-pin",
              ].join(" ")}
            />
          ))}
        </div>
      )}

      {/* In-progress summary */}
      {isActive && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cork mb-3.5 text-[12px]">
          <span className={builder.source ? "text-ink" : "text-ash"}>
            {builder.source
              ? `${builder.source.symbol} ${builder.source.name}`
              : "_ _ _"}
          </span>
          <span className="text-pin">→</span>
          <span
            className="font-medium"
            style={
              builder.type
                ? { color: RELATIONSHIP_COLORS[builder.type].color }
                : undefined
            }
          >
            <span className={!builder.type ? "text-ash font-normal" : ""}>
              {builder.type ? builder.type.toUpperCase() : "_ _ _"}
            </span>
          </span>
          <span className="text-pin">→</span>
          <span className={builder.target ? "text-ink" : "text-ash"}>
            {builder.target
              ? `${builder.target.symbol} ${builder.target.name}`
              : "_ _ _"}
          </span>
        </div>
      )}

      {/* IDLE — prompt to start */}
      {!isActive && (
        <button
          onClick={onStart}
          className="w-full py-2.5 rounded-lg border border-dashed border-[#C4C2BA] bg-transparent text-stone text-[12px] font-mono tracking-[0.06em] cursor-pointer hover:border-pin hover:text-stone transition-colors"
        >
          + ADD CONNECTION
        </button>
      )}

      {/* SOURCE — pick a subject */}
      {status === "SOURCE" && (
        <div className="flex flex-wrap gap-1.5">
          {subjects.map((s) => (
            <Chip
              key={s.name}
              subject={s}
              selected={builder.source?.name === s.name}
              onClick={() => onSelectSource(s)}
            />
          ))}
        </div>
      )}

      {/* RELATIONSHIP — pick a type */}
      {status === "RELATIONSHIP" && (
        <div className="flex flex-wrap gap-1.5">
          {RELATIONSHIP_TYPES.map((t) => (
            <RelCard
              key={t}
              type={t}
              selected={builder.type === t}
              onClick={() => onSelectType(t)}
            />
          ))}
        </div>
      )}

      {/* TARGET — pick a subject */}
      {status === "TARGET" && (
        <div className="flex flex-wrap gap-1.5">
          {availableTargets.length > 0 ? (
            availableTargets.map((s) => (
              <Chip
                key={s.name}
                subject={s}
                selected={builder.target?.name === s.name}
                onClick={() => onSelectTarget(s)}
              />
            ))
          ) : (
            <span className="text-[12px] text-ash font-mono">
              No valid targets remaining for this connection.
            </span>
          )}
        </div>
      )}

      {/* COMPLETE — confirm or cancel */}
      {status === "COMPLETE" && (
        <div className="flex gap-2">
          <button
            onClick={onConfirm}
            className="flex-1 py-[9px] rounded-lg bg-ink border-none text-white dark:text-cork text-[12px] font-mono tracking-[0.07em] font-medium cursor-pointer hover:bg-[#444440] dark:hover:bg-[#D5D3CE] transition-colors"
          >
            CONFIRM
          </button>
          <button
            onClick={onCancel}
            className="px-[18px] py-[9px] rounded-lg bg-transparent border border-pin text-[#E24B4A] text-[12px] font-mono tracking-[0.06em] cursor-pointer hover:border-[#E24B4A] transition-colors"
          >
            CANCEL
          </button>
        </div>
      )}
    </div>
  );
}
