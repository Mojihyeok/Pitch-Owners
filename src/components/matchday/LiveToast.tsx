"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Zap } from "lucide-react";
import { badgeNameFor, type LiveEvent } from "@/mocks/match";

interface LiveToastProps {
  event: LiveEvent | null;
}

// 내 격자 트리거 실시간 알림 — 옐로우 글로우 배너.
export function LiveToast({ event }: LiveToastProps) {
  return (
    <div className="pointer-events-none sticky top-14 z-30 flex justify-center">
      <AnimatePresence>
        {event && (
          <motion.div
            key={event.ts}
            initial={{ y: -20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 320 }}
            className="flex items-center gap-2 rounded-pill bg-accent px-4 py-2 text-sm font-bold text-ink-invert shadow-glow"
          >
            <Zap size={16} className="fill-ink-invert" />
            내 격자 {event.gridId}에서 이벤트! &lsquo;{badgeNameFor(event.questId)}
            &rsquo; 뱃지 획득
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
