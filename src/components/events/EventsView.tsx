"use client";

import Link from "next/link";
import {
  CalendarHeart,
  MapPin,
  Clock,
  DoorOpen,
  Download,
  QrCode,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { QrCard } from "@/components/ground/QrCard";
import {
  OPEN_PITCH_DAY,
  ENTRY_SLOTS,
  EVENT_GALLERY,
} from "@/mocks/events";

export function EventsView() {
  const isOwner = useUserStore((s) => s.isOwner);
  const ownedGrids = useUserStore((s) => s.ownedGrids);

  return (
    <section className="flex flex-col gap-4 px-4 py-4">
      <h1 className="font-display text-2xl font-extrabold text-ink-high">
        이벤트
      </h1>

      {/* 공통: 행사 안내 */}
      <Card>
        <Badge tone="accent" glow>
          <CalendarHeart size={12} /> 오픈 피치 데이
        </Badge>
        <h2 className="mt-2 text-lg font-bold text-ink-high">
          {OPEN_PITCH_DAY.title}
        </h2>
        <div className="mt-2 flex flex-col gap-1 text-sm text-ink-mid">
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {OPEN_PITCH_DAY.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} /> {OPEN_PITCH_DAY.place}
          </span>
        </div>
        <p className="mt-2 text-sm text-ink-mid">{OPEN_PITCH_DAY.description}</p>
      </Card>

      {/* 자격 확인 */}
      <Card className="flex items-center gap-2">
        {isOwner ? (
          <>
            <CheckCircle2 size={18} className="shrink-0 text-state-success" />
            <p className="text-sm text-ink-high">
              참여 자격 확인 완료 — 입장권이 발급되었어요.
            </p>
          </>
        ) : (
          <>
            <Lock size={18} className="shrink-0 text-ink-low" />
            <p className="text-sm text-ink-mid">
              격자 오너만 참여할 수 있어요. 입양 후 입장권이 자동 발급됩니다.
            </p>
          </>
        )}
      </Card>

      {/* 비오너 CTA */}
      {!isOwner && (
        <Link
          href="/ground"
          className="flex h-12 items-center justify-center rounded-btn bg-accent font-semibold text-ink-invert shadow-glow"
        >
          격자 입양하러 가기
        </Link>
      )}

      {/* 오너 전용 */}
      {isOwner && (
        <>
          {/* QR 입장권 */}
          <div>
            <SectionHeader title="QR 입장권" />
            <Card elevated>
              <div className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-ink-high">
                <QrCode size={16} /> 자동 발급된 입장권
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 shrink-0">
                  <QrCard value={`PO-EVENT-${ownedGrids[0] ?? "OWNER"}`} />
                </div>
                <div className="text-xs text-ink-mid">
                  <p className="text-sm font-semibold text-ink-high">입장권</p>
                  <p className="mt-0.5">격자 {ownedGrids[0] ?? "-"}</p>
                  <p className="mt-2 text-ink-low">
                    게이트에서 QR을 제시하세요. 1인 1매.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* 출입 슬롯 / 동선 */}
          <div>
            <SectionHeader title="출입 시간 · 동선" />
            <div className="flex flex-col gap-2">
              {ENTRY_SLOTS.map((s) => (
                <Card key={s.id} className="flex items-center gap-3">
                  <DoorOpen size={20} className="shrink-0 text-turf-300" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink-high">
                      {s.time}
                    </p>
                    <p className="text-xs text-ink-mid">
                      {s.gate} · {s.zone}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 단체사진·기념 영상 다운로드 */}
          <div>
            <SectionHeader title="기념 콘텐츠" />
            <div className="grid grid-cols-3 gap-2">
              {EVENT_GALLERY.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className="flex flex-col items-center gap-2 rounded-card bg-bg-surface p-4 shadow-card hover:bg-bg-hover"
                >
                  <span className="text-3xl">{g.thumb}</span>
                  <span className="text-xs font-medium text-ink-high">
                    {g.label}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-accent">
                    <Download size={12} /> 받기
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
