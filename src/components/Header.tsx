"use client";

import { Languages } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLocaleContext } from "@/contexts/LocaleContext";

export function Header() {
  const { locale } = useLocaleContext();
  
  // ロケールに基づいてタイトルを表示
  const title = locale === 'ja' 
    ? 'MHW i+DS ダメージ計算機' 
    : 'MHW i+DS Damage Calculator';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden text-primary font-bold sm:inline-block">
              {title}
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
