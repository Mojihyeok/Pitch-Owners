import Link from "next/link";
import { Menu, Sprout, ArrowRight } from "lucide-react";

// 전북현대 사이트 진입점 (시연용 목업).
// ⚠️ 독립 화이트 테마 — 앱 본체(다크)와 섞이지 않게 이 페이지에서만 white 계열 사용.
// 딥그린은 turf-700 토큰 재사용(임의 hex 미사용).

const AUX_MENU = ["전북현대", "그린스쿨", "후원의집", "오피셜 스토어", "인권침해 접수처"];
// PITCH OWNERS 는 MEDIA 와 FAN ZONE 사이에 신규 삽입(아래에서 별도 강조 렌더).
const NAV = ["CLUB", "TEAM", "MATCH", "TICKET", "HISTORY", "RECORD", "MEDIA", "FAN ZONE"];

export default function JeonbukDemoPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-800">
      {/* 1) 상단 유틸바 */}
      <div className="border-b border-neutral-200">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
          {/* 좌측 보조 메뉴 */}
          <nav className="flex items-center gap-4 text-xs text-neutral-500">
            {AUX_MENU.map((m) => (
              <span key={m} className="hover:text-neutral-800">
                {m}
              </span>
            ))}
          </nav>

          {/* 가운데 워드마크 */}
          <Link href="/jeonbuk-demo" className="flex flex-col items-center leading-none">
            <span className="font-display text-lg font-extrabold tracking-tight text-turf-700">
              JEONBUK
            </span>
            <span className="text-[9px] font-semibold tracking-widest text-neutral-500">
              HYUNDAI MOTORS
            </span>
          </Link>

          {/* 우측 회원 메뉴 */}
          <div className="flex items-center gap-3 text-xs text-neutral-600">
            <span className="hover:text-neutral-900">티켓예매</span>
            <span className="hover:text-neutral-900">로그인</span>
            <span className="rounded bg-turf-700 px-2 py-1 font-semibold text-white">
              통합 회원가입
            </span>
          </div>
        </div>
      </div>

      {/* 2) 메인 네비게이션 */}
      <div className="border-b border-neutral-200">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-1 px-6">
          <button type="button" aria-label="메뉴" className="mr-3 text-neutral-700">
            <Menu size={22} />
          </button>
          <nav className="flex items-center text-sm font-semibold">
            {NAV.map((item) => {
              const active = item === "CLUB";
              const node = (
                <span
                  className={
                    active
                      ? "flex h-14 items-center bg-turf-700 px-4 text-white"
                      : "flex h-14 items-center px-4 text-neutral-600 hover:text-turf-700"
                  }
                >
                  {item}
                </span>
              );

              // MEDIA 뒤에 PITCH OWNERS 신규 메뉴 삽입(FAN ZONE 바로 왼쪽).
              if (item === "FAN ZONE") {
                return (
                  <div key="po-wrap" className="flex items-center">
                    <Link
                      href="/"
                      className="group relative flex h-14 items-center gap-1 px-4 font-bold text-turf-700"
                    >
                      <Sprout size={15} />
                      <span className="border-b-2 border-transparent transition-colors group-hover:border-turf-700">
                        PITCH OWNERS
                      </span>
                      {/* NEW 배지 */}
                      <span className="absolute right-1 top-2 rounded-pill bg-accent px-1 text-[9px] font-bold text-ink-invert">
                        NEW
                      </span>
                    </Link>
                    {node}
                  </div>
                );
              }

              return <div key={item}>{node}</div>;
            })}
          </nav>
        </div>
      </div>

      {/* 3) 히어로 (더미 뉴스) */}
      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="relative overflow-hidden rounded-lg bg-neutral-900">
          <div className="absolute inset-0 bg-gradient-to-tr from-turf-900 to-neutral-800" />
          <div className="relative flex min-h-[320px] flex-col justify-end p-8">
            <span className="w-fit rounded bg-turf-700 px-2 py-1 text-xs font-bold text-white">
              NEWS
            </span>
            <h1 className="mt-3 max-w-xl text-2xl font-extrabold text-white">
              전북현대, 홈 그라운드 잔디 리뉴얼 프로젝트 시동
            </h1>
            <p className="mt-2 max-w-xl text-sm text-neutral-300">
              팬과 함께 만드는 최고의 그라운드. PITCH OWNERS와 함께합니다.
            </p>
            <button
              type="button"
              className="mt-4 flex w-fit items-center gap-1 rounded bg-turf-700 px-4 py-2 text-sm font-semibold text-white hover:bg-turf-500"
            >
              기사보기 <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
