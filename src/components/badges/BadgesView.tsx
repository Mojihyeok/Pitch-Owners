"use client";

import Link from "next/link";
import { Award, Clock } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { BadgeBoard } from "./BadgeBoard";
import { BadgeStoryCard } from "./BadgeStoryCard";
import { questCounts, badgeTimeline } from "@/mocks/badges";

export function BadgesView() {
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const badgeCount = useUserStore((s) => s.badgeCount);

  // 비로그인 시 노출 안 됨.
  if (!isLoggedIn) {
    return (
      <section className="px-4 py-4">
        <h1 className="font-display text-2xl font-extrabold text-ink-high">
          뱃지 컬렉션
        </h1>
        <EmptyState
          icon={Award}
          title="로그인 후 이용할 수 있어요"
          description="격자를 입양하고 매치데이 퀘스트를 달성해 뱃지를 모아보세요."
          action={
            <Link
              href="/ground"
              className="flex h-11 items-center justify-center rounded-btn bg-accent px-5 font-semibold text-ink-invert"
            >
              그라운드 맵 보러가기
            </Link>
          }
        />
      </section>
    );
  }

  const counts = questCounts(badgeCount);
  const timeline = badgeTimeline(badgeCount);

  return (
    <section className="flex flex-col gap-4 px-4 py-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold text-ink-high">
          뱃지 컬렉션
        </h1>
        <span className="flex items-center gap-1 text-sm font-semibold text-accent">
          <Award size={16} /> 총 {badgeCount}
        </span>
      </div>

      {/* 9종 퀘스트 보드 */}
      <div>
        <SectionHeader title="9종 퀘스트" />
        <BadgeBoard counts={counts} />
      </div>

      {/* 매치별 획득 타임라인 */}
      <div>
        <SectionHeader title="획득 타임라인" />
        {timeline.length === 0 ? (
          <Card className="text-center text-sm text-ink-low">
            아직 획득한 뱃지가 없어요. 매치데이 퀘스트에 도전해보세요.
          </Card>
        ) : (
          <ul className="flex flex-col gap-2">
            {timeline.map((e, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-card bg-bg-surface p-3"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-btn bg-bg-elevated text-xl">
                  {e.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink-high">
                    {e.questName}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-ink-mid">
                    <Clock size={12} /> {e.matchLabel}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 인스타 스토리 공유 카드 */}
      <div>
        <SectionHeader title="스토리 공유 카드" />
        <BadgeStoryCard counts={counts} total={badgeCount} />
      </div>
    </section>
  );
}
