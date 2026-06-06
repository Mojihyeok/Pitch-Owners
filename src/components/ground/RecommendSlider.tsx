"use client";

import { Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatManwon } from "@/lib/utils";
import { maxOf, priceOf } from "@/lib/zonePolicy";
import { zoneLabel, type Grid } from "@/mocks/grids";

interface RecommendSliderProps {
  grids: Grid[];
  onSelect: (grid: Grid) => void;
}

// (오너) 추가 입양 추천 격자 슬라이더.
export function RecommendSlider({ grids, onSelect }: RecommendSliderProps) {
  if (grids.length === 0) return null;

  return (
    <div>
      <SectionHeader title="추천 격자" />
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
        {grids.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => onSelect(g)}
            className="flex w-32 shrink-0 flex-col gap-1 rounded-card bg-bg-surface p-3 text-left shadow-card transition-colors hover:bg-bg-hover"
          >
            <span className="flex items-center gap-1 text-xs text-accent">
              <Sparkles size={12} /> 추천
            </span>
            <span className="font-display text-lg font-bold text-ink-high">
              {g.id}
            </span>
            <span className="text-xs text-ink-mid">{zoneLabel(g.zone)}</span>
            <span className="mt-1 text-sm font-semibold text-ink-high">
              {formatManwon(priceOf(g.zone))}원
            </span>
            <span className="text-xs text-ink-low">
              잔여 {Math.max(0, maxOf(g.zone) - g.slotsTaken)}자리
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
