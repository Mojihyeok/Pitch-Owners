"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Award,
  CalendarCheck,
  Eye,
  EyeOff,
  Check,
  User,
  CheckCircle2,
} from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";
import { maxOf } from "@/lib/zonePolicy";
import { GRID_OWNERS, MY_CREW, CREW_LOGOS } from "@/mocks/community";

const AVATARS = ["🦊", "🐯", "🦁", "🐻", "🐺", "🦅"];

export function CommunityView() {
  const isOwner = useUserStore((s) => s.isOwner);
  const crews = useUserStore((s) => s.crews);

  // checkout에서 만든 최신 크루 연동.
  const realCrew = crews.length ? crews[crews.length - 1] : null;
  const isGroupCrew = realCrew ? realCrew.members.length > 1 : false;
  const soloOnly = realCrew !== null && !isGroupCrew;

  const [anon, setAnon] = useState(false);
  const [crewName, setCrewName] = useState(realCrew?.teamName ?? MY_CREW.name);
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
          title={`개인 또는 2~${maxOf("signature")}인 그룹으로 함께해요`}
          description="같은 격자를 입양한 공동 오너, 또는 크루 단위로 결속하는 커뮤니티입니다."
        />
        <Card className="flex flex-col gap-2">
          <h2 className="text-sm font-bold text-ink-high">크루 시스템이란?</h2>
          <ul className="flex flex-col gap-1.5 text-sm text-ink-mid">
            <li>• 같은 격자 공동 오너(Zone별 최대 {maxOf("signature")}인)끼리 자동 매칭</li>
            <li>• 결제 시 만든 팀명·멤버가 그대로 크루로 연결</li>
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

  // 개인 단독 오너 (그룹 아님).
  if (soloOnly) {
    return (
      <section className="flex flex-col gap-4 px-4 py-4">
        <h1 className="font-display text-2xl font-extrabold text-ink-high">
          커뮤니티
        </h1>
        <Card className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-accent text-xl text-ink-invert">
            <User size={24} />
          </span>
          <div>
            <p className="text-sm font-bold text-ink-high">개인 단독 오너</p>
            <p className="text-xs text-ink-mid">
              격자 {realCrew?.gridId}를 1인으로 입양하셨어요.
            </p>
          </div>
        </Card>
        <Card className="text-center">
          <p className="text-sm text-ink-high">함께할 멤버를 초대해보세요.</p>
          <p className="mt-1 text-xs text-ink-mid">
            추가 입양 시 그룹(2~{maxOf("signature")}인)으로 크루를 결성할 수 있어요.
          </p>
        </Card>
        <Link
          href="/ground"
          className="flex h-12 items-center justify-center rounded-btn bg-turf-700 font-semibold text-ink-high"
        >
          격자 추가 입양하기
        </Link>
      </section>
    );
  }

  // 그룹 오너 (실제 크루 또는 데모 mock).
  const teamLabel = isGroupCrew ? realCrew!.teamName : crewName;
  const memberCount = isGroupCrew ? realCrew!.members.length : MY_CREW.memberCount;

  // 동승 오너 목록 정규화.
  const owners = isGroupCrew
    ? realCrew!.members.map((m, i) => ({
        id: `m-${i}`,
        nickname: m.isSelf ? "나 (대표자)" : m.jeonbukId,
        avatar: AVATARS[i % AVATARS.length],
        isMe: m.isSelf,
        verified: m.verified,
        badges: undefined as number | undefined,
        attendance: undefined as number | undefined,
      }))
    : GRID_OWNERS.map((o) => ({
        id: o.id,
        nickname: o.nickname,
        avatar: o.avatar,
        isMe: !!o.isMe,
        verified: undefined as boolean | undefined,
        badges: o.badges as number | undefined,
        attendance: o.attendance as number | undefined,
      }));

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
              {teamLabel}
            </p>
            <p className="text-xs text-ink-mid">{memberCount}인 크루</p>
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

      {/* 동승 오너 + 익명/공개 토글 */}
      <div>
        <div className="flex items-center justify-between">
          <SectionHeader title={`동승 오너 (${memberCount}인)`} />
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
          {owners.map((o) => (
            <Card key={o.id} className="flex items-center gap-3">
              <span className="text-2xl">{anon && !o.isMe ? "🫥" : o.avatar}</span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-ink-high">
                  {anon && !o.isMe ? "익명 오너" : o.nickname}
                  {o.isMe && <Badge tone="accent">나</Badge>}
                </p>
                {typeof o.attendance === "number" && (
                  <div className="mt-1">
                    <ProgressBar value={o.attendance} />
                  </div>
                )}
              </div>
              <div className="shrink-0 text-right">
                {typeof o.badges === "number" ? (
                  <>
                    <p className="text-xs text-ink-mid">뱃지 {o.badges}</p>
                    <p className="text-xs text-ink-low">출석 {o.attendance}%</p>
                  </>
                ) : o.verified ? (
                  <span className="flex items-center gap-1 text-xs text-state-success">
                    <CheckCircle2 size={12} /> 인증
                  </span>
                ) : null}
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
