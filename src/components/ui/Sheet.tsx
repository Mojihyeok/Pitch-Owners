"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

// 하단에서 올라오는 바텀시트 (framer-motion).
export function Sheet({ open, onClose, title, children }: SheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* 딤 배경 */}
          <motion.div
            className="fixed inset-0 z-50 mx-auto max-w-[480px] bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* 시트 본문 */}
          <motion.div
            className="fixed bottom-0 left-1/2 z-50 max-h-[85vh] w-full max-w-[480px] -translate-x-1/2 overflow-y-auto rounded-t-card bg-bg-elevated p-4 shadow-card"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink-high">{title}</h3>
              <button
                type="button"
                aria-label="닫기"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-pill text-ink-mid hover:bg-bg-hover hover:text-ink-high"
              >
                <X size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
