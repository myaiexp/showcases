// Five ways to call update(): animated, instant, active, mixed, reset
import type { UpdateMode } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { button, controlBar } from '../../shared/controls.ts';
import { C, WEEKDAYS, alpha, numbers, seeded } from '../../shared/data.ts';

type Run = readonly [label: string, run: (chart: Chart<'bar'>) => void];

// api.md § update(mode?) and § reset(): each run is applied right after the figures change.
const RUNS: readonly Run[] = [
  ['update()', (c) => c.update()],
  ["update('none')", (c) => c.update('none')],
  ["update('active')", (c) => c.update('active')],
  ["update(ctx => 'none' for the 2nd dataset)", (c) => c.update((x) => (x.datasetIndex === 1 ? 'none' : undefined) as UpdateMode)],
  ['reset() then update()', (c) => (c.reset(), c.update())],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el, 'pick a call');
  const rand = seeded(12);
  const fresh = (lo: number, hi: number): number[] => numbers(7, lo, hi, rand);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: WEEKDAYS,
      datasets: [
        { label: 'You', data: fresh(40, 100), backgroundColor: alpha(C.blue, 0.7) },
        { label: 'Your friend', data: fresh(40, 100), backgroundColor: alpha(C.amber, 0.7) },
      ],
    },
    options: {
      maintainAspectRatio: false,
      animation: { duration: 900 },
      // 'active' is a transition (animations.md): given a slow one so the difference shows.
      transitions: { active: { animation: { duration: 2200 } } },
      scales: { x: { ticks: { maxRotation: 0 } }, y: { min: 0, max: 120, title: { display: !ctx.preview, text: 'Minutes of exercise' } } },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  const run = ([label, call]: Run): void => {
    for (const d of chart.data.datasets) d.data = fresh(40, 100);
    call(chart);
    note.textContent = `chart.${label}`;
  };

  if (bar) for (const r of RUNS) button(bar, r[0], () => run(r));
  const stop = ctx.preview ? cycle(RUNS, 2600, (r) => run(r)) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
