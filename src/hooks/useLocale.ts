"use client";

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { locales, defaultLocale } from '../../middleware';

export type Locale = 'en' | 'ja';

// URLからロケールを取得する関数
export function getLocaleFromURL(pathname: string): Locale {
  const segments = pathname.split('/');
  const segment = segments[1]; // 最初のセグメントを取得
  
  if (segment && locales.includes(segment as Locale)) {
    return segment as Locale;
  }
  
  return defaultLocale as Locale;
}

// パスからロケールを除去した残りのパスを取得する関数
export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/');
  
  if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
    return '/' + segments.slice(2).join('/');
  }
  
  return pathname;
}

export function useLocale(initialLocaleParam?: Locale) {
  const pathname = usePathname();
  const router = useRouter();
  
  // URLからロケールを取得、または提供されたinitialLocaleを使用
  const detectedLocale = getLocaleFromURL(pathname || '');
  const [locale, setLocaleState] = useState<Locale>(initialLocaleParam || detectedLocale);

  // ロケールを変更する関数
  const setLocale = useCallback((newLocale: Locale) => {
    // ステートを更新
    setLocaleState(newLocale);
    
    // Cookieに保存
    setCookie('NEXT_LOCALE', newLocale, { path: '/' });
    
    // 現在のパスからロケールを除去し、新しいロケールを追加
    const currentPath = removeLocaleFromPath(pathname || '');
    const newPath = `/${newLocale}${currentPath === '/' ? '' : currentPath}`;
    
    // 新しいパスに遷移
    router.push(newPath);
  }, [pathname, router]);

  // ロケールを切り替える関数
  const toggleLocale = useCallback(() => {
    const newLocale = locale === 'en' ? 'ja' : 'en';
    setLocale(newLocale);
  }, [locale, setLocale]);

  // URL変更時にロケールを更新
  useEffect(() => {
    const pathLocale = getLocaleFromURL(pathname || '');
    if (pathLocale !== locale) {
      setLocaleState(pathLocale);
    }
  }, [pathname, locale]);

  return {
    locale,
    setLocale,
    toggleLocale,
  };
} 