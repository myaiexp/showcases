// Letter frequencies as one stacked bar, a compact alternative to a pie chart
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      x: { percent: true },
      marks: [
        Plot.barX(alphabet, Plot.stackX({ x: 'frequency', fillOpacity: 0.3, inset: 0.5 })),
        // textX does not stack on its own, so it gets the same explicit stackX.
        Plot.textX(alphabet, Plot.stackX({ x: 'frequency', text: 'letter', inset: 0.5 })),
        Plot.ruleX([0, 1]),
      ],
    }),
  );
};

export default mount;
