import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "WeBloom — A living calendar of meaningful moments",
  description:
    "Wearable AI that helps meaningful moments bloom. Every day blossoms into your personal digital garden.",
  openGraph: {
    title: "WeBloom",
    description:
      "A living calendar where every meaningful day blossoms into your personal digital garden.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
