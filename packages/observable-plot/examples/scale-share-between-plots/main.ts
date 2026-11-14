// A second plot reuses the first plot's color scale through plot.scale("color")
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot(el, ctx, {
    initial: { share: true },
    render: ({ share }, { width, height }) => {
      const h = height ? height / 2 : 240;
      const plot1 = Plot.plot({
        width,
        height: h,
        marks: [Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', stroke: 'species' })],
      });
      const plot2 = Plot.plot({
        width,
        height: h,
        color: share ? plot1.scale('color') : {},
        marks: [Plot.dot(penguins.filter((d) => d.species !== 'Adelie'), { x: 'flipper_length_mm', y: 'body_mass_g', stroke: 'species' })],
      });
      const box = document.createElement('div');
      box.append(plot1, plot2);
      return box;
    },
    step: ({ share }) => ({ share: !share }),
    controls: (bar, live) => toggle(bar, 'share color scale ', live.state.share, (share) => live.set({ share })),
  });
};

export default mount;
