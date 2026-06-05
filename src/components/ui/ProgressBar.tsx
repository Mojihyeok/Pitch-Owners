import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0~100
  className?: string;
  tone?: "turf" | "accent";
}

// 진행률 바. turf-300 또는 accent 채움.
export function ProgressBar({ value, className, tone = "turf" }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));

  return (
    <div
      className={cn("h-2 w-full overflow-hidden rounded-pill bg-bg-hover", className)}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full rounded-pill transition-[width]",
          tone === "accent" ? "bg-accent" : "bg-turf-300",
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
