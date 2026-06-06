// Zone 정책 — 가격·정원의 유일한 출처(single source).
// 다른 모든 화면은 priceOf/maxOf/perHeadOf 로 파생. 하드코딩 금지.

export type Zone = "basic" | "dynamic" | "signature";

export const ZONE_POLICY = {
  basic: { label: "Basic", maxMembers: 2, totalKRW: 60000 }, // 최대 2명 / 6만원
  dynamic: { label: "Dynamic", maxMembers: 3, totalKRW: 150000 }, // 최대 3명 / 15만원
  signature: { label: "Signature", maxMembers: 4, totalKRW: 400000 }, // 최대 4명 / 40만원
} as const;

export const ZONES: Zone[] = ["basic", "dynamic", "signature"];

export const priceOf = (z: Zone) => ZONE_POLICY[z].totalKRW;
export const maxOf = (z: Zone) => ZONE_POLICY[z].maxMembers;
export const perHeadOf = (z: Zone, size: number) =>
  Math.round(ZONE_POLICY[z].totalKRW / Math.max(1, size));
