// 그라운드 맵 mock 데이터 — 442 격자(데모 22행 × 20열 = 440).
// 모든 값은 id 기반 deterministic 생성 → SSR/CSR 일치.
// 가격·정원은 mock에 저장하지 않고 zonePolicy(priceOf/maxOf)에서 파생.

import { maxOf, type Zone } from "@/lib/zonePolicy";

export type { Zone };

export interface GridHighlight {
  matchLabel: string; // '24R vs 울산'
  eventText: string; // '후반 88분 결승골'
  thumbnail: string; // 데모: 이모지
}

export interface CrewMember {
  nickname: string;
  avatar: string; // 데모: 이모지
}

export interface Grid {
  id: string; // 'J-17'
  row: number; // 0-indexed (세로, 골→골)
  col: number; // 1-indexed (가로, 너비)
  zone: Zone;
  // 가격·정원은 zonePolicy에서 파생(priceOf/maxOf). mock엔 점유 현황만.
  slotsTaken: number; // 0 ~ maxOf(zone)
  highlights: GridHighlight[];
  ownedByMe?: boolean; // 런타임(store)에서 주입
  crewMembers?: CrewMember[];
}

export const GRID_ROWS = 22;
export const GRID_COLS = 20;

const ROW_LETTERS = "ABCDEFGHIJKLMNOPQRSTUV"; // 22자

const ZONE_LABEL: Record<Zone, string> = {
  signature: "시그니처 존",
  dynamic: "다이내믹 존",
  basic: "베이직 존",
};

export function zoneLabel(zone: Zone): string {
  return ZONE_LABEL[zone];
}

// 문자열 → 안정적 해시(0~1).
function hash01(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // 부호 제거 후 0~1 정규화
  return ((h >>> 0) % 10000) / 10000;
}

// 위치 → Zone. 골문 앞/센터 중앙 = signature, 외곽 = basic, 나머지 = dynamic.
function zoneFor(row: number, col: number): Zone {
  const centralCol = col >= 7 && col <= 13;
  const nearGoal = row <= 3 || row >= GRID_ROWS - 4;
  const centerRow = row >= 9 && row <= 12;
  if (centralCol && (nearGoal || centerRow)) return "signature";

  const edge = col <= 2 || col >= GRID_COLS - 1 || row === 0 || row === GRID_ROWS - 1;
  if (edge) return "basic";

  return "dynamic";
}


const MATCH_LABELS = [
  "24R vs 울산",
  "22R vs 서울",
  "19R vs 포항",
  "17R vs 강원",
  "14R vs 대구",
];
const EVENT_TEXTS = [
  "후반 88분 결승골",
  "전반 12분 선제골",
  "환상적인 프리킥 골",
  "결정적 골라인 클리어",
  "페널티 세이브",
  "중거리 동점골",
];
const EVENT_EMOJI = ["⚽", "🔥", "🧤", "✨", "🎯"];
const CREW_NICKS = ["초록불꽃", "잔디지기", "골문수호", "측면돌파", "센터백형님"];
const CREW_AVATARS = ["🦊", "🐯", "🦁", "🐻", "🐺"];

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.floor(seed * arr.length) % arr.length];
}

function buildHighlights(id: string, zone: Zone): GridHighlight[] {
  const h = hash01(id + "hl");
  // signature는 명장면 많고, basic은 드물게.
  const count =
    zone === "signature" ? 1 + Math.round(h) : zone === "dynamic" ? Math.round(h) : 0;
  const out: GridHighlight[] = [];
  for (let i = 0; i < count; i++) {
    const s = hash01(id + "h" + i);
    out.push({
      matchLabel: pick(MATCH_LABELS, s),
      eventText: pick(EVENT_TEXTS, hash01(id + "e" + i)),
      thumbnail: pick(EVENT_EMOJI, hash01(id + "t" + i)),
    });
  }
  return out;
}

function buildCrew(id: string): CrewMember[] {
  const n = 1 + Math.floor(hash01(id + "crew") * 3); // 1~3
  const out: CrewMember[] = [];
  for (let i = 0; i < n; i++) {
    const s = hash01(id + "c" + i);
    out.push({ nickname: pick(CREW_NICKS, s), avatar: pick(CREW_AVATARS, s) });
  }
  return out;
}

function buildGrid(row: number, col: number): Grid {
  const id = `${ROW_LETTERS[row]}-${col}`;
  const zone = zoneFor(row, col);
  // 점유는 0 ~ Zone 정원(maxOf). 가격·정원은 zonePolicy에서 파생.
  const cap = maxOf(zone);
  const slotsTaken = Math.floor(hash01(id + "slot") * (cap + 1)); // 0~cap

  return {
    id,
    row,
    col,
    zone,
    slotsTaken,
    highlights: buildHighlights(id, zone),
    crewMembers: buildCrew(id),
  };
}

export const GRIDS: Grid[] = (() => {
  const out: Grid[] = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 1; col <= GRID_COLS; col++) {
      out.push(buildGrid(row, col));
    }
  }
  return out;
})();

export const GRID_TOTAL = GRIDS.length;

export function getGridById(id: string): Grid | undefined {
  return GRIDS.find((g) => g.id === id);
}

// 추가 입양 추천(데모): signature/dynamic 중 잔여 슬롯 있고 명장면 많은 순.
export function recommendGrids(excludeIds: string[], limit = 6): Grid[] {
  return GRIDS.filter(
    (g) =>
      !excludeIds.includes(g.id) &&
      g.slotsTaken < maxOf(g.zone) &&
      g.zone !== "basic",
  )
    .sort((a, b) => b.highlights.length - a.highlights.length)
    .slice(0, limit);
}
