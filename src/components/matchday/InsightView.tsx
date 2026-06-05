"use client";

import Link from "next/link";
import { Trophy, Clock, Lock } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MatchHeader } from "./MatchHeader";
import { StatBars } from "./StatBars";
import { ShareCard } from "./ShareCard";
import {
  MATCH,
  gridStatsFor,
  insightTimeline,
} from "@/mocks/match";

const OFFICIAL_HIGHLIGHTS = [
  { minute: "23'", text: "전북 선제골 (문선민)" },
  { minute: "51'", text: "울산 동점골 (마틴 아담)" },
  { minute: "67'", text: "전북 역전 결승골 (이승우)" },
];

export function InsightView() {
  const isOwner = useUserStore((s) => s.isOwner);
  const ownedGrids = useUserStore((s) => s.ownedGrids);

  const timeline = isOwner ? insightTimeline(ownedGrids) : [];

  return (
    <section className="flex flex-col gap-4 px-4 py-4">
      <h1 className="font-display text-2xl font-extrabold text-ink-high">
        매치 인사이트
      </h1>

      {/* 공통: 공식 결과 */}
      <MatchHeader match={{ ...MATCH, isLive: false, minuteLabel: "경기 종료" }} />

      <div>
        <SectionHeader title="공식 하이라이트" />
        <ul className="flex flex-col gap-2">
          {OFFICIAL_HIGHLIGHTS.map((h, i) => (
            <li key={i} className="flex items-center gap-3 rounded-card bg-bg-surface p-3">
              <span className="flex h-8 w-10 items-center justify-center rounded-btn bg-bg-elevated font-display text-xs font-bold text-accent">
                {h.minute}
              </span>
              <span className="text-sm text-ink-high">{h.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 비오너 안내 */}
      {!isOwner ? (
        <Card className="flex items-start gap-2">
          <Lock size={18} className="mt-0.5 shrink-0 text-ink-low" />
          <p className="text-sm text-ink-mid">
            격자를 입양하면{" "}
            <strong className="text-ink-high">내 잔디에서 일어난 일</strong>의
            데이터 서사와 공유 카드를 받을 수 있어요.
          </p>
        </Card>
      ) : (
        <>
          {/* 오너: 내 격자 이벤트 타임라인 */}
          <div>
            <SectionHeader title="내 격자 타임라인" />
            {timeline.length === 0 ? (
              <Card className="text-center text-sm text-ink-low">
                이번 경기 내 격자 이벤트가 없었어요.
              </Card>
            ) : (
              <ul className="flex flex-col gap-2">
                {timeline.map((e, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-card bg-bg-surface p-3"
                  >
                    <span className="flex items-center gap-1 font-display text-xs font-bold text-accent">
                      <Clock size={12} /> {e.minute}
                    </span>
                    <span className="text-lg">{e.icon}</span>
                    <span className="text-sm text-ink-high">{e.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 오너: 격자별 데이터 시각화 */}
          <div>
            <SectionHeader title="격자별 데이터" />
            <div className="flex flex-col gap-2">
              {ownedGrids.map((id) => (
                <Card key={id}>
                  <div className="mb-1 flex items-center gap-1.5">
                    <Trophy size={14} className="text-accent" />
                    <span className="font-display text-sm font-bold text-ink-high">
                      {id}
                    </span>
                  </div>
                  <StatBars stat={gridStatsFor(id)} />
                </Card>
              ))}
            </div>
          </div>

          {/* 오너: 인스타 공유 카드 */}
          <div>
            <SectionHeader title="매치 통계 공유 카드" />
            <ShareCard gridIds={ownedGrids} totalEvents={timeline.length} />
          </div>
        </>
      )}

      <Link
        href="/matchday"
        className="flex h-11 items-center justify-center rounded-btn bg-bg-surface text-sm font-medium text-ink-mid hover:text-ink-high"
      >
        ← 매치데이로 돌아가기
      </Link>
    </section>
  );
}
