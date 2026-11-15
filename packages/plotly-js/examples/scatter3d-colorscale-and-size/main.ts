// scatter3d markers coloured by value with a colorscale and sized per point
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';
import { rng } from '../../shared/stat-data.ts';

const SCALES = ['Viridis', 'Portland', 'Electric', 'Jet', 'Hot', 'Cividis', 'Blues'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const rand = rng(12);
  const n = stage.preview ? 120 : 260;
  const x: number[] = [];
  const y: number[] = [];
  const z: number[] = [];
  const size: number[] = [];
  for (let i = 0; i < n; i += 1) {
    const t = (i / n) * 6 * Math.PI;
    x.push(Math.cos(t) * (1 + i / n) + (rand() - 0.5) * 0.3);
    y.push(Math.sin(t) * (1 + i / n) + (rand() - 0.5) * 0.3);
    z.push(i / n + (rand() - 0.5) * 0.2);
    size.push(3 + rand() * 9);
  }

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scatter3d',
        mode: 'markers',
        x,
        y,
        z,
        text: z.map((v) => `height ${v.toFixed(2)}`),
        hoverinfo: 'text',
        marker: { size, sizemode: 'diameter', color: z, colorscale: 'Viridis', showscale: !stage.preview, opacity: 0.85, colorbar: { title: { text: 'z' } } },
      },
    ],
    { template: stage.template, margin: margin3d(stage), scene: { camera: { eye: { x: 1.8, y: 1.8, z: 0.8 } } } },
    stage.config,
  );

  const apply = (s: string): void => void restyle(stage.div, { 'marker.colorscale': s });
  if (stage.bar) select(stage.bar, 'marker.colorscale', SCALES, 'Viridis', apply);
  else stage.every(1500, (i) => apply(SCALES[i % SCALES.length]!));
  orbit(stage, { radius: 2.6 });
  return () => stage.dispose();
};

export default mount;
