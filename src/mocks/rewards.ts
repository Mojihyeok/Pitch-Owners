// 리워드 인박스 / 잔디페이 mock.

export type RewardKind = "coupon" | "voucher" | "mileage";

export interface Reward {
  id: string;
  kind: RewardKind;
  title: string;
  partner: string; // 제휴처
  icon: string; // 데모: 이모지
  code: string; // 디지털 코드 / 바코드 값
  daysLeft: number; // 만료까지 남은 일수
  used?: boolean;
}

// 만료 임박 기준(일).
export const EXPIRING_SOON_DAYS = 3;

export const REWARDS: Reward[] = [
  {
    id: "rw-01",
    kind: "coupon",
    title: "홈경기 굿즈샵 15% 할인",
    partner: "오피셜 스토어",
    icon: "🎟️",
    code: "PO-GOODS-15-7F2A",
    daysLeft: 2,
  },
  {
    id: "rw-02",
    kind: "voucher",
    title: "스타디움 푸드 5,000원 바우처",
    partner: "그린 푸드코트",
    icon: "🍔",
    code: "PO-FOOD-5000-B19C",
    daysLeft: 1,
  },
  {
    id: "rw-03",
    kind: "coupon",
    title: "아메리카노 1+1",
    partner: "그린카페",
    icon: "☕",
    code: "PO-CAFE-1N1-44DE",
    daysLeft: 9,
  },
  {
    id: "rw-04",
    kind: "mileage",
    title: "잔디 페이 3,000P 적립",
    partner: "PITCH OWNERS",
    icon: "💚",
    code: "PO-PNT-3000-9A0B",
    daysLeft: 21,
  },
];

export function activeRewards(): Reward[] {
  return REWARDS.filter((r) => !r.used);
}

export function isExpiringSoon(r: Reward): boolean {
  return r.daysLeft <= EXPIRING_SOON_DAYS;
}

// 잔디 페이.
export interface PayTxn {
  id: string;
  label: string;
  amount: number; // +적립 / -사용
  date: string;
}

export const TURF_PAY_BALANCE = 12500;

export const TURF_PAY_HISTORY: PayTxn[] = [
  { id: "tx-01", label: "퀘스트 달성 리워드", amount: +3000, date: "2026-05-30" },
  { id: "tx-02", label: "굿즈샵 결제", amount: -4500, date: "2026-05-22" },
  { id: "tx-03", label: "출석 보너스", amount: +1000, date: "2026-05-18" },
  { id: "tx-04", label: "푸드코트 결제", amount: -2000, date: "2026-05-11" },
];
