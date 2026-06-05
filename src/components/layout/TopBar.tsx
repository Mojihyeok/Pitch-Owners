"use client";

import Link from "next/link";
import { Bell, User } from "lucide-react";

// 상단 헤더: 좌측 워드마크, 우측 알림 벨 + 프로필 아바타.
// 스크롤 시 배경 블러 처리(컨테이너 내부 sticky).
export function TopBar() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between bg-bg-base/80 px-4 backdrop-blur">
      <Link
        href="/ground"
        className="font-display text-lg font-extrabold tracking-tight text-ink-high"
      >
        PITCH <span className="text-accent">OWNERS</span>
      </Link>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="알림"
          className="flex h-9 w-9 items-center justify-center rounded-pill text-ink-mid hover:bg-bg-hover hover:text-ink-high"
        >
          <Bell size={20} />
        </button>
        <Link
          href="/account"
          aria-label="프로필"
          className="flex h-9 w-9 items-center justify-center rounded-pill bg-bg-elevated text-ink-mid hover:text-ink-high"
        >
          <User size={20} />
        </Link>
      </div>
    </header>
  );
}
