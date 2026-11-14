// Composed transforms: normalizeY by sum over binX, so the sexes compare fairly
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  return mountPlot(el, ctx, {
    initial: { normalized: true },
    render: ({ normalized }, { width, height }) => {
      // y2 (not y) turns off the implicit stack, so the two sexes overlap.
      const binned = Plot.binX<Plot.RectYOptions>({ y2: 'count' }, { x: 'weight', fill: 'sex', mixBlendMode: 'screen' });
      return Plot.plot({
        width,
        height,
        y: { percent: normalized },
        marks: [Plot.rectY(olympians, normalized ? Plot.normalizeY<Plot.RectYOptions>('sum', binned) : binned)],
      });
    },
    step: ({ normalized }) => ({ normalized: !normalized }),
    previewMs: 2400,
    controls: (bar, live) => {
      toggle(bar, 'normalize by sum per sex', live.state.normalized, (normalized) => live.set({ normalized }));
    },
  });
};

export default mount;
