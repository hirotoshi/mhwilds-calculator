import { NextRequest, NextResponse } from 'next/server';

export const locales = ['en', 'ja'];
export const defaultLocale = 'en';

// ミドルウェアは各リクエストの前に実行される
export function middleware(request: NextRequest) {
  // リクエストのURLからパスを取得
  const { pathname } = request.nextUrl;

  // ロケールを持たないパスでない場合（例：/api/）、または
  // 既にロケールを持つパスの場合（例：/en/）は何もしない
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/') ||
    pathname.includes('/.')
  ) {
    return;
  }

  // ユーザーのロケール設定を取得（cookieから）
  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // パスにロケールが含まれていない場合は、デフォルトロケールまたはユーザー設定のロケールにリダイレクト
  if (pathnameIsMissingLocale) {
    // クッキーからロケールを取得、またはデフォルトロケールを使用
    const locale = request.cookies.get('NEXT_LOCALE')?.value || defaultLocale;

    // 新しいURLを作成
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname === '/' ? '' : pathname}`,
        request.url
      )
    );
  }
} 