"use client";

import Link from "next/link";
import {
  LayoutGrid,
  Award,
  Vote,
  MonitorSmartphone,
  ChevronRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { MyMiniMap } from "./MyMiniMap";
import { milestoneProgress } from "@/mocks/badges";
import { activeRewards, isExpiringSoon } from "@/mocks/rewards";

const NICKNAME = "초록불꽃"; // 데모 닉네임

const QUICK_LINKS = [
  { href: "/my/badges", label: "뱃지 컬렉션", icon: Award },
  { href: "/my/governance", label: "거버넌스", icon: Vote },
  { href: "/my/board", label: "전광판", icon: MonitorSmartphone },
];

export function MyDashboard() {
  const isOwner = useUserStore((s) => s.isOwner);
  const ownedGrids = useUserStore((s) => s.ownedGrids);
  const badgeCount = useUserStore((s) => s.badgeCount);

  // ── 비로그인 / 입양 전 ──
  if (!isOwner) {
    return (
      <section className="px-4 py-4">
        <h1 className="font-display text-2xl font-extrabold text-ink-high">
          마이오너
        </h1>
        <EmptyState
          icon={LayoutGrid}
          title="격자를 입양하고 나만의 잔디를 가져보세요"
          description="입양하면 보유 자산·뱃지·리워드를 한 화면에서 관리할 수 있어요."
          action={
            <Link
              href="/ground"
              className="flex h-11 items-center justify-center rounded-btn bg-accent px-5 font-semibold text-ink-invert shadow-glow"
            >
              그라운드 맵 보러가기
            </Link>
          }
        />
      </section>
    );
  }

  // ── 피치 오너 활성 ──
  const mp = milestoneProgress(badgeCount);
  const rewards = activeRewards().sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <section className="flex flex-col gap-4 px-4 py-4">
      {/* 1. 요약 헤더 */}
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-accent text-xl text-ink-invert shadow-glow">
          🦊
        </span>
        <div>
          <p className="font-display text-xl font-extrabold text-ink-high">
            {NICKNAME}
          </p>
          <p className="text-sm text-ink-mid">
            보유 격자 {ownedGrids.length} · 뱃지 {badgeCount}
          </p>
        </div>
      </div>

      {/* 2. 뱃지 카운트 + 다음 단계 진행률 */}
      <Card>
        <div className="mb-1 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-ink-high">
            <Award size={16} className="text-accent" /> 뱃지 {badgeCount}개
          </span>
          {mp.maxed ? (
            <Badge tone="accent" glow>
              최고 단계 달성
            </Badge>
          ) : (
            <span className="text-xs text-ink-mid">
              다음 단계까지 {mp.next! - badgeCount}개
            </span>
          )}
        </div>
        <ProgressBar value={mp.ratio * 100} tone="accent" />
        <p className="mt-1 text-xs text-ink-low">
          단계: 1 · 3 · 5 · 10 (5+ 거버넌스, 10+ 전광판 자격)
        </p>
      </Card>

      {/* 3. 내 격자 미니맵 */}
      <div>
        <SectionHeader title="내 격자" moreHref="/ground" moreLabel="맵 전체" />
        <MyMiniMap ownedIds={ownedGrids} />
        <div className="mt-2 flex flex-wrap gap-2">
          {ownedGrids.map((id) => (
            <span
              key={id}
              className="rounded-pill bg-bg-elevated px-2.5 py-1 font-display text-sm font-bold text-accent"
            >
              {id}
            </span>
          ))}
        </div>
      </div>

      {/* 4. 활성 리워드 인박스 */}
      <div>
        <SectionHeader title="활성 리워드" moreHref="/my/rewards" />
        <div className="flex flex-col gap-2">
          {rewards.slice(0, 3).map((r) => {
            const soon = isExpiringSoon(r);
            return (
              <Card key={r.id} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-btn bg-bg-elevated text-xl">
                  {r.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink-high">
                    {r.title}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-ink-mid">
                    <Clock size={12} /> D-{r.daysLeft} · {r.partner}
                  </p>
                </div>
                {soon && <Badge tone="danger">만료임박</Badge>}
                <Link
                  href="/my/rewards"
                  className="flex h-9 items-center rounded-btn bg-turf-700 px-3 text-sm font-semibold text-ink-high"
                >
                  사용
                </Link>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 5. 빠른 진입 */}
      <div>
        <SectionHeader title="바로가기" />
        <div className="grid grid-cols-3 gap-2">
          {QUICK_LINKS.map((q) => {
            const Icon = q.icon;
            return (
              <Link
                key={q.href}
                href={q.href}
                className="flex flex-col items-center gap-2 rounded-card bg-bg-surface p-4 text-center shadow-card hover:bg-bg-hover"
              >
                <Icon size={22} className="text-accent" />
                <span className="text-xs font-medium text-ink-high">
                  {q.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 추가 입양 유도 */}
      <Link
        href="/ground"
        className="flex items-center justify-between rounded-card bg-turf-900 px-4 py-3"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-turf-300">
          <Sparkles size={16} /> 격자 추가 입양하기
        </span>
        <ChevronRight size={18} className="text-turf-300" />
      </Link>
    </section>
  );
}
