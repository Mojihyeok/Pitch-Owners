"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { QUESTS } from "@/mocks/badges";

interface BadgeStoryCardProps {
  counts: Record<string, number>;
  total: number;
}

// 인스타 스토리 공유 카드 자동 생성 (세로 9:16 프리뷰).
export function BadgeStoryCard({ counts, total }: BadgeStoryCardProps) {
  const [shared, setShared] = useState(false);
  const top = QUESTS.filter((q) => (counts[q.id] ?? 0) > 0).slice(0, 6);

  return (
    <div className="flex flex-col gap-3">
      <div className="mx-auto aspect-[9/16] w-48 overflow-hidden rounded-card bg-turf-900 p-4 shadow-glow">
        <div className="flex h-full flex-col justify-between">
          <div>
            <p className="font-display text-xs font-bold text-accent">
              PITCH OWNERS
            </p>
            <p className="mt-1 text-[10px] text-turf-300">MY BADGE COLLECTION</p>
          </div>

          <div className="text-center">
            <p className="font-display text-4xl font-extrabold text-accent">
              {total}
            </p>
            <p className="text-[11px] text-ink-mid">개의 뱃지 획득</p>
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              {top.map((q) => (
                <span key={q.id} className="text-xl">
                  {q.icon}
                </span>
              ))}
            </div>
          </div>

          <p className="text-center text-[10px] text-ink-low">
            내 잔디에서 만든 이야기
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShared(true)}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-btn bg-accent font-semibold text-ink-invert"
      >
        {shared ? (
          <>
            <Check size={18} /> 공유 준비 완료
          </>
        ) : (
          <>
            <Share2 size={18} /> 인스타 스토리로 공유
          </>
        )}
      </button>
    </div>
  );
}
