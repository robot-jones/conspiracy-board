import type { Subject, Connection, RelationshipType } from "@/types";
import { RELATIONSHIP_COLORS } from "@/types";

interface NodePosition extends Subject {
  x: number;
  y: number;
}

function getNodePositions(
  subjects: Subject[],
  cx: number,
  cy: number,
  rx: number,
  ry: number
): NodePosition[] {
  return subjects.map((s, i) => {
    const angle = (2 * Math.PI * i) / subjects.length - Math.PI / 2;
    return { ...s, x: cx + rx * Math.cos(angle), y: cy + ry * Math.sin(angle) };
  });
}

// "Is the same as" is too long to fit in the label pill — abbreviate on canvas only.
function getBoardLabel(type: RelationshipType): string {
  return type === "Is the same as" ? "Same as" : type;
}

interface Props {
  subjects: Subject[];
  connections: Connection[];
}

export default function Board({ subjects, connections }: Props) {
  const W = 560,
    H = 320;
  const cx = W / 2,
    cy = H / 2;
  const nodes = getNodePositions(subjects, cx, cy, 210, 128);
  const nodeMap = new Map(nodes.map((n) => [n.name, n]));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
      {connections.map((conn, i) => {
        const s = nodeMap.get(conn.source.name);
        const t = nodeMap.get(conn.target.name);
        if (!s || !t) return null;

        const { color } = RELATIONSHIP_COLORS[conn.type];
        const dx = t.x - s.x,
          dy = t.y - s.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const ux = dx / len,
          uy = dy / len;
        const pad = 28;
        const x1 = s.x + ux * pad,
          y1 = s.y + uy * pad;
        const x2 = t.x - ux * pad,
          y2 = t.y - uy * pad;
        const mx = (s.x + t.x) / 2,
          my = (s.y + t.y) / 2;

        return (
          <g key={i}>
            <defs>
              <marker
                id={`arrow-${i}`}
                markerWidth="7"
                markerHeight="7"
                refX="6"
                refY="3.5"
                orient="auto"
              >
                <path d="M0,0 L7,3.5 L0,7 Z" fill={color} opacity="0.8" />
              </marker>
            </defs>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={color}
              strokeWidth="1.5"
              strokeOpacity="0.6"
              markerEnd={`url(#arrow-${i})`}
            />
            <rect
              x={mx - 40}
              y={my - 9}
              width="80"
              height="18"
              rx="9"
              style={{ fill: "var(--color-surface)" }}
              stroke={color}
              strokeWidth="0.75"
              opacity="0.92"
            />
            <text
              x={mx}
              y={my + 5}
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="'DM Mono', monospace"
              fill={color}
              fontWeight="500"
              letterSpacing="0.02em"
            >
              {getBoardLabel(conn.type).toUpperCase()}
            </text>
          </g>
        );
      })}

      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x}
            cy={n.y}
            r="24"
            style={{ fill: "var(--color-surface)", stroke: "var(--color-pin)" }}
            strokeWidth="1"
          />
          <text
            x={n.x}
            y={n.y + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="18"
          >
            {n.symbol}
          </text>
          <text
            x={n.x}
            y={n.y + 34}
            textAnchor="middle"
            fontSize="9"
            fontFamily="'DM Mono', monospace"
            style={{ fill: "var(--color-slate)" }}
            letterSpacing="0.04em"
          >
            {n.name.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}
