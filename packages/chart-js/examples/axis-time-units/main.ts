// Website visits over 18 months: time.unit and displayFormats decide the tick labels
import type { TimeUnit } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, alpha, days, seeded } from '../../shared/data.ts';

type Unit = Extract<TimeUnit, 'week' | 'month' | 'quarter' | 'year'>;
const UNITS: Unit[] = ['week', 'month', 'quarter', 'year'];
const FORMATS = ['MMM yyyy', 'MM/yyyy', 'MMMM', 'yyyy-MM'] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const rand = seeded(11);
  let visits = 300;
  const data = days(548, '2025-01-01')
    .filter((_, i) => i % 7 === 0)
    .map((x) => ({ x, y: Math.round((visits += (rand() - 0.4) * 60)) }));

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      datasets: [{ label: 'Visits per week', data, borderColor: C.blue, backgroundColor: alpha(C.blue, 0.2), fill: true, pointRadius: 0 }],
    },
    options: {
      maintainAspectRatio: false,
      scales: { x: { type: 'time', time: { unit: 'month', tooltipFormat: 'EEE d MMM yyyy' } } },
      plugins: { legend: { display: false } },
    },
  });

  const now = { unit: 'month' as Unit, format: 'MMM yyyy' as string };
  // time.md § Time Units and § Display Formats: unit forces the step, and the format
  // string for that unit (here the adapter's own tokens) shapes each label.
  const apply = (): void => {
    chart.options.scales!.x = {
      type: 'time',
      time: {
        unit: now.unit,
        displayFormats: { week: 'd MMM', month: now.format, quarter: now.format, year: 'yyyy' },
        tooltipFormat: 'EEE d MMM yyyy',
      },
    };
    chart.update();
    label.textContent = `unit: '${now.unit}' · ${now.unit === 'week' ? 'd MMM' : now.unit === 'year' ? 'yyyy' : now.format}`;
  };
  apply();

  if (bar) {
    select(bar, 'time.unit', UNITS, now.unit, (v) => {
      now.unit = v;
      apply();
    });
    select(bar, 'month and quarter format', FORMATS, 'MMM yyyy', (v) => {
      now.format = v;
      apply();
    });
  }
  const stop = ctx.preview
    ? cycle(UNITS, 2200, (u) => {
        now.unit = u;
        apply();
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
