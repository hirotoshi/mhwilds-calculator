import "../globals.css";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { Header } from "@/components/Header";
import { inter, notoSansMono } from "@/fonts";
import { locales } from "../../../middleware";
import type { Metadata } from "next";
import { Locale } from "@/hooks/useLocale";

export const metadata: Metadata = {
  title: "MHW i+DS Damage Calculator",
  description: "Damage calculator for Monster Hunter World: Iceborne + Dragon's Dogma",
};

// ルートパラメータの型を定義
interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

// 有効なロケールを定義
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  // localeを安全に型変換
  const locale = (await params).locale as Locale;
  
  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${notoSansMono.variable} bg-background text-white`}>
        <div className="max-w-9xl mx-auto p-2">
          <LocaleProvider locale={locale}>
            <Header />
            {children}
          </LocaleProvider>
        </div>
      </body>
    </html>
  );
} 