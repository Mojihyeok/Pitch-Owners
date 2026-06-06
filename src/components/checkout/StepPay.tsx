"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import {
  useCheckoutStore,
  type PayMethod,
} from "@/store/useCheckoutStore";
import { perHeadOf, priceOf } from "@/lib/zonePolicy";
import { cn, formatKRW } from "@/lib/utils";
import { zoneLabel, type Grid } from "@/mocks/grids";

const PG_OPTIONS: { id: PayMethod; label: string; emoji: string }[] = [
  { id: "toss", label: "토스페이", emoji: "💙" },
  { id: "kakao", label: "카카오페이", emoji: "💛" },
  { id: "naver", label: "네이버페이", emoji: "💚" },
  { id: "card", label: "신용/체크카드", emoji: "💳" },
];

interface StepPayProps {
  grid: Grid;
  onPay: () => void;
  onBack: () => void;
}

// Step 5 — 결제.
export function StepPay({ grid, onPay, onBack }: StepPayProps) {
  const mode = useCheckoutStore((s) => s.mode);
  const groupSize = useCheckoutStore((s) => s.groupSize);
  const teamName = useCheckoutStore((s) => s.teamName);
  const payMethod = useCheckoutStore((s) => s.payMethod);
  const setPayMethod = useCheckoutStore((s) => s.setPayMethod);

  const [agree, setAgree] = useState(false);
  const [receipt, setReceipt] = useState(false);

  const isGroup = mode === "group";
  const headCount = isGroup ? groupSize : 1;
  const total = priceOf(grid.zone);
  const perHead = perHeadOf(grid.zone, headCount);
  const canPay = payMethod !== null && agree;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-ink-high">결제</h2>

      {/* 주문 요약 */}
      <div className="rounded-card bg-bg-surface p-4">
        <h3 className="mb-2 text-sm font-semibold text-ink-high">주문 요약</h3>
        <dl className="flex flex-col gap-1.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-mid">격자 · Zone</dt>
            <dd className="text-ink-high">
              {grid.id} · {zoneLabel(grid.zone)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-mid">유형</dt>
            <dd className="text-ink-high">
              {isGroup ? `그룹 ${groupSize}명` : "개인 1인"}
            </dd>
          </div>
          {isGroup && (
            <div className="flex justify-between">
              <dt className="text-ink-mid">팀명</dt>
              <dd className="text-ink-high">{teamName}</dd>
            </div>
          )}
          <div className="mt-1 flex justify-between border-t border-bg-hover pt-2">
            <dt className="font-semibold text-ink-high">총 결제금액</dt>
            <dd className="font-display text-lg font-extrabold text-accent">
              {formatKRW(total)}
            </dd>
          </div>
          {isGroup && (
            <div className="flex justify-between text-xs">
              <dt className="text-ink-low">인당 분담액</dt>
              <dd className="text-ink-mid">
                {formatKRW(perHead)} × {groupSize}명
              </dd>
            </div>
          )}
        </dl>
      </div>

      {/* 그룹 일괄결제 안내 */}
      {isGroup && (
        <div className="flex items-start gap-2 rounded-card bg-turf-900 px-3 py-2 text-xs text-turf-300">
          <Send size={14} className="mt-0.5 shrink-0" />
          대표자(나) 일괄 결제 후, 멤버에게 초대 알림이 발송됩니다. (데모)
        </div>
      )}

      {/* PG 선택 */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-ink-high">결제 수단</h3>
        <div className="grid grid-cols-2 gap-2">
          {PG_OPTIONS.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setPayMethod(o.id)}
              className={cn(
                "flex items-center gap-2 rounded-btn border px-3 py-3 text-sm font-medium transition-colors",
                payMethod === o.id
                  ? "border-accent bg-bg-elevated text-ink-high"
                  : "border-bg-hover bg-bg-surface text-ink-mid hover:text-ink-high",
              )}
            >
              <span className="text-lg">{o.emoji}</span>
              {o.label}
              {payMethod === o.id && (
                <Check size={16} className="ml-auto text-accent" />
              )}
            </button>
          ))}
        </div>
        <p className="mt-1 text-xs text-ink-low">
          ※ 데모 — 실제 결제는 진행되지 않습니다.
        </p>
      </div>

      {/* 약관 */}
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

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onBack}
          className="h-13 flex-1 rounded-btn bg-bg-surface font-semibold text-ink-mid"
        >
          이전
        </button>
        <button
          type="button"
          disabled={!canPay}
          onClick={onPay}
          className={cn(
            "h-13 flex-[2] rounded-btn bg-accent font-semibold text-ink-invert",
            !canPay && "opacity-50",
          )}
        >
          {formatKRW(total)} 결제하기
        </button>
      </div>
    </div>
  );
}
