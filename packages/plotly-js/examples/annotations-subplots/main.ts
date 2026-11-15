// annotations with xref 'x2' and yref 'y2' belong to the second subplot's axes
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  await Plotly.newPlot(
    stage.div,
    [
      { x: [1, 2, 3], y: [4, 5, 6], type: 'scatter' },
      { x: [20, 30, 40], y: [50, 60, 70], xaxis: 'x2', yaxis: 'y2', type: 'scatter' },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Subplot Annotations' },
      showlegend: false,
      xaxis: { domain: [0, 0.45] },
      yaxis2: { anchor: 'x2' },
      xaxis2: { domain: [0.55, 1] },
      annotations: [
        { x: 2, y: 5, xref: 'x', yref: 'y', text: 'Annotation A', showarrow: true, arrowhead: 3, ax: -30, ay: -40 },
        { x: 30, y: 60, xref: 'x2', yref: 'y2', text: 'Annotation B', showarrow: true, arrowhead: 2, ax: -25, ay: -40 },
      ],
    },
    stage.config,
  );
  const aim = (x: number): Promise<void> => relayout(stage.div, { 'annotations[1].x': x, 'annotations[1].y': 50 + (x - 20) });
  if (stage.bar) slider(stage.bar, 'Annotation B at x (second subplot)', [20, 40, 1], 30, (v) => void aim(v));
  if (stage.preview) stage.every(100, (i) => void aim(30 + Math.sin(i / 8) * 10));
  return () => stage.dispose();
};

export default mount;
