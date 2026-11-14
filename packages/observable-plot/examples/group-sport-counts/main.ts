// Olympic athletes by sport: barY with groupX counting rows per x
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
      x: { label: null, tickRotate: 90, axis: preview ? null : 'bottom' },
      y: { grid: true },
      // groupX groups on x; the outputs object {y: "count"} derives bar heights.
      marks: [Plot.barY(olympians, Plot.groupX({ y: 'count' }, { x: 'sport' })), Plot.ruleY([0])],
    }),
  );
};

export default mount;
