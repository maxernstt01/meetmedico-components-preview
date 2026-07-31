'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

const HIDE_THRESHOLD = 8; // px of scroll before reacting - ignores tiny jitter
const TOP_GUARD = 80; // never hide while this close to the top of the page

// Sticky header that hides on scroll-down and reappears on scroll-up, like
// most modern docs sites. Also measures its own real height (it can wrap to
// two lines on narrow screens) and publishes it as --topbar-height so the
// content below can reserve exactly that much space, since the header
// becomes position: fixed and leaves the normal document flow.
export function StickyTopbar({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function handleScroll() {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < TOP_GUARD) {
        setHidden(false);
      } else if (delta > HIDE_THRESHOLD) {
        setHidden(true);
      } else if (delta < -HIDE_THRESHOLD) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setHeightVar = () => {
      document.documentElement.style.setProperty('--topbar-height', `${el.offsetHeight}px`);
    };
    setHeightVar();

    const observer = new ResizeObserver(setHeightVar);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={headerRef} className={`topbar${hidden ? ' topbar--hidden' : ''}`}>
      {children}
    </header>
  );
}
