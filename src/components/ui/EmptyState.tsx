import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode; // CTA 버튼 등
}

// 비로그인/빈 상태 안내.
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      {Icon && (
        <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-bg-elevated text-ink-mid">
          <Icon size={28} />
        </span>
      )}
      <h3 className="text-lg font-bold text-ink-high">{title}</h3>
      {description && (
        <p className="max-w-[280px] text-sm text-ink-mid">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
