// Two players' skills on one radar: the shape of each profile shows strengths and gaps
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';
import { PLAYERS, SKILL_LABELS } from '../../shared/round-charts-data.ts';

const RIVALS = ['Ben', 'Caro', 'Dev'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'radar',
    data: {
      labels: SKILL_LABELS,
      datasets: [
        {
          label: 'Ava',
          data: PLAYERS.Ava!,
          fill: true,
          backgroundColor: alpha(C.blue, 0.25),
          borderColor: C.blue,
          pointBackgroundColor: C.blue,
        },
        {
          label: 'Ben',
          data: PLAYERS.Ben!,
          fill: true,
          backgroundColor: alpha(C.amber, 0.25),
          borderColor: C.amber,
          pointBackgroundColor: C.amber,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      // One radial scale (scales.r) holds every axis; fix it so profiles compare fairly.
      scales: { r: { min: 0, max: 100, ticks: { display: !ctx.preview, stepSize: 25 } } },
      plugins: { legend: { display: !ctx.preview, position: 'right' } },
    },
  });

  const compareWith = (name: string): void => {
    const ds = chart.data.datasets[1]!;
    ds.label = name;
    ds.data = PLAYERS[name]!;
    chart.update();
    label.textContent = `Ava vs ${name}`;
  };
  compareWith('Ben');

  if (bar) select(bar, 'Compare Ava with', RIVALS, 'Ben', compareWith);
  const stop = ctx.preview ? cycle(RIVALS, 2200, compareWith) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
