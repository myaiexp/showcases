// A diverging color scale gets a ramp legend: GISTEMP anomalies in BuRd
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const gistemp = await csv('gistemp.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height: height && height - 62, // leaves room for the legend in a card
      color: { scheme: 'BuRd', legend: true },
      marks: [Plot.ruleY([0]), Plot.dot(gistemp, { x: 'Date', y: 'Anomaly', stroke: 'Anomaly' })],
    }),
  );
};

export default mount;
