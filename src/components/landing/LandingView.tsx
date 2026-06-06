"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  CreditCard,
  Trophy,
  Sprout,
  ArrowRight,
  ShieldCheck,
  Users,
  Repeat,
  Heart,
  ChevronDown,
} from "lucide-react";
import { CountUp } from "./CountUp";
import { ZonePreviewMini } from "./ZonePreviewMini";
import { maxOf, priceOf } from "@/lib/zonePolicy";
import { formatManwon } from "@/lib/utils";

// 스크롤 진입 페이드/슬라이드 래퍼.
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const STEPS = [
  {
    icon: LayoutGrid,
    title: "격자 입양",
    desc: "442개 격자 중 내 자리를 고른다 (16㎡, 개인 또는 2~6인 그룹).",
  },
  {
    icon: CreditCard,
    title: "NFC 라이센스 카드",
    desc: "실물 카드로 매치데이 인증.",
  },
  {
    icon: Trophy,
    title: "매치데이 퀘스트",
    desc: "내 격자에서 골/세이브 등 9종 데이터 이벤트 → 뱃지·리워드 자동 적립.",
  },
  {
    icon: Sprout,
    title: "Green Turf Fund",
    desc: "모든 재원은 잔디 관리에만 환원 (투명 공개).",
  },
];

const VALUES = [
  { icon: Trophy, title: "데이터-자산 연동", desc: "경기 데이터가 곧 내 자산의 가치." },
  { icon: Users, title: "그룹 쿼터제", desc: "최대 6인, 독점 방지·명장면 공유." },
  { icon: Repeat, title: "재원 폐쇄 순환", desc: "모든 후원금이 잔디로 되돌아온다." },
  { icon: Heart, title: "내 잔디 서사", desc: "내 잔디에서 골이 났다는 평생의 이야기." },
];

