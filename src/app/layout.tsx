import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { inter } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wilds Damage Calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-background text-white ${inter.variable} antialiased`}
      >
        <Header />
        <main className="mx-auto max-w-7xl p-2">{children}</main>
      </body>
    </html>
  );
}
