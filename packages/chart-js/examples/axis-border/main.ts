// Sleep over a week: the axis border, drawn at the edge where axis meets plot
import type { CartesianScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider, toggle } from '../../shared/controls.ts';
import { C, WEEKDAYS } from '../../shared/data.ts';

interface Border {
  display: boolean;
  color: string;
  width: number;
  dash: number[];
  z: number;
}
const BASE: Border = { display: true, color: 'rgba(250, 250, 250, 0.09)', width: 1, dash: [], z: 0 };
const STATES: Border[] = [
  BASE,
  { ...BASE, display: false },
  { ...BASE, color: C.amber, width: 3 },
  { ...BASE, color: C.pink, width: 2, dash: [6, 4] },
  { ...BASE, color: C.cyan, width: 12, z: 1 },
];
const COLORS: Record<string, string> = { default: BASE.color, amber: C.amber, pink: C.pink, cyan: C.cyan };

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: WEEKDAYS,
      datasets: [{ label: 'Hours slept', data: [6.5, 7, 5.5, 7.5, 6, 9, 8.5], borderColor: C.purple, backgroundColor: C.purple, tension: 0.3 }],
    },
    options: {
      maintainAspectRatio: false,
      // The first point sits on the left border: z > 0 draws the border over the data.
      scales: { x: { offset: false, border: {} }, y: { suggestedMin: 4, border: {} } },
      plugins: { legend: { display: false } },
    },
  });
  const axes = (): CartesianScaleOptions[] => [chart.options.scales!.x, chart.options.scales!.y] as CartesianScaleOptions[];

  // axes/styling.md § Border Configuration.
  const apply = (b: Border): void => {
    for (const axis of axes()) Object.assign(axis.border, b);
    chart.update();
    label.textContent = b.display ? `border: width ${b.width}, dash [${b.dash}], z ${b.z}` : 'border.display: false';
  };
  apply(STATES[0]!);

  if (bar) {
    const now: Border = { ...BASE, color: C.amber, width: 4 };
    apply(now);
    toggle(bar, 'display', true, (v) => ((now.display = v), apply(now)));
    select(bar, 'color', Object.keys(COLORS), 'amber', (v) => ((now.color = COLORS[v]!), apply(now)));
    slider(bar, 'width', [1, 16, 1], now.width, (v) => ((now.width = v), apply(now)));
    select(bar, 'dash', ['solid', 'dashed'] as const, 'solid', (v) => ((now.dash = v === 'solid' ? [] : [6, 4]), apply(now)));
    select(bar, 'z', ['0', '1'] as const, '0', (v) => ((now.z = Number(v)), apply(now)));
  }
  const stop = ctx.preview ? cycle(STATES, 2200, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
