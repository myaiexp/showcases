// A path shape whose xref and yref are arrays: one axis per coordinate of the path
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  // Each coordinate pair maps to the matching entry of xref and yref, in order:
  // M 2.5 1.5 on x/y, L tip on x2/y2, L 2.5 2.5 on x/y.
  const path = (tip: number): string => `M 2.5 1.5 L ${tip} 2 L 2.5 2.5`;

  await Plotly.newPlot(
    stage.div,
    [
      { x: [1, 2, 3], y: [1, 2, 3], mode: 'markers', marker: { size: 9 }, xaxis: 'x', yaxis: 'y' },
      { x: [1, 2, 3], y: [3, 2, 1], mode: 'markers', marker: { size: 9 }, xaxis: 'x2', yaxis: 'y2' },
    ],
    {
      template: stage.template,
      grid: { rows: 1, columns: 2, pattern: 'independent' },
      shapes: [{ type: 'path', path: path(1.5), xref: ['x', 'x2', 'x'], yref: ['y', 'y2', 'y'], line: { color: '#c084fc', width: 3 } }],
      showlegend: false,
    } as Partial<Layout>,
    stage.config,
  );
  const tip = (v: number): Promise<void> => relayout(stage.div, { 'shapes[0].path': path(v) });
  if (stage.bar) slider(stage.bar, 'x of the tip (on subplot 2)', [0.5, 3.5, 0.05], 1.5, (v) => void tip(v));
  if (stage.preview) stage.every(100, (i) => void tip(2 + Math.sin(i / 10)));
  return () => stage.dispose();
};

export default mount;
