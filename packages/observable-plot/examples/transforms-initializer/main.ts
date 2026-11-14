// A custom initializer derives a fill channel from the dots' pixel positions
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      grid: true,
      color: { scheme: 'turbo', label: 'Distance from frame center (px)', legend: !ctx.preview },
      marks: [
        Plot.dot(penguins, {
          x: 'culmen_length_mm',
          y: 'culmen_depth_mm',
          // Initializers run after scales exist: channels hold pixel positions.
          initializer: (data, facets, channels, scales, dimensions) => {
            const x = channels.x!.value as unknown as ArrayLike<number>;
            const y = channels.y!.value as unknown as ArrayLike<number>;
            const cx = dimensions.marginLeft + (dimensions.width - dimensions.marginLeft - dimensions.marginRight) / 2;
            const cy = dimensions.marginTop + (dimensions.height - dimensions.marginTop - dimensions.marginBottom) / 2;
            const distance = Array.from(data as ArrayLike<unknown>, (_, i) => Math.hypot(x[i]! - cx, y[i]! - cy));
            // Declared as a color-scale channel, so it gets a scale and a legend.
            return { data, facets, channels: { fill: { value: distance, scale: 'color' } } };
          },
        }),
      ],
    }),
  );
};

export default mount;
