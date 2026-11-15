// Offline icon lookup: any icon keyword resolved to a Font Awesome 6 Solid SVG
//
// The docs name icons as search keywords ("rocket", "mdi/rocket-launch", "watermelon"), which the
// library sends to its online icon search. The gallery answers them from the fa6-solid set
// bundled with the app instead: exact name, then a few synonyms, then each word of the
// keyword, then a stable pick from a generic set, so every keyword gets some icon.

interface IconSet {
  width: number;
  height: number;
  icons: Record<string, { body: string; width?: number; height?: number }>;
  aliases?: Record<string, { parent: string }>;
}

let set: IconSet | null = null;
let loading: Promise<void> | null = null;

/** Loads the icon set once per page (one lazy chunk). */
export function loadIcons(): Promise<void> {
  loading ??= import('@iconify-json/fa6-solid/icons.json').then((m) => {
    set = (m.default ?? m) as IconSet;
  });
  return loading;
}

/** Keyword words that are not fa6 names, mapped to ones that are. */
const SYNONYMS: Record<string, string> = {
  launch: 'rocket',
  account: 'user',
  group: 'users',
  team: 'users',
  people: 'users',
  customer: 'user-tie',
  progress: 'bars-progress',
  check: 'circle-check',
  done: 'circle-check',
  success: 'circle-check',
  trophy: 'trophy',
  sync: 'arrows-rotate',
  growth: 'arrow-trend-up',
  trend: 'arrow-trend-up',
  analytics: 'chart-line',
  areaspline: 'chart-area',
  insight: 'lightbulb',
  idea: 'lightbulb',
  data: 'database',
  cloud: 'cloud',
  security: 'shield-halved',
  safe: 'shield-halved',
  money: 'sack-dollar',
  finance: 'coins',
  price: 'tag',
  shop: 'store',
  cart: 'cart-shopping',
  mail: 'envelope',
  email: 'envelope',
  phone: 'mobile-screen',
  mobile: 'mobile-screen',
  computer: 'laptop',
  network: 'network-wired',
  settings: 'gear',
  config: 'gear',
  search: 'magnifying-glass',
  time: 'clock',
  calendar: 'calendar-days',
  book: 'book-open',
  learn: 'graduation-cap',
  education: 'graduation-cap',
  health: 'heart-pulse',
  star: 'star',
  diamond: 'gem',
  down: 'arrow-down',
  up: 'arrow-up',
  watermelon: 'lemon',
  banana: 'lemon',
  fruit: 'apple-whole',
  apple: 'apple-whole',
  coffee: 'mug-hot',
  handshake: 'handshake',
  target: 'bullseye',
  goal: 'bullseye',
  warning: 'triangle-exclamation',
  risk: 'triangle-exclamation',
  error: 'circle-xmark',
  code: 'code',
  ai: 'robot',
  robot: 'robot',
  design: 'pen-ruler',
  build: 'hammer',
  test: 'flask',
  deploy: 'rocket',
  message: 'comment',
  chat: 'comments',
};

/** Picked from by a stable hash when nothing else matches. */
const GENERIC = ['star', 'circle-nodes', 'cube', 'bolt', 'leaf', 'compass', 'flag', 'gem', 'puzzle-piece', 'shapes'];

function lookup(name: string): string | null {
  if (!set) return null;
  if (set.icons[name]) return name;
  const alias = set.aliases?.[name]?.parent;
  return alias && set.icons[alias] ? alias : null;
}

function hash(text: string): number {
  let h = 0;
  for (const c of text) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

/** The fa6 name a keyword resolves to. Call after loadIcons(). */
export function resolveIconName(keyword: string): string {
  const name = keyword.trim().toLowerCase().replace(/^[\w-]+\//, '').replace(/[\s_]+/g, '-');
  const direct = lookup(name) ?? lookup(SYNONYMS[name] ?? '');
  if (direct) return direct;
  for (const word of name.split('-')) {
    const hit = lookup(word) ?? lookup(SYNONYMS[word] ?? '');
    if (hit) return hit;
  }
  return GENERIC[hash(name) % GENERIC.length] as string;
}

/** A standalone <svg> for a keyword, filled with currentColor. Call after loadIcons(). */
export function iconSvg(keyword: string): string {
  if (!set) throw new Error('icons not loaded: await loadIcons() first');
  const name = resolveIconName(keyword);
  const icon = set.icons[name] as IconSet['icons'][string];
  const w = icon.width ?? set.width;
  const h = icon.height ?? set.height;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${icon.body}</svg>`;
}

/** An icon as the `data:image/svg+xml,` string the docs' inline protocol takes. */
export function iconDataUri(keyword: string): string {
  return `data:image/svg+xml,${iconSvg(keyword)}`;
}
