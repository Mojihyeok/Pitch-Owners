import { cn } from "@/lib/utils";
import { QUESTS } from "@/mocks/badges";

interface BadgeBoardProps {
  counts: Record<string, number>; // 퀘스트별 누적 횟수
}

// 9종 퀘스트 뱃지 보드. 획득=풀컬러+글로우, 미획득=그레이 실루엣.
export function BadgeBoard({ counts }: BadgeBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {QUESTS.map((q) => {
        const n = counts[q.id] ?? 0;
        const earned = n > 0;
        return (
          <div
            key={q.id}
            className={cn(
              "relative flex flex-col items-center gap-1 rounded-card p-3 text-center",
              earned ? "bg-bg-elevated shadow-glow" : "bg-bg-surface",
            )}
          >
            {/* 누적 횟수 배지 */}
            {earned && (
              <span className="absolute right-1.5 top-1.5 flex h-5 min-w-5 items-center justify-center rounded-pill bg-accent px-1 text-xs font-bold text-ink-invert">
                {n}
              </span>
            )}
            <span
              className={cn(
                "text-3xl",
                earned ? "grayscale-0" : "opacity-30 grayscale",
              )}
            >
              {q.icon}
            </span>
            <span
              className={cn(
                "text-[11px] font-medium leading-tight",
                earned ? "text-ink-high" : "text-ink-low",
              )}
            >
              {q.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
