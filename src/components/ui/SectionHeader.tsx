import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  moreHref?: string; // 우측 "더보기" 링크
  moreLabel?: string;
}

// 섹션 제목 + 우측 더보기.
export function SectionHeader({
  title,
  moreHref,
  moreLabel = "더보기",
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between px-1 py-2">
      <h2 className="text-base font-bold text-ink-high">{title}</h2>
      {moreHref && (
        <Link
          href={moreHref}
          className="flex items-center gap-0.5 text-sm text-ink-mid hover:text-ink-high"
        >
          {moreLabel}
          <ChevronRight size={16} />
        </Link>
      )}
    </div>
  );
}
