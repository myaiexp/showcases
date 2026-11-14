// Six x axes, top and bottom, each with its label at left, center or right
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) =>
  mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height: preview ? height : 80,
      grid: true,
      x: { type: 'linear' },
      marks: [
        Plot.axisX({ anchor: 'top', label: 'top-left', labelAnchor: 'left' }),
        Plot.axisX({ anchor: 'top', label: 'top-center', labelAnchor: 'center', ticks: [] }),
        Plot.axisX({ anchor: 'top', label: 'top-right', labelAnchor: 'right', ticks: [] }),
        Plot.axisX({ anchor: 'bottom', label: 'bottom-left', labelAnchor: 'left' }),
        Plot.axisX({ anchor: 'bottom', label: 'bottom-center', labelAnchor: 'center', ticks: [] }),
        Plot.axisX({ anchor: 'bottom', label: 'bottom-right', labelAnchor: 'right', ticks: [] }),
      ],
    }),
  );

export default mount;
