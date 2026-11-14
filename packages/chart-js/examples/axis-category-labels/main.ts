// Monthly rainfall on a category axis: min and max name the labels to zoom into
import type { CategoryScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';
import { CITY_WEATHER } from '../../shared/axes-data.ts';

// [min, max] label names; the card walks through them.
const WINDOWS: [string, string][] = [
  ['Jan', 'Dec'],
  ['Mar', 'Aug'],
  ['Jun', 'Sep'],
  ['Oct', 'Dec'],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: MONTHS,
      datasets: [
        {
          label: 'Rainfall (mm)',
          data: CITY_WEATHER.Helsinki!.rain,
          backgroundColor: alpha(C.blue, 0.6),
          borderColor: C.blue,
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      // category.md § Min Max Configuration: min and max are label names (or indices).
      scales: { x: { type: 'category', min: 'Jan', max: 'Dec' } },
      plugins: { legend: { display: false } },
    },
  });
  const x = (): CategoryScaleOptions => chart.options.scales!.x as CategoryScaleOptions;

  const apply = ([min, max]: [string, string]): void => {
    x().min = min;
    x().max = max;
    chart.update();
    label.textContent = `min: '${min}', max: '${max}'`;
  };
  apply(WINDOWS[0]!);

  if (bar) {
    const now: [string, string] = [...WINDOWS[0]!];
    const set = (i: 0 | 1, v: string): void => {
      now[i] = v;
      // Keep the window the right way round.
      if (MONTHS.indexOf(now[0]) > MONTHS.indexOf(now[1])) now[1 - i] = v;
      minSel.value = now[0];
      maxSel.value = now[1];
      apply(now);
    };
    const minSel = select(bar, 'min', MONTHS, 'Jan', (v) => set(0, v));
    const maxSel = select(bar, 'max', MONTHS, 'Dec', (v) => set(1, v));
  }
  const stop = ctx.preview ? cycle(WINDOWS, 2200, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
