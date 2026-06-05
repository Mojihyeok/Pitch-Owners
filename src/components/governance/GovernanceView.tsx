"use client";

import { useState } from "react";
import Link from "next/link";
import { Vote, Lock, Check, CalendarClock, History } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import {
  ACTIVE_PROPOSAL,
  GOVERNANCE_MIN_BADGES,
  PAST_VOTES,
  totalVotes,
} from "@/mocks/governance";

export function GovernanceView() {
  const badgeCount = useUserStore((s) => s.badgeCount);
  const qualified = badgeCount >= GOVERNANCE_MIN_BADGES;

  const [voted, setVoted] = useState<string | null>(null);
  const [picked, setPicked] = useState<string | null>(null);

  const p = ACTIVE_PROPOSAL;
  const base = totalVotes(p);
  const total = base + (voted ? 1 : 0);
  const votesOf = (cid: string) =>
    p.candidates.find((c) => c.id === cid)!.votes + (voted === cid ? 1 : 0);

  return (
    <section className="flex flex-col gap-4 px-4 py-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold text-ink-high">
          거버넌스
        </h1>
        <Badge tone={qualified ? "accent" : "neutral"} glow={qualified}>
          <Vote size={12} /> 뱃지 {badgeCount}
        </Badge>
      </div>

      {/* 자격 미달 게이트 */}
      {!qualified && (
        <Card className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink-high">
            <Lock size={16} className="text-ink-low" /> 뱃지 {GOVERNANCE_MIN_BADGES}개
            이상 시 투표 참여 가능
          </div>
          <ProgressBar value={(badgeCount / GOVERNANCE_MIN_BADGES) * 100} tone="accent" />
          <p className="text-xs text-ink-mid">
            현재 {badgeCount}/{GOVERNANCE_MIN_BADGES} · 아래 안건은 열람만 가능합니다.
          </p>
        </Card>
      )}

      {/* 진행 중 안건 */}
      <Card>
        <div className="flex items-center justify-between">
          <Badge tone="turf">진행 중</Badge>
          <span className="flex items-center gap-1 text-xs text-ink-mid">
            <CalendarClock size={12} /> ~{p.deadline}
          </span>
        </div>
        <h2 className="mt-2 text-lg font-bold text-ink-high">{p.title}</h2>
        <p className="mt-1 text-sm text-ink-mid">{p.description}</p>

        {/* 후보 미리보기 + 투표 */}
        <div className="mt-3 flex flex-col gap-2">
          {p.candidates.map((c) => {
            const v = votesOf(c.id);
            const pct = total > 0 ? Math.round((v / total) * 100) : 0;
            const isPicked = picked === c.id;
            const isVoted = voted === c.id;
            const showResult = voted !== null || !qualified;

            return (
              <button
                key={c.id}
                type="button"
                disabled={!qualified || voted !== null}
                onClick={() => setPicked(c.id)}
                className={cn(
                  "relative overflow-hidden rounded-card border p-3 text-left transition-colors",
                  isVoted
                    ? "border-accent bg-bg-elevated"
                    : isPicked
                      ? "border-accent bg-bg-surface"
                      : "border-bg-hover bg-bg-surface",
                  qualified && voted === null && "hover:border-ink-mid",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.preview}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ink-high">
                      {c.label}
                      {isVoted && (
                        <Check size={14} className="ml-1 inline text-accent" />
                      )}
                    </p>
                    <p className="truncate text-xs text-ink-mid">{c.desc}</p>
                  </div>
                  {showResult && (
                    <span className="font-display text-sm font-bold text-ink-high">
                      {pct}%
                    </span>
                  )}
                </div>
                {showResult && (
                  <div className="mt-2">
                    <ProgressBar value={pct} tone={isVoted ? "accent" : "turf"} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* 투표 액션 */}
        {qualified &&
          (voted ? (
            <p className="mt-3 flex items-center justify-center gap-1 text-sm font-semibold text-accent">
              <Check size={16} /> 투표 완료 — 결과 발표 시 알림을 보내드려요
            </p>
          ) : (
            <Button
              variant="primary"
              size="lg"
              className={cn("mt-3 w-full", !picked && "opacity-50")}
              disabled={!picked}
              onClick={() => picked && setVoted(picked)}
            >
              이 후보에 1표 투표하기
            </Button>
          ))}
      </Card>

      {/* 과거 투표 이력 */}
      {qualified && (
        <div>
          <SectionHeader title="과거 투표 이력" />
          <ul className="flex flex-col gap-2">
            {PAST_VOTES.map((pv) => (
              <li
                key={pv.id}
                className="flex items-center gap-3 rounded-card bg-bg-surface p-3"
              >
                <History size={16} className="shrink-0 text-ink-low" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink-high">
                    {pv.title}
                  </p>
                  <p className="text-xs text-ink-mid">
                    {pv.result} · {pv.date}
                  </p>
                </div>
                <Badge tone="neutral">내 선택 {pv.myChoice}</Badge>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href="/my"
        className="flex h-11 items-center justify-center rounded-btn bg-bg-surface text-sm font-medium text-ink-mid hover:text-ink-high"
      >
        ← 마이오너로 돌아가기
      </Link>
    </section>
  );
}
