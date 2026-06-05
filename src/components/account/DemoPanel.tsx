"use client";

import { useUserStore } from "@/store/useUserStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// 데모 토글 패널 — 상태 분기 테스트용 임시(추후 제거).
export function DemoPanel() {
  const { isLoggedIn, isOwner, badgeCount, toggleLogin, toggleOwner, setBadgeCount } =
    useUserStore();

  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-ink-high">데모 토글 패널</h2>
        <Badge tone="danger">임시</Badge>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-mid">
            로그인:{" "}
            <span className="font-semibold text-ink-high">
              {isLoggedIn ? "ON" : "OFF"}
            </span>
          </span>
          <Button size="sm" variant="secondary" onClick={toggleLogin}>
            토글
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-mid">
            오너(입양):{" "}
            <span className="font-semibold text-ink-high">
              {isOwner ? "ON" : "OFF"}
            </span>
          </span>
          <Button size="sm" variant="secondary" onClick={toggleOwner}>
            토글
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-mid">
            뱃지 수:{" "}
            <span className="font-semibold text-ink-high">{badgeCount}</span>
          </span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={() => setBadgeCount(badgeCount - 1)}>
              −
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setBadgeCount(badgeCount + 1)}>
              ＋
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
