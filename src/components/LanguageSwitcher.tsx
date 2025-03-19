"use client";

import { Languages } from "lucide-react";
import { useLocaleContext } from "@/contexts/LocaleContext";
import { Button } from "./Button";

export function LanguageSwitcher() {
  const { locale, toggleLocale } = useLocaleContext();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLocale}
      title={locale === 'en' ? '日本語に切り替え' : 'Switch to English'}
    >
      <Languages className="h-5 w-5" />
      <span className="ml-2 hidden md:inline">
        {locale === 'en' ? '日本語' : 'English'}
      </span>
    </Button>
  );
} 