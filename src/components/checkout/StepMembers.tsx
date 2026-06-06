"use client";

import { CheckCircle2, AlertCircle, ArrowRight, UserCheck } from "lucide-react";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { mockVerifyJeonbukId } from "@/lib/checkout";
import { cn } from "@/lib/utils";

interface StepMembersProps {
  onNext: () => void;
  onBack: () => void;
}

// Step 3 — 그룹 멤버 전북현대 아이디 입력 + 검증.
export function StepMembers({ onNext, onBack }: StepMembersProps) {
  const members = useCheckoutStore((s) => s.members);
  const setMember = useCheckoutStore((s) => s.setMember);

  // 중복 아이디 판정.
  const isDup = (idx: number) => {
    const id = members[idx].jeonbukId.trim();
    if (!id) return false;
    return members.some((m, i) => i !== idx && m.jeonbukId.trim() === id);
  };

  const guestVerified = members
    .slice(1)
    .every((m) => m.verified && m.jeonbukId.trim().length > 0);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-bold text-ink-high">멤버 초대</h2>
        <p className="mt-1 text-sm text-ink-mid">
          전북현대 통합회원 아이디로 멤버를 확인하세요.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {/* 본인 행 고정 */}
        <div className="flex items-center gap-3 rounded-card bg-bg-elevated p-3">
          <UserCheck size={20} className="text-accent" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-ink-high">나 (로그인 계정)</p>
            <p className="text-xs text-ink-mid">대표자 · 자동 인증</p>
          </div>
          <CheckCircle2 size={18} className="text-state-success" />
        </div>

        {/* 게스트 멤버 입력 */}
        {members.slice(1).map((m, i) => {
          const idx = i + 1;
          const dup = isDup(idx);
          const id = m.jeonbukId;
          const canVerify =
            id.trim().length > 0 && !dup && mockVerifyJeonbukId(id) && !m.verified;

          return (
            <div key={idx} className="rounded-card bg-bg-surface p-3">
              <label className="text-xs text-ink-mid">
                멤버 {idx} · 전북현대 통합회원 아이디
              </label>
              <div className="mt-1 flex gap-2">
                <input
                  value={id}
                  onChange={(e) =>
                    setMember(idx, {
                      jeonbukId: e.target.value,
                      verified: false,
                    })
                  }
                  placeholder="영문/숫자 4자 이상"
                  className="h-10 flex-1 rounded-btn bg-bg-base px-3 text-sm text-ink-high placeholder:text-ink-low focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <button
                  type="button"
                  disabled={!canVerify}
                  onClick={() => setMember(idx, { verified: true })}
                  className={cn(
                    "h-10 shrink-0 rounded-btn px-4 text-sm font-semibold",
                    canVerify
                      ? "bg-turf-700 text-ink-high"
                      : "bg-bg-hover text-ink-low",
                  )}
                >
                  확인
                </button>
              </div>
              {/* 상태 칩 */}
              <div className="mt-1.5">
                {dup ? (
                  <span className="flex items-center gap-1 text-xs text-state-danger">
                    <AlertCircle size={12} /> 중복된 아이디예요.
                  </span>
                ) : m.verified ? (
                  <span className="flex items-center gap-1 text-xs text-state-success">
                    <CheckCircle2 size={12} /> 확인 완료
                  </span>
                ) : id.trim().length > 0 && !mockVerifyJeonbukId(id) ? (
                  <span className="flex items-center gap-1 text-xs text-state-warn">
                    <AlertCircle size={12} /> 형식이 올바르지 않아요.
                  </span>
                ) : (
                  <span className="text-xs text-ink-low">확인이 필요해요.</span>
                )}
              </div>
            </div>
          );
        })}
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
          disabled={!guestVerified}
          onClick={onNext}
          className={cn(
            "flex h-13 flex-1 items-center justify-center gap-2 rounded-btn bg-accent font-semibold text-ink-invert",
            !guestVerified && "opacity-50",
          )}
        >
          다음 <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
