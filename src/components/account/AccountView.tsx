"use client";

import { useState } from "react";
import {
  User,
  ShieldCheck,
  Phone,
  Bell,
  CreditCard,
  Download,
  LogOut,
  Check,
} from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { DemoPanel } from "./DemoPanel";
import { cn } from "@/lib/utils";

const NOTIF_CHANNELS = [
  { id: "fcm-match", label: "FCM · 매치데이 알림" },
  { id: "fcm-reward", label: "FCM · 리워드/만료 알림" },
  { id: "kakao-gov", label: "카카오 알림톡 · 거버넌스" },
  { id: "kakao-event", label: "카카오 알림톡 · 이벤트" },
];

export function AccountView() {
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);

  const [notif, setNotif] = useState<Record<string, boolean>>({
    "fcm-match": true,
    "fcm-reward": true,
    "kakao-gov": false,
    "kakao-event": true,
  });
  const [reissued, setReissued] = useState(false);

  return (
    <section className="flex flex-col gap-4 px-4 py-4">
      <h1 className="font-display text-2xl font-extrabold text-ink-high">계정</h1>

      {/* 회원 전용 섹션 — 비로그인 시 노출 안 됨 */}
      {!isLoggedIn ? (
        <EmptyState
          icon={User}
          title="로그인 후 이용할 수 있어요"
          description="아래 데모 패널에서 로그인을 켜면 계정 정보가 표시됩니다."
        />
      ) : (
        <>
          {/* 회원정보 */}
          <Card>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-accent text-xl text-ink-invert">
                🦊
              </span>
              <div>
                <p className="font-display text-lg font-extrabold text-ink-high">
                  초록불꽃
                </p>
                <p className="text-sm text-ink-mid">mojihyeok@ajou.ac.kr</p>
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-2 border-t border-bg-hover pt-3 text-sm">
              <span className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-ink-mid">
                  <ShieldCheck size={14} /> 본인인증
                </span>
                <Badge tone="turf">인증 완료</Badge>
              </span>
              <span className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-ink-mid">
                  <Phone size={14} /> 연락처
                </span>
                <span className="text-ink-high">010-****-1234</span>
              </span>
            </div>
          </Card>

          {/* 알림 설정 */}
          <div>
            <SectionHeader title="알림 설정" />
            <Card className="flex flex-col gap-1">
              {NOTIF_CHANNELS.map((ch) => {
                const on = notif[ch.id];
                return (
                  <div
                    key={ch.id}
                    className="flex items-center justify-between py-1.5"
                  >
                    <span className="flex items-center gap-2 text-sm text-ink-high">
                      <Bell size={14} className="text-ink-mid" />
                      {ch.label}
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={on}
                      onClick={() =>
                        setNotif((n) => ({ ...n, [ch.id]: !n[ch.id] }))
                      }
                      className={cn(
                        "relative h-6 w-11 rounded-pill transition-colors",
                        on ? "bg-accent" : "bg-bg-hover",
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-0.5 h-5 w-5 rounded-pill bg-ink-high transition-all",
                          on ? "left-[22px]" : "left-0.5",
                        )}
                      />
                    </button>
                  </div>
                );
              })}
            </Card>
          </div>

          {/* NFC 카드 분실 신고·재발급 */}
          <div>
            <SectionHeader title="NFC 카드" />
            <Card className="flex items-center gap-3">
              <CreditCard size={20} className="shrink-0 text-turf-300" />
              <p className="flex-1 text-sm text-ink-mid">
                카드를 분실했나요? 분실 신고 후 재발급할 수 있어요.
              </p>
              <Button
                size="sm"
                variant={reissued ? "secondary" : "primary"}
                disabled={reissued}
                onClick={() => setReissued(true)}
              >
                {reissued ? (
                  <>
                    <Check size={16} /> 접수됨
                  </>
                ) : (
                  "재발급"
                )}
              </Button>
            </Card>
          </div>

          {/* 데이터/탈퇴 */}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="flex items-center gap-2 rounded-card bg-bg-surface p-4 text-sm text-ink-mid hover:text-ink-high"
            >
              <Download size={16} /> 내 데이터 다운로드 (GDPR/PIPA)
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-card bg-bg-surface p-4 text-sm text-state-danger"
            >
              <LogOut size={16} /> 회원 탈퇴
            </button>
          </div>
        </>
      )}

      {/* 데모 토글 패널 — 항상 노출(상태 전환용) */}
      <div className="mt-2">
        <SectionHeader title="개발용" />
        <DemoPanel />
      </div>
    </section>
  );
}
