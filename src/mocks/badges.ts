// 9종 퀘스트 / 뱃지 mock.
// matchday 퀘스트 풀과 동일 id 체계 사용.

export interface Quest {
  id: string; // 'quest-01'
  no: number; // 1~9
  name: string;
  rule: string;
  icon: string; // 데모: 이모지
  sponsorName?: string; // B2B 네이밍 예: "거미줄 존 by ○○카페"
}

export const QUESTS: Quest[] = [
  { id: "quest-01", no: 1, name: "하이라이트의 주인공", rule: "내 격자에서 골 발생", icon: "⚽" },
  { id: "quest-02", no: 2, name: "골문 수호자", rule: "내 격자 앞 선방/세이브", icon: "🧤", sponsorName: "세이브 존 by 그린카페" },
  { id: "quest-03", no: 3, name: "거미줄 존", rule: "내 격자에서 태클 성공", icon: "🕸️" },
  { id: "quest-04", no: 4, name: "패스 마스터", rule: "내 격자 경유 키패스", icon: "🎯" },
  { id: "quest-05", no: 5, name: "드리블 돌파", rule: "내 격자에서 드리블 돌파", icon: "💨" },
  { id: "quest-06", no: 6, name: "공중전 승리", rule: "내 격자에서 헤더 경합 승리", icon: "🦅" },
  { id: "quest-07", no: 7, name: "결정적 클리어", rule: "내 격자에서 위기 클리어", icon: "🛡️" },
  { id: "quest-08", no: 8, name: "스프린트 존", rule: "내 격자에서 최고속도 스프린트", icon: "⚡" },
  { id: "quest-09", no: 9, name: "프리킥 명소", rule: "내 격자 근처 프리킥 득점", icon: "✨" },
];

// 리워드 단계 마일스톤.
export const MILESTONES = [1, 3, 5, 10] as const;

export interface MilestoneProgress {
  current: number;
  next: number | null; // null = 최고 단계 달성
  prev: number; // 직전 마일스톤(진행률 기준점)
  ratio: number; // 0~1
  maxed: boolean;
}

export function milestoneProgress(count: number): MilestoneProgress {
  const next = MILESTONES.find((m) => m > count) ?? null;
  const prev = [...MILESTONES].reverse().find((m) => m <= count) ?? 0;
  if (next === null) {
    return { current: count, next: null, prev, ratio: 1, maxed: true };
  }
  const ratio = (count - prev) / (next - prev);
  return { current: count, next, prev, ratio: Math.max(0, Math.min(1, ratio)), maxed: false };
}

// 문자열 → 0~1 해시(grids.ts와 동일 알고리즘).
function hash01(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

// 격자별 누적 뱃지 수(데모, deterministic).
export function badgesForGrid(gridId: string): number {
  return Math.floor(hash01(gridId + "bdg") * 6); // 0~5
}

export interface BadgeEarn {
  matchLabel: string;
  questId: string;
  questName: string;
  icon: string;
}

const EARN_MATCHES = [
  "24R vs 울산",
  "22R vs 서울",
  "19R vs 포항",
  "17R vs 강원",
  "14R vs 대구",
  "11R vs 인천",
];

// 매치별 뱃지 획득 타임라인 — 총 badgeCount만큼(데모, deterministic).
export function badgeTimeline(total: number): BadgeEarn[] {
  const out: BadgeEarn[] = [];
  for (let i = 0; i < total; i++) {
    const q = QUESTS[Math.floor(hash01("earn" + i) * QUESTS.length)];
    out.push({
      matchLabel: EARN_MATCHES[i % EARN_MATCHES.length],
      questId: q.id,
      questName: q.name,
      icon: q.icon,
    });
  }
  return out;
}

// 퀘스트별 누적 횟수 — 총 badgeCount를 9종에 분배(데모, deterministic).
export function questCounts(total: number): Record<string, number> {
  const out: Record<string, number> = {};
  if (total <= 0) {
    QUESTS.forEach((q) => (out[q.id] = 0));
    return out;
  }
  // 가중치 합으로 비례 분배 후 잔여를 앞에서부터 채움.
  const weights = QUESTS.map((q) => 0.5 + hash01(q.id + "w"));
  const sum = weights.reduce((a, b) => a + b, 0);
  let assigned = 0;
  QUESTS.forEach((q, i) => {
    const n = Math.floor((weights[i] / sum) * total);
    out[q.id] = n;
    assigned += n;
  });
  let rest = total - assigned;
  let i = 0;
  while (rest > 0) {
    out[QUESTS[i % QUESTS.length].id] += 1;
    rest--;
    i++;
  }
  return out;
}
