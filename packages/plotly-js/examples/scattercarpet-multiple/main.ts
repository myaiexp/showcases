// Seven carpet-scatter traces: constant-b rows, constant-a splines and per-point marker styling
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const row = (b: number) => ({ type: 'scattercarpet' as const, name: `b = ${b}`, a: [0.05, 0.15, 0.25, 0.35], b: [b, b, b, b] });
  const col = (a: number, extra: object = {}) => ({
    type: 'scattercarpet' as const,
    name: `a = ${a}`,
    a: [a, a, a, a],
    b: [0.5, 1.5, 2.5, 3.5],
    line: { smoothing: 1, shape: 'spline' as const },
    ...extra,
  });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'carpet',
        a: [0.1, 0.2, 0.3],
        b: [1, 2, 3],
        y: [
          [1, 2.2, 3],
          [1.5, 2.7, 3.5],
          [1.7, 2.9, 3.7],
        ],
        cheaterslope: 1,
        aaxis: { title: { text: 'a' }, tickmode: 'linear', dtick: 0.05, minorgridcount: 9 },
        baxis: { title: { text: 'b' }, tickmode: 'linear', dtick: 0.5, minorgridcount: 9 },
      },
      row(1.5),
      row(2),
      row(2.5),
      col(0.15),
      // per-point marker size and colour
      col(0.2, { marker: { size: [10, 20, 30, 40], color: ['#000', '#f00', '#ff0', '#fff'] } }),
      col(0.25),
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'scattercarpet extrapolation, clipping, and smoothing' },
      hovermode: 'closest',
      showlegend: !stage.preview,
    },
    stage.config,
  );

  // Points past the carpet are extrapolated or clipped; stretching the a values shows both.
  const stretch = (k: number): void => void restyle(stage.div, { a: [[0.05 * k, 0.15 * k, 0.25 * k, 0.35 * k]] }, [1, 2, 3]);
  if (stage.bar) slider(stage.bar, 'a scale of the b = rows', [0.5, 2, 0.05], 1, stretch);
  else stage.every(120, (i) => stretch(1.2 + 0.7 * Math.sin(i / 10)));

  return () => stage.dispose();
};

export default mount;
