'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { AUTH_STORAGE_KEY } from '@/lib/auth';

// This is a soft, client-side-only gate - a speed bump before browsing the
// component library, not real security (no backend, no session, a hardcoded
// single credential). Renders nothing until the localStorage check resolves,
// so an unauthenticated visitor never sees a flash of the real content
// before being redirected to /login.
export function RequireAuth({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const isAuthed = typeof window !== 'undefined' && window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    if (!isAuthed) {
      router.replace('/login');
      return;
    }
    setAuthed(true);
  }, [router]);

  if (!authed) return null;

  return <>{children}</>;
}
