"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Radio,
  LayoutDashboard,
  Users,
  CalendarHeart,
  type LucideIcon,
} from "lucide-react";

interface Tab {
  label: string;
  icon: LucideIcon;
  href: string;
  center?: boolean; // 가운데 강조 탭(마이오너)
}

// Fan Web 5개 1depth → 하단 탭.
const TABS: Tab[] = [
  { label: "입양", icon: LayoutGrid, href: "/ground" },
  { label: "매치데이", icon: Radio, href: "/matchday" },
  { label: "마이오너", icon: LayoutDashboard, href: "/my", center: true },
  { label: "커뮤니티", icon: Users, href: "/community" },
  { label: "이벤트", icon: CalendarHeart, href: "/events" },
];

export function BottomTabBar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="fixed bottom-0 left-1/2 z-40 h-[72px] w-full max-w-[480px] -translate-x-1/2 border-t border-bg-hover bg-bg-base/95 backdrop-blur">
      <ul className="flex h-full items-stretch">
        {TABS.map((tab) => {
          const active = isActive(tab.href);
          const Icon = tab.icon;

          if (tab.center) {
            return (
              <li key={tab.href} className="flex flex-1 justify-center">
                <Link
                  href={tab.href}
                  className="flex flex-col items-center justify-center gap-1"
                  aria-current={active ? "page" : undefined}
                >
                  <span
                    className={`-mt-5 flex h-12 w-12 items-center justify-center rounded-pill shadow-glow ${
                      active
                        ? "bg-accent text-ink-invert"
                        : "bg-accent-dim text-ink-invert"
                    }`}
                  >
                    <Icon size={24} />
                  </span>
                  <span
                    className={`text-[11px] ${
                      active ? "text-accent" : "text-ink-low"
                    }`}
                  >
                    {tab.label}
                  </span>
                </Link>
              </li>
            );
          }

          return (
            <li key={tab.href} className="flex flex-1">
              <Link
                href={tab.href}
                className="flex w-full flex-col items-center justify-center gap-1"
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  size={22}
                  className={active ? "text-accent" : "text-ink-low"}
                />
                <span
                  className={`text-[11px] ${
                    active ? "text-accent" : "text-ink-low"
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
