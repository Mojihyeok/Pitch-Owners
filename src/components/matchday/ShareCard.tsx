"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { MATCH } from "@/mocks/match";

interface ShareCardProps {
  gridIds: string[];
  totalEvents: number;
}

// 매치 통계 인스타 공유 카드 자동 생성(9:16 프리뷰 + 공유 버튼).
export function ShareCard({ gridIds, totalEvents }: ShareCardProps) {
  const [shared, setShared] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {/* 9:16 카드 프리뷰 */}
      <div className="mx-auto aspect-[9/16] w-48 overflow-hidden rounded-card bg-turf-900 p-4 shadow-glow">
        <div className="flex h-full flex-col justify-between">
          <div>
            <p className="font-display text-xs font-bold text-accent">
              PITCH OWNERS
            </p>
            <p className="mt-1 text-[10px] text-turf-300">{MATCH.round}</p>
          </div>

          <div className="text-center">
            <p className="text-2xl">⚽</p>
            <p className="mt-1 font-display text-lg font-extrabold text-ink-high">
              {MATCH.home.short} {MATCH.homeScore}:{MATCH.awayScore}{" "}
              {MATCH.away.short}
            </p>
            <p className="mt-2 text-[11px] text-ink-mid">내 격자에서</p>
            <p className="font-display text-3xl font-extrabold text-accent">
              {totalEvents}
            </p>
            <p className="text-[11px] text-ink-mid">개의 이벤트 발생</p>
          </div>

          <div className="flex flex-wrap justify-center gap-1">
            {gridIds.map((id) => (
              <span
                key={id}
                className="rounded-pill bg-bg-base/40 px-2 py-0.5 text-[10px] font-bold text-accent"
              >
                {id}
              </span>
            ))}
          </div>
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
