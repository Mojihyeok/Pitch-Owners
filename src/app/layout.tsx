import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

// 숫자/영문 헤드라인·카운트다운용 디스플레이 폰트.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PITCH OWNERS",
  description:
    "K리그 천연잔디 16㎡ 격자를 입양하고 매치데이 퀘스트로 뱃지·리워드를 쌓는 자산 공유형 펀딩 플랫폼.",
};

// 루트 레이아웃: 폰트 로드 + 다크 기본만.
// 모바일 컨테이너/TopBar/BottomTabBar 는 (app) 그룹 레이아웃에서 처리.
// 랜딩(/)·전북현대 데모(/jeonbuk-demo)는 각자 독립 스타일.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${archivo.variable} h-full`}>
      <head>
        {/* Pretendard (Google Fonts 미제공) — 공식 CDN 로드 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
      </head>
      <body className="min-h-full bg-bg-base">{children}</body>
    </html>
  );
}
