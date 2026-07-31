import type { ReactNode } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AppNav } from '@/components/AppNav';
import { ThemeToggle } from '@/components/ThemeToggle';
import { RequireAuth } from '@/components/RequireAuth';
import { StickyTopbar } from '@/components/StickyTopbar';
import { REAL_COMPONENTS } from '@/lib/registry';

// The topbar+sidebar+content shell, and the login gate, apply to everything
// under this (dashboard) route group (/components, /components/[slug],
// /overview) but not to the standalone / (Welcome) or /login pages, which
// render full-bleed with none of this chrome.
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <StickyTopbar>
        <div className="topbar__row">
          <div className="topbar__nav">
            <AppNav totalComponents={REAL_COMPONENTS.length} />
          </div>
          <ThemeToggle />
        </div>
      </StickyTopbar>
      <div className="shell">
        <Sidebar />
        <main className="content">{children}</main>
      </div>
    </RequireAuth>
  );
}
