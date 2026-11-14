// Same chart, different tick labels: ticks.callback adds money, percent or units
import { Ticks, type Scale, type Tick } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, WEEKDAYS } from '../../shared/data.ts';

type Callback = (this: Scale, value: number | string, index: number, ticks: Tick[]) => string | null;
interface Format {
  label: string;
  data: number[];
  color: string;
  shows: string;
  callback: Callback;
}
// labelling.md § Creating Custom Tick Formats: the callback gets the tick value and
// returns the text; `this` is the scale, so the default formatter can be reused.
const FORMATS: Record<string, Format> = {
  money: { label: 'Takings', data: [840, 920, 760, 1150, 1480, 2210, 1730], color: C.green, shows: "'€' + value", callback: (v) => `€${v}` },
  percent: { label: 'Battery', data: [100, 82, 71, 55, 38, 24, 9], color: C.amber, shows: "value + '%'", callback: (v) => `${v}%` },
  units: {
    label: 'Luggage weight',
    data: [12, 18, 7, 22, 15, 9, 20],
    color: C.cyan,
    shows: "default formatter + ' kg'",
    callback(v, i, ticks) {
      return `${Ticks.formatters.numeric.apply(this, [Number(v), i, ticks])} kg`;
    },
  },
  hidden: {
    label: 'Daily steps',
    data: [4200, 8100, 6500, 9800, 7300, 12100, 5200],
    color: C.purple,
    shows: 'null hides odd ticks',
    callback: (v, i) => (i % 2 === 0 ? `${Number(v) / 1000}k` : null),
  },
};
const NAMES = Object.keys(FORMATS);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const first = FORMATS.money!;
  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: WEEKDAYS,
      datasets: [{ label: first.label, data: first.data, borderColor: first.color, backgroundColor: first.color, tension: 0.25 }],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: { ticks: { callback: first.callback } },
        // On the category x axis the value is an index: getLabelForValue maps it back.
        x: {
          ticks: {
            callback(value) {
              return String(this.getLabelForValue(Number(value))).toUpperCase();
            },
          },
        },
      },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  const apply = (name: string): void => {
    const f = FORMATS[name]!;
    const ds = chart.data.datasets[0]!;
    ds.label = f.label;
    ds.data = f.data;
    ds.borderColor = f.color;
    ds.backgroundColor = f.color;
    chart.options.scales!.y!.ticks!.callback = f.callback;
    chart.update();
    label.textContent = f.shows;
  };
  apply('money');

  if (bar) select(bar, 'Tick format', NAMES, 'money', apply);
  const stop = ctx.preview ? cycle(NAMES, 2400, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
