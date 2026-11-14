// Ocean temperature by depth: reverse puts the surface at the top
import type { LinearScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, toggle } from '../../shared/controls.ts';
import { C } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const profile = [
    { x: 18.5, y: 0 }, { x: 18.1, y: 25 }, { x: 15.2, y: 60 }, { x: 11.4, y: 120 },
    { x: 8.3, y: 250 }, { x: 5.6, y: 500 }, { x: 4.1, y: 800 }, { x: 3.2, y: 1200 },
  ];
  const chart = new Chart(stage.canvas, {
    type: 'scatter',
    data: { datasets: [{ label: 'Water temperature (°C)', data: profile, showLine: true, borderColor: C.cyan, backgroundColor: C.cyan, pointRadius: 4 }] },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: { title: { display: true, text: 'Temperature (°C)' } },
        y: { reverse: false, min: 0, title: { display: true, text: 'Depth (m)' } },
      },
      plugins: { legend: { display: false } },
    },
  });
  const y = (): LinearScaleOptions => chart.options.scales!.y as LinearScaleOptions;

  // common options: reverse flips the direction in which the scale grows.
  const apply = (reverse: boolean): void => {
    y().reverse = reverse;
    chart.update();
    label.textContent = `reverse: ${reverse}`;
  };
  apply(false);

  if (bar) toggle(bar, 'y reverse', false, apply);
  const stop = ctx.preview ? cycle([false, true], 2400, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
