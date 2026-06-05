// 매치데이 mock — 경기 정보, 오늘의 퀘스트, 라이브 이벤트 스트림.

import { QUESTS, type Quest } from "./badges";
import { GRIDS } from "./grids";

export interface TeamSide {
  name: string;
  short: string;
  logo: string; // 데모: 이모지
}

export interface MatchInfo {
  round: string;
  home: TeamSide;
  away: TeamSide;
  homeScore: number;
  awayScore: number;
  minuteLabel: string; // '전반 23\''
  isLive: boolean;
}

export const MATCH: MatchInfo = {
  round: "K리그1 24R",
  home: { name: "전북 현대", short: "전북", logo: "🟢" },
  away: { name: "울산 HD", short: "울산", logo: "🔵" },
  homeScore: 2,
  awayScore: 1,
  minuteLabel: "후반 67'",
  isLive: true,
};

// 9종 풀 중 오늘 활성 3종.
export const TODAY_QUEST_IDS = ["quest-01", "quest-03", "quest-08"];

export function todaysQuests(): Quest[] {
  return QUESTS.filter((q) => TODAY_QUEST_IDS.includes(q.id));
}

// 격자별 이벤트 미리보기(공통). 잔여 명장면 많은 signature 우선.
export function eventPreviewGrids(limit = 6) {
  return GRIDS.filter((g) => g.zone === "signature")
    .slice(0, limit)
    .map((g) => ({ gridId: g.id, zone: g.zone }));
}

export interface LiveEvent {
  ts: number;
  gridId: string;
  questId: string;
  label: string; // '⚽ J-17 격자에서 골!'
  isMine: boolean;
}

const EVENT_VERBS: Record<string, { icon: string; verb: string; badge: string }> = {
  "quest-01": { icon: "⚽", verb: "골!", badge: "하이라이트의 주인공" },
  "quest-03": { icon: "🕸️", verb: "태클 성공!", badge: "거미줄 존" },
  "quest-08": { icon: "⚡", verb: "스프린트 폭발!", badge: "스프린트 존" },
};

// 후보 격자 풀(미보유 일반 이벤트용).
const POOL_GRID_IDS = GRIDS.filter((_, i) => i % 17 === 0).map((g) => g.id);

let seq = 0;

// 라이브 이벤트 1건 생성. 25% 확률로 내 격자에서 발생(보유 시).
export function nextLiveEvent(ownedGrids: string[]): LiveEvent {
  seq += 1;
  const qid = TODAY_QUEST_IDS[seq % TODAY_QUEST_IDS.length];
  const mineRoll = ownedGrids.length > 0 && Math.random() < 0.25;
  const gridId = mineRoll
    ? ownedGrids[Math.floor(Math.random() * ownedGrids.length)]
    : POOL_GRID_IDS[Math.floor(Math.random() * POOL_GRID_IDS.length)];
  const v = EVENT_VERBS[qid];

  return {
    ts: Date.now(),
    gridId,
    questId: qid,
    label: `${v.icon} ${gridId} 격자에서 ${v.verb}`,
    isMine: ownedGrids.includes(gridId),
  };
}

export function badgeNameFor(questId: string): string {
  return EVENT_VERBS[questId]?.badge ?? "뱃지";
}

// ── 인사이트(종료 후) ─────────────────────────────
export interface GridStat {
  gridId: string;
  shots: number;
  passes: number;
  tackles: number;
}

// 보유 격자별 데이터(데모, deterministic).
function hash01(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

export function gridStatsFor(gridId: string): GridStat {
  return {
    gridId,
    shots: 1 + Math.floor(hash01(gridId + "sh") * 6),
    passes: 5 + Math.floor(hash01(gridId + "pa") * 25),
    tackles: Math.floor(hash01(gridId + "ta") * 8),
  };
}

export interface InsightEvent {
  minute: string;
  gridId: string;
  text: string;
  icon: string;
}

export function insightTimeline(ownedGrids: string[]): InsightEvent[] {
  const minutes = ["12'", "27'", "41'", "58'", "67'", "84'"];
  return ownedGrids.flatMap((gid, gi) =>
    minutes
      .filter((_, mi) => hash01(gid + mi) > 0.55)
      .map((m, mi) => {
        const v = Object.values(EVENT_VERBS)[(gi + mi) % 3];
        return {
          minute: m,
          gridId: gid,
          text: `${gid} ${v.verb}`,
          icon: v.icon,
        };
      }),
  );
}