export function LandingView() {
  return (
    <div className="relative mx-auto min-h-screen w-full max-w-[480px] bg-bg-base pb-24">
      {/* 미니 헤더 */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between bg-bg-base/80 px-4 backdrop-blur">
        <div className="flex flex-col leading-none">
          <span className="font-display text-base font-extrabold text-ink-high">
            PITCH <span className="text-accent">OWNERS</span>
          </span>
          <span className="text-[10px] text-ink-low">
            전북현대 Official Partner
          </span>
        </div>
        <Link
          href="/ground"
          className="rounded-pill bg-bg-elevated px-3 py-1.5 text-sm font-medium text-ink-high hover:bg-bg-hover"
        >
          로그인
        </Link>
      </header>

      {/* S1. 히어로 */}
      <section className="relative overflow-hidden px-5 pb-12 pt-10">
        {/* 잔디 그라데이션 메시 배경 */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-turf-900/60 via-bg-base to-bg-base" />
        <div className="pointer-events-none absolute -right-16 -top-10 h-56 w-56 rounded-full bg-turf-700/30 blur-3xl" />
        <div className="relative">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.span
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              className="inline-flex items-center gap-1 rounded-pill bg-turf-900 px-3 py-1 text-xs font-medium text-turf-300"
            >
              <Sprout size={12} /> K리그 잔디 공유 펀딩
            </motion.span>
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink-high"
            >
              잔디 한 평을 가진 사람이{" "}
              <span className="text-accent">K리그의 진짜 주인</span>이다.
            </motion.h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              className="mt-3 text-sm leading-relaxed text-ink-mid"
            >
              전북현대 그라운드의 잔디를 입양하고, 매 경기 당신의 격자에서 일어나는
              모든 순간을 소유하세요.
            </motion.p>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              className="mt-6 flex flex-col gap-2"
            >
              <Link
                href="/ground"
                className="flex h-13 items-center justify-center gap-2 rounded-btn bg-accent font-semibold text-ink-invert shadow-glow"
              >
                내 격자 찾기 <ArrowRight size={18} />
              </Link>
              <a
                href="#how"
                className="flex h-12 items-center justify-center gap-1 rounded-btn border border-bg-hover text-sm font-medium text-ink-mid"
              >
                어떻게 작동하나요? <ChevronDown size={16} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* S2. 문제 제기 */}
      <section className="px-5 py-12">
        <Reveal>
          <h2 className="font-display text-xl font-extrabold text-ink-high">
            잔디는 비용, 수익은 따로.
          </h2>
          <p className="mt-1 text-sm text-ink-mid">
            구조적 격차가 그라운드를 망가뜨립니다.
          </p>
        </Reveal>

        <div className="mt-5 flex flex-col gap-3">
          <Reveal delay={0.05}>
            <div className="rounded-card bg-bg-surface p-4">
              <p className="font-display text-3xl font-extrabold text-accent">
                <CountUp to={33} suffix="배" />
              </p>
              <p className="mt-1 text-sm text-ink-mid">
                서울월드컵경기장 잔디 관리비 2.5억 vs 대관 수익 82억 — 격차
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-card bg-bg-surface p-4">
              <p className="font-display text-2xl font-extrabold text-ink-high">
                <CountUp to={6.9} decimals={1} suffix="~8.6억" />
              </p>
              <p className="mt-1 text-sm text-ink-mid">
                EPL 한 구단 잔디 관리비 vs 한국 1~2억
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="rounded-card bg-bg-surface p-4">
              <p className="font-display text-lg font-extrabold text-state-warn">
                2025.9 한국–이라크전
              </p>
              <p className="mt-1 text-sm text-ink-mid">
                잔디 문제로 경기장 이전
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* S3. 솔루션 */}
      <section id="how" className="scroll-mt-16 bg-bg-surface/40 px-5 py-12">
        <Reveal>
          <h2 className="font-display text-xl font-extrabold text-ink-high">
            어떻게 작동하나요?
          </h2>
        </Reveal>
        <div className="mt-5 flex flex-col gap-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="flex items-start gap-3 rounded-card bg-bg-surface p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-btn bg-turf-900 text-turf-300">
                    <Icon size={22} />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-xs font-bold text-accent">
                        STEP {i + 1}
                      </span>
                      <span className="text-sm font-bold text-ink-high">
                        {s.title}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-ink-mid">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* S4. 핵심 차별점 */}
      <section className="px-5 py-12">
        <Reveal>
          <h2 className="font-display text-xl font-extrabold text-ink-high">
            왜 PITCH OWNERS인가
          </h2>
          <p className="mt-1 text-sm text-accent">
            “내 잔디에서 골이 났다”는 평생의 서사.
          </p>
        </Reveal>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={i * 0.05}>
                <div className="flex h-full flex-col gap-2 rounded-card bg-bg-surface p-4">
                  <Icon size={22} className="text-accent" />
                  <p className="text-sm font-bold text-ink-high">{v.title}</p>
                  <p className="text-xs text-ink-mid">{v.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* S5. Zone 미리보기 */}
      <section className="bg-bg-surface/40 px-5 py-12">
        <Reveal>
          <h2 className="font-display text-xl font-extrabold text-ink-high">
            3개의 Zone, 442개의 격자
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="mt-4">
          <ZonePreviewMini />
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-3 flex flex-col gap-1 text-xs text-ink-mid">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[2px] bg-zone-signature" /> 시그니처
              · {maxOf("signature")}명 · {formatManwon(priceOf("signature"))}원
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[2px] bg-zone-dynamic" /> 다이내믹 ·{" "}
              {maxOf("dynamic")}명 · {formatManwon(priceOf("dynamic"))}원
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[2px] bg-zone-basic" /> 베이직 ·{" "}
              {maxOf("basic")}명 · {formatManwon(priceOf("basic"))}원
            </span>
          </div>
          <p className="mt-2 text-sm text-ink-mid">
            반기{" "}
            <span className="font-semibold text-ink-high">
              {formatManwon(priceOf("basic"))} ~ {formatManwon(priceOf("signature"))}원
            </span>
          </p>
          <Link
            href="/ground"
            className="mt-4 flex h-12 items-center justify-center gap-2 rounded-btn bg-turf-700 font-semibold text-ink-high"
          >
            그라운드 둘러보기 <ArrowRight size={18} />
          </Link>
        </Reveal>
      </section>

      {/* S6. 신뢰 / 투명성 */}
      <section className="px-5 py-12">
        <Reveal>
          <h2 className="font-display text-xl font-extrabold text-ink-high">
            모든 재원은 잔디로 돌아갑니다
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-card bg-bg-surface p-4 text-center">
              <p className="font-display text-3xl font-extrabold text-turf-300">
                <CountUp to={90} suffix="%" />
              </p>
              <p className="mt-1 text-xs text-ink-mid">B2C 환원</p>
            </div>
            <div className="rounded-card bg-bg-surface p-4 text-center">
              <p className="font-display text-3xl font-extrabold text-accent">
                <CountUp to={100} suffix="%" />
              </p>
              <p className="mt-1 text-xs text-ink-mid">B2B 환원</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-3 flex items-center gap-2 rounded-card bg-turf-900 p-3 text-xs text-turf-300">
            <ShieldCheck size={16} className="shrink-0" />
            Green Turf Fund — 외부 회계 감사로 투명하게 공개됩니다.
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink-low">
            ※ 격자 입양은 자산 소유가 아닌 <strong className="text-ink-mid">후원·기부</strong>
            입니다. 법적 권리·소유권을 부여하지 않으며, 모든 재원은 Green Turf
            Fund로 환원됩니다.
          </p>
        </Reveal>
      </section>

      {/* S7. 최종 CTA + 푸터 */}
      <section className="px-5 pb-8 pt-4">
        <Reveal>
          <div className="rounded-card bg-gradient-to-b from-turf-700 to-turf-900 p-6 text-center">
            <h2 className="font-display text-2xl font-extrabold text-ink-high">
              지금, 당신의 잔디를.
            </h2>
            <Link
              href="/ground"
              className="mt-4 flex h-13 items-center justify-center gap-2 rounded-btn bg-accent font-semibold text-ink-invert shadow-glow"
            >
              지금 내 격자 입양하기 <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>

        <footer className="mt-8 flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2 text-sm text-ink-mid">
            <span className="text-lg">🟢</span>
            <span>Official Partner · 전북현대모터스FC</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-ink-low">
            <Link href="/jeonbuk-demo" className="hover:text-ink-mid">
              전북현대 사이트
            </Link>
            <span>·</span>
            <span>이용약관</span>
            <span>·</span>
            <span>개인정보처리방침</span>
            <span>·</span>
            <span>문의</span>
          </div>
          <p className="text-[10px] text-ink-low">
            © 2026 PITCH OWNERS. 격자 입양은 후원·기부입니다.
          </p>
        </footer>
      </section>

      {/* 스티키 CTA (모바일 전환) */}
      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 border-t border-bg-hover bg-bg-base/95 p-3 backdrop-blur">
        <Link
          href="/ground"
          className="flex h-12 items-center justify-center gap-2 rounded-btn bg-accent font-semibold text-ink-invert"
        >
          내 격자 찾기 <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
