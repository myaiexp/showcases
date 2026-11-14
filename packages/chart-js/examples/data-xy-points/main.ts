// Plant heights on uneven days, as {x, y}, [x, y] or a plain list
import type { ChartData } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

// Day of measurement and height in cm: the days are not evenly spaced.
const DAYS = [0, 1, 3, 7, 14, 21];
const CM = [2, 3, 6, 11, 19, 26];

const FORMATS = {
  'Object[]  {x, y}': { code: 'data: [{x: 0, y: 2}, {x: 1, y: 3}, …]', make: () => DAYS.map((x, i) => ({ x, y: CM[i]! })) },
  'Array[]  [x, y]': { code: 'data: [[0, 2], [1, 3], …]', make: () => DAYS.map((x, i) => [x, CM[i]!]) },
  'Primitive[]  numbers': { code: 'labels: [0, 1, 3, …]  data: [2, 3, …]', make: () => CM },
} as const;
type Format = keyof typeof FORMATS;
const NAMES = Object.keys(FORMATS) as Format[];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  let chart: Chart | null = null;

  const build = (format: Format): void => {
    chart?.destroy();
    const plain = format === 'Primitive[]  numbers';
    const data = {
      // Only the plain list needs labels: pairs carry their own x.
      labels: plain ? DAYS : undefined,
      datasets: [
        {
          label: 'Height (cm)',
          data: FORMATS[format].make(),
          borderColor: C.green,
          backgroundColor: alpha(C.green, 0.6),
          pointRadius: 5,
          tension: 0.25,
        },
      ],
    } as ChartData<'line'>;
    chart = new Chart(stage.canvas, {
      type: 'line',
      data,
      options: {
        maintainAspectRatio: false,
        // A linear x axis places pairs at their real x; the category axis of a plain
        // list spaces the labels evenly.
        scales: {
          x: { type: plain ? 'category' : 'linear', title: { display: !ctx.preview, text: 'Day' } },
          y: { beginAtZero: true },
        },
        plugins: { legend: { display: false } },
      },
    });
    label.textContent = FORMATS[format].code;
  };
  build(NAMES[0]!);

  if (bar) select(bar, 'data format', NAMES, NAMES[0]!, build);
  const stop = ctx.preview ? cycle(NAMES, 2200, (f) => build(f)) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
