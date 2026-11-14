// Daily visitors for three months: major ticks mark each month start in bold
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, toggle } from '../../shared/controls.ts';
import { C } from '../../shared/data.ts';
import { dailySeries } from '../../shared/axes-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: { datasets: [{ label: 'Visitors per day', data: dailySeries(90), borderColor: C.green, pointRadius: 0, borderWidth: 2 }] },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'time',
          time: { unit: 'day', displayFormats: { day: 'd', month: 'MMM' } },
          ticks: {
            // styling.md § Major Tick Configuration: with major.enabled, ticks that start
            // a month have tick.major set in the scriptable context.
            major: { enabled: false },
            maxRotation: 0,
            font: (c) => (c.tick?.major ? { weight: 'bold', size: 14 } : {}),
            color: (c) => (c.tick?.major ? C.amber : '#a1a1aa'),
          },
        },
      },
      plugins: { legend: { display: false } },
    },
  });

  const apply = (on: boolean): void => {
    chart.options.scales!.x!.ticks!.major!.enabled = on;
    chart.update();
    label.textContent = `ticks.major.enabled: ${on}`;
  };
  apply(true);

  if (bar) toggle(bar, 'ticks.major.enabled', true, apply);
  const stop = ctx.preview ? cycle([false, true], 2400, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
