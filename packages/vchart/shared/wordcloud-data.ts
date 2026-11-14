// Sample words and weights shared by the Word Cloud examples
import { rng } from './components-data.ts';

export interface Word {
  word: string;
  count: number;
}

export const WORDS = [
  'chart', 'data', 'axis', 'legend', 'series', 'tooltip', 'region', 'scale', 'field', 'label',
  'animation', 'theme', 'layout', 'spec', 'mark', 'state', 'event', 'canvas', 'render', 'update',
  'bar', 'line', 'area', 'pie', 'radar', 'funnel', 'gauge', 'heatmap', 'scatter', 'treemap',
  'sankey', 'sunburst', 'liquid', 'rose', 'boxplot', 'waterfall', 'map', 'cloud', 'progress', 'dual',
  'filter', 'stack', 'group', 'color', 'size', 'shape', 'stroke', 'fill', 'padding', 'margin',
  'zoom', 'brush', 'select', 'hover', 'crosshair', 'marker', 'title', 'format', 'domain', 'range',
];

/** The first `n` words with a seeded weight; a different seed reshuffles who is big. */
export function wordRows(seed: number, n = WORDS.length): Word[] {
  const r = rng(seed);
  return WORDS.slice(0, n).map((word) => ({ word, count: Math.round(10 + r() * r() * 190) }));
}

/** A few long phrases next to short words, for out-of-bound handling. */
export function longRows(seed: number): Word[] {
  const r = rng(seed);
  const long = [
    'a very long phrase that is wider than the whole canvas',
    'supercalifragilisticexpialidocious',
    'the quick brown fox jumps over the lazy dog',
  ];
  return [...long, ...WORDS.slice(0, 22)].map((word, i) => ({ word, count: Math.round(i < 3 ? 120 + r() * 60 : 20 + r() * 90) }));
}
