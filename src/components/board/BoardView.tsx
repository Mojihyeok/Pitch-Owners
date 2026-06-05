"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MonitorSmartphone,
  Lock,
  AlertTriangle,
  Check,
  Film,
} from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import {
  BOARD_MAX_LEN,
  BOARD_MIN_BADGES,
  BOARD_PREVIEWS,
  MATCH_SLOTS,
  REVIEW_STEPS,
  checkBanned,
} from "@/mocks/board";

export function BoardView() {
  const badgeCount = useUserStore((s) => s.badgeCount);
  const qualified = badgeCount >= BOARD_MIN_BADGES;

  const [text, setText] = useState("");
  const [slot, setSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const banned = checkBanned(text);
  const canSubmit =
    text.trim().length > 0 && banned.length === 0 && slot !== null;

  return (
    <section className="flex flex-col gap-4 px-4 py-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold text-ink-high">
          전광판 메시지
        </h1>
        <Badge tone={qualified ? "accent" : "neutral"} glow={qualified}>
          <MonitorSmartphone size={12} /> 뱃지 {badgeCount}
        </Badge>
      </div>

      {/* 자격 미달 게이트 */}
      {!qualified ? (
        <>
          <Card className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink-high">
              <Lock size={16} className="text-ink-low" /> 뱃지 {BOARD_MIN_BADGES}개
              이상 시 메시지 송출 가능
            </div>
            <ProgressBar value={(badgeCount / BOARD_MIN_BADGES) * 100} tone="accent" />
            <p className="text-xs text-ink-mid">
              현재 {badgeCount}/{BOARD_MIN_BADGES} · 아래 메시지는 열람만 가능합니다.
            </p>
          </Card>

          <div>
            <SectionHeader title="진행 중 메시지" />
            <ul className="flex flex-col gap-2">
              {BOARD_PREVIEWS.map((m) => (
                <li key={m.id} className="rounded-card bg-bg-surface p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-ink-high">
                      {m.nickname}
                    </span>
                    <Badge tone="neutral">{m.status}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-ink-mid">“{m.text}”</p>
                  <p className="mt-0.5 text-xs text-ink-low">{m.matchLabel}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : submitted ? (
        /* 검수 진행 + 송출 영상 수령 */
        <>
          <Card>
            <h2 className="mb-3 text-sm font-semibold text-ink-high">
              검수 진행 상태
            </h2>
            <ol className="flex items-center justify-between">
              {REVIEW_STEPS.map((label, i) => {
                const reached = i <= 1; // 접수~검수중(데모)
                return (
                  <li
                    key={label}
                    className="flex flex-1 flex-col items-center gap-1"
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-pill text-xs font-bold",
                        reached
                          ? "bg-accent text-ink-invert"
                          : "bg-bg-hover text-ink-low",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={cn(
                        "text-[11px]",
                        reached ? "text-ink-high" : "text-ink-low",
                      )}
                    >
                      {label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </Card>

          <Card className="text-center">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-ink-high">
              <Film size={16} className="text-accent" /> 송출 영상 캡처
            </div>
            <div className="flex aspect-video items-center justify-center rounded-btn bg-bg-base text-sm text-ink-low">
              승인·송출 완료 시 자동 수령됩니다
            </div>
          </Card>

          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => {
              setSubmitted(false);
              setText("");
              setSlot(null);
            }}
          >
            새 메시지 작성
          </Button>
        </>
      ) : (
        /* 작성 폼 */
        <>
          <Card>
            <SectionHeader title="메시지 작성" />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, BOARD_MAX_LEN))}
              maxLength={BOARD_MAX_LEN}
              rows={3}
              placeholder="전광판에 띄울 메시지 (최대 40자)"
              className="w-full resize-none rounded-btn bg-bg-base p-3 text-sm text-ink-high placeholder:text-ink-low focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <div className="mt-1 flex items-center justify-between">
              {banned.length > 0 ? (
                <span className="flex items-center gap-1 text-xs text-state-danger">
                  <AlertTriangle size={12} /> 부적절 표현: {banned.join(", ")}
                </span>
              ) : (
                <span className="text-xs text-ink-low">
                  욕설·광고·정치 표현은 송출 불가
                </span>
              )}
              <span
                className={cn(
                  "text-xs font-medium",
                  text.length >= BOARD_MAX_LEN ? "text-state-warn" : "text-ink-mid",
                )}
              >
                {text.length}/{BOARD_MAX_LEN}
              </span>
            </div>
          </Card>

          {/* 매치·슬롯 선택 */}
          <div>
            <SectionHeader title="매치 · 슬롯 선택" />
            <div className="flex flex-col gap-2">
              {MATCH_SLOTS.map((s) => {
                const soldOut = s.remain <= 0;
                const sel = slot === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    disabled={soldOut}
                    onClick={() => setSlot(s.id)}
                    className={cn(
                      "flex items-center justify-between rounded-card border p-3 text-left transition-colors",
                      sel
                        ? "border-accent bg-bg-elevated"
                        : "border-bg-hover bg-bg-surface",
                      soldOut && "opacity-40",
                    )}
                  >
                    <div>
                      <p className="text-sm font-semibold text-ink-high">
                        {s.matchLabel}
                      </p>
                      <p className="text-xs text-ink-mid">{s.time}</p>
                    </div>
                    {sel ? (
                      <Check size={18} className="text-accent" />
                    ) : (
                      <span className="text-xs text-ink-low">잔여 {s.remain}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            className={cn("w-full", !canSubmit && "opacity-50")}
            disabled={!canSubmit}
            onClick={() => setSubmitted(true)}
          >
            검수 요청하기
          </Button>
        </>
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
