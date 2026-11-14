// Changing options later: edit in place, replace, swap an axis
import type { ChartOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { button, controlBar } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el, 'new chart');
  let titleCount = 0;

  // A subscriber count that doubles roughly every month: hard to read on a linear axis.
  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: MONTHS.slice(0, 9),
      datasets: [
        {
          label: 'Newsletter subscribers',
          data: [12, 26, 51, 110, 205, 430, 880, 1700, 3500],
          borderColor: C.green,
          backgroundColor: alpha(C.green, 0.3),
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { type: 'linear' } },
      plugins: {
        legend: { position: 'bottom' },
        title: { display: true, text: 'Subscriber growth' },
      },
    },
  });

  // updates.md § Updating Options. Mutating keeps everything else, even what Chart.js computed.
  const mutateTitle = (): void => {
    chart.options.plugins!.title!.text = `Subscriber growth (edit ${++titleCount})`;
    chart.update();
    note.textContent = ctx.preview ? 'title.text = … · legend stays' : 'options.plugins.title.text = … (legend stays at the bottom)';
  };
  // A new object is a brand new set of options: the bottom legend is gone.
  const replaceOptions = (): void => {
    chart.options = {
      maintainAspectRatio: false,
      plugins: { title: { display: true, text: 'Options replaced' } },
    } as ChartOptions<'line'>;
    chart.update();
    note.textContent = ctx.preview ? 'chart.options = {…} · legend on top' : 'chart.options = { … } (the bottom legend is gone)';
  };
  // One scale can be swapped on its own, by id.
  const setAxis = (type: 'linear' | 'logarithmic'): void => {
    chart.options.scales!.y = { type };
    chart.update();
    note.textContent = `options.scales.y = { type: '${type}' }`;
  };

  const steps: readonly (() => void)[] = [mutateTitle, () => setAxis('logarithmic'), replaceOptions, () => setAxis('linear')];
  if (bar) {
    button(bar, 'Edit title (mutate)', mutateTitle);
    button(bar, 'Replace options object', replaceOptions);
    button(bar, 'y: logarithmic', () => setAxis('logarithmic'));
    button(bar, 'y: linear', () => setAxis('linear'));
  }
  const stop = ctx.preview ? cycle(steps, 2600, (s) => s()) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
