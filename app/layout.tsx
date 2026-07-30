import type { ReactNode } from 'react';
import 'design-system/src/styles/global.css';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { AppNav } from '@/components/AppNav';
import { ThemeToggle } from '@/components/ThemeToggle';
import { REAL_COMPONENTS } from '@/lib/registry';

export const metadata = {
  title: 'MeetMedico Components Preview',
  description: 'Live preview + docs for the MeetMedico web design system',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/* Grammarly (and similar extensions) injects data-gr-ext-installed /
          data-new-gr-c-s-check-loaded onto <body> after the server sends
          HTML but before React hydrates, which trips a harmless hydration
          mismatch warning. suppressHydrationWarning is the official Next.js
          recommendation for exactly this case - it only ignores mismatches
          on this one element, not real bugs elsewhere in the tree. */}
      <body suppressHydrationWarning>
        <header className="topbar">
          <div className="topbar__row">
            <div className="topbar__nav">
              <AppNav totalComponents={REAL_COMPONENTS.length} />
            </div>
            <ThemeToggle />
          </div>
        </header>
        <div className="shell">
          <Sidebar />
          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  );
}
