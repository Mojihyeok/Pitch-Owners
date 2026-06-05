import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean; // 떠있는 표면(모달/강조)
  children: ReactNode;
}

// 기본 카드 래퍼. bg-surface + rounded-card + shadow-card.
export function Card({ elevated, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card p-4 shadow-card",
        elevated ? "bg-bg-elevated" : "bg-bg-surface",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
