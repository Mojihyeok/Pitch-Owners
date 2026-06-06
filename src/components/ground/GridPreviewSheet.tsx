"use client";

import { useRouter } from "next/navigation";
import { Lock, MapPin, Users } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatKRW, cn } from "@/lib/utils";
import { maxOf, priceOf, type Zone } from "@/lib/zonePolicy";
import { zoneLabel, type Grid } from "@/mocks/grids";

const ZONE_TONE: Record<Zone, "accent" | "turf" | "neutral"> = {
  signature: "accent",
  dynamic: "turf",
  basic: "neutral",
};

interface GridPreviewSheetProps {
  grid: Grid | null;
  onClose: () => void;
}

// 격자 미리보기 바텀시트.
export function GridPreviewSheet({ grid, onClose }: GridPreviewSheetProps) {
  const router = useRouter();
  const open = grid !== null;
  const cap = grid ? maxOf(grid.zone) : 0;
  const full = grid ? grid.slotsTaken >= cap : false;

  return (
    <Sheet open={open} onClose={onClose} title={grid ? `격자 ${grid.id}` : ""}>
      {grid && (
        <div className="flex flex-col gap-4">
          {/* 메타 */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={ZONE_TONE[grid.zone]} glow={grid.zone === "signature"}>
              <MapPin size={12} /> {zoneLabel(grid.zone)}
            </Badge>
            {full ? (
              <Badge tone="neutral">
                <Lock size={12} /> 만석
              </Badge>
            ) : (
              <Badge tone="turf">
                <Users size={12} /> 잔여 {cap - grid.slotsTaken}/{cap}
              </Badge>
            )}
          </div>

          {/* 가격 */}
          <div className="flex items-end justify-between rounded-card bg-bg-surface p-4">
            <span className="text-sm text-ink-mid">반기 입양가</span>
            <span className="font-display text-2xl font-extrabold text-accent">
              {formatKRW(priceOf(grid.zone))}
            </span>
          </div>

          {/* 과거 명장면 */}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-ink-high">
              이 격자의 명장면
            </h4>
            {grid.highlights.length === 0 ? (
              <p className="rounded-card bg-bg-surface px-3 py-4 text-center text-sm text-ink-low">
                아직 기록된 명장면이 없어요. 첫 주인공이 되어보세요.
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {grid.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-card bg-bg-surface p-3"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-btn bg-bg-elevated text-xl">
                      {h.thumbnail}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink-high">
                        {h.eventText}
                      </p>
                      <p className="truncate text-xs text-ink-mid">
                        {h.matchLabel}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* CTA */}
          <Button
            variant="primary"
            size="lg"
            disabled={full}
            className={cn("w-full", full && "opacity-50")}
            onClick={() => router.push(`/ground/${grid.id}`)}
          >
            {full ? "만석 — 입양 불가" : "이 격자 입양하기"}
          </Button>
          <p className="-mt-1 text-center text-xs text-ink-low">
            ※ 격자 입양은 자산 소유가 아닌 후원·기부입니다.
          </p>
        </div>
      )}
    </Sheet>
  );
}
