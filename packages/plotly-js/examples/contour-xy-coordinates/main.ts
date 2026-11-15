// Where contour values sit on the axes: default index, dx/x0 spacing, or explicit x and y
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { basicZ } from '../../shared/sci-data.ts';
import { createStage } from '../../shared/stage.ts';

const modes = ['index (default)', 'x0, dx, y0, dy', 'x and y arrays'] as const;
type Mode = (typeof modes)[number];

/** The trace attributes for each way of placing the grid; unused ones are cleared with null. */
function placement(mode: Mode): Record<string, unknown> {
  const clear = { x: [null], y: [null], x0: [null], dx: [null], y0: [null], dy: [null] };
  if (mode === 'x0, dx, y0, dy') return { ...clear, x0: [5], dx: [10], y0: [10], dy: [10] };
  if (mode === 'x and y arrays') return { ...clear, x: [[-9, -6, -5, -3, -1]], y: [[0, 1, 4, 5, 7]] };
  return clear;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });

  await Plotly.newPlot(
    stage.div,
    [{ z: basicZ, type: 'contour', colorscale: 'Jet', x0: 5, dx: 10, y0: 10, dy: 10 }],
    { template: stage.template, title: { text: stage.preview ? '' : 'Setting the x and y coordinates of a contour plot' } },
    stage.config,
  );

  const apply = (mode: Mode): void => void restyle(stage.div, placement(mode), [0]);
  if (stage.bar) select(stage.bar, 'placement', modes, 'x0, dx, y0, dy', apply);
  else stage.every(1500, (i) => apply(pick(modes, i)));

  return () => stage.dispose();
};

export default mount;
