import { cn } from "@/lib/utils";

// 디지털 카드용 가짜 QR (id 기반 deterministic 패턴). 실제 스캔 X.
function patternFor(seed: string, n: number): boolean[] {
  const out: boolean[] = [];
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  for (let i = 0; i < n * n; i++) {
    h ^= i + 0x9e3779b9;
    h = Math.imul(h, 16777619);
    out.push(((h >>> 0) & 1) === 1);
  }
  return out;
}

interface QrCardProps {
  value: string;
  size?: number; // 셀 개수(컬럼 수). Tailwind 기본 grid-cols 범위(≤12) 사용.
}

export function QrCard({ value, size = 12 }: QrCardProps) {
  const cells = patternFor(value, size);

  return (
    <div
      className={cn(
        "grid grid-cols-12 gap-0.5 rounded-btn bg-ink-high p-2",
      )}
      aria-label="디지털 카드 QR"
      role="img"
    >
      {cells.map((on, i) => (
        <span
          key={i}
          className={cn("aspect-square rounded-[1px]", on ? "bg-ink-invert" : "bg-ink-high")}
        />
      ))}
    </div>
  );
}
