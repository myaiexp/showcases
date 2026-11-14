// Diverging bars: state population change, colored by the sign of the change
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const statepop = await csv('us-state-population-2010-2019.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      label: null,
      x: {
        axis: 'top',
        label: preview ? null : '← decrease · Change in population, 2010–2019 (%) · increase →',
        labelAnchor: 'center',
        tickFormat: preview ? undefined : '+',
        percent: true,
      },
      y: { axis: preview ? null : undefined },
      color: { scheme: 'PiYG', type: 'ordinal' },
      marks: [
        Plot.barX(statepop, {
          y: 'State',
          x: (d) => (d[2019] - d[2010]) / d[2010],
          fill: (d) => Math.sign(d[2019] - d[2010]),
          sort: { y: 'x' },
        }),
        Plot.gridX({ stroke: 'var(--plot-background)', strokeOpacity: 0.5 }),
        // In a 200px card 52 state labels cannot fit, so only the full view shows them.
        preview ? null : Plot.axisY({ x: 0 }),
        Plot.ruleX([0]),
      ],
    }),
  );
};

export default mount;
