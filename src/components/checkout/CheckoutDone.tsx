"use client";

import Link from "next/link";
import {
  Check,
  CircleCheck,
  Package,
  Truck,
  Home,
  QrCode,
  CreditCard,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { QrCard } from "@/components/ground/QrCard";
import { cn, formatKRW } from "@/lib/utils";
import { priceOf } from "@/lib/zonePolicy";
import { zoneLabel, type Grid } from "@/mocks/grids";

const STEPS = [
  { label: "주문완료", icon: CircleCheck },
  { label: "제작", icon: Package },
  { label: "배송중", icon: Truck },
  { label: "수령", icon: Home },
];

interface CheckoutDoneProps {
  grid: Grid;
  isGroup: boolean;
  headCount: number;
  teamName: string;
}

// 결제 완료 — NFC 발주 스텝퍼 + QR + 결제 이력.
export function CheckoutDone({ grid, isGroup, headCount, teamName }: CheckoutDoneProps) {
  const currentStep = 0;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2 py-2 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-pill bg-accent text-ink-invert shadow-glow">
          <Check size={32} />
        </span>
        <h1 className="font-display text-xl font-extrabold text-ink-high">
          입양 완료!
        </h1>
        <p className="text-sm text-ink-mid">
          격자 <strong className="text-ink-high">{grid.id}</strong>의{" "}
          {isGroup ? (
            <>
              <strong className="text-ink-high">{teamName}</strong> 크루({headCount}
              명) 오너가 되셨어요.
            </>
          ) : (
            "오너가 되셨어요."
          )}
        </p>
      </div>

      {/* NFC 발주 스텝퍼 */}
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink-high">NFC 카드 배송 추적</h2>
          <Badge tone="neutral">
            <CreditCard size={12} /> {headCount}매 발주
          </Badge>
        </div>
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
                      i === 0 ? "bg-transparent" : i <= currentStep ? "bg-accent" : "bg-bg-hover",
                    )}
                  />
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-pill",
                      reached ? "bg-accent text-ink-invert" : "bg-bg-hover text-ink-low",
                    )}
                  >
                    <Icon size={16} />
                  </span>
                  <span
                    className={cn(
                      "h-0.5 flex-1",
                      i === STEPS.length - 1 ? "bg-transparent" : i < currentStep ? "bg-accent" : "bg-bg-hover",
                    )}
                  />
                </div>
                <span className={cn("text-[11px]", reached ? "text-ink-high" : "text-ink-low")}>
                  {s.label}
                </span>
              </li>
            );
          })}
        </ol>
        {isGroup && (
          <p className="mt-2 text-xs text-ink-low">
            그룹 인원 {headCount}명 각자에게 실물 NFC 카드가 발송됩니다.
          </p>
        )}
      </Card>

      {/* 디지털 QR 카드 */}
      <Card elevated>
        <div className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-ink-high">
          <QrCode size={16} /> 디지털 카드 (임시)
        </div>
        <div className="flex items-center gap-4">
          <div className="w-32 shrink-0">
            <QrCard value={`PO-${grid.id}-${isGroup ? teamName : "SOLO"}`} />
          </div>
          <div className="text-xs text-ink-mid">
            <p className="text-sm font-semibold text-ink-high">PITCH OWNERS</p>
            <p className="mt-0.5">격자 {grid.id}</p>
            <p>{zoneLabel(grid.zone)}</p>
            {isGroup && <p className="text-accent">{teamName} 크루</p>}
            <p className="mt-2 text-ink-low">
              실물 카드 도착 전까지 이 QR로 즉시 사용 가능합니다.
            </p>
          </div>
        </div>
      </Card>

      {/* 결제 이력 */}
      <Card>
        <h2 className="mb-2 text-sm font-semibold text-ink-high">결제 이력</h2>
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink-mid">
            격자 {grid.id} {isGroup ? `· 그룹 ${headCount}명` : "· 개인"}
          </span>
          <span className="font-semibold text-ink-high">{formatKRW(priceOf(grid.zone))}</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-xs">
          <span className="text-ink-low">환불 진행 상태</span>
          <Badge tone="turf">정상 결제</Badge>
        </div>
      </Card>

      <div className="flex gap-2">
        {isGroup && (
          <Link
            href="/community"
            className="flex h-13 flex-1 items-center justify-center rounded-btn bg-turf-700 font-semibold text-ink-high"
          >
            크루 보기
          </Link>
        )}
        <Link
          href="/my"
          className="flex h-13 flex-1 items-center justify-center rounded-btn bg-accent font-semibold text-ink-invert shadow-glow"
        >
          마이오너로 이동
        </Link>
      </div>
    </section>
  );
}
