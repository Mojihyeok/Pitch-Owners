// 커뮤니티 mock — 동승 오너 / 크루.

export interface OwnerProfile {
  id: string;
  nickname: string;
  avatar: string; // 데모: 이모지
  badges: number;
  attendance: number; // 출석률 %
  isMe?: boolean;
}

// 동일 격자 공동 오너 (데모: 그룹 예시).
export const GRID_OWNERS: OwnerProfile[] = [
  { id: "o-1", nickname: "초록불꽃", avatar: "🦊", badges: 12, attendance: 92, isMe: true },
  { id: "o-2", nickname: "잔디지기", avatar: "🐯", badges: 8, attendance: 78 },
  { id: "o-3", nickname: "골문수호", avatar: "🦁", badges: 5, attendance: 65 },
  { id: "o-4", nickname: "측면돌파", avatar: "🐻", badges: 3, attendance: 50 },
];

export interface CrewStats {
  name: string;
  logo: string;
  memberCount: number;
  totalBadges: number;
  attendanceRate: number; // 평균 출석률 %
}

export const MY_CREW: CrewStats = {
  name: "그린턴프 크루",
  logo: "🌱",
  memberCount: 4,
  totalBadges: 28,
  attendanceRate: 71,
};

// 크루 로고 후보(결성 시 선택).
export const CREW_LOGOS = ["🌱", "🔥", "⚡", "🦅", "🐺", "🛡️"];
