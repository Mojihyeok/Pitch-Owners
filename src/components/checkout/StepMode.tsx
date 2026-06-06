"use client";

import { User, Users, ArrowRight } from "lucide-react";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { maxOf, type Zone } from "@/lib/zonePolicy";
import { cn } from "@/lib/utils";

interface StepModeProps {
  zone: Zone;
  onNext: () => void;
}

// Step 1 — 점유 유형(개인/그룹).
export function StepMode({ zone, onNext }: StepModeProps) {
  const mode = useCheckoutStore((s) => s.mode);
  const setMode = useCheckoutStore((s) => s.setMode);

  const cap = maxOf(zone);
  const OPTIONS = [
    { id: "solo" as const, icon: User, title: "개인", desc: "혼자 1인으로 입양" },
    {
      id: "group" as const,
      icon: Users,
      title: "그룹",
      desc:
        cap === 2
          ? `2명이 함께 입양 (이 격자 정원 ${cap}명)`
          : `2~${cap}인이 함께 입양 (이 격자 최대 ${cap}명)`,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-bold text-ink-high">점유 유형 선택</h2>
        <p className="mt-1 text-sm text-ink-mid">
          개인 또는 그룹으로 격자를 입양할 수 있어요.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {OPTIONS.map((o) => {
          const Icon = o.icon;
          const sel = mode === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => setMode(o.id)}
              className={cn(
                "flex items-center gap-3 rounded-card border p-4 text-left transition-colors",
                sel
                  ? "border-accent bg-bg-elevated"
                  : "border-bg-hover bg-bg-surface hover:border-ink-mid",
              )}
            >
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-btn",
                  sel ? "bg-accent text-ink-invert" : "bg-bg-elevated text-ink-mid",
                )}
              >
                <Icon size={22} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold text-ink-high">{o.title}</p>
                <p className="text-xs text-ink-mid">{o.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={!mode}
        onClick={onNext}
        className={cn(
          "flex h-13 items-center justify-center gap-2 rounded-btn bg-accent font-semibold text-ink-invert",
          !mode && "opacity-50",
        )}
      >
        {mode === "solo" ? "결제로 이동" : "다음"} <ArrowRight size={18} />
      </button>
    </div>
  );
}
