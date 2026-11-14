// Six y axes, left and right, each with its label at top, center or bottom
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) =>
  mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      grid: true,
      y: { type: 'linear' },
      marks: [
        Plot.axisY({ anchor: 'left', label: 'left-top', labelAnchor: 'top' }),
        Plot.axisY({ anchor: 'left', label: 'left-center', labelAnchor: 'center', ticks: [] }),
        Plot.axisY({ anchor: 'left', label: 'left-bottom', labelAnchor: 'bottom', ticks: [] }),
        Plot.axisY({ anchor: 'right', label: 'right-top', labelAnchor: 'top' }),
        Plot.axisY({ anchor: 'right', label: 'right-center', labelAnchor: 'center', ticks: [] }),
        Plot.axisY({ anchor: 'right', label: 'right-bottom', labelAnchor: 'bottom', ticks: [] }),
      ],
    }),
  );

export default mount;
