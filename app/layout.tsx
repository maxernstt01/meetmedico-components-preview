import type { ReactNode } from 'react';
import 'design-system/src/styles/global.css';
import './globals.css';

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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
