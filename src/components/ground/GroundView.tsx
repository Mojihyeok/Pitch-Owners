"use client";

import { useMemo, useState } from "react";
import { ZoomIn, ZoomOut, Info, Sparkles, Users } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import {
  GRIDS,
  GRID_TOTAL,
  getGridById,
  recommendGrids,
  type Grid,
} from "@/mocks/grids";
import { PitchMap, ZOOM_MAX } from "./PitchMap";
import { ZoneFilter, type ZoneFilterValue } from "./ZoneFilter";
import { GridPreviewSheet } from "./GridPreviewSheet";
import { RecommendSlider } from "./RecommendSlider";
import { Card } from "@/components/ui/Card";

export function GroundView() {
  const isOwner = useUserStore((s) => s.isOwner);
  const ownedGrids = useUserStore((s) => s.ownedGrids);

  const [filter, setFilter] = useState<ZoneFilterValue>("all");
  const [zoom, setZoom] = useState(0);
  const [selected, setSelected] = useState<Grid | null>(null);

  const grids = useMemo(
    () => (filter === "all" ? GRIDS : GRIDS.filter((g) => g.zone === filter)),
    [filter],
  );

  const recommended = useMemo(
    () => (isOwner ? recommendGrids(ownedGrids) : []),
    [isOwner, ownedGrids],
  );

  // 내 격자의 동승 크루(데모: 첫 보유 격자 기준).
  const crew = isOwner
    ? (getGridById(ownedGrids[0] ?? "")?.crewMembers ?? [])
    : [];

  return (
    <section className="flex flex-col gap-3 px-4 py-4">
      {/* 인트로 */}
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink-high">
          그라운드 맵
        </h1>
        <p className="mt-1 text-sm text-ink-mid">
          총 {GRID_TOTAL}개 격자 중 내 잔디를 골라 입양하세요.
        </p>
      </div>

      {/* 후원·기부 고지 */}
      <div className="flex items-start gap-2 rounded-card bg-turf-900 px-3 py-2 text-xs text-turf-300">
        <Info size={14} className="mt-0.5 shrink-0" />
        <span>
          격자 입양은 자산 소유가 아닌 <strong>후원·기부의 게이미피케이션</strong>
          입니다. 모든 재원은 Green Turf Fund로 환원됩니다.
        </span>
      </div>

      <ZoneFilter value={filter} onChange={setFilter} />

      {/* 줌 컨트롤 */}
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label="축소"
          disabled={zoom <= 0}
          onClick={() => setZoom((z) => Math.max(0, z - 1))}
          className="flex h-9 w-9 items-center justify-center rounded-btn bg-bg-surface text-ink-mid hover:text-ink-high disabled:opacity-40"
        >
          <ZoomOut size={18} />
        </button>
        <span className="w-10 text-center text-xs text-ink-low">
          {zoom + 1}x
        </span>
        <button
          type="button"
          aria-label="확대"
          disabled={zoom >= ZOOM_MAX}
          onClick={() => setZoom((z) => Math.min(ZOOM_MAX, z + 1))}
          className="flex h-9 w-9 items-center justify-center rounded-btn bg-bg-surface text-ink-mid hover:text-ink-high disabled:opacity-40"
        >
          <ZoomIn size={18} />
        </button>
      </div>

      <PitchMap
        grids={grids}
        ownedIds={ownedGrids}
        selectedId={selected?.id}
        zoom={zoom}
        onSelect={setSelected}
      />

      {/* 범례 */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 px-1 text-xs text-ink-mid">
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-zone-signature" /> 시그니처
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-zone-dynamic" /> 다이내믹
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-zone-basic" /> 베이직
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-[2px] border border-accent" /> 내 격자
        </span>
      </div>

      {/* 오너 분기 */}
      {isOwner ? (
        <>
          <Card className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-pill bg-accent text-ink-invert">
              <Sparkles size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink-high">
                보유 격자 {ownedGrids.length}개 — 맵에 옐로우로 표시됨
              </p>
              <p className="text-xs text-ink-mid">
                추가 입양으로 명장면 확률을 높여보세요.
              </p>
            </div>
          </Card>

          <RecommendSlider grids={recommended} onSelect={setSelected} />

          {crew.length > 0 && (
            <Card>
              <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-ink-high">
                <Users size={16} /> 동승 오너 · 크루
              </div>
              <div className="flex flex-wrap gap-2">
                {crew.map((m, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 rounded-pill bg-bg-hover px-2.5 py-1 text-xs text-ink-high"
                  >
                    <span className="text-base">{m.avatar}</span>
                    {m.nickname}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </>
      ) : (
        <Card className="text-center">
          <p className="text-sm text-ink-high">
            아직 입양한 격자가 없어요.
          </p>
          <p className="mt-1 text-xs text-ink-mid">
            격자를 탭해 미리보고 첫 잔디를 입양해보세요.
          </p>
        </Card>
      )}

      <GridPreviewSheet grid={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
