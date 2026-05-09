"use client";

import { useState } from "react";
import type { Connection, ConnectionBuilder, Puzzle, Subject } from "@/types";
import { INITIAL_BUILDER, getBuilderStatus } from "@/types";
import { scoreAttempt, getMissedConnections } from "@/lib/scoring";
import Board from "@/components/Board";
import ConnectionBuilderUI from "@/components/ConnectionBuilder";
import ConnectionList from "@/components/ConnectionList";

const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

function formatPuzzleDate(dateStr: string): string {
  const [, month, day] = dateStr.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}`;
}

interface Props {
  puzzle: Puzzle;
}

export default function GameBoard({ puzzle }: Props) {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [builder, setBuilder] = useState<ConnectionBuilder>(INITIAL_BUILDER);
  const [submitted, setSubmitted] = useState(false);

  const status = getBuilderStatus(builder);

  const score = submitted ? scoreAttempt(connections, puzzle.solution) : null;
  const missed = submitted ? getMissedConnections(connections, puzzle.solution) : [];

  const availableTargets: Subject[] = puzzle.subjects.filter((s) => {
    if (!builder.source) return true;
    if (s.name === builder.source.name) return false;
    return !connections.some(
      (c) =>
        c.source.name === builder.source!.name &&
        c.type === builder.type &&
        c.target.name === s.name
    );
  });

  const handleConfirm = () => {
    const { source, type, target } = builder;
    if (source && type && target) {
      setConnections((prev) => [...prev, { source, type, target }]);
      setBuilder(INITIAL_BUILDER);
    }
  };

  return (
    <div className="min-h-screen bg-cork font-mono">
      <header className="border-b border-pin bg-white px-6 py-3.5 flex items-baseline justify-between">
        <div>
          <span className="text-[10px] tracking-[0.14em] text-stone">
            {formatPuzzleDate(puzzle.date)} —{" "}
          </span>
          <span className="text-base font-medium text-ink tracking-[0.04em]">
            THE CONSPIRACY BOARD
          </span>
        </div>
        <div className="text-[10px] text-ash tracking-[0.06em]">
          {score
            ? `${score.matched} / ${score.total} FOUND`
            : `${connections.length} / ${puzzle.solution.connections.length} CONNECTIONS`}
        </div>
      </header>

      <div className="max-w-[600px] mx-auto px-4">
        <div className="bg-white border border-pin rounded-xl mt-5 mb-4 overflow-hidden">
          <Board subjects={puzzle.subjects} connections={connections} />
        </div>

        {!submitted && (
          <ConnectionBuilderUI
            builder={builder}
            status={status}
            subjects={puzzle.subjects}
            availableTargets={availableTargets}
            onStart={() => setBuilder({ ...INITIAL_BUILDER, active: true })}
            onSelectSource={(s) => setBuilder((b) => ({ ...b, source: s }))}
            onSelectType={(t) => setBuilder((b) => ({ ...b, type: t }))}
            onSelectTarget={(s) => setBuilder((b) => ({ ...b, target: s }))}
            onConfirm={handleConfirm}
            onCancel={() => setBuilder(INITIAL_BUILDER)}
          />
        )}

        {!submitted && status === "IDLE" && connections.length > 0 && (
          <button
            onClick={() => setSubmitted(true)}
            className="w-full py-[9px] rounded-lg bg-ink border-none text-white text-[12px] font-mono tracking-[0.07em] font-medium cursor-pointer hover:bg-[#444440] transition-colors mb-4"
          >
            SUBMIT
          </button>
        )}

        {submitted && score && (
          <div className="bg-white border border-pin rounded-xl p-4 mb-4">
            <div className="text-[10px] font-mono tracking-[0.12em] text-stone uppercase mb-3">
              Result
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-mono text-ink font-medium">{score.matched}</span>
              <span className="text-lg font-mono text-stone">/ {score.total}</span>
              <span className="text-[12px] font-mono text-stone">connections found</span>
            </div>
            {score.matched === score.total && (
              <div className="text-[12px] font-mono text-[#1D9E75] font-medium mt-1 mb-3">
                Perfect score!
              </div>
            )}
            {missed.length > 0 && (
              <div className={score.matched === score.total ? "" : "mt-3"}>
                <div className="text-[10px] font-mono tracking-[0.12em] text-stone uppercase mb-2">
                  Missed
                </div>
                <div className="flex flex-col gap-1.5">
                  {missed.map((conn, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-2.5 py-[7px] rounded-lg bg-cork border border-[#E8E7E0] font-mono text-[12px] text-ash"
                    >
                      <span>{conn.source.symbol} {conn.source.name}</span>
                      <span className="text-pin">→</span>
                      <span className="uppercase tracking-[0.04em]">{conn.type}</span>
                      <span className="text-pin">→</span>
                      <span>{conn.target.symbol} {conn.target.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {connections.length > 0 && (
          <ConnectionList
            connections={connections}
            onDelete={(i) =>
              setConnections((prev) => prev.filter((_, j) => j !== i))
            }
            submitted={submitted}
            solution={puzzle.solution}
          />
        )}
      </div>
    </div>
  );
}
