"use client";

import { cn } from "@/lib/utils";
import {
  GRID_COLS,
  GRID_ROWS,
  type Grid,
  type Zone,
} from "@/mocks/grids";

const CELL = 10; // viewBox 단위
const GAP = 1.4;
const W = GRID_COLS * CELL;
const H = GRID_ROWS * CELL;

// 줌 레벨 → scale 클래스 (inline style 회피).
const ZOOM_CLASS = ["scale-100", "scale-125", "scale-150", "scale-[1.75]"];
export const ZOOM_MAX = ZOOM_CLASS.length - 1;

const ZONE_FILL: Record<Zone, string> = {
  signature: "fill-zone-signature",
  dynamic: "fill-zone-dynamic",
  basic: "fill-zone-basic",
};

interface PitchMapProps {
  grids: Grid[];
  ownedIds: string[];
  selectedId?: string;
  zoom: number;
  onSelect: (grid: Grid) => void;
}

export function PitchMap({
  grids,
  ownedIds,
  selectedId,
  zoom,
  onSelect,
}: PitchMapProps) {
  return (
    <div className="overflow-auto rounded-card bg-turf-900 p-2">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={cn(
          "h-auto w-full origin-top transition-transform",
          ZOOM_CLASS[zoom] ?? ZOOM_CLASS[0],
        )}
        role="img"
        aria-label="경기장 격자 맵"
      >
        {/* 잔디 배경 */}
        <rect x={0} y={0} width={W} height={H} className="fill-turf-700" rx={3} />

        {/* 격자 셀 */}
        {grids.map((g) => {
          const x = (g.col - 1) * CELL + GAP / 2;
          const y = g.row * CELL + GAP / 2;
          const size = CELL - GAP;
          const full = g.slotsTaken >= g.slotsTotal;
          const mine = ownedIds.includes(g.id);
          const selected = g.id === selectedId;

          return (
            <g key={g.id} onClick={() => onSelect(g)} className="cursor-pointer">
              <rect
                x={x}
                y={y}
                width={size}
                height={size}
                rx={1.5}
                className={cn(
                  ZONE_FILL[g.zone],
                  full && "fill-bg-hover opacity-40",
                  mine
                    ? "stroke-accent"
                    : selected
                      ? "stroke-ink-high"
                      : "stroke-transparent",
                  "transition-[stroke,opacity] hover:opacity-80",
                )}
                strokeWidth={mine ? 1.6 : selected ? 1.2 : 0}
              />
              {/* 내 격자 글로우(외곽 옐로우 링) */}
              {mine && (
                <rect
                  x={x - 0.6}
                  y={y - 0.6}
                  width={size + 1.2}
                  height={size + 1.2}
                  rx={2}
                  className="fill-none stroke-accent opacity-50"
                  strokeWidth={0.8}
                />
              )}
              {/* 만석 자물쇠 */}
              {full && (
                <text
                  x={x + size / 2}
                  y={y + size / 2 + 2}
                  textAnchor="middle"
                  className="fill-ink-low"
                  fontSize={4.5}
                >
                  🔒
                </text>
              )}
            </g>
          );
        })}

        {/* 피치 라인(흰선) 오버레이 */}
        <g className="pointer-events-none fill-none stroke-ink-high/40" strokeWidth={0.8}>
          <rect x={3} y={3} width={W - 6} height={H - 6} rx={2} />
          <line x1={3} y1={H / 2} x2={W - 3} y2={H / 2} />
          <circle cx={W / 2} cy={H / 2} r={22} />
          <circle cx={W / 2} cy={H / 2} r={1.5} className="fill-ink-high/40" />
          {/* 상단 페널티/골 박스 */}
          <rect x={W / 2 - 45} y={3} width={90} height={28} />
          <rect x={W / 2 - 22} y={3} width={44} height={12} />
          {/* 하단 페널티/골 박스 */}
          <rect x={W / 2 - 45} y={H - 31} width={90} height={28} />
          <rect x={W / 2 - 22} y={H - 15} width={44} height={12} />
        </g>
      </svg>
    </div>
  );
}
