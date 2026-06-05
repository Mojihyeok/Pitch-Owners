import { TopBar } from "@/components/layout/TopBar";
import { BottomTabBar } from "@/components/layout/BottomTabBar";

// (app) 그룹 레이아웃: 모바일 컨테이너 + TopBar + BottomTabBar.
// 앱 본체 화면(/ground 이하)에만 적용. 랜딩/전북현대 데모에는 미적용.
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-black">
      {/* 모바일 컨테이너: 화면 중앙 max-w-480. 바깥 데스크탑 여백은 검정. */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-bg-base">
        <TopBar />
        <main className="flex-1 pb-[72px]">{children}</main>
        <BottomTabBar />
      </div>
    </div>
  );
}
