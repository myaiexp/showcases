// Tooltips pinned to the top edge or the corner, through your own positioner
import { Tooltip } from 'chart.js';
import type { ChartType, TooltipPositionerFunction } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { autoHover } from '../../shared/hover.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { drinkBars, SALES_MONTHS } from '../../shared/config-data.ts';

// tooltip.md § Custom Position Modes. TypeScript needs the new names declared.
declare module 'chart.js' {
  interface TooltipPositionerMap {
    showcaseTopEdge: TooltipPositionerFunction<ChartType>;
    showcaseCorner: TooltipPositionerFunction<ChartType>;
  }
}

// Tooltip.positioners is page-wide, so the names are unique to this gallery and stay registered.
Tooltip.positioners.showcaseTopEdge = function (items) {
  // Straight above the hovered bars, hanging from the top edge of the plot.
  const x = items.reduce((t, i) => t + i.element.x, 0) / items.length;
  return { x, y: this.chart.chartArea.top, yAlign: 'top' };
};
Tooltip.positioners.showcaseCorner = function () {
  const { right, top } = this.chart.chartArea;
  return { x: right, y: top, xAlign: 'right', yAlign: 'top' };
};

const POSITIONS = ['average', 'nearest', 'showcaseTopEdge', 'showcaseCorner'] as const;
type Where = (typeof POSITIONS)[number];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el, "position: 'average'");

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: { labels: SALES_MONTHS, datasets: drinkBars(2) },
    options: {
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, max: 800 } },
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { display: !ctx.preview }, tooltip: { position: 'average' } },
    },
  });

  const apply = (position: Where): void => {
    chart.options.plugins!.tooltip!.position = position;
    note.textContent = `position: '${position}'`;
    chart.update();
  };

  if (bar) select(bar, 'tooltip.position', POSITIONS, 'average', apply);
  const stopLook = ctx.preview ? cycle(POSITIONS, 3000, apply) : () => {};
  const stopHover = ctx.preview
    ? autoHover(chart, 1000, (s) => [0, 1].map((datasetIndex) => ({ datasetIndex, index: (s + 1) % 6 })))
    : () => {};

  return () => {
    stopLook();
    stopHover();
    stage.release(chart);
  };
};

export default mount;
