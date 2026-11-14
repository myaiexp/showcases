// Rule: daily min-max temperature as ruleX with y1 and y2, stroked by temp_min
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const seattle = await csv('seattle-weather.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      y: { grid: true, label: 'Temperature (°C)' },
      color: { scheme: 'BuRd' },
      marks: [
        Plot.ruleY([0]),
        // y1 and y2 limit each rule's extent instead of spanning the frame.
        Plot.ruleX(seattle, { x: 'date', y1: 'temp_min', y2: 'temp_max', stroke: 'temp_min', strokeWidth: preview ? 1 : undefined }),
      ],
    }),
  );
};

export default mount;
