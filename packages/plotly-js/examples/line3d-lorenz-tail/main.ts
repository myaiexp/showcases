// A scatter3d line that streams along a Lorenz attractor, trailing a fading tail
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout, restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { margin3d } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 540 });
  // Euler steps of the Lorenz system (sigma 10, rho 28, beta 8/3).
  const N = 3600;
  const px: number[] = [];
  const py: number[] = [];
  const pz: number[] = [];
  let [x, y, z] = [1, 1, 1];
  // The first 3000 steps are burn-in: the path has to leave the fixed points before it looks like the butterfly.
  for (let i = -3000; i < N; i += 1) {
    const dt = 0.008;
    [x, y, z] = [x + 10 * (y - x) * dt, y + (x * (28 - z) - y) * dt, z + (x * y - (8 / 3) * z) * dt];
    if (i < 0) continue;
    px.push(x);
    py.push(y);
    pz.push(z);
  }
  let tail = 700;
  const age = (n: number): number[] => Array.from({ length: n }, (_, i) => i);

  await Plotly.newPlot(
    stage.div,
    [{ type: 'scatter3d', mode: 'lines', x: [], y: [], z: [], line: { width: stage.preview ? 3 : 5, color: [], colorscale: 'Portland' } }],
    {
      template: stage.template,
      margin: margin3d(stage),
      scene: {
        xaxis: { range: [-28, 28] },
        yaxis: { range: [-32, 32] },
        zaxis: { range: [0, 50] },
        camera: { eye: { x: 1.5, y: 1.5, z: 0.7 } },
      },
    },
    stage.config,
  );

  if (stage.bar) slider(stage.bar, 'tail length', [50, 1500, 50], tail, (v) => (tail = v));
  // Streaming: the whole picture is the moving window, in cards and the full view alike.
  stage.every(70, (i) => {
    const end = (i * 12) % N;
    const from = Math.max(0, end - tail);
    const a = (0.6 + i * 0.012) % (2 * Math.PI);
    void restyle(stage.div, {
      x: [px.slice(from, end)],
      y: [py.slice(from, end)],
      z: [pz.slice(from, end)],
      'line.color': [age(end - from)],
    });
    if (stage.preview) void relayout(stage.div, { 'scene.camera.eye': { x: 2.2 * Math.cos(a), y: 2.2 * Math.sin(a), z: 0.7 } });
  });
  return () => stage.dispose();
};

export default mount;
