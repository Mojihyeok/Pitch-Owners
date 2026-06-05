"use client";

import { useState } from "react";
import Link from "next/link";
import { Ticket, Clock, Wallet } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Barcode } from "./Barcode";
import { cn } from "@/lib/utils";
import {
  activeRewards,
  isExpiringSoon,
  TURF_PAY_BALANCE,
  TURF_PAY_HISTORY,
  type Reward,
} from "@/mocks/rewards";

const KIND_LABEL: Record<Reward["kind"], string> = {
  coupon: "쿠폰",
  voucher: "바우처",
  mileage: "마일리지",
};

export function RewardsView() {
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const [active, setActive] = useState<Reward | null>(null);

  // 비로그인 시 노출 안 됨.
  if (!isLoggedIn) {
    return (
      <section className="px-4 py-4">
        <h1 className="font-display text-2xl font-extrabold text-ink-high">
          리워드 인박스
        </h1>
        <EmptyState
          icon={Ticket}
          title="로그인 후 이용할 수 있어요"
          description="퀘스트와 출석으로 쌓인 쿠폰·바우처·마일리지를 여기서 사용하세요."
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

  const rewards = activeRewards().sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <section className="flex flex-col gap-4 px-4 py-4">
      <h1 className="font-display text-2xl font-extrabold text-ink-high">
        리워드 인박스
      </h1>

      {/* 잔디 페이 */}
      <Card elevated>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm text-ink-mid">
            <Wallet size={16} className="text-turf-300" /> 잔디 페이 잔액
          </span>
          <span className="font-display text-xl font-extrabold text-turf-300">
            {TURF_PAY_BALANCE.toLocaleString("ko-KR")} P
          </span>
        </div>
        <ul className="mt-3 flex flex-col gap-1 border-t border-bg-hover pt-2">
          {TURF_PAY_HISTORY.map((tx) => (
            <li key={tx.id} className="flex items-center justify-between text-xs">
              <span className="text-ink-mid">
                {tx.label} · {tx.date}
              </span>
              <span
                className={cn(
                  "font-semibold",
                  tx.amount > 0 ? "text-turf-300" : "text-ink-low",
                )}
              >
                {tx.amount > 0 ? "+" : ""}
                {tx.amount.toLocaleString("ko-KR")} P
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 활성 리워드 리스트 */}
      <div>
        <SectionHeader title={`활성 리워드 ${rewards.length}`} />
        {rewards.length === 0 ? (
          <Card className="text-center text-sm text-ink-low">
            사용 가능한 리워드가 없어요.
          </Card>
        ) : (
          <div className="flex flex-col gap-2">
            {rewards.map((r) => {
              const soon = isExpiringSoon(r);
              return (
                <Card key={r.id} className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-btn bg-bg-elevated text-2xl">
                    {r.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <Badge tone="neutral">{KIND_LABEL[r.kind]}</Badge>
                      {soon && <Badge tone="danger">만료임박</Badge>}
                    </div>
                    <p className="mt-1 truncate text-sm font-semibold text-ink-high">
                      {r.title}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-ink-mid">
                      <Clock size={12} /> D-{r.daysLeft} · {r.partner}
                    </p>
                  </div>
                  <Button size="sm" variant="primary" onClick={() => setActive(r)}>
                    사용
                  </Button>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* 원터치 사용 모달 */}
      <Sheet
        open={active !== null}
        onClose={() => setActive(null)}
        title={active?.title}
      >
        {active && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm text-ink-mid">
              <span className="text-2xl">{active.icon}</span>
              {active.partner} · {KIND_LABEL[active.kind]}
            </div>

            {active.kind === "mileage" ? (
              <Card elevated className="text-center">
                <p className="text-sm text-ink-mid">적립 코드</p>
                <p className="mt-1 font-display text-2xl font-extrabold text-turf-300">
                  {active.code}
                </p>
              </Card>
            ) : (
              <>
                <Barcode value={active.code} />
                <p className="text-center font-display text-sm tracking-widest text-ink-high">
                  {active.code}
                </p>
              </>
            )}

            <p className="text-center text-xs text-ink-low">
              매장 직원에게 보여주거나 디지털 코드를 입력하세요. (데모)
            </p>
            <Button variant="secondary" size="lg" className="w-full" onClick={() => setActive(null)}>
              확인
            </Button>
          </div>
        )}
      </Sheet>
    </section>
  );
}
