import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Users, ShieldCheck, Clock, Info } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatKRW } from "@/lib/utils";
import { getGridById, zoneLabel, type Zone } from "@/mocks/grids";

const ZONE_TONE: Record<Zone, "accent" | "turf" | "neutral"> = {
  signature: "accent",
  dynamic: "turf",
  basic: "neutral",
};

const ZONE_PREVIEW: Record<Zone, string> = {
  signature: "bg-zone-signature",
  dynamic: "bg-zone-dynamic",
  basic: "bg-zone-basic",
};

// 1-2. 격자 상세 → 입양. (Next 16: params 는 Promise)
export default async function GridDetailPage({
  params,
}: {
  params: Promise<{ gridId: string }>;
}) {
  const { gridId } = await params;
  const grid = getGridById(gridId);
  if (!grid) notFound();

  const remain = grid.slotsTotal - grid.slotsTaken;
  const full = remain <= 0;

  return (
    <section className="flex flex-col gap-4 px-4 py-4">
      {/* 줌인 미리보기 */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-card bg-turf-900">
        <div
          className={`flex h-24 w-24 items-center justify-center rounded-btn ${ZONE_PREVIEW[grid.zone]} shadow-glow`}
        >
          <span className="font-display text-3xl font-extrabold text-ink-invert">
            {grid.id}
          </span>
        </div>
        <span className="absolute bottom-2 right-3 text-xs text-turf-300">
          맵 줌인 미리보기
        </span>
      </div>

      {/* 메타 */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={ZONE_TONE[grid.zone]} glow={grid.zone === "signature"}>
          <MapPin size={12} /> {zoneLabel(grid.zone)}
        </Badge>
        <Badge tone={full ? "neutral" : "turf"}>
          <Users size={12} /> 잔여 {Math.max(0, remain)}/{grid.slotsTotal}
        </Badge>
      </div>

      <h1 className="font-display text-2xl font-extrabold text-ink-high">
        격자 {grid.id}
      </h1>

      {/* 가격 + 슬롯 진행률 */}
      <Card>
        <div className="flex items-end justify-between">
          <span className="text-sm text-ink-mid">반기 입양가</span>
          <span className="font-display text-2xl font-extrabold text-accent">
            {formatKRW(grid.priceKRW)}
          </span>
        </div>
        <div className="mt-3">
          <ProgressBar value={(grid.slotsTaken / grid.slotsTotal) * 100} />
          <p className="mt-1 text-xs text-ink-mid">
            4인 쿼터 중 {grid.slotsTaken}명 참여
          </p>
        </div>
      </Card>

      {/* 과거 이벤트 타임라인 */}
      <div>
        <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-ink-high">
          <Clock size={16} /> 이 격자의 이벤트 타임라인
        </div>
        {grid.highlights.length === 0 ? (
          <Card className="text-center text-sm text-ink-low">
            아직 기록된 이벤트가 없어요. 첫 주인공이 되어보세요.
          </Card>
        ) : (
          <ul className="flex flex-col gap-2">
            {grid.highlights.map((h, i) => (
              <li key={i} className="flex items-center gap-3 rounded-card bg-bg-surface p-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-btn bg-bg-elevated text-xl">
                  {h.thumbnail}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink-high">
                    {h.eventText}
                  </p>
                  <p className="truncate text-xs text-ink-mid">{h.matchLabel}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 4인 쿼터제 안내 */}
      <Card className="flex items-start gap-2">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-turf-300" />
        <div>
          <p className="text-sm font-semibold text-ink-high">4인 쿼터제</p>
          <p className="text-xs text-ink-mid">
            한 격자는 최대 4인이 함께 입양합니다. 독점을 막고 더 많은 팬이 명장면을
            나눠 갖도록 설계되었습니다.
          </p>
        </div>
      </Card>

      {/* 후원·기부 고지 */}
      <div className="flex items-start gap-2 rounded-card bg-turf-900 px-3 py-2 text-xs text-turf-300">
        <Info size={14} className="mt-0.5 shrink-0" />
        <span>
          본 입양은 <strong>자산 소유가 아닌 후원·기부</strong>이며, 약관에 사전
          고지됩니다. 모든 재원은 Green Turf Fund로 환원됩니다.
        </span>
      </div>

      {/* CTA */}
      <div className="sticky bottom-[84px] z-20">
        {full ? (
          <span className="flex h-13 w-full items-center justify-center rounded-btn bg-bg-hover font-semibold text-ink-low">
            만석 — 입양 불가
          </span>
        ) : (
          <Link
            href={`/ground/checkout?grid=${grid.id}`}
            className="flex h-13 w-full items-center justify-center rounded-btn bg-accent font-semibold text-ink-invert shadow-glow transition-colors hover:bg-accent-hover"
          >
            입양 결제하기
          </Link>
        )}
      </div>
    </section>
  );
}
