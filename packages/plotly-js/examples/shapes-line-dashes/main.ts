// line shapes with line.dash and line.width
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { pick, relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const DASHES = ['solid', 'dot', 'dash', 'longdash', 'dashdot', 'longdashdot', '5px,10px,2px,2px'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  await Plotly.newPlot(
    stage.div,
    [{ x: [2, 3.5, 6], y: [1, 1.5, 1], text: ['Vertical Line', 'Horizontal Dashed Line', 'Diagonal dotted Line'], mode: 'text', textfont: { size: stage.preview ? 8 : 12 } }],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Vertical and Horizontal Lines Positioned Relative to the Axes' },
      xaxis: { range: [0, 7] },
      yaxis: { range: [0, 2.5] },
      shapes: [
        { type: 'line', x0: 1, y0: 0, x1: 1, y1: 2, line: { color: 'rgb(55, 128, 191)', width: 3 } },
        { type: 'line', x0: 2, y0: 2, x1: 5, y1: 2, line: { color: 'rgb(50, 171, 96)', width: 4, dash: 'dashdot' } },
        { type: 'line', x0: 4, y0: 0, x1: 6, y1: 2, line: { color: 'rgb(200, 100, 200)', width: 4, dash: 'dot' } },
      ],
    },
    stage.config,
  );
  if (stage.bar) {
    select(stage.bar, 'horizontal line dash', DASHES, 'dashdot', (v) => void relayout(stage.div, { 'shapes[1].line.dash': v }));
    select(stage.bar, 'diagonal line dash', DASHES, 'dot', (v) => void relayout(stage.div, { 'shapes[2].line.dash': v }));
    slider(stage.bar, 'line width', [1, 12, 1], 4, (v) => void relayout(stage.div, { 'shapes[1].line.width': v, 'shapes[2].line.width': v }));
  }
  if (stage.preview) stage.every(900, (i) => void relayout(stage.div, { 'shapes[1].line.dash': pick(DASHES, i), 'shapes[2].line.dash': pick(DASHES, i + 3), 'shapes[0].line.width': 2 + (i % 4) * 2 }));
  return () => stage.dispose();
};

export default mount;
