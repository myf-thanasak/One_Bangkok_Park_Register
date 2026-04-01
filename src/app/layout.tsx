import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "The Whimsical Water Park | Registration",
  description:
    "ลงทะเบียนร่วมกิจกรรม The Whimsical Water Park วันที่ 10-15 เม.ย. 2569 ที่ One Bangkok Park",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-gradient-to-b from-water-50 via-white to-water-50">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
