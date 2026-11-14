// Dot with an r channel: daily trading volume as position and area
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv, type Row } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      grid: true,
      x: { label: 'Daily change (%)', tickFormat: '+f', percent: true },
      y: { type: 'log', label: 'Daily trading volume' },
      marks: [Plot.ruleX([0]), Plot.dot(aapl, { x: (d: Row) => (d.Close - d.Open) / d.Open, y: 'Volume', r: 'Volume' })],
    }),
  );
};

export default mount;
