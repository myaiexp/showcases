// scatter3d 'lines+markers': a helix whose line and markers have separate colorscales
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['lines+markers', 'lines', 'markers'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const c = Array.from({ length: 31 }, (_, i) => i);
  const x = c.map((i) => 10 * Math.cos(i / 10) * Math.cos(i));
  const y = c.map((i) => 10 * Math.cos(i / 10) * Math.sin(i));
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scatter3d',
        mode: 'lines+markers',
        x,
        y,
        z: c,
        line: { width: 6, color: c, colorscale: 'Viridis' },
        marker: { size: 3.5, color: c, colorscale: 'Greens', cmin: -20, cmax: 50 },
      },
    ],
    { template: stage.template, margin: margin3d(stage), scene: { camera: { eye: { x: 1.7, y: 1.7, z: 0.6 } } } },
    stage.config,
  );

  const apply = (m: string): void => void restyle(stage.div, { mode: m });
  if (stage.bar) {
    select(stage.bar, 'mode', MODES, 'lines+markers', apply);
    slider(stage.bar, 'marker.size', [1, 14, 0.5], 3.5, (v) => void restyle(stage.div, { 'marker.size': v }));
  } else {
    stage.every(1600, (i) => apply(MODES[i % 3]!));
  }
  orbit(stage, { radius: 2.5, height: 0.6 });
  return () => stage.dispose();
};

export default mount;
