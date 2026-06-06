"use client";

import { Minus, Plus, ArrowRight } from "lucide-react";
import { useCheckoutStore, GROUP_MIN } from "@/store/useCheckoutStore";
import { maxOf, perHeadOf, priceOf, type Zone } from "@/lib/zonePolicy";
import { formatKRW, cn } from "@/lib/utils";

interface StepGroupSizeProps {
  zone: Zone;
  onNext: () => void;
  onBack: () => void;
}

// Step 2 — 그룹 인원 수(2 ~ Zone 정원).
export function StepGroupSize({ zone, onNext, onBack }: StepGroupSizeProps) {
  const groupSize = useCheckoutStore((s) => s.groupSize);
  const setGroupSize = useCheckoutStore((s) => s.setGroupSize);

  const cap = maxOf(zone);
  const total = priceOf(zone);
  const perHead = perHeadOf(zone, groupSize);
  const sizes = Array.from({ length: cap - GROUP_MIN + 1 }, (_, i) => GROUP_MIN + i);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-bold text-ink-high">인원 수</h2>
        <p className="mt-1 text-sm text-ink-mid">
          본인 포함 2~{cap}명까지 함께할 수 있어요 (이 격자 정원 {cap}명).
        </p>
      </div>

      {/* 세그먼트 2~정원 */}
      <div className="flex gap-2">
        {sizes.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setGroupSize(n)}
            className={cn(
              "h-12 flex-1 rounded-btn text-sm font-bold transition-colors",
              groupSize === n
                ? "bg-accent text-ink-invert"
                : "bg-bg-surface text-ink-mid hover:text-ink-high",
            )}
          >
            {n}
          </button>
        ))}
      </div>

      {/* +/- 카운터 */}
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="감소"
          disabled={groupSize <= GROUP_MIN}
          onClick={() => setGroupSize(groupSize - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-btn bg-bg-surface text-ink-high disabled:opacity-40"
        >
          <Minus size={18} />
        </button>
        <span className="font-display text-2xl font-extrabold text-ink-high">
          본인 포함 {groupSize}명
        </span>
        <button
          type="button"
          aria-label="증가"
          disabled={groupSize >= cap}
          onClick={() => setGroupSize(groupSize + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-btn bg-bg-surface text-ink-high disabled:opacity-40"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* 인당 분담액 */}
      <div className="flex items-center justify-between rounded-card bg-bg-surface p-4">
        <div>
          <p className="text-sm text-ink-mid">인당 분담액</p>
          <p className="text-xs text-ink-low">
            총 {formatKRW(total)} ÷ {groupSize}명
          </p>
        </div>
        <span className="font-display text-xl font-extrabold text-accent">
          {formatKRW(perHead)}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onBack}
          className="h-13 flex-1 rounded-btn bg-bg-surface font-semibold text-ink-mid"
        >
          이전
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex h-13 flex-1 items-center justify-center gap-2 rounded-btn bg-accent font-semibold text-ink-invert"
        >
          다음 <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
