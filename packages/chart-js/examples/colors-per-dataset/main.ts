// Two weeks of sleep: one shared colour is unreadable, per-dataset is not
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, WEEKDAYS, alpha } from '../../shared/data.ts';

const MODES = ['one colour for everything', 'colour per dataset'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  let chart: Chart<'bar'> | null = null;

  const build = (mode: Mode): void => {
    chart?.destroy();
    const per = mode === 'colour per dataset';
    chart = new Chart(stage.canvas, {
      type: 'bar',
      data: {
        labels: WEEKDAYS,
        datasets: [
          {
            label: 'Last week',
            borderWidth: 1.5,
            data: [7.2, 6.8, 7.5, 6.1, 5.9, 8.4, 8.8],
            // general/colors.md § Per-dataset color settings
            ...(per ? { backgroundColor: alpha(C.blue, 0.55), borderColor: C.blue } : {}),
          },
          {
            label: 'This week',
            borderWidth: 1.5,
            data: [6.4, 7.1, 6.9, 7.4, 6.6, 9.1, 8.2],
            ...(per ? { backgroundColor: alpha(C.pink, 0.55), borderColor: C.pink } : {}),
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        // Without per-dataset colours every bar falls back to the chart-wide colours.
        // Setting them on Chart.defaults does the same for every chart on the page, so
        // this example sets them as chart options instead.
        ...(per ? {} : { backgroundColor: alpha(C.amber, 0.5), borderColor: C.amber }),
        scales: { y: { beginAtZero: true, title: { display: !ctx.preview, text: 'Hours of sleep' } } },
        plugins: { legend: { display: !ctx.preview } },
      },
    });
    label.textContent = per ? 'a colour set on each dataset' : 'one default colour for both';
  };
  build(MODES[0]);

  if (bar) select(bar, 'colours', MODES, MODES[0], build);
  const stop = ctx.preview ? cycle(MODES, 2200, (m) => build(m)) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
