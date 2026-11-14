// A heading above the legend entries, set with legend.title
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider, toggle } from '../../shared/controls.ts';
import { C } from '../../shared/data.ts';
import { drinkLines, SALES_MONTHS } from '../../shared/config-data.ts';

const TEXTS = ['Cups sold, by drink', 'Drink', 'Menu'] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el, 'legend.title.display: true');

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: { labels: SALES_MONTHS, datasets: drinkLines(3) },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          // legend.md § Legend Title Configuration.
          title: { display: true, text: TEXTS[0], color: C.amber, font: { size: 13, weight: 'bold' }, padding: { bottom: 6 } },
        },
      },
    },
  });

  const title = chart.options.plugins!.legend!.title!;
  const set = (patch: Partial<typeof title>): void => {
    Object.assign(title, patch);
    chart.update();
  };

  if (bar) {
    toggle(bar, 'display', true, (v) => set({ display: v }));
    select(bar, 'text', TEXTS, TEXTS[0], (v) => set({ text: v }));
    slider(bar, 'font size', [9, 22, 1], 13, (v) => set({ font: { size: v, weight: 'bold' } }));
  }
  const stop = ctx.preview
    ? cycle([true, false], 2000, (on) => {
        note.textContent = `legend.title.display: ${on}`;
        set({ display: on });
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
