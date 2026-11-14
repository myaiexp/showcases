// Clicking a legend entry runs your own handler: link two lines, or solo one
import type { Chart as ChartType, ChartEvent, LegendItem } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, every } from '../../shared/stage.ts';
import { controlBar, log, select } from '../../shared/controls.ts';
import { drinkLines, SALES_MONTHS } from '../../shared/config-data.ts';

type Action = 'default (hide one)' | 'link Espresso and Filter' | 'solo the clicked one';
const ACTIONS: readonly Action[] = ['default (hide one)', 'link Espresso and Filter', 'solo the clicked one'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el);
  const write = ctx.preview ? () => {} : log(el, 5);

  let action: Action = 'link Espresso and Filter';
  let hovered = -1;

  // legend.md § Custom On Click Actions: the handler gets (event, legendItem, legend).
  const onClick = (_e: ChartEvent, item: LegendItem, legend: { chart: ChartType }): void => {
    const chart = legend.chart;
    const index = item.datasetIndex ?? 0;
    const visible = chart.isDatasetVisible(index);
    const all = chart.data.datasets.map((_, i) => i);
    const targets = action === 'link Espresso and Filter' && index < 2 ? [0, 1] : [index];
    if (action === 'solo the clicked one') {
      // Show only the clicked line, or bring everything back when it is already alone.
      const alone = all.every((i) => chart.isDatasetVisible(i) === (i === index));
      for (const i of all) {
        if (alone || i === index) chart.show(i);
        else chart.hide(i);
      }
    } else {
      for (const i of targets) {
        if (visible) chart.hide(i);
        else chart.show(i);
      }
    }
    write(`click: ${item.text} -> ${action}`);
  };

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: { labels: SALES_MONTHS, datasets: drinkLines(3) },
    options: {
      maintainAspectRatio: false,
      scales: { y: { min: 0, max: 700 } },
      plugins: {
        legend: {
          position: 'bottom',
          onClick,
          onHover: (_e, item) => {
            if (item.datasetIndex === hovered) return;
            hovered = item.datasetIndex ?? -1;
            write(`hover: ${item.text}`);
          },
          onLeave: (_e, item) => {
            hovered = -1;
            write(`leave: ${item.text}`);
          },
        },
      },
    },
  });

  if (bar) {
    select(bar, 'A click on the legend does', ACTIONS, action, (v) => {
      action = v;
      for (let i = 0; i < 3; i++) chart.show(i);
    });
  }

  // A card has no pointer: it runs the chart's own legend handler as a click would.
  const clicks = [0, 0, 2, 2];
  let n = 0;
  note.textContent = 'click: Espresso -> hides Filter too';
  const stop = ctx.preview
    ? every(1500, () => {
        const legend = chart.legend;
        const i = clicks[n++ % clicks.length]!;
        const item = legend?.legendItems?.[i];
        if (!legend || !item) return;
        legend.options.onClick.call(legend, new Event('click') as unknown as ChartEvent, item, legend);
        note.textContent = i === 0 ? "click 'Espresso': Filter follows" : "click 'Cold brew': it goes alone";
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
