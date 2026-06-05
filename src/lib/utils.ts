// 조건부 className 병합 유틸 (외부 의존성 없이 단순 join).
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

// 원화 포맷: 250000 → '25만원'(만 단위) 또는 '250,000원'.
export function formatKRW(won: number): string {
  return `${won.toLocaleString("ko-KR")}원`;
}

// 만원 단위 축약: 250000 → '25만'.
export function formatManwon(won: number): string {
  return `${Math.round(won / 10000)}만`;
}
