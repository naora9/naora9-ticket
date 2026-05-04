import type { Metadata } from "next";
import { Do_Hyeon } from "next/font/google";
import "./globals.css";

const doHyeon = Do_Hyeon({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-do-hyeon",
});

export const metadata: Metadata = {
  title: "naora9 ticket",
  description: "롯데팬 티켓 정가양도 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${doHyeon.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
