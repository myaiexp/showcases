// binX with fill: the bin transform partitions each bin by sex, rectY stacks
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) => {
    // The transform takes {y: "count"}; the mark options pass through with x and fill.
    const binned = Plot.binX<Plot.RectYOptions>({ y: 'count' }, { x: 'weight', fill: 'sex' });
    return Plot.rectY(olympians, binned).plot({ width, height, color: { legend: !preview } });
  });
};

export default mount;
