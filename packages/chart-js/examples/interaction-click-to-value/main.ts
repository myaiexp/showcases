// Click anywhere on the chart: pixels become data values, and a new point appears
import { getRelativePosition } from 'chart.js/helpers';
import type { Mount } from '@/types.ts';
import { Chart, createStage, every } from '../../shared/stage.ts';
import { button, controlBar, log } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';
import { ghostCursor } from '../../shared/config-data.ts';

// Hot-day temperature (°C) against ice creams sold.
const START = [
  { x: 14, y: 60 },
  { x: 19, y: 120 },
  { x: 23, y: 210 },
];
// Where the card's pointer clicks, in data values.
const CARD_CLICKS = [
  [16, 90], [18, 105], [21, 170], [25, 255], [27, 290], [29, 340], [31, 330], [33, 380],
] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const write = ctx.preview ? () => {} : log(el, 5);
  const ghost = ghostCursor();

  const chart = new Chart(stage.canvas, {
    type: 'scatter',
    data: {
      datasets: [
        { label: 'Ice creams sold', data: START.map((p) => ({ ...p })), backgroundColor: alpha(C.pink, 0.85), borderColor: C.pink, pointRadius: 6 },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: { min: 10, max: 35, title: { display: !ctx.preview, text: 'Temperature (°C)' } },
        y: { min: 0, max: 400, title: { display: !ctx.preview, text: 'Ice creams sold' } },
      },
      // interactions.md § Converting Events to Data Values.
      onClick: (e) => {
        const at = getRelativePosition(e, chart);
        const { x, y } = chart.scales;
        const area = chart.chartArea;
        if (!x || !y || at.x < area.left || at.x > area.right || at.y < area.top || at.y > area.bottom) return;
        const point = { x: Math.round(x.getValueForPixel(at.x)! * 10) / 10, y: Math.round(y.getValueForPixel(at.y)!) };
        chart.data.datasets[0]!.data.push(point);
        write(`pixel (${Math.round(at.x)}, ${Math.round(at.y)}) -> ${point.x} °C, ${point.y} sold`);
        chart.update();
      },
      plugins: { legend: { display: false } },
    },
    plugins: ctx.preview ? [ghost.plugin] : [],
  });

  const reset = (): void => {
    chart.data.datasets[0]!.data = START.map((p) => ({ ...p }));
    chart.update();
  };
  if (bar) button(bar, 'Clear my points', reset);
  write('Click inside the chart to add a point.');

  let step = 0;
  const stop = ctx.preview
    ? every(900, () => {
        const n = step++ % (CARD_CLICKS.length + 2);
        if (n >= CARD_CLICKS.length) {
          if (n === CARD_CLICKS.length + 1) reset();
          return;
        }
        const [vx, vy] = CARD_CLICKS[n]!;
        ghost.move(chart, chart.scales.x!.getPixelForValue(vx), chart.scales.y!.getPixelForValue(vy), 'click');
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
