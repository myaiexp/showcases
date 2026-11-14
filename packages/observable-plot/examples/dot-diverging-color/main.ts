// Dot with a diverging colour scale: temperature anomalies, blue below zero
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const gistemp = await csv('gistemp.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      y: { grid: true, tickFormat: '+f', label: 'Surface temperature anomaly (°F)' },
      color: { scheme: 'BuRd' },
      marks: [Plot.ruleY([0]), Plot.dot(gistemp, { x: 'Date', y: 'Anomaly', stroke: 'Anomaly' })],
    }),
  );
};

export default mount;
