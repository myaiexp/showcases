// Grouped bars: fx facets by sport, x places a bar per sex in each
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
      marginBottom: preview ? 10 : 100,
      fx: { padding: 0, label: null, tickRotate: 90, tickSize: 6, axis: preview ? null : 'bottom' },
      x: { axis: null, paddingOuter: 0.2 },
      y: { grid: true },
      color: { legend: !preview },
      // The group transform partitions by facet, so each sport gets its own pair of bars.
      marks: [Plot.barY(olympians, Plot.groupX({ y2: 'count' }, { x: 'sex', fx: 'sport', fill: 'sex' })), Plot.ruleY([0])],
    }),
  );
};

export default mount;
