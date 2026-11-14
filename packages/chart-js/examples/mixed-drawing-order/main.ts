// Which dataset is drawn on top: the order option, here for bars and a filled line
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { C, WEEKDAYS, alpha } from '../../shared/data.ts';

const VISITORS = [120, 145, 160, 210, 260, 340, 300];
const TARGET = [140, 150, 150, 220, 250, 300, 280];

// [bar order, line order]: a higher number is drawn first, so lower numbers sit on top.
const STATES: [number, number][] = [
  [0, 1],
  [2, 1],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    data: {
      labels: WEEKDAYS,
      datasets: [
        { type: 'bar', label: 'Visitors', data: VISITORS, backgroundColor: alpha(C.blue, 0.85), order: 0 },
        {
          type: 'line',
          label: 'Target',
          data: TARGET,
          fill: true,
          borderColor: C.amber,
          backgroundColor: alpha(C.amber, 0.7),
          borderWidth: 3,
          pointRadius: 0,
          tension: 0.3,
          order: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true } },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  const setOrder = (barOrder: number, lineOrder: number): void => {
    chart.data.datasets[0]!.order = barOrder;
    chart.data.datasets[1]!.order = lineOrder;
    chart.update();
    label.textContent = `bars order: ${barOrder}, line order: ${lineOrder}`;
  };
  setOrder(0, 1);

  if (bar) {
    const now = { bars: 0, line: 1 };
    slider(bar, 'Bars: order', [0, 3, 1], now.bars, (v) => {
      now.bars = v;
      setOrder(now.bars, now.line);
    });
    slider(bar, 'Line: order', [0, 3, 1], now.line, (v) => {
      now.line = v;
      setOrder(now.bars, now.line);
    });
  }
  const stop = ctx.preview ? cycle(STATES, 2400, ([b, l]) => setOrder(b, l)) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
