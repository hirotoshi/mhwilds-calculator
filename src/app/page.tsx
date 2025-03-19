import { redirect } from 'next/navigation';
import { defaultLocale } from '../../middleware';

// このコンポーネントは直接表示されることはなく、ミドルウェアによってリダイレクトされます
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
