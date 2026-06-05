"use client";

import { cn } from "@/lib/utils";
import type { Zone } from "@/mocks/grids";

export type ZoneFilterValue = Zone | "all";

const OPTIONS: { value: ZoneFilterValue; label: string; dot: string }[] = [
  { value: "all", label: "전체", dot: "bg-ink-mid" },
  { value: "signature", label: "시그니처", dot: "bg-zone-signature" },
  { value: "dynamic", label: "다이내믹", dot: "bg-zone-dynamic" },
  { value: "basic", label: "베이직", dot: "bg-zone-basic" },
];

interface ZoneFilterProps {
  value: ZoneFilterValue;
  onChange: (v: ZoneFilterValue) => void;
}

// Zone 색상 필터 칩 (상단 sticky).
export function ZoneFilter({ value, onChange }: ZoneFilterProps) {
  return (
    <div className="sticky top-14 z-30 -mx-4 flex gap-2 overflow-x-auto bg-bg-base/90 px-4 py-2 backdrop-blur">
      {OPTIONS.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-pill border px-3 py-1.5 text-sm font-medium transition-colors",
              active
                ? "border-accent bg-accent text-ink-invert"
                : "border-bg-hover bg-bg-surface text-ink-mid hover:text-ink-high",
            )}
          >
            <span className={cn("h-2 w-2 rounded-pill", o.dot)} />
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
