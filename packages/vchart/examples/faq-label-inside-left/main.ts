// FAQ: left-aligned bar labels with position inside-left, and what smartInvert does to their colour
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { pick, rng } from '../../shared/components-data.ts';

const NAMES = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn'];
const rows = (seed: number): { planet: string; moons: number }[] => {
  const r = rng(seed);
  return NAMES.map((planet) => ({ planet, moons: Math.round(1 + r() * 60) }));
};

type Position = 'inside-left' | 'outside' | 'inside' | 'inside-right';
const build = (position: Position, smartInvert: boolean): ISpec => ({
  type: 'bar',
  direction: 'horizontal',
  data: [{ id: 'd', values: rows(2) }],
  xField: 'moons',
  yField: 'planet',
  axes: [{ orient: 'left', type: 'band' }, { orient: 'bottom', type: 'linear' }],
  label: {
    visible: true,
    position,
    // Smart inversion recolours a label against its bar, so bars of different colour give labels that differ.
    smartInvert,
    style: { fill: '#e2e8f0', fontSize: 12 },
  },
});

const mount: Mount = (el, ctx) => {
  let position: Position = 'inside-left';
  let invert = true;
  const { vchart, release } = createChart(el, ctx, build(position, invert));
  let released = false;
  const apply = (): void => {
    if (!released) void vchart.updateSpec(build(position, invert));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'label.position', ['inside-left', 'outside', 'inside', 'inside-right'], (v) => ((position = v as Position), apply()));
    select(bar, 'smartInvert', ['true', 'false'], (v) => ((invert = v === 'true'), apply()));
  }
  let i = 0;
  const stop = every(1800, () => {
    i += 1;
    if (ctx.preview) {
      invert = pick([true, false], i);
      apply();
    }
  });
  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
