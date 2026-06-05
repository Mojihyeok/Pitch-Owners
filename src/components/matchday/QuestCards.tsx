import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Quest } from "@/mocks/badges";

interface QuestCardsProps {
  quests: Quest[];
  // 오너: 퀘스트별 실시간 진행 카운트(없으면 비표시).
  progress?: Record<string, number>;
}

// 오늘의 퀘스트 3종 카드.
export function QuestCards({ quests, progress }: QuestCardsProps) {
  return (
    <div className="flex flex-col gap-2">
      {quests.map((q) => {
        const count = progress?.[q.id];
        return (
          <Card key={q.id} className="flex gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-btn bg-bg-elevated text-2xl">
              {q.icon}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-ink-low">Q{q.no}</span>
                <span className="text-sm font-bold text-ink-high">{q.name}</span>
              </div>
              <p className="mt-0.5 text-xs text-ink-mid">{q.rule}</p>
              {q.sponsorName && (
                <Badge tone="turf" className="mt-1.5">
                  {q.sponsorName}
                </Badge>
              )}
              {typeof count === "number" && (
                <div className="mt-2">
                  <div className="mb-0.5 flex justify-between text-xs">
                    <span className="text-ink-mid">내 격자 트리거</span>
                    <span className="font-semibold text-accent">{count}회</span>
                  </div>
                  <ProgressBar value={Math.min(100, count * 20)} tone="accent" />
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
