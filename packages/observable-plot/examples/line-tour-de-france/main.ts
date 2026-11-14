// Elevation profile of a Tour de France stage: a line over a quantitative x
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const tdf = await csv('tdf-stage-8-2017.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      x: { label: 'Distance from stage start (km)' },
      y: { label: 'Elevation (m)', grid: true },
      marks: [Plot.ruleY([0]), Plot.line(tdf, { x: 'distance', y: 'elevation' })],
    }),
  );
};

export default mount;
