"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, CircleCheck, Package, Truck, Home, QrCode } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { QrCard } from "./QrCard";
import { cn, formatKRW } from "@/lib/utils";
import { getGridById, zoneLabel } from "@/mocks/grids";

const PG_OPTIONS = [
  { id: "toss", label: "토스페이", emoji: "💙" },
  { id: "kakao", label: "카카오페이", emoji: "💛" },
  { id: "naver", label: "네이버페이", emoji: "💚" },
  { id: "card", label: "신용/체크카드", emoji: "💳" },
];

const STEPS = [
  { label: "주문완료", icon: CircleCheck },
  { label: "제작", icon: Package },
  { label: "배송중", icon: Truck },
  { label: "수령", icon: Home },
];

interface CheckoutViewProps {
  gridId?: string;
}

export function CheckoutView({ gridId }: CheckoutViewProps) {
  const adoptGrid = useUserStore((s) => s.adoptGrid);
  const grid = gridId ? getGridById(gridId) : undefined;

  const [pg, setPg] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);
  const [receipt, setReceipt] = useState(false);
  const [done, setDone] = useState(false);

  if (!grid) {
    return (
      <EmptyState
        title="주문 정보를 찾을 수 없어요"
        description="격자를 다시 선택해주세요."
        action={
          <Link
            href="/ground"
            className="flex h-11 items-center justify-center rounded-btn bg-accent px-4 font-semibold text-ink-invert"
          >
            그라운드 맵으로
          </Link>
        }
      />
    );
  }

  // ── 결제 완료 화면 ──────────────────────────────
  if (done) {
    const currentStep = 0; // 주문완료 단계(데모)

    return (
      <section className="flex flex-col gap-4 px-4 py-6">
        <div className="flex flex-col items-center gap-2 py-2 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-pill bg-accent text-ink-invert shadow-glow">
            <Check size={32} />
          </span>
          <h1 className="font-display text-xl font-extrabold text-ink-high">
            입양 완료!
          </h1>
          <p className="text-sm text-ink-mid">
            격자 <strong className="text-ink-high">{grid.id}</strong>의 오너가
            되셨어요.
          </p>
        </div>

        {/* NFC 발주·배송 스텝퍼 */}
        <Card>
          <h2 className="mb-3 text-sm font-semibold text-ink-high">
            NFC 카드 배송 추적
          </h2>
          <ol className="flex items-center justify-between">
            {STEPS.map((s, i) => {
              const reached = i <= currentStep;
              const Icon = s.icon;
              return (
                <li key={s.label} className="flex flex-1 flex-col items-center gap-1">
                  <div className="flex w-full items-center">
                    <span
                      className={cn(
                        "h-0.5 flex-1",
                        i === 0
                          ? "bg-transparent"
                          : i <= currentStep
                            ? "bg-accent"
                            : "bg-bg-hover",
                      )}
                    />
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-pill",
                        reached
                          ? "bg-accent text-ink-invert"
                          : "bg-bg-hover text-ink-low",
                      )}
                    >
                      <Icon size={16} />
                    </span>
                    <span
                      className={cn(
                        "h-0.5 flex-1",
                        i === STEPS.length - 1
                          ? "bg-transparent"
                          : i < currentStep
                            ? "bg-accent"
                            : "bg-bg-hover",
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-[11px]",
                      reached ? "text-ink-high" : "text-ink-low",
                    )}
                  >
                    {s.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </Card>

        {/* 디지털 카드(QR) 임시 발급 */}
        <Card elevated>
          <div className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-ink-high">
            <QrCode size={16} /> 디지털 카드 (임시)
          </div>
          <div className="flex items-center gap-4">
            <div className="w-32 shrink-0">
              <QrCard value={`PO-${grid.id}`} />
            </div>
            <div className="text-xs text-ink-mid">
              <p className="text-sm font-semibold text-ink-high">PITCH OWNERS</p>
              <p className="mt-0.5">격자 {grid.id}</p>
              <p>{zoneLabel(grid.zone)}</p>
              <p className="mt-2 text-ink-low">
                실물 NFC 카드 도착 전까지 이 QR로 즉시 사용 가능합니다.
              </p>
            </div>
          </div>
        </Card>

        {/* 결제 이력 / 환불 상태 */}
        <Card>
          <h2 className="mb-2 text-sm font-semibold text-ink-high">결제 이력</h2>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-mid">격자 {grid.id} 반기 입양</span>
            <span className="font-semibold text-ink-high">
              {formatKRW(grid.priceKRW)}
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs">
            <span className="text-ink-low">환불 진행 상태</span>
            <Badge tone="turf">정상 결제</Badge>
          </div>
        </Card>

        <Link
          href="/my"
          className="flex h-13 w-full items-center justify-center rounded-btn bg-accent font-semibold text-ink-invert shadow-glow"
        >
          마이오너로 이동
        </Link>
      </section>
    );
  }

  // ── 결제 화면 ──────────────────────────────────
  return (
    <section className="flex flex-col gap-4 px-4 py-4">
      <h1 className="font-display text-2xl font-extrabold text-ink-high">결제</h1>

      {/* 주문 요약 */}
      <Card>
        <h2 className="mb-2 text-sm font-semibold text-ink-high">주문 요약</h2>
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink-mid">
            격자 {grid.id} · {zoneLabel(grid.zone)}
          </span>
          <span className="font-semibold text-ink-high">
            {formatKRW(grid.priceKRW)}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-bg-hover pt-2 text-sm">
          <span className="font-semibold text-ink-high">총 결제금액</span>
          <span className="font-display text-lg font-extrabold text-accent">
            {formatKRW(grid.priceKRW)}
          </span>
        </div>
      </Card>

      {/* PG 선택 (모킹) */}
      <div>
        <h2 className="mb-2 text-sm font-semibold text-ink-high">결제 수단</h2>
        <div className="grid grid-cols-2 gap-2">
          {PG_OPTIONS.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setPg(o.id)}
              className={cn(
                "flex items-center gap-2 rounded-btn border px-3 py-3 text-sm font-medium transition-colors",
                pg === o.id
                  ? "border-accent bg-bg-elevated text-ink-high"
                  : "border-bg-hover bg-bg-surface text-ink-mid hover:text-ink-high",
              )}
            >
              <span className="text-lg">{o.emoji}</span>
              {o.label}
              {pg === o.id && <Check size={16} className="ml-auto text-accent" />}
            </button>
          ))}
        </div>
        <p className="mt-1 text-xs text-ink-low">※ 데모 — 실제 결제는 진행되지 않습니다.</p>
      </div>

      {/* 약관 동의 */}
      <div className="flex flex-col gap-2">
        <label className="flex cursor-pointer items-start gap-2">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-accent"
          />
          <span className="text-sm text-ink-high">
            <strong>[필수]</strong> 본 입양은 자산 소유가 아닌{" "}
            <strong>후원</strong>이며, 관련 약관에 동의합니다.
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-2">
          <input
            type="checkbox"
            checked={receipt}
            onChange={(e) => setReceipt(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-accent"
          />
          <span className="text-sm text-ink-mid">
            [선택] 기부금 영수증 발급을 신청합니다.
          </span>
        </label>
      </div>

      {/* 결제 CTA */}
      <Button
        variant="primary"
        size="lg"
        disabled={!pg || !agree}
        className={cn("w-full", (!pg || !agree) && "opacity-50")}
        onClick={() => {
          adoptGrid(grid.id);
          setDone(true);
        }}
      >
        {formatKRW(grid.priceKRW)} 결제하기
      </Button>
    </section>
  );
}
