// shapes xref/yref 'x' and 'y' against 'paper': data coordinates or plot fractions
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  await Plotly.newPlot(
    stage.div,
    [{ x: [2, 6], y: [1, 1], text: ['Line positioned relative to the plot', 'Line positioned relative to the axes'], mode: 'text', textfont: { size: stage.preview ? 8 : 12 } }],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Lines Positioned Relative to the Plot & to the Axes' },
      xaxis: { range: [0, 8] },
      yaxis: { range: [0, 2] },
      shapes: [
        { type: 'line', xref: 'x', yref: 'y', x0: 4, y0: 0, x1: 8, y1: 1, line: { color: 'rgb(55, 128, 191)', width: 3 } },
        { type: 'line', xref: 'paper', yref: 'paper', x0: 0, y0: 0, x1: 0.5, y1: 0.5, line: { color: 'rgb(50, 171, 96)', width: 3 } },
      ],
    },
    stage.config,
  );
  const ZOOMS = { 'x 0 to 8': [0, 8], 'x 2 to 4': [2, 4], 'x 5 to 8': [5, 8] } as const;
  const zoom = (k: keyof typeof ZOOMS): Promise<void> => relayout(stage.div, { 'xaxis.range': [...ZOOMS[k]] });
  if (stage.bar) {
    select(stage.bar, 'xaxis.range', Object.keys(ZOOMS) as (keyof typeof ZOOMS)[], 'x 0 to 8', (v) => void zoom(v));
    button(stage.bar, 'reset', () => void zoom('x 0 to 8'));
  }
  if (stage.preview) stage.every(1500, (i) => void zoom((['x 0 to 8', 'x 2 to 4', 'x 5 to 8'] as const)[i % 3] as keyof typeof ZOOMS));
  return () => stage.dispose();
};

export default mount;
