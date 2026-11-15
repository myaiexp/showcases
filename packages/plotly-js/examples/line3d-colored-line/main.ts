// A scatter3d line coloured by a data column, from the 3d-line1 CSV
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpackNum } from '../../shared/data.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const SCALES = ['Viridis', 'Portland', 'Jet', 'Plasma', 'Bluered'] as const;

const mount: Mount = async (el, ctx) => {
  const rows = await csv('3d-line1.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 640 });
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scatter3d',
        mode: 'lines',
        x: unpackNum(rows, 'x'),
        y: unpackNum(rows, 'y'),
        z: unpackNum(rows, 'z'),
        opacity: 1,
        line: { width: stage.preview ? 4 : 6, color: unpackNum(rows, 'color'), colorscale: 'Viridis', reversescale: false },
      },
    ],
    { template: stage.template, margin: margin3d(stage), scene: { camera: { eye: { x: 1.6, y: 1.6, z: 0.8 } } } },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'line.colorscale', SCALES, 'Viridis', (s) => void restyle(stage.div, { 'line.colorscale': s }));
    slider(stage.bar, 'line.width', [1, 16, 1], 6, (v) => void restyle(stage.div, { 'line.width': v }));
  }
  orbit(stage, { radius: 2.4 });
  return () => stage.dispose();
};

export default mount;
