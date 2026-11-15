// A 3D surface and a 2D contour of the same grid side by side, one colorscale between them
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpack } from '../../shared/data.ts';
import { relayout } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const SCALES = ['Viridis', 'Earth', 'Portland', 'Cividis'] as const;

const mount: Mount = async (el, ctx) => {
  const rows = await csv('api_docs/mt_bruno_elevation.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 500 });
  const z: number[][] = [];
  for (let i = 0; i < 24; i++) z.push(unpack(rows, String(i)).map(Number));

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'surface', z, scene: 'scene', coloraxis: 'coloraxis' },
      { type: 'contour', z, xaxis: 'x', yaxis: 'y', coloraxis: 'coloraxis', contours: { coloring: 'heatmap' }, line: { width: 0.5 } },
    ],
    {
      template: stage.template,
      margin: stage.preview ? { l: 0, r: 0, t: 0, b: 0 } : { l: 30, r: 10, t: 20, b: 30 },
      coloraxis: { colorscale: 'Viridis', showscale: !stage.preview },
      scene: { domain: { x: [0, 0.55], y: [0, 1] }, camera: { eye: { x: 1.6, y: 1.6, z: 0.9 } } },
      xaxis: { domain: [0.62, 1], anchor: 'y', showticklabels: !stage.preview },
      yaxis: { domain: [0.1, 0.9], anchor: 'x', showticklabels: !stage.preview },
    },
    stage.config,
  );

  if (stage.bar) select(stage.bar, 'coloraxis.colorscale', SCALES, 'Viridis', (s) => void relayout(stage.div, { 'coloraxis.colorscale': s }));
  else stage.every(1500, (i) => void relayout(stage.div, { 'coloraxis.colorscale': SCALES[i % SCALES.length]! }));
  orbit(stage, { radius: 2.4 });
  return () => stage.dispose();
};

export default mount;
