// 가짜 매장 바코드 (코드 기반 deterministic 바 패턴). 실제 스캔 X.
function bars(seed: string, n: number): number[] {
  const out: number[] = [];
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  for (let i = 0; i < n; i++) {
    h ^= i + 0x9e3779b9;
    h = Math.imul(h, 16777619);
    out.push(((h >>> 0) % 3) + 1); // 굵기 1~3
  }
  return out;
}

interface BarcodeProps {
  value: string;
}

export function Barcode({ value }: BarcodeProps) {
  const pattern = bars(value, 48);
  // 각 바의 시작 x를 변형 없이 사전 계산(React Compiler immutability).
  const positions = pattern.reduce<number[]>((acc, w, i) => {
    const prev = i === 0 ? 0 : acc[i - 1] + pattern[i - 1] + 1;
    acc.push(prev);
    return acc;
  }, []);
  const total = pattern.reduce((a, b) => a + b + 1, 0);

  return (
    <div className="rounded-btn bg-ink-high p-3">
      <svg
        viewBox={`0 0 ${total} 30`}
        className="h-16 w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="매장 바코드"
      >
        {pattern.map((w, i) => (
          <rect
            key={i}
            x={positions[i]}
            y={0}
            width={w}
            height={30}
            className={i % 2 === 0 ? "fill-ink-invert" : "fill-ink-high"}
          />
        ))}
      </svg>
    </div>
  );
}
