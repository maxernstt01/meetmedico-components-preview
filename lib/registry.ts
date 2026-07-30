export interface ComponentMeta {
  slug: string;
  name: string;
  /** Has a fully built 6-tab preview page. All others are listed but marked pending. */
  wired: boolean;
}

// Mirrors src/components/* in MeetMedicoComponent (44 original folders, checked via `ls`,
// plus 8 new components added after a props/gap audit: Avatar, Card, Descriptions, Image,
// InputNumber, Menu, Popover. Skeleton already existed nested inside Loader - not counted twice.
export const COMPONENT_NAMES = [
  'Accordion', 'Alert', 'AppFooter', 'AppHeader', 'Avatar', 'Badge', 'Breadcrumb', 'Button',
  'Card', 'Carousel', 'Checkbox', 'Chip', 'DatePicker', 'Descriptions', 'Divider', 'Drawer',
  'Dropdown', 'EmptyState', 'Header', 'Image', 'ImageUpload', 'Input', 'InputNumber', 'Label',
  'Loader', 'Logo', 'Menu', 'Modal', 'Navigation', 'Notification', 'OTPInput', 'Pagination',
  'PasswordInput', 'PhoneNumberInput', 'Popover', 'Progress', 'Radio', 'Rate', 'Search', 'Slider',
  'Statistic', 'Steps', 'Switch', 'Table', 'Tabs', 'TextArea', 'TimePicker', 'Timeline', 'Tooltip',
  'Tour', 'Typography',
] as const;

const WIRED = new Set<string>(COMPONENT_NAMES);

export const COMPONENTS: ComponentMeta[] = COMPONENT_NAMES.map((name) => ({
  slug: name.toLowerCase(),
  name,
  wired: WIRED.has(name),
}));

export function findComponent(slug: string): ComponentMeta | undefined {
  return COMPONENTS.find((c) => c.slug === slug.toLowerCase());
}

// "Loader" is one folder/page in COMPONENTS above, but it isn't one real
// component - it bundles three independently-usable ones (Spinner, DotsLoader,
// Skeleton), each with its own props and each rendered under its own real tag
// (<Spinner>, never <Loader>). Counting COMPONENTS.length as "how many
// components does this library have" therefore undercounts by 2 (51 instead
// of the real 53), and using "Loader" as a usage-search tag always finds zero
// hits since that tag never appears anywhere.
//
// SUB_COMPONENTS documents which page names bundle more than one real
// component. getProps.ts (per-page Props Info) and REAL_COMPONENTS below
// (whole-library stats) both read this same map, so the two can't drift.
export const SUB_COMPONENTS: Record<string, string[]> = {
  Loader: ['Spinner', 'DotsLoader', 'Skeleton'],
};

export interface RealComponentMeta {
  /** The real, individually-usable component name (e.g. "Spinner"), never a page-only name. */
  name: string;
  /** The routable page this component's docs live under (e.g. "loader"). */
  slug: string;
  wired: boolean;
}

/** COMPONENTS expanded so every entry is one real, individually-usable component - 53, not 51. */
export const REAL_COMPONENTS: RealComponentMeta[] = COMPONENTS.flatMap((c) => {
  const subs = SUB_COMPONENTS[c.name];
  if (subs) return subs.map((sub) => ({ name: sub, slug: c.slug, wired: c.wired }));
  return [{ name: c.name, slug: c.slug, wired: c.wired }];
});
