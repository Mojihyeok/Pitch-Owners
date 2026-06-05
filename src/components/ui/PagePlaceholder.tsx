// Step 1(기반) 단계용 빈 페이지 플레이스홀더.
// 페이지 내부 구현은 01_FAN_WEB_PAGES.md 단계에서 채운다.
interface PagePlaceholderProps {
  title: string;
  subtitle?: string;
}

export function PagePlaceholder({ title, subtitle }: PagePlaceholderProps) {
  return (
    <section className="px-4 py-8">
      <h1 className="font-display text-2xl font-extrabold text-ink-high">
        {title}
      </h1>
      {subtitle && <p className="mt-1 text-sm text-ink-mid">{subtitle}</p>}
      <div className="mt-6 rounded-card border border-dashed border-bg-hover bg-bg-surface p-6 text-center text-sm text-ink-low">
        준비 중 — 페이지 구현 단계에서 채워집니다.
      </div>
    </section>
  );
}
