import type { Metadata } from "next";
import RedirectComponent from './components/RedirectComponent';
import "./globals.css";

export const metadata: Metadata = {
  title: "수영 정호 결혼식에 초대합니다!",
  description: "2025.02.16 일요일 오후 2시 노블발렌티 대치",
  metadataBase: new URL('https://sooyoung-jungho.github.io'),
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: "🩷 Wedding Invitation 🩷",
    description: "2025.02.16 수영 정호 결혼식에 초대합니다.",
    images: [
      {
        url: "/gallery/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Wedding Invitation",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "🩷 Wedding Invitation 🩷",
    description: "2025.02.16 수영 정호 결혼식에 초대합니다.",
    images: ["/thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
      </head>
      <body>
        <RedirectComponent />
        {children}
      </body>
    </html>
  )
}
