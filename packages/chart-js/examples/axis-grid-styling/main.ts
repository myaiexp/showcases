// Restyle grid lines: colour, width, tick marks, drawing across the chart
import type { CartesianScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider, toggle } from '../../shared/controls.ts';
import { C, MONTHS } from '../../shared/data.ts';
import { CITY_WEATHER } from '../../shared/axes-data.ts';

interface Grid {
  color: string;
  lineWidth: number;
  tickLength: number;
  drawOnChartArea: boolean;
  drawTicks: boolean;
}
const STATES: Grid[] = [
  { color: 'rgba(250, 250, 250, 0.09)', lineWidth: 1, tickLength: 8, drawOnChartArea: true, drawTicks: true },
  { color: C.blue, lineWidth: 2, tickLength: 8, drawOnChartArea: true, drawTicks: true },
  { color: C.amber, lineWidth: 1, tickLength: 20, drawOnChartArea: false, drawTicks: true },
  { color: C.pink, lineWidth: 1, tickLength: 8, drawOnChartArea: true, drawTicks: false },
];
const COLORS: Record<string, string> = { default: STATES[0]!.color, blue: C.blue, amber: C.amber, pink: C.pink };

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [{ label: 'Mean temperature (°C)', data: CITY_WEATHER.Lisbon!.temp, borderColor: C.green, backgroundColor: C.green, tension: 0.3 }],
    },
    options: {
      maintainAspectRatio: false,
      scales: { x: { grid: {} }, y: { grid: {} } },
      plugins: { legend: { display: false } },
    },
  });
  const axes = (): CartesianScaleOptions[] => [chart.options.scales!.x, chart.options.scales!.y] as CartesianScaleOptions[];

  // axes/styling.md § Grid Line Configuration, applied to both axes.
  const apply = (g: Grid): void => {
    for (const axis of axes()) Object.assign(axis.grid, g, { tickColor: g.color });
    chart.update();
    label.textContent = `lineWidth ${g.lineWidth} · tickLength ${g.tickLength} · ${g.drawOnChartArea ? 'on' : 'off'}`;
  };
  apply(STATES[0]!);

  if (bar) {
    const now: Grid = { ...STATES[0]! };
    select(bar, 'color', Object.keys(COLORS), 'default', (v) => ((now.color = COLORS[v]!), apply(now)));
    slider(bar, 'lineWidth', [1, 6, 1], now.lineWidth, (v) => ((now.lineWidth = v), apply(now)));
    slider(bar, 'tickLength', [0, 30, 1], now.tickLength, (v) => ((now.tickLength = v), apply(now)));
    toggle(bar, 'drawOnChartArea', true, (v) => ((now.drawOnChartArea = v), apply(now)));
    toggle(bar, 'drawTicks', true, (v) => ((now.drawTicks = v), apply(now)));
  }
  const stop = ctx.preview ? cycle(STATES, 2200, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
