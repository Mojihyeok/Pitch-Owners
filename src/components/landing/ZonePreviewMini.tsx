// 랜딩 Zone 미리보기 — 그라운드 탑뷰 미니 SVG + 3존 색.
const COLS = 12;
const ROWS = 14;
const CELL = 10;
const GAP = 1.6;
const W = COLS * CELL;
const H = ROWS * CELL;

function zoneFill(row: number, col: number): string {
  const centralCol = col >= 4 && col <= 9;
  const nearGoal = row <= 2 || row >= ROWS - 3;
  const centerRow = row >= 6 && row <= 7;
  if (centralCol && (nearGoal || centerRow)) return "fill-zone-signature";
  const edge = col <= 1 || col >= COLS - 1 || row === 0 || row === ROWS - 1;
  if (edge) return "fill-zone-basic";
  return "fill-zone-dynamic";
}

export function ZonePreviewMini() {
  const cells = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      cells.push({ row, col });
    }
  }

  return (
    <div className="overflow-hidden rounded-card bg-turf-900 p-3">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Zone 미리보기">
        <rect x={0} y={0} width={W} height={H} rx={3} className="fill-turf-700" />
        {cells.map(({ row, col }) => (
          <rect
            key={`${row}-${col}`}
            x={col * CELL + GAP / 2}
            y={row * CELL + GAP / 2}
            width={CELL - GAP}
            height={CELL - GAP}
            rx={1.5}
            className={zoneFill(row, col)}
          />
        ))}
        <g className="pointer-events-none fill-none stroke-ink-high/40" strokeWidth={0.8}>
          <rect x={3} y={3} width={W - 6} height={H - 6} rx={2} />
          <line x1={3} y1={H / 2} x2={W - 3} y2={H / 2} />
          <circle cx={W / 2} cy={H / 2} r={12} />
        </g>
      </svg>
    </div>
  );
}
