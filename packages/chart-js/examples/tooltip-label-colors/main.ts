// Tooltip markers: coloured boxes with borders, per-line text colours, point shapes
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { autoHover } from '../../shared/hover.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { drinkLines, SALES_MONTHS } from '../../shared/config-data.ts';

const STYLES = ['stock boxes', 'custom boxes', 'coloured text', 'point shapes'] as const;
type Style = (typeof STYLES)[number];
const SHAPES = ['rectRot', 'triangle', 'star'] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el, 'stock boxes');

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: { labels: SALES_MONTHS, datasets: drinkLines(3).map((d) => ({ ...d, pointRadius: 4 })) },
    options: {
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  // tooltip.md § Label Color Callback, labelTextColor and § Label Point Style Callback.
  const apply = (style: Style): void => {
    const tip = chart.options.plugins!.tooltip!;
    note.textContent = style;
    tip.usePointStyle = style === 'point shapes';
    tip.boxWidth = style === 'custom boxes' ? 14 : undefined;
    tip.boxHeight = style === 'custom boxes' ? 14 : undefined;
    tip.callbacks = {
      labelColor: (item) =>
        style === 'custom boxes'
          ? {
              backgroundColor: item.dataset.borderColor as string,
              borderColor: '#ffffff',
              borderWidth: 2,
              borderDash: [2, 2],
              borderRadius: 4,
            }
          : // undefined keeps the stock box
            (undefined as unknown as { borderColor: string; backgroundColor: string }),
      labelTextColor: (item) =>
        style === 'coloured text' ? (item.dataset.borderColor as string) : (undefined as unknown as string),
      labelPointStyle: (item) => ({ pointStyle: SHAPES[item.datasetIndex % SHAPES.length]!, rotation: 0 }),
    };
    chart.update();
  };

  let stopSteps = () => {};
  if (bar) select(bar, 'Tooltip style', STYLES, STYLES[0], apply);
  if (ctx.preview) stopSteps = cycle(STYLES, 2400, apply);
  const stopHover = ctx.preview
    ? autoHover(chart, 1200, (s) => [0, 1, 2].map((datasetIndex) => ({ datasetIndex, index: (s + 2) % 6 })))
    : () => {};

  return () => {
    stopSteps();
    stopHover();
    stage.release(chart);
  };
};

export default mount;
