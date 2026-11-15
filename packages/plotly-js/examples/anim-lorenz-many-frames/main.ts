// Plotly.animate with zero durations as a fast redraw path for a numerical simulation
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/stat-data.ts';
import { createStage } from '../../shared/stage.ts';

const n = 100;
const dt = 0.015;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const rand = rng(171);
  const x = Array.from({ length: n }, () => rand() * 2 - 1);
  const y = Array.from({ length: n }, () => rand() * 2 - 1);
  const z = Array.from({ length: n }, () => 30 + rand() * 10);

  await Plotly.newPlot(
    stage.div,
    [{ x, y: z, mode: 'markers', marker: { size: stage.preview ? 6 : 8, color: '#60a5fa' } }],
    { template: stage.template, xaxis: { range: [-40, 40] }, yaxis: { range: [0, 60] } },
    stage.config,
  );

  // The midpoint (Heun) step of dx = s(y - x), dy = x(r - z) - y, dz = xy - bz.
  const compute = (): void => {
    const s = 10, b = 8 / 3, r = 28;
    for (let i = 0; i < n; i++) {
      let dx = s * (y[i]! - x[i]!);
      let dy = x[i]! * (r - z[i]!) - y[i]!;
      let dz = x[i]! * y[i]! - b * z[i]!;
      const xh = x[i]! + dx * dt * 0.5;
      const yh = y[i]! + dy * dt * 0.5;
      const zh = z[i]! + dz * dt * 0.5;
      dx = s * (yh - xh);
      dy = xh * (r - zh) - yh;
      dz = xh * yh - b * zh;
      x[i]! += dx * dt;
      y[i]! += dy * dt;
      z[i]! += dz * dt;
    }
  };

  // stage.every rather than requestAnimationFrame: it stops with the stage.
  stage.every(33, () => {
    compute();
    void Plotly.animate(stage.div, { data: [{ x, y: z }] }, { transition: { duration: 0 }, frame: { duration: 0, redraw: false } }).catch(() => {});
  });

  return () => stage.dispose();
};

export default mount;
