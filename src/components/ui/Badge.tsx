import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "turf" | "danger";

interface BadgeProps {
  tone?: Tone;
  glow?: boolean; // 옐로우 글로우(활성 뱃지)
  children: ReactNode;
  className?: string;
}

const TONES: Record<Tone, string> = {
  neutral: "bg-bg-hover text-ink-mid",
  accent: "bg-accent text-ink-invert",
  turf: "bg-turf-700 text-ink-high",
  danger: "bg-state-danger text-ink-high",
};

// 상태 칩/뱃지.
export function Badge({ tone = "neutral", glow, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill px-2.5 py-0.5 text-xs font-medium",
        TONES[tone],
        glow && "shadow-glow",
        className,
      )}
    >
      {children}
    </span>
  );
}
