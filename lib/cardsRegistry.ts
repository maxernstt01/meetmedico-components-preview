export interface CardMeta {
  slug: string;
  name: string;
  platform: 'web' | 'mobile';
}

// Full page-level UI templates (Login, Register, etc.) built from real
// design-system components, living in MeetMedicoComponent's src/cards/
// folder - a different category from the atomic components in
// src/components/ (see lib/registry.ts). Manually curated, same as
// COMPONENT_NAMES - there's no automatic folder-scan for these.
export const CARDS: CardMeta[] = [
  { slug: 'login', name: 'Login', platform: 'web' },
  { slug: 'register', name: 'Register', platform: 'web' },
];

export function cardsForPlatform(platform: CardMeta['platform']): CardMeta[] {
  return CARDS.filter((c) => c.platform === platform);
}
