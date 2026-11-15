// A 3142-point scatter3d spiral whose line colour runs along the point index
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 560 });
  const pointCount = 3142;
  const x: number[] = [];
  const y: number[] = [];
  const z: number[] = [];
  const c: number[] = [];
  for (let i = 0; i < pointCount; i += 1) {
    const r = i * (pointCount - i);
    x.push(r * Math.cos(i / 30));
    y.push(r * Math.sin(i / 30));
    z.push(i);
    c.push(i);
  }
  await Plotly.newPlot(
    stage.div,
    [{ type: 'scatter3d', mode: 'lines', x, y, z, opacity: 0.7, line: { width: stage.preview ? 5 : 10, color: c, colorscale: 'Viridis' } }],
    { template: stage.template, margin: margin3d(stage), scene: { camera: { eye: { x: 1.6, y: 1.6, z: 0.9 } } } },
    stage.config,
  );

  if (stage.bar) {
    slider(stage.bar, 'line.width', [1, 20, 1], 10, (v) => void restyle(stage.div, { 'line.width': v }));
    slider(stage.bar, 'opacity', [0.1, 1, 0.05], 0.7, (v) => void restyle(stage.div, { opacity: v }));
  }
  orbit(stage, { radius: 2.4 });
  return () => stage.dispose();
};

export default mount;
