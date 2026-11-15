// xref and yref 'paper': annotation positions as fractions of the plot area
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { pick, relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const XA = ['right', 'center', 'left'] as const;
const YA = ['bottom', 'middle', 'top'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  await Plotly.newPlot(
    stage.div,
    [{ x: [1, 2, 3], y: [2, 1, 2], marker: { size: 10 } }],
    {
      template: stage.template,
      margin: stage.preview ? { l: 60, r: 60, t: 24, b: 30 } : { l: 100, r: 100, t: 60, b: 70 },
      annotations: [
        { xref: 'paper', yref: 'paper', x: 0, xanchor: 'right', y: 1, yanchor: 'bottom', text: 'X axis label', showarrow: false },
        { xref: 'paper', yref: 'paper', x: 1, xanchor: 'left', y: 0, yanchor: 'top', text: 'Y axis label', showarrow: false },
      ],
    },
    stage.config,
  );
  if (stage.bar) {
    select(stage.bar, 'first xanchor', XA, 'right', (v) => void relayout(stage.div, { 'annotations[0].xanchor': v }));
    select(stage.bar, 'first yanchor', YA, 'bottom', (v) => void relayout(stage.div, { 'annotations[0].yanchor': v }));
    select(stage.bar, 'second xanchor', XA, 'left', (v) => void relayout(stage.div, { 'annotations[1].xanchor': v }));
    select(stage.bar, 'second yanchor', YA, 'top', (v) => void relayout(stage.div, { 'annotations[1].yanchor': v }));
  }
  if (stage.preview) stage.every(1200, (i) => void relayout(stage.div, { 'annotations[0].xanchor': pick(XA, i), 'annotations[0].yanchor': pick(YA, i), 'annotations[1].xanchor': pick(XA, i + 1), 'annotations[1].yanchor': pick(YA, i + 2) }));
  return () => stage.dispose();
};

export default mount;
