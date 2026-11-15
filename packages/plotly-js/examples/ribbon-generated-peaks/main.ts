// A ribbon plot built in code: one narrow surface per peak, with a width slider
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { linspace, margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const SCALES = ['Blues', 'Greens', 'Reds', 'Purples', 'YlOrRd', 'Viridis'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 540 });
  const wavelengths = linspace(0, 10, stage.preview ? 60 : 160);

  // A ribbon is a surface two columns wide: x runs [i, i + width] along every row.
  const ribbons = (width: number): Data[] =>
    SCALES.map((colorscale, i) => {
      const peak = 2 + i * 1.2;
      const z = wavelengths.map((w) => {
        const v = Math.exp(-((w - peak) ** 2) / 0.8) + 0.4 * Math.exp(-((w - peak - 2.2) ** 2) / 0.3);
        return [v, v];
      });
      return {
        type: 'surface',
        x: wavelengths.map(() => [i, i + width]),
        y: wavelengths.map((w) => [w, w]),
        z,
        surfacecolor: z,
        colorscale,
        showscale: false,
        name: `sample ${i + 1}`,
        hoverinfo: 'name+y+z',
      };
    });

  const layout = {
    template: stage.template,
    margin: margin3d(stage),
    showlegend: false,
    scene: {
      xaxis: { title: { text: 'Sample' } },
      yaxis: { title: { text: 'Wavelength' } },
      zaxis: { title: { text: 'Absorbance' } },
      camera: { eye: { x: 1.8, y: -1.7, z: 0.8 } },
    },
  };
  await Plotly.newPlot(stage.div, ribbons(0.7), layout, stage.config);

  if (stage.bar) {
    slider(stage.bar, 'ribbon width', [0.1, 1, 0.05], 0.7, (w) => void Plotly.react(stage.div, ribbons(w), layout, stage.config));
  }
  orbit(stage, { radius: 2.6, start: -0.7 });
  return () => stage.dispose();
};

export default mount;
