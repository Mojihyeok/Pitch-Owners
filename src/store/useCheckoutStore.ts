import { create } from "zustand";
import { maxOf, type Zone } from "@/lib/zonePolicy";

export type PayMethod = "toss" | "kakao" | "naver" | "card";

export interface Member {
  jeonbukId: string;
  verified: boolean;
  isSelf: boolean;
}

export const GROUP_MIN = 2;

interface CheckoutState {
  zone: Zone | null; // 선택한 격자의 Zone (정원·가격 기준)
  mode: "solo" | "group" | null;
  groupSize: number; // 2 ~ maxOf(zone)
  members: Member[]; // 본인 포함
  teamName: string;
  payMethod: PayMethod | null;
  setZone: (z: Zone) => void;
  setMode: (m: "solo" | "group") => void;
  setGroupSize: (n: number) => void;
  setMember: (idx: number, patch: Partial<Member>) => void;
  setTeamName: (s: string) => void;
  setPayMethod: (p: PayMethod) => void;
  reset: () => void;
}

const selfMember = (): Member => ({ jeonbukId: "", verified: true, isSelf: true });

// 길이 n에 맞춰 members 재구성(본인 0번 고정, 기존 입력 보존).
function resizeMembers(prev: Member[], n: number): Member[] {
  const out: Member[] = [selfMember()];
  for (let i = 1; i < n; i++) {
    out.push(prev[i] ?? { jeonbukId: "", verified: false, isSelf: false });
  }
  return out;
}

// Zone 정원 기준 clamp.
function clampSize(zone: Zone | null, n: number): number {
  const hi = zone ? maxOf(zone) : GROUP_MIN;
  return Math.min(hi, Math.max(GROUP_MIN, n));
}

const INITIAL = {
  zone: null as Zone | null,
  mode: null as CheckoutState["mode"],
  groupSize: GROUP_MIN,
  members: [selfMember()],
  teamName: "",
  payMethod: null as PayMethod | null,
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  ...INITIAL,

  setZone: (zone) => set({ zone }),

  setMode: (m) =>
    set((s) => {
      if (m === "solo") {
        return { mode: m, members: [selfMember()], groupSize: GROUP_MIN, teamName: "" };
      }
      // group 진입: Zone 정원 내로 groupSize clamp 후 members 동기화.
      const size = clampSize(s.zone, s.groupSize);
      return { mode: m, groupSize: size, members: resizeMembers(s.members, size) };
    }),

  setGroupSize: (n) =>
    set((s) => {
      const size = clampSize(s.zone, n);
      return { groupSize: size, members: resizeMembers(s.members, size) };
    }),

  setMember: (idx, patch) =>
    set((s) => ({
      members: s.members.map((m, i) => (i === idx ? { ...m, ...patch } : m)),
    })),

  setTeamName: (teamName) => set({ teamName }),
  setPayMethod: (payMethod) => set({ payMethod }),
  reset: () => set({ ...INITIAL, members: [selfMember()] }),
}));
