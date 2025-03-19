import { LocalizedString } from "@/types";

export function getLocalizedString(str: LocalizedString | string, locale: string): string {
  if (typeof str === 'string') return str;
  return str[locale as keyof LocalizedString] || str.en;
}

export function createLocalizedString(en: string, ja: string): LocalizedString {
  return { en, ja };
}

export function formatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale === 'ja' ? 'ja-JP' : 'en-US').format(value);
} 