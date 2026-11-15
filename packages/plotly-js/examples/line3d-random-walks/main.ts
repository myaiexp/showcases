// Three 3D random walks from one CSV, each a one-pixel scatter3d line
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpackNum } from '../../shared/data.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { every, margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const COLORS = ['#1f77b4', 'rgb(44, 160, 44)', '#bcbd22'];

const mount: Mount = async (el, ctx) => {
  const rows = await csv('_3d-line-plot.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 560 });
  const thin = (a: number[]): number[] => (stage.preview ? every(a, 3) : a);
  await Plotly.newPlot(
    stage.div,
    [1, 2, 3].map((n, i) => ({
      type: 'scatter3d' as const,
      mode: 'lines' as const,
      name: `walk ${n}`,
      x: thin(unpackNum(rows, `x${n}`)),
      y: thin(unpackNum(rows, `y${n}`)),
      z: thin(unpackNum(rows, `z${n}`)),
      line: { color: COLORS[i]!, width: stage.preview ? 2 : 1 },
    })),
    {
      template: stage.template,
      title: { text: stage.preview ? '' : '3D Line Plot' },
      showlegend: !stage.preview,
      margin: margin3d(stage, { l: 0, r: 0, t: 50, b: 0 }),
      scene: { camera: { eye: { x: 1.5, y: 1.5, z: 0.9 } } },
    },
    stage.config,
  );

  if (stage.bar) slider(stage.bar, 'line.width', [1, 8, 1], 1, (v) => void restyle(stage.div, { 'line.width': v }));
  orbit(stage, { radius: 2.2 });
  return () => stage.dispose();
};

export default mount;
