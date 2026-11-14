// Lap times on an axis that ends where the data ends, or at the next round tick
import type { CartesianScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C } from '../../shared/data.ts';

type Bounds = 'ticks' | 'data';
const BOUNDS: Bounds[] = ['ticks', 'data'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: ['Lap 1', 'Lap 2', 'Lap 3', 'Lap 4', 'Lap 5', 'Lap 6'],
      datasets: [{ label: 'Lap time (s)', data: [93.7, 92.4, 91.8, 92.9, 90.6, 91.3], borderColor: C.red, backgroundColor: C.red, tension: 0.25 }],
    },
    options: { maintainAspectRatio: false, scales: { y: { bounds: 'ticks' } }, plugins: { legend: { display: false } } },
  });
  const y = (): CartesianScaleOptions => chart.options.scales!.y as CartesianScaleOptions;

  // cartesian/index.md § Scale Bounds: 'ticks' ends on a whole tick (data inside it);
  // 'data' ends exactly on the data and drops labels outside it.
  const apply = (bounds: Bounds): void => {
    y().bounds = bounds;
    chart.update();
    label.textContent = `bounds: '${bounds}'`;
  };
  apply('ticks');

  if (bar) select(bar, 'bounds', BOUNDS, 'ticks', apply);
  const stop = ctx.preview ? cycle(BOUNDS, 2400, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
