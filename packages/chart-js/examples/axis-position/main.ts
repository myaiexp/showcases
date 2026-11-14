// Price change vs. sales change: axes at the edge, centre, or crossing at zero
import type { CartesianScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

type Pos = CartesianScaleOptions['position'];
const X_POS = { bottom: 'bottom', top: 'top', center: 'center', 'y = 0': { y: 0 } } as const;
const Y_POS = { left: 'left', right: 'right', center: 'center', 'x = 0': { x: 0 } } as const;
type XName = keyof typeof X_POS;
type YName = keyof typeof Y_POS;

const STATES: [XName, YName][] = [
  ['bottom', 'left'],
  ['top', 'right'],
  ['center', 'center'],
  ['y = 0', 'x = 0'],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Products',
          data: [
            { x: -12, y: 14 }, { x: -8, y: 6 }, { x: -3, y: 9 }, { x: -6, y: -4 }, { x: 4, y: -8 },
            { x: 9, y: -12 }, { x: 12, y: -5 }, { x: 6, y: 3 }, { x: -10, y: -9 }, { x: 2, y: 11 },
          ],
          backgroundColor: alpha(C.cyan, 0.8),
          pointRadius: 5,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: { min: -15, max: 15, title: { display: true, text: 'Price change (%)' } },
        y: { min: -15, max: 15, title: { display: true, text: 'Sales change (%)' } },
      },
      plugins: { legend: { display: false } },
    },
  });
  const x = (): CartesianScaleOptions => chart.options.scales!.x as CartesianScaleOptions;
  const y = (): CartesianScaleOptions => chart.options.scales!.y as CartesianScaleOptions;

  // axes/cartesian/index.md § Axis Position: an edge, 'center', or {axisId: value}.
  const apply = ([xn, yn]: [XName, YName]): void => {
    x().position = X_POS[xn] as Pos;
    y().position = Y_POS[yn] as Pos;
    chart.update();
    label.textContent = `x: ${JSON.stringify(X_POS[xn])}`.replace(/"/g, "'") + ` · y: ${JSON.stringify(Y_POS[yn])}`.replace(/"/g, "'");
  };
  apply(STATES[0]!);

  if (bar) {
    const now: [XName, YName] = [...STATES[0]!];
    select(bar, 'x axis position', Object.keys(X_POS) as XName[], now[0], (v) => {
      now[0] = v;
      apply(now);
    });
    select(bar, 'y axis position', Object.keys(Y_POS) as YName[], now[1], (v) => {
      now[1] = v;
      apply(now);
    });
  }
  const stop = ctx.preview ? cycle(STATES, 2200, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
