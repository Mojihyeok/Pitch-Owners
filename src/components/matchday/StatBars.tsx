import type { GridStat } from "@/mocks/match";

interface StatBarsProps {
  stat: GridStat;
}

const ROWS: { key: keyof Omit<GridStat, "gridId">; label: string; max: number; fill: string }[] = [
  { key: "shots", label: "슈팅", max: 7, fill: "fill-zone-signature" },
  { key: "passes", label: "패스", max: 30, fill: "fill-turf-300" },
  { key: "tackles", label: "태클", max: 8, fill: "fill-turf-500" },
];

// 격자별 슈팅/패스/태클 간단 막대 차트(SVG).
export function StatBars({ stat }: StatBarsProps) {
  return (
    <svg viewBox="0 0 100 42" className="w-full" role="img" aria-label="격자 데이터">
      {ROWS.map((r, i) => {
        const v = stat[r.key];
        const y = i * 14 + 2;
        const w = Math.max(2, (v / r.max) * 60);
        return (
          <g key={r.key}>
            <text x={0} y={y + 7} className="fill-ink-mid" fontSize={5}>
              {r.label}
            </text>
            <rect x={16} y={y} width={60} height={8} rx={2} className="fill-bg-hover" />
            <rect x={16} y={y} width={w} height={8} rx={2} className={r.fill} />
            <text x={80} y={y + 7} className="fill-ink-high font-bold" fontSize={5.5}>
              {v}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
