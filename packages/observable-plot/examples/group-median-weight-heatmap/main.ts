// A two-dimensional heatmap: group on x and y, with a median weight fill
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      marginBottom: preview ? 10 : 80,
      x: { label: null, tickRotate: 90, axis: preview ? null : 'bottom' },
      y: { label: null },
      color: { label: 'Median weight (kg)', legend: !preview, scheme: 'turbo' },
      marks: [Plot.cell(olympians, Plot.group({ fill: 'median' }, { fill: 'weight', x: 'sport', y: 'sex' }))],
    }),
  );
};

export default mount;
