// Seeded data for the Extensions examples: OHLC candles, regression samples, storyline nodes, timeline events
import { rng } from './components-data.ts';

export interface Candle {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/** A random walk of daily candles; the date labels run 01-Nov, 02-Nov ... */
export function candles(n = 24, seed = 5, start = 100): Candle[] {
  const r = rng(seed);
  let last = start;
  return Array.from({ length: n }, (_, i) => {
    const open = last;
    const close = Math.round((open + (r() - 0.48) * 10) * 100) / 100;
    const high = Math.round((Math.max(open, close) + r() * 4) * 100) / 100;
    const low = Math.round((Math.min(open, close) - r() * 4) * 100) / 100;
    last = close;
    return { date: `${String(i + 1).padStart(2, '0')}-Nov`, open, high, low, close, volume: Math.round(200 + r() * 800) };
  });
}

/** Simple moving average of the close price over `period` candles. */
export function movingAverage(data: readonly Candle[], period = 5): { date: string; ma: number }[] {
  return data.flatMap((c, i) => {
    if (i < period - 1) return [];
    const slice = data.slice(i - period + 1, i + 1);
    return [{ date: c.date, ma: Math.round((slice.reduce((s, d) => s + d.close, 0) / period) * 100) / 100 }];
  });
}

/** A standard-normal sample (Box-Muller) from a seeded generator. */
export function gaussian(r: () => number): number {
  return Math.sqrt(-2 * Math.log(r() || 1e-9)) * Math.cos(2 * Math.PI * r());
}

/** `n` {value} rows around `mean`, for the histogram examples. */
export function samples(n: number, mean = 5, sd = 3, seed = 9): { value: number }[] {
  const r = rng(seed);
  return Array.from({ length: n }, () => ({ value: mean + gaussian(r) * sd }));
}

/** Noisy points along a curve: {x, y}. */
export function noisyCurve(n = 50, seed = 4, fn: (x: number) => number = (x) => 8 + 0.5 * x + 0.04 * x * x): { x: number; y: number }[] {
  const r = rng(seed);
  return Array.from({ length: n }, (_, i) => {
    const x = Math.round((i / (n - 1)) * 300) / 10;
    return { x, y: Math.round((fn(x) + gaussian(r) * 4) * 10) / 10 };
  });
}

/** A coloured card drawn as an SVG data URL, so no image is fetched. */
export function svgImage(label: string, hue: number, w = 240, h = 160): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue},70%,55%)"/>` +
    `<stop offset="1" stop-color="hsl(${(hue + 50) % 360},70%,38%)"/></linearGradient></defs>` +
    `<rect width="${w}" height="${h}" fill="url(#g)"/>` +
    `<circle cx="${w * 0.72}" cy="${h * 0.3}" r="${h * 0.16}" fill="rgba(255,255,255,0.35)"/>` +
    `<path d="M0 ${h} L${w * 0.3} ${h * 0.55} L${w * 0.5} ${h * 0.8} L${w * 0.75} ${h * 0.45} L${w} ${h} Z" fill="rgba(0,0,0,0.25)"/>` +
    `<text x="${w / 2}" y="${h * 0.52}" font-size="${h * 0.2}" font-family="sans-serif" fill="white" text-anchor="middle">${label}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export interface StoryNode {
  id: string;
  title: string;
  content: string | string[];
  image: string;
  marker?: string;
}

const STORY: [string, string, string | string[], string][] = [
  ['discover', 'Discover', 'Talk to users and name the problem.', '2021'],
  ['design', 'Design', ['Sketch the key workflows.', 'Test a clickable prototype.'], '2022'],
  ['build', 'Build', 'Ship the first slice end to end.', '2023'],
  ['launch', 'Launch', 'Open the beta and collect feedback.', '2024'],
  ['grow', 'Grow', 'Scale up what the beta proved.', '2025'],
];

/** The first `n` product-history nodes, each with a generated image. */
export function storyNodes(n = 4): StoryNode[] {
  return STORY.slice(0, n).map(([id, title, content, marker], i) => ({
    id,
    title,
    content,
    marker,
    image: svgImage(title, 200 + i * 38),
  }));
}

/** A left-axis range that holds every high and low, since the candlestick series does not feed the axis its own fields. */
export function priceRange(data: readonly Candle[]): { min: number; max: number } {
  return {
    min: Math.floor(Math.min(...data.map((d) => d.low)) - 2),
    max: Math.ceil(Math.max(...data.map((d) => d.high)) + 2),
  };
}
