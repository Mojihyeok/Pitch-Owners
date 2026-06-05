"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Radio, BarChart3, Lock } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MatchHeader } from "./MatchHeader";
import { QuestCards } from "./QuestCards";
import { LiveToast } from "./LiveToast";
import { cn } from "@/lib/utils";
import {
  MATCH,
  TODAY_QUEST_IDS,
  eventPreviewGrids,
  nextLiveEvent,
  todaysQuests,
  type LiveEvent,
} from "@/mocks/match";

const STREAM_MS = 3500;
const FEED_MAX = 12;
const TOAST_MS = 4000;

export function MatchdayView() {
  const isOwner = useUserStore((s) => s.isOwner);
  const ownedGrids = useUserStore((s) => s.ownedGrids);

  const quests = todaysQuests();
  const previews = eventPreviewGrids();

  const [feed, setFeed] = useState<LiveEvent[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>(() =>
    Object.fromEntries(TODAY_QUEST_IDS.map((id) => [id, 0])),
  );
  const [toast, setToast] = useState<LiveEvent | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 라이브 이벤트 스트리밍 (WebSocket 가정 → setInterval mock).
  useEffect(() => {
    const ownedRef = ownedGrids;
    const timer = setInterval(() => {
      const ev = nextLiveEvent(ownedRef);
      setFeed((f) => [ev, ...f].slice(0, FEED_MAX));
      if (ev.isMine) {
        setProgress((p) => ({ ...p, [ev.questId]: (p[ev.questId] ?? 0) + 1 }));
        setToast(ev);
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), TOAST_MS);
      }
    }, STREAM_MS);

    return () => {
      clearInterval(timer);
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, [ownedGrids]);

  return (
    <section className="flex flex-col gap-4 px-4 py-4">
      <h1 className="font-display text-2xl font-extrabold text-ink-high">
        매치데이
      </h1>

      {/* 오너: 내 격자 실시간 알림 배너 */}
      {isOwner && <LiveToast event={toast} />}

      {/* 경기 상태 헤더 (공통) */}
      <MatchHeader match={MATCH} />

      {/* 오늘의 퀘스트 3종 (공통, 오너는 진행률) */}
      <div>
        <SectionHeader title="오늘의 퀘스트 (9종 중 3종)" />
        <QuestCards quests={quests} progress={isOwner ? progress : undefined} />
      </div>

      {/* 비오너 안내 */}
      {!isOwner && (
        <Card className="flex items-start gap-2">
          <Lock size={18} className="mt-0.5 shrink-0 text-ink-low" />
          <p className="text-sm text-ink-mid">
            격자를 입양하면 <strong className="text-ink-high">내 격자 트리거
            실시간 알림</strong>과 진행률을 받을 수 있어요.
          </p>
        </Card>
      )}

      {/* 라이브 피드 (공통 열람) */}
      <div>
        <SectionHeader title="라이브 피드" />
        {feed.length === 0 ? (
          <Card className="flex items-center gap-2 text-sm text-ink-mid">
            <Radio size={16} className="text-state-danger" /> 실시간 이벤트 수신
            대기 중…
          </Card>
        ) : (
          <ul className="flex flex-col gap-1.5">
            {feed.map((ev) => (
              <li
                key={ev.ts}
                className={cn(
                  "flex items-center justify-between rounded-card px-3 py-2 text-sm",
                  ev.isMine
                    ? "bg-bg-elevated text-ink-high shadow-glow"
                    : "bg-bg-surface text-ink-mid",
                )}
              >
                <span>{ev.label}</span>
                {ev.isMine && (
                  <span className="shrink-0 text-xs font-bold text-accent">
                    내 격자
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 격자별 이벤트 미리보기 (공통) */}
      <div>
        <SectionHeader title="격자별 이벤트 핫스팟" />
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {previews.map((p) => (
            <Link
              key={p.gridId}
              href={`/ground/${p.gridId}`}
              className="flex shrink-0 flex-col items-center gap-1 rounded-card bg-bg-surface px-4 py-3"
            >
              <span className="h-3 w-3 rounded-[2px] bg-zone-signature" />
              <span className="font-display text-sm font-bold text-ink-high">
                {p.gridId}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 매치 종료 후 인사이트(히트맵) 진입 */}
      <Link
        href="/matchday/insight"
        className="flex items-center justify-between rounded-card bg-turf-700 px-4 py-3 text-ink-high"
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          <BarChart3 size={18} /> 매치 인사이트 · 격자 히트맵 보기
        </span>
        <span className="text-xs text-turf-300">종료 후 분석 →</span>
      </Link>
    </section>
  );
}
