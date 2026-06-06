"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { mockCheckTeamName, type TeamNameCheck } from "@/lib/checkout";
import { cn } from "@/lib/utils";

interface StepTeamNameProps {
  onNext: () => void;
  onBack: () => void;
}

// Step 4 — 팀(크루) 이름.
export function StepTeamName({ onNext, onBack }: StepTeamNameProps) {
  const teamName = useCheckoutStore((s) => s.teamName);
  const setTeamName = useCheckoutStore((s) => s.setTeamName);

  const [intro, setIntro] = useState("");
  const [check, setCheck] = useState<TeamNameCheck | null>(null);

  const onCheck = () => setCheck(mockCheckTeamName(teamName));
  const verified = check?.ok === true;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-bold text-ink-high">팀 이름</h2>
        <p className="mt-1 text-sm text-ink-mid">
          우리 크루의 이름을 정해주세요 (2~20자).
        </p>
      </div>

      <div className="rounded-card bg-bg-surface p-3">
        <label className="text-xs text-ink-mid">팀 이름</label>
        <div className="mt-1 flex gap-2">
          <input
            value={teamName}
            onChange={(e) => {
              setTeamName(e.target.value.slice(0, 20));
              setCheck(null);
            }}
            maxLength={20}
            placeholder="한글·영문·숫자"
            className="h-10 flex-1 rounded-btn bg-bg-base px-3 text-sm text-ink-high placeholder:text-ink-low focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <button
            type="button"
            disabled={teamName.trim().length === 0}
            onClick={onCheck}
            className={cn(
              "h-10 shrink-0 rounded-btn px-4 text-sm font-semibold",
              teamName.trim().length > 0
                ? "bg-turf-700 text-ink-high"
                : "bg-bg-hover text-ink-low",
            )}
          >
            중복확인
          </button>
        </div>
        {check && (
          <div className="mt-1.5">
            {check.ok ? (
              <span className="flex items-center gap-1 text-xs text-state-success">
                <CheckCircle2 size={12} /> 사용 가능한 이름이에요.
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-state-danger">
                <AlertCircle size={12} /> {check.reason}
              </span>
            )}
          </div>
        )}
      </div>

      {/* 선택 한 줄 소개 */}
      <div className="rounded-card bg-bg-surface p-3">
        <label className="text-xs text-ink-mid">한 줄 소개 (선택)</label>
        <input
          value={intro}
          onChange={(e) => setIntro(e.target.value.slice(0, 40))}
          maxLength={40}
          placeholder="우리 크루를 한 줄로"
          className="mt-1 h-10 w-full rounded-btn bg-bg-base px-3 text-sm text-ink-high placeholder:text-ink-low focus:outline-none focus:ring-1 focus:ring-accent"
        />
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
          disabled={!verified}
          onClick={onNext}
          className={cn(
            "flex h-13 flex-1 items-center justify-center gap-2 rounded-btn bg-accent font-semibold text-ink-invert",
            !verified && "opacity-50",
          )}
        >
          다음 <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
