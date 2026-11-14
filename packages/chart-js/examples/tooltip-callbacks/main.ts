// Own tooltip wording: a title, lines with units, a total, a footnote
import type { TooltipItem } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage } from '../../shared/stage.ts';
import { autoHover } from '../../shared/hover.ts';
import { controlBar, toggle } from '../../shared/controls.ts';
import { drinkLines, SALES_MONTHS } from '../../shared/config-data.ts';

type Item = TooltipItem<'line'>;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el);

  const total = (items: Item[]): number => items.reduce((t, i) => t + (i.parsed.y ?? 0), 0);
  // tooltip.md § Tooltip Callbacks: each callback returns the text (or lines) for its part.
  const custom = {
    title: (items: Item[]) => `Sales in ${items[0]?.label ?? ''} 2026`,
    label: (item: Item) => `${item.dataset.label}: ${item.parsed.y} cups`,
    afterBody: (items: Item[]) => {
      const top = items.reduce((a, b) => ((b.parsed.y ?? 0) > (a.parsed.y ?? 0) ? b : a));
      return `Best seller: ${top.dataset.label}`;
    },
    footer: (items: Item[]) => `Total: ${total(items)} cups`,
  };
  const flags = { title: true, label: true, afterBody: true, footer: true };

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: { labels: SALES_MONTHS, datasets: drinkLines(3) },
    options: {
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { display: !ctx.preview }, tooltip: { callbacks: custom } },
    },
  });

  // Leaving a callback out keeps Chart.js's own text for that part.
  const apply = (): void => {
    const callbacks: Record<string, unknown> = {};
    for (const key of Object.keys(flags) as (keyof typeof flags)[]) if (flags[key]) callbacks[key] = custom[key];
    chart.options.plugins!.tooltip!.callbacks = callbacks;
  };

  if (bar) {
    for (const key of Object.keys(flags) as (keyof typeof flags)[]) {
      toggle(bar, key, true, (v) => {
        flags[key] = v;
        apply();
        chart.update();
      });
    }
  }
  // Cards alternate between the stock tooltip and the custom one.
  const stop = ctx.preview
    ? autoHover(chart, 1300, (s) => {
        const on = s % 6 >= 3;
        flags.title = flags.label = flags.afterBody = flags.footer = on;
        apply();
        note.textContent = on ? 'callbacks: title, label, footer' : 'callbacks: none (stock text)';
        return [0, 1, 2].map((datasetIndex) => ({ datasetIndex, index: (s * 2 + 1) % 6 }));
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
