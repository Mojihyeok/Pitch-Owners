// 거버넌스 투표 mock.

export const GOVERNANCE_MIN_BADGES = 5;

export interface Candidate {
  id: string;
  label: string;
  desc: string;
  preview: string; // 데모: 이모지/컬러 칩
  votes: number;
}

export interface Proposal {
  id: string;
  title: string;
  deadline: string; // 마감일
  description: string;
  candidates: Candidate[];
}

export const ACTIVE_PROPOSAL: Proposal = {
  id: "gov-2026H1",
  title: "2026 시즌 어웨이 유니폼 디자인",
  deadline: "2026-06-20",
  description:
    "다음 반기 어웨이 키트 디자인을 오너 투표로 결정합니다. 1인 1표.",
  candidates: [
    { id: "c-1", label: "딥그린 클래식", desc: "전통 딥그린 + 골드 라인", preview: "🟢", votes: 412 },
    { id: "c-2", label: "미드나잇 옐로우", desc: "블랙 베이스 + 형광 옐로우", preview: "🟡", votes: 587 },
    { id: "c-3", label: "리버사이드 화이트", desc: "화이트 + 그린 그라데이션", preview: "⚪", votes: 301 },
    { id: "c-4", label: "헤리티지 스트라이프", desc: "그린/화이트 세로 스트라이프", preview: "🟩", votes: 268 },
  ],
};

export interface PastVote {
  id: string;
  title: string;
  result: string;
  date: string;
  myChoice: string;
}

export const PAST_VOTES: PastVote[] = [
  { id: "pv-1", title: "2025 응원가 리믹스 선정", result: "B안 채택", date: "2025-12-10", myChoice: "B안" },
  { id: "pv-2", title: "홈 굿즈 컬러웨이", result: "옐로우 채택", date: "2025-08-22", myChoice: "옐로우" },
  { id: "pv-3", title: "시즌권 혜택 우선순위", result: "주차 1순위", date: "2025-07-01", myChoice: "교통" },
];

export function totalVotes(p: Proposal): number {
  return p.candidates.reduce((a, c) => a + c.votes, 0);
}
