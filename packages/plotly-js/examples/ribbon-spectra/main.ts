// Seven surface strips from one JSON file make a ribbon plot of spectra
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { json } from '../../shared/data.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

interface Strip {
  x: number[][];
  y: number[][];
  z: number[][];
  colorscale: [number, string][];
}

const mount: Mount = async (el, ctx) => {
  const figure = await json<{ data: Strip[] }>('3d-ribbon.json');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 600 });
  // Each strip has 401 wavelengths; a card keeps every 8th.
  const step = stage.preview ? 8 : 1;
  const thin = (m: number[][]): number[][] => m.filter((_, i) => i % step === 0);

  const data: Data[] = figure.data.map((s) => ({
    type: 'surface',
    x: thin(s.x),
    y: thin(s.y),
    z: thin(s.z),
    colorscale: s.colorscale,
    showscale: false,
    name: '',
  }));

  await Plotly.newPlot(
    stage.div,
    data,
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Ribbon Plot' },
      showlegend: false,
      margin: margin3d(stage, { l: 0, r: 0, t: 50, b: 0 }),
      scene: {
        xaxis: { title: { text: 'Sample #' } },
        yaxis: { title: { text: 'Wavelength' } },
        zaxis: { title: { text: 'OD' } },
        camera: { eye: { x: 1.9, y: -1.6, z: 0.9 } },
      },
    },
    stage.config,
  );

  orbit(stage, { radius: 2.4, start: -0.7 });
  return () => stage.dispose();
};

export default mount;
