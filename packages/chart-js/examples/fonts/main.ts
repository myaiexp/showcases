// Chart.defaults.font restyles all chart text; a specific font still wins
import type { FontSpec } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider, toggle } from '../../shared/controls.ts';
import { C, WEEKDAYS, alpha } from '../../shared/data.ts';

interface Look {
  size: number;
  family: string;
  weight: 'normal' | 'bold';
  style: 'normal' | 'italic';
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  const saved: Partial<FontSpec> = { ...Chart.defaults.font };
  const base = String(saved.family);
  const look: Look = { size: 12, family: base, weight: 'normal', style: 'normal' };
  let legendOwn = true;

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: WEEKDAYS,
      datasets: [{ label: 'Cups sold', data: [42, 38, 51, 47, 66, 89, 73], backgroundColor: alpha(C.cyan, 0.6), borderColor: C.cyan, borderWidth: 1 }],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: 'Cups sold per weekday' },
        // A more specific font option beats Chart.defaults.font (fonts.md).
        legend: { display: !ctx.preview, labels: { font: { size: 14 } } },
      },
    },
  });

  const apply = (): void => {
    if (ctx.preview) {
      // Cards share the page, so a card must not touch Chart.defaults: it sets the same
      // font on each text element of its own chart instead.
      const o = chart.options;
      const font = { ...look };
      o.scales!.x!.ticks!.font = font;
      o.scales!.y!.ticks!.font = font;
      o.plugins!.title!.font = { ...font, weight: 'bold' };
    } else {
      Object.assign(Chart.defaults.font, look); // page-wide: restored in the cleanup
      chart.options.plugins!.legend!.labels!.font = legendOwn ? { size: 14 } : undefined;
    }
    chart.update();
    label.textContent = `font: ${look.size}px ${look.style} ${look.weight}`;
  };
  apply();

  if (bar) {
    slider(bar, 'font.size', [8, 28, 1], look.size, (v) => ((look.size = v), apply()));
    select(bar, 'font.family', ['gallery default', 'Georgia, serif', 'ui-monospace, monospace'], 'gallery default', (v) => {
      look.family = v === 'gallery default' ? base : v;
      apply();
    });
    select(bar, 'font.weight', ['normal', 'bold'] as const, look.weight, (v) => ((look.weight = v), apply()));
    select(bar, 'font.style', ['normal', 'italic'] as const, look.style, (v) => ((look.style = v), apply()));
    toggle(bar, 'legend sets its own size (14)', legendOwn, (v) => ((legendOwn = v), apply()));
  }
  const stop = ctx.preview
    ? cycle([16, 20, 10, 12], 1800, (size) => {
        look.size = size;
        look.weight = size === 20 ? 'bold' : 'normal';
        look.family = size === 10 ? 'ui-monospace, monospace' : base;
        apply();
      })
    : () => {};

  return () => {
    stop();
    Object.assign(Chart.defaults.font, saved);
    stage.release(chart);
  };
};

export default mount;
