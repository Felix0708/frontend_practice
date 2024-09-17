import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "./clientProvider"; // ClientProvider 컴포넌트 가져오기

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Front-end Practice",
  description: "Front-end Practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>{children}</ClientProvider> {/* ClientProvider로 감싸기 */}
      </body>
    </html>
  );
}