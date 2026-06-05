// 이벤트 mock — 오픈 피치 데이.

export interface EventInfo {
  title: string;
  date: string;
  place: string;
  description: string;
}

export const OPEN_PITCH_DAY: EventInfo = {
  title: "오픈 피치 데이 2026 상반기",
  date: "2026-07-05 (토) 14:00",
  place: "전주월드컵경기장 그라운드",
  description:
    "반기말 오프라인 페스티벌. 내가 입양한 잔디를 직접 밟아보고, 동승 오너·크루와 만나는 날.",
};

export interface EntrySlot {
  id: string;
  time: string;
  gate: string;
  zone: string; // 동선 안내
}

export const ENTRY_SLOTS: EntrySlot[] = [
  { id: "e-1", time: "13:30 ~ 14:00", gate: "1번 게이트", zone: "북측 그라운드 입장" },
  { id: "e-2", time: "14:00 ~ 14:30", gate: "3번 게이트", zone: "남측 그라운드 입장" },
];

export interface GalleryItem {
  id: string;
  label: string;
  thumb: string; // 데모: 이모지
}

export const EVENT_GALLERY: GalleryItem[] = [
  { id: "g-1", label: "단체 사진", thumb: "📸" },
  { id: "g-2", label: "기념 영상", thumb: "🎬" },
  { id: "g-3", label: "잔디 인증샷", thumb: "🌱" },
];
