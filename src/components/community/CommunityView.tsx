"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Award, CalendarCheck, Eye, EyeOff, Check } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";
import {
  GRID_OWNERS,
  MY_CREW,
  CREW_LOGOS,
} from "@/mocks/community";

export function CommunityView() {
  const isOwner = useUserStore((s) => s.isOwner);

  const [anon, setAnon] = useState(false);
  const [crewName, setCrewName] = useState(MY_CREW.name);
  const [logo, setLogo] = useState(MY_CREW.logo);
  const [saved, setSaved] = useState(true);

  // 비오너: 크루 시스템 안내.
  if (!isOwner) {
    return (
      <section className="flex flex-col gap-4 px-4 py-4">
        <h1 className="font-display text-2xl font-extrabold text-ink-high">
          커뮤니티
        </h1>
        <EmptyState
          icon={Users}
          title="격자 4인 · 크루로 함께해요"
          description="같은 격자를 입양한 4인 오너, 또는 크루 단위로 결속하는 커뮤니티입니다."
        />
        <Card className="flex flex-col gap-2">
          <h2 className="text-sm font-bold text-ink-high">크루 시스템이란?</h2>
          <ul className="flex flex-col gap-1.5 text-sm text-ink-mid">
            <li>• 같은 격자 4인 오너끼리 자동 매칭</li>
            <li>• 크루 결성 후 명칭·로고로 정체성 형성</li>
            <li>• 크루 누적 뱃지·출석률 랭킹 경쟁</li>
          </ul>
        </Card>
        <Link
          href="/ground"
          className="flex h-12 items-center justify-center rounded-btn bg-accent font-semibold text-ink-invert shadow-glow"
        >
          격자 입양하고 크루 만들기
        </Link>
      </section>
    );
  }

  // 오너.
  return (
    <section className="flex flex-col gap-4 px-4 py-4">
      <h1 className="font-display text-2xl font-extrabold text-ink-high">
        커뮤니티
      </h1>

      {/* 크루 통계 */}
      <Card elevated>
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-bg-base text-2xl">
            {logo}
          </span>
          <div className="flex-1">
            <p className="font-display text-lg font-extrabold text-ink-high">
              {crewName}
            </p>
            <p className="text-xs text-ink-mid">{MY_CREW.memberCount}인 크루</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-card bg-bg-base p-3 text-center">
            <Award size={16} className="mx-auto text-accent" />
            <p className="mt-1 font-display text-xl font-extrabold text-ink-high">
              {MY_CREW.totalBadges}
            </p>
            <p className="text-xs text-ink-mid">크루 총 뱃지</p>
          </div>
          <div className="rounded-card bg-bg-base p-3 text-center">
            <CalendarCheck size={16} className="mx-auto text-turf-300" />
            <p className="mt-1 font-display text-xl font-extrabold text-ink-high">
              {MY_CREW.attendanceRate}%
            </p>
            <p className="text-xs text-ink-mid">평균 출석률</p>
          </div>
        </div>
      </Card>

      {/* 동승 4인 오너 + 익명/공개 토글 */}
      <div>
        <div className="flex items-center justify-between">
          <SectionHeader title="동승 오너 (4인)" />
          <button
            type="button"
            onClick={() => setAnon((a) => !a)}
            className="flex items-center gap-1 text-xs text-ink-mid hover:text-ink-high"
          >
            {anon ? <EyeOff size={14} /> : <Eye size={14} />}
            {anon ? "익명" : "공개"}
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {GRID_OWNERS.map((o) => (
            <Card key={o.id} className="flex items-center gap-3">
              <span className="text-2xl">{anon && !o.isMe ? "🫥" : o.avatar}</span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-ink-high">
                  {anon && !o.isMe ? "익명 오너" : o.nickname}
                  {o.isMe && <Badge tone="accent">나</Badge>}
                </p>
                <div className="mt-1">
                  <ProgressBar value={o.attendance} />
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs text-ink-mid">뱃지 {o.badges}</p>
                <p className="text-xs text-ink-low">출석 {o.attendance}%</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 크루 결성/수정 */}
      <div>
        <SectionHeader title="크루 설정" />
        <Card className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-ink-mid">크루 명칭</label>
            <input
              value={crewName}
              onChange={(e) => {
                setCrewName(e.target.value.slice(0, 16));
                setSaved(false);
              }}
              maxLength={16}
              className="mt-1 w-full rounded-btn bg-bg-base p-3 text-sm text-ink-high focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <div>
            <label className="text-xs text-ink-mid">크루 로고</label>
            <div className="mt-1 flex gap-2">
              {CREW_LOGOS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => {
                    setLogo(l);
                    setSaved(false);
                  }}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-btn text-xl transition-colors",
                    logo === l ? "bg-accent" : "bg-bg-base hover:bg-bg-hover",
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <Button
            variant={saved ? "secondary" : "primary"}
            size="lg"
            className="w-full"
            disabled={saved || crewName.trim().length === 0}
            onClick={() => setSaved(true)}
          >
            {saved ? (
              <>
                <Check size={18} /> 저장됨
              </>
            ) : (
              "크루 설정 저장"
            )}
          </Button>
        </Card>
      </div>
    </section>
  );
}
