// 전광판 메시지 mock.

export const BOARD_MIN_BADGES = 10;
export const BOARD_MAX_LEN = 40;

// 부적절 표현 1차 클라이언트 필터 (욕설/광고/정치 키워드 — 데모).
export const BANNED_KEYWORDS = [
  "광고",
  "홍보",
  "도박",
  "대출",
  "정치",
  "선거",
  "비속어",
  "바보",
];

export function checkBanned(text: string): string[] {
  const lower = text.toLowerCase();
  return BANNED_KEYWORDS.filter((k) => lower.includes(k.toLowerCase()));
}

export interface MatchSlot {
  id: string;
  matchLabel: string;
  time: string; // 송출 시점
  remain: number; // 잔여 슬롯
}

export const MATCH_SLOTS: MatchSlot[] = [
  { id: "s-1", matchLabel: "25R vs 수원FC (홈)", time: "전반 시작 전", remain: 3 },
  { id: "s-2", matchLabel: "25R vs 수원FC (홈)", time: "하프타임", remain: 1 },
  { id: "s-3", matchLabel: "27R vs 제주 (홈)", time: "전반 시작 전", remain: 5 },
];

// 검수 진행 단계.
export const REVIEW_STEPS = ["접수", "검수 중", "승인", "송출 완료"];

export interface BoardPreview {
  id: string;
  nickname: string;
  text: string;
  matchLabel: string;
  status: string; // REVIEW_STEPS 중 하나
}

export const BOARD_PREVIEWS: BoardPreview[] = [
  { id: "b-1", nickname: "초록불꽃", text: "K-10 격자에서 평생 응원합니다 ⚽", matchLabel: "25R vs 수원FC", status: "송출 완료" },
  { id: "b-2", nickname: "잔디지기", text: "우리 크루 첫 직관 기념!", matchLabel: "25R vs 수원FC", status: "승인" },
  { id: "b-3", nickname: "골문수호", text: "전북 우승 가자!!", matchLabel: "27R vs 제주", status: "검수 중" },
];
