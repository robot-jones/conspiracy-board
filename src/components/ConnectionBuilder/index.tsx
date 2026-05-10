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
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1.5 mb-3.5">
          <div className="flex flex-col items-center justify-center px-2 py-2.5 rounded-lg bg-cork min-h-[52px] text-center gap-0.5">
            {builder.source ? (
              <>
                <span className="text-[15px] leading-none">{builder.source.symbol}</span>
                <span className="text-[9px] font-mono text-ink tracking-[0.05em]">{builder.source.name.toUpperCase()}</span>
              </>
            ) : (
              <span className="text-[9px] font-mono text-ash tracking-[0.1em]">FROM</span>
            )}
          </div>

          <span className="text-pin text-[10px]">→</span>

          <div className="flex flex-col items-center justify-center px-2 py-2.5 rounded-lg bg-cork min-h-[52px] text-center">
            {builder.type ? (
              <span
                className="text-[9px] font-mono font-bold tracking-[0.05em] leading-snug"
                style={{ color: RELATIONSHIP_COLORS[builder.type].color }}
              >
                {builder.type.toUpperCase()}
              </span>
            ) : (
              <span className="text-[9px] font-mono text-ash tracking-[0.1em]">VIA</span>
            )}
          </div>

          <span className="text-pin text-[10px]">→</span>

          <div className="flex flex-col items-center justify-center px-2 py-2.5 rounded-lg bg-cork min-h-[52px] text-center gap-0.5">
            {builder.target ? (
              <>
                <span className="text-[15px] leading-none">{builder.target.symbol}</span>
                <span className="text-[9px] font-mono text-ink tracking-[0.05em]">{builder.target.name.toUpperCase()}</span>
              </>
            ) : (
              <span className="text-[9px] font-mono text-ash tracking-[0.1em]">TO</span>
            )}
          </div>
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
            className="flex-1 py-[9px] rounded-lg bg-[#2C7BE5] border-none text-white text-[12px] font-mono tracking-[0.07em] font-medium cursor-pointer hover:bg-[#2168C7] transition-colors"
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
