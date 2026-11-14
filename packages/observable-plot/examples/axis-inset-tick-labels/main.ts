// Axis tick labels pushed into the frame with textAnchor start and dx
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) =>
  mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      marginTop: 0,
      marginLeft: 4,
      x: { ticks: 4, label: 'Yield (kg)' },
      marks: [
        Plot.barX([42, 17, 32], { y: ['\u{1F34C} banana', '\u{1F34E} apple', '\u{1F350} pear'] }),
        // The fill matches the page, so the labels read as cut out of the bars.
        Plot.axisY({ textAnchor: 'start', fill: 'var(--plot-background)', dx: 14 }),
      ],
    }),
  );

export default mount;
