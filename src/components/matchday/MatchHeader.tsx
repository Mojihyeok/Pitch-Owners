import type { MatchInfo } from "@/mocks/match";

interface MatchHeaderProps {
  match: MatchInfo;
}

// 경기 상태 헤더: 팀 vs 팀, 스코어, 경기 시간 + 라이브 인디케이터(펄스).
export function MatchHeader({ match }: MatchHeaderProps) {
  return (
    <div className="rounded-card bg-turf-900 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs text-turf-300">{match.round}</span>
        {match.isLive && (
          <span className="flex items-center gap-1.5 rounded-pill bg-bg-base/40 px-2 py-0.5 text-xs font-semibold text-state-danger">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-pill bg-state-danger opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-pill bg-state-danger" />
            </span>
            LIVE
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        {/* 홈 */}
        <div className="flex flex-1 flex-col items-center gap-1">
          <span className="text-3xl">{match.home.logo}</span>
          <span className="text-sm font-semibold text-ink-high">
            {match.home.short}
          </span>
        </div>

        {/* 스코어 */}
        <div className="flex flex-col items-center px-2">
          <span className="font-display text-3xl font-extrabold text-ink-high">
            {match.homeScore} : {match.awayScore}
          </span>
          <span className="mt-1 text-xs text-accent">{match.minuteLabel}</span>
        </div>

        {/* 원정 */}
        <div className="flex flex-1 flex-col items-center gap-1">
          <span className="text-3xl">{match.away.logo}</span>
          <span className="text-sm font-semibold text-ink-high">
            {match.away.short}
          </span>
        </div>
      </div>
    </div>
  );
}
