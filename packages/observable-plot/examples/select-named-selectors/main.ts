// Select transform shorthands: first, last, min and max on x or y, per series
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { stocks } from '../../shared/normalize-stocks.ts';

const NAMES = ['selectFirst', 'selectLast', 'selectMinX', 'selectMaxX', 'selectMinY', 'selectMaxY'] as const;
type Name = (typeof NAMES)[number];

const mount: Mount = async (el, ctx) => {
  const all = await stocks();
  return mountPlot<{ name: Name }>(el, ctx, {
    initial: { name: 'selectMaxY' },
    render: ({ name }, { width, height }) => {
      const o = { x: 'Date', y: 'Close', z: 'Symbol', fill: 'Symbol', r: 5, stroke: 'var(--plot-background)' } as const;
      return Plot.plot({
        width,
        height,
        y: { grid: true },
        marks: [Plot.line(all, { x: 'Date', y: 'Close', stroke: 'Symbol', strokeOpacity: 0.5 }), Plot.dot(all, Plot[name]({ ...o }))],
      });
    },
    step: ({ name }) => ({ name: NAMES[(NAMES.indexOf(name) + 1) % NAMES.length] ?? 'selectFirst' }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'selector', NAMES, live.state.name, (name) => live.set({ name }));
    },
  });
};

export default mount;
