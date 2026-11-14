// The thresholds option: named rules, a count hint, an array or a function
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const NAMES = ['auto', 'freedman-diaconis', 'scott', 'sturges', '10', '40', 'array: every 25', 'function: 12 bins'] as const;
type Name = (typeof NAMES)[number];

function thresholds(name: Name): Plot.ThresholdsName | number | number[] | ((values: number[], min: number, max: number) => number) {
  if (name === 'array: every 25') return Array.from({ length: 9 }, (_, i) => 25 + i * 25);
  // A function is passed the values, the domain minimum and maximum; here it returns a count.
  if (name === 'function: 12 bins') return () => 12;
  if (name === '10' || name === '40') return Number(name);
  return name;
}

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  const cards: Name[] = ['sturges', 'auto', '10', 'array: every 25'];
  return mountPlot(el, ctx, {
    initial: { name: (ctx.preview ? 'sturges' : 'auto') as Name },
    render: ({ name }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true },
        marks: [Plot.rectY(olympians, Plot.binX<Plot.RectYOptions>({ y: 'count' }, { x: 'weight', thresholds: thresholds(name) })), Plot.ruleY([0])],
      }),
    step: (_s, i) => ({ name: cards[i % cards.length] ?? 'auto' }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'thresholds', NAMES, live.state.name, (name) => live.set({ name }));
    },
  });
};

export default mount;
