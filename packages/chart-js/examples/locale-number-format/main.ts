// Revenue and conversion on two axes, written the way each locale writes
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';

const LOCALES = ['en-US', 'de-DE', 'fi-FI', 'hi-IN', 'ar-EG'] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: MONTHS.slice(0, 6),
      datasets: [
        { label: 'Revenue (€)', order: 1, data: [1_250_000, 1_420_000, 1_380_000, 1_710_000, 1_890_000, 2_240_000], backgroundColor: alpha(C.blue, 0.6), borderColor: C.blue, borderWidth: 1, yAxisID: 'y' },
        { type: 'line', order: 0, label: 'Conversion (%)', data: [2.5, 2.75, 2.6, 3.25, 3.5, 4.25], borderColor: C.amber, backgroundColor: C.amber, yAxisID: 'y1' },
      ],
    },
    options: {
      maintainAspectRatio: false,
      locale: 'en-US',
      scales: {
        y: { position: 'left' },
        y1: { position: 'right', min: 2, max: 4.5, ticks: { stepSize: 0.5 }, grid: { drawOnChartArea: false } },
      },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  // locale.md: one option, a BCP 47 tag; ticks (and tooltips) use Intl.NumberFormat.
  const apply = (locale: string): void => {
    chart.options.locale = locale;
    chart.update();
    label.textContent = `locale: '${locale}' · ${new Intl.NumberFormat(locale).format(1234567.5)}`;
  };
  apply('en-US');

  if (bar) select(bar, 'locale', LOCALES, 'en-US', apply);
  const stop = ctx.preview ? cycle(LOCALES, 1700, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
