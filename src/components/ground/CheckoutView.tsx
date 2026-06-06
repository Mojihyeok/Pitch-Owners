"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { EmptyState } from "@/components/ui/EmptyState";
import { CheckoutStepper, type StepDef } from "@/components/checkout/CheckoutStepper";
import { StepMode } from "@/components/checkout/StepMode";
import { StepGroupSize } from "@/components/checkout/StepGroupSize";
import { StepMembers } from "@/components/checkout/StepMembers";
import { StepTeamName } from "@/components/checkout/StepTeamName";
import { StepPay } from "@/components/checkout/StepPay";
import { CheckoutDone } from "@/components/checkout/CheckoutDone";
import { getGridById } from "@/mocks/grids";

type StepKey = "mode" | "size" | "members" | "team" | "pay";

interface CheckoutViewProps {
  gridId?: string;
}

export function CheckoutView({ gridId }: CheckoutViewProps) {
  const adoptGrid = useUserStore((s) => s.adoptGrid);
  const setZone = useCheckoutStore((s) => s.setZone);
  const mode = useCheckoutStore((s) => s.mode);
  const groupSize = useCheckoutStore((s) => s.groupSize);
  const teamName = useCheckoutStore((s) => s.teamName);
  const members = useCheckoutStore((s) => s.members);
  const reset = useCheckoutStore((s) => s.reset);

  const grid = gridId ? getGridById(gridId) : undefined;

  const [step, setStep] = useState<StepKey>("mode");
  const [done, setDone] = useState(false);

  // 진입 시 체크아웃 스토어 초기화 + Zone 세팅(외부 상태 동기화).
  useEffect(() => {
    reset();
    if (grid) setZone(grid.zone);
  }, [gridId, grid, reset, setZone]);

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

  const isGroup = mode === "group";
  const isBasic = grid.zone === "basic"; // 정원 2 → 인원 선택 생략
  const headCount = isGroup ? groupSize : 1;

  // Zone·유형에 따른 스텝 구성.
  const steps: StepDef[] = !isGroup
    ? [
        { key: "mode", label: "유형" },
        { key: "pay", label: "결제" },
      ]
    : isBasic
      ? [
          { key: "mode", label: "유형" },
          { key: "members", label: "멤버" },
          { key: "team", label: "팀명" },
          { key: "pay", label: "결제" },
        ]
      : [
          { key: "mode", label: "유형" },
          { key: "size", label: "인원" },
          { key: "members", label: "멤버" },
          { key: "team", label: "팀명" },
          { key: "pay", label: "결제" },
        ];

  const goNext = () => {
    if (step === "mode") setStep(isGroup ? (isBasic ? "members" : "size") : "pay");
    else if (step === "size") setStep("members");
    else if (step === "members") setStep("team");
    else if (step === "team") setStep("pay");
  };
  const goBack = () => {
    if (step === "pay") setStep(isGroup ? "team" : "mode");
    else if (step === "team") setStep("members");
    else if (step === "members") setStep(isBasic ? "mode" : "size");
    else if (step === "size") setStep("mode");
  };

  const handlePay = () => {
    adoptGrid(
      grid.id,
      isGroup ? { gridId: grid.id, teamName, members } : undefined,
    );
    setDone(true);
  };

  if (done) {
    return (
      <section className="px-4 py-6">
        <CheckoutDone
          grid={grid}
          isGroup={isGroup}
          headCount={headCount}
          teamName={teamName}
        />
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-5 px-4 py-4">
      <h1 className="font-display text-2xl font-extrabold text-ink-high">결제</h1>

      <CheckoutStepper steps={steps} currentKey={step} onJump={(k) => setStep(k as StepKey)} />

      {step === "mode" && <StepMode zone={grid.zone} onNext={goNext} />}
      {step === "size" && (
        <StepGroupSize zone={grid.zone} onNext={goNext} onBack={goBack} />
      )}
      {step === "members" && <StepMembers onNext={goNext} onBack={goBack} />}
      {step === "team" && <StepTeamName onNext={goNext} onBack={goBack} />}
      {step === "pay" && <StepPay grid={grid} onPay={handlePay} onBack={goBack} />}
    </section>
  );
}
