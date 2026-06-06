"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepDef {
  key: string;
  label: string;
}

interface CheckoutStepperProps {
  steps: StepDef[];
  currentKey: string;
  onJump: (key: string) => void; // 완료(이전) 스텝으로만 이동
}

// 상단 진행 표시. 현재=accent, 완료=turf-300 체크, 클릭 시 뒤로 이동.
export function CheckoutStepper({ steps, currentKey, onJump }: CheckoutStepperProps) {
  const currentIdx = steps.findIndex((s) => s.key === currentKey);

  return (
    <ol className="flex items-center">
      {steps.map((s, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        const clickable = done;
        return (
          <li key={s.key} className="flex flex-1 items-center last:flex-none">
            <button
              type="button"
              disabled={!clickable}
              onClick={() => clickable && onJump(s.key)}
              className="flex flex-col items-center gap-1"
            >
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-pill text-xs font-bold transition-colors",
                  active && "bg-accent text-ink-invert",
                  done && "bg-turf-300 text-ink-invert",
                  !active && !done && "bg-bg-hover text-ink-low",
                )}
              >
                {done ? <Check size={14} /> : i + 1}
              </span>
              <span
                className={cn(
                  "whitespace-nowrap text-[10px]",
                  active ? "text-ink-high" : done ? "text-turf-300" : "text-ink-low",
                )}
              >
                {s.label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "mx-1 h-0.5 flex-1",
                  i < currentIdx ? "bg-turf-300" : "bg-bg-hover",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
