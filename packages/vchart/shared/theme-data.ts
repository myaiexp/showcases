// Sample data and registered showcase themes shared by the Theme examples
import VChart from '@visactor/vchart';
import type { ITheme } from '@visactor/vchart';

export interface Datum {
  type: string;
  value: number;
  group?: string;
}

/** Elements data of Customize_Theme.md, as numbers. */
export const ELEMENTS: Datum[] = [
  { type: 'oxygen', value: 46.6 },
  { type: 'silicon', value: 27.72 },
  { type: 'aluminum', value: 8.13 },
  { type: 'iron', value: 5 },
  { type: 'calcium', value: 3.63 },
  { type: 'sodium', value: 2.83 },
  { type: 'potassium', value: 2.59 },
  { type: 'others', value: 3.5 },
];

/** The first `n` elements with their values scaled by `k`. */
export function elements(n = ELEMENTS.length, k = 1): Datum[] {
  return ELEMENTS.slice(0, n).map((d) => ({ ...d, value: Math.round(d.value * k * 100) / 100 }));
}

/** A few categories with two groups, for charts that need a legend. */
export function grouped(k = 1): Datum[] {
  const base = [
    ['Mon', 22, 14],
    ['Tue', 13, 25],
    ['Wed', 25, 18],
    ['Thu', 29, 30],
    ['Fri', 38, 21],
  ] as const;
  return base.flatMap(([type, a, b]) => [
    { type, group: 'north', value: Math.round(a * k) },
    { type, group: 'south', value: Math.round(b * (2 - k)) },
  ]);
}

/**
 * Registers a theme under a `showcase-` name. All of them are dark-based with a transparent
 * background, so they sit on the page like the default chart theme. Registering is additive and
 * repeating it with the same name just replaces that entry; the names stay registered.
 */
export function registerShowcaseTheme(name: string, theme: Partial<ITheme>): string {
  const full = `showcase-${name}`;
  VChart.ThemeManager.registerTheme(full, { type: 'dark', background: 'transparent', ...theme, name: full } as Partial<ITheme>);
  return full;
}

export const OCEAN = ['#5383F4', '#7BCF8E', '#FF9D2C', '#FFDB26', '#7568D9', '#80D8FB', '#1857A3', '#CAB0E8'];
export const WARM = ['#FF6B6B', '#FFA07A', '#F7DC6F', '#FF8867', '#BB8FCE', '#E377C2', '#D62728', '#8C564B'];
export const MINT = ['#4ECDC4', '#98D8C8', '#45B7D1', '#B9E493', '#2CB4A8', '#85C1E2', '#B9E4E3', '#7BCF8E'];

/** Three registered palette themes the switching examples cycle through. */
export function paletteThemes(): string[] {
  return [
    registerShowcaseTheme('ocean', { colorScheme: { default: OCEAN } }),
    registerShowcaseTheme('warm', { colorScheme: { default: WARM } }),
    registerShowcaseTheme('mint', { colorScheme: { default: MINT } }),
  ];
}
