// Uneven survey weeks: barThickness, 'flex' and maxBarThickness
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

// Satisfaction score on weeks 1, 2, 3, 6, 7 and 12: the x values are not evenly spaced.
const SCORES = [
  { x: 1, y: 6.2 },
  { x: 2, y: 6.9 },
  { x: 3, y: 7.4 },
  { x: 6, y: 7.1 },
  { x: 7, y: 8.0 },
  { x: 12, y: 8.6 },
];
const MODES = ['not set', '8', '24', 'flex'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 160 });
  const label = caption(el);
  let mode: Mode = 'not set';
  let cap = 0;

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      datasets: [
        { label: 'Satisfaction', data: SCORES, backgroundColor: alpha(C.green, 0.65), borderColor: C.green, borderWidth: 1 },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: { type: 'linear', min: 0, max: 13, title: { display: !ctx.preview, text: 'Week' } },
        y: { beginAtZero: true, max: 10 },
      },
      plugins: { legend: { display: false } },
    },
  });

  // bar.md § barThickness: a number is in pixels and beats the percentages; 'flex' sizes
  // each bar from its neighbours; maxBarThickness caps whichever way the width came out.
  const apply = (): void => {
    const ds = chart.data.datasets[0]!;
    ds.barThickness = mode === 'not set' ? undefined : mode === 'flex' ? 'flex' : Number(mode);
    ds.maxBarThickness = cap || undefined;
    chart.update();
    const thick = mode === 'not set' ? '' : `barThickness: ${mode === 'flex' ? "'flex'" : mode}`;
    label.textContent = [thick, cap ? `maxBarThickness: ${cap}` : ''].filter(Boolean).join(', ') || 'default widths';
  };
  apply();

  if (bar) {
    select(bar, 'barThickness', MODES, mode, (v) => ((mode = v), apply()));
    slider(bar, 'maxBarThickness (0 = off)', [0, 60, 2], cap, (v) => ((cap = v), apply()));
  }
  const steps: [Mode, number][] = [['not set', 0], ['8', 0], ['24', 0], ['flex', 0], ['flex', 20]];
  const stop = ctx.preview ? cycle(steps, 2000, ([m, c]) => ((mode = m), (cap = c), apply())) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
