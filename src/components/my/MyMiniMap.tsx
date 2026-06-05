"use client";

import { GRIDS, GRID_COLS, GRID_ROWS } from "@/mocks/grids";
import { badgesForGrid } from "@/mocks/badges";

const CELL = 10;
const GAP = 1.4;
const W = GRID_COLS * CELL;
const H = GRID_ROWS * CELL;

interface MyMiniMapProps {
  ownedIds: string[];
}

// 내 격자 미니맵 — 보유 격자만 옐로우 하이라이트 + 누적 뱃지 수.
export function MyMiniMap({ ownedIds }: MyMiniMapProps) {
  return (
    <div className="overflow-hidden rounded-card bg-turf-900 p-2">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="내 격자 미니맵"
      >
        <rect x={0} y={0} width={W} height={H} className="fill-turf-700" rx={3} />

        {GRIDS.map((g) => {
          const x = (g.col - 1) * CELL + GAP / 2;
          const y = g.row * CELL + GAP / 2;
          const size = CELL - GAP;
          const mine = ownedIds.includes(g.id);
          const badges = mine ? badgesForGrid(g.id) : 0;

          return (
            <g key={g.id}>
              <rect
                x={x}
                y={y}
                width={size}
                height={size}
                rx={1.5}
                className={mine ? "fill-accent" : "fill-bg-base opacity-30"}
                stroke={undefined}
              />
              {mine && (
                <>
                  <rect
                    x={x - 0.6}
                    y={y - 0.6}
                    width={size + 1.2}
                    height={size + 1.2}
                    rx={2}
                    className="fill-none stroke-accent opacity-60"
                    strokeWidth={0.8}
                  />
                  {badges > 0 && (
                    <text
                      x={x + size / 2}
                      y={y + size / 2 + 2.2}
                      textAnchor="middle"
                      className="fill-ink-invert font-bold"
                      fontSize={5}
                    >
                      {badges}
                    </text>
                  )}
                </>
              )}
            </g>
          );
        })}

        {/* 피치 라인 */}
        <g className="pointer-events-none fill-none stroke-ink-high/30" strokeWidth={0.7}>
          <rect x={3} y={3} width={W - 6} height={H - 6} rx={2} />
          <line x1={3} y1={H / 2} x2={W - 3} y2={H / 2} />
          <circle cx={W / 2} cy={H / 2} r={20} />
        </g>
      </svg>
    </div>
  );
}
