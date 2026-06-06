import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Member } from "./useCheckoutStore";

// 입양한 그룹(크루) 정보 — 커뮤니티에서 사용.
export interface Crew {
  gridId: string;
  teamName: string;
  members: Member[]; // 본인 포함
}

// 로그인/입양 상태 모킹. 비로그인/입양 전 vs 오너 활성 분기에 사용.
interface UserState {
  isLoggedIn: boolean;
  isOwner: boolean; // 격자 1개 이상 입양 여부
  badgeCount: number; // 거버넌스(5+)/전광판(10+) 자격 판정
  ownedGrids: string[]; // 보유 격자 id
  crews: Crew[]; // 그룹 입양 시 팀 정보

  // 데모용 토글 액션
  toggleLogin: () => void;
  toggleOwner: () => void;
  setBadgeCount: (n: number) => void;
  // 입양 완료 → 오너 활성 + 격자 추가 (그룹이면 crew 저장)
  adoptGrid: (gridId: string, crew?: Crew) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isOwner: false,
      badgeCount: 0,
      ownedGrids: [],
      crews: [],

      toggleLogin: () =>
        set((s) => {
          const isLoggedIn = !s.isLoggedIn;
          // 로그아웃 시 오너 상태도 초기화.
          return isLoggedIn
            ? { isLoggedIn }
            : { isLoggedIn, isOwner: false, ownedGrids: [], crews: [] };
        }),

      toggleOwner: () =>
        set((s) => {
          const isOwner = !s.isOwner;
          return {
            isOwner,
            // 오너 활성화면 로그인도 보장, 데모 격자 1개 부여.
            isLoggedIn: isOwner ? true : s.isLoggedIn,
            ownedGrids: isOwner ? (s.ownedGrids.length ? s.ownedGrids : ["K-10"]) : [],
          };
        }),

      setBadgeCount: (n: number) => set({ badgeCount: Math.max(0, n) }),

      adoptGrid: (gridId: string, crew?: Crew) =>
        set((s) => ({
          isLoggedIn: true,
          isOwner: true,
          ownedGrids: s.ownedGrids.includes(gridId)
            ? s.ownedGrids
            : [...s.ownedGrids, gridId],
          crews: crew
            ? [...s.crews.filter((c) => c.gridId !== gridId), crew]
            : s.crews,
        })),
    }),
    { name: "pitch-owners-user" },
  ),
);
