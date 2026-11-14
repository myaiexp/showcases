// Legend markers: coloured boxes, or the same point shapes the chart draws
import type { PointStyle } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider, toggle } from '../../shared/controls.ts';
import { drinkLines, SALES_MONTHS } from '../../shared/config-data.ts';

// legend.md § Legend Label Configuration; the shapes are listed in elements.md § Point styles.
const STYLES = ['(from the data)', 'circle', 'rect', 'rectRounded', 'rectRot', 'triangle', 'star', 'cross', 'crossRot', 'line', 'dash'] as const;
const SHAPES: readonly PointStyle[] = ['rectRot', 'triangle', 'star'];

const CARD_STATES = [
  { usePointStyle: false, pointStyle: undefined, label: 'usePointStyle: false' },
  { usePointStyle: true, pointStyle: undefined, label: 'usePointStyle: true' },
  { usePointStyle: true, pointStyle: 'rect' as PointStyle, label: "usePointStyle, pointStyle: 'rect'" },
  { usePointStyle: true, pointStyle: 'circle' as PointStyle, label: "usePointStyle, pointStyle: 'circle'" },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el, CARD_STATES[0]!.label);

  // Each line draws its own marker shape, so "from the data" has something to match.
  const datasets = drinkLines(3).map((d, i) => ({ ...d, pointStyle: SHAPES[i], pointRadius: 5, pointHoverRadius: 7 }));
  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: { labels: SALES_MONTHS, datasets },
    options: {
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { usePointStyle: false, boxWidth: ctx.preview ? 24 : 40, padding: ctx.preview ? 8 : 16, font: { size: ctx.preview ? 10 : 12 } } } },
    },
  });

  const labels = chart.options.plugins!.legend!.labels!;
  if (bar) {
    toggle(bar, 'usePointStyle', false, (v) => {
      labels.usePointStyle = v;
      chart.update();
    });
    select(bar, 'pointStyle', STYLES, STYLES[0], (v) => {
      labels.pointStyle = v === '(from the data)' ? undefined : v;
      chart.update();
    });
    slider(bar, 'boxWidth', [8, 60, 1], 40, (v) => {
      labels.boxWidth = v;
      chart.update();
    });
  }
  const stop = ctx.preview
    ? cycle(CARD_STATES, 2200, (s) => {
        labels.usePointStyle = s.usePointStyle;
        labels.pointStyle = s.pointStyle;
        note.textContent = s.label;
        chart.update();
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
