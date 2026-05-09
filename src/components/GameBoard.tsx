"use client";

import { useState } from "react";
import type { Connection, ConnectionBuilder, Puzzle, Subject } from "@/types";
import { INITIAL_BUILDER, getBuilderStatus } from "@/types";
import Board from "@/components/Board";
import ConnectionBuilderUI from "@/components/ConnectionBuilder";
import ConnectionList from "@/components/ConnectionList";

interface Props {
  puzzle: Puzzle;
}

export default function GameBoard({ puzzle }: Props) {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [builder, setBuilder] = useState<ConnectionBuilder>(INITIAL_BUILDER);

  const status = getBuilderStatus(builder);

  const availableTargets: Subject[] = puzzle.subjects.filter((s) => {
    if (!builder.source) return true;
    if (s.name === builder.source.name) return false;
    return !connections.some(
      (c) =>
        c.source.name === builder.source!.name && // builder.source checked above
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
            DAY {puzzle.day} —{" "}
          </span>
          <span className="text-base font-medium text-ink tracking-[0.04em]">
            THE CONSPIRACY BOARD
          </span>
        </div>
        <div className="text-[10px] text-ash tracking-[0.06em]">
          {connections.length} CONNECTION{connections.length !== 1 ? "S" : ""}
        </div>
      </header>

      <div className="max-w-[600px] mx-auto px-4">
        <div className="bg-white border border-pin rounded-xl mt-5 mb-4 overflow-hidden">
          <Board subjects={puzzle.subjects} connections={connections} />
        </div>

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

        {connections.length > 0 && (
          <ConnectionList
            connections={connections}
            onDelete={(i) =>
              setConnections((prev) => prev.filter((_, j) => j !== i))
            }
          />
        )}
      </div>
    </div>
  );
}
