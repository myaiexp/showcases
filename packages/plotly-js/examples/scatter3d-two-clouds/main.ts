// Two scatter3d marker clouds from one CSV, with a marker size slider
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpackNum } from '../../shared/data.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('3d-scatter.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 540 });
  const size = stage.preview ? 5 : 12;

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scatter3d',
        mode: 'markers',
        x: unpackNum(rows, 'x1'),
        y: unpackNum(rows, 'y1'),
        z: unpackNum(rows, 'z1'),
        marker: { size, line: { color: 'rgba(217, 217, 217, 0.14)', width: 0.5 }, opacity: 0.8 },
      },
      {
        type: 'scatter3d',
        mode: 'markers',
        x: unpackNum(rows, 'x2'),
        y: unpackNum(rows, 'y2'),
        z: unpackNum(rows, 'z2'),
        marker: { color: 'rgb(170, 170, 170)', size, symbol: 'circle', line: { color: 'rgb(204, 204, 204)', width: 1 }, opacity: 0.8 },
      },
    ],
    { template: stage.template, margin: margin3d(stage), showlegend: !stage.preview },
    stage.config,
  );

  if (stage.bar) {
    slider(stage.bar, 'marker.size', [2, 20, 1], 12, (v) => void restyle(stage.div, { 'marker.size': v }));
  }
  orbit(stage, { radius: 2.4 });
  return () => stage.dispose();
};

export default mount;
