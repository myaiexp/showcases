// scatter mode with 'text' and the nine textposition values
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const POSITIONS = ['top left', 'top center', 'top right', 'middle left', 'middle center', 'middle right', 'bottom left', 'bottom center', 'bottom right'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  await Plotly.newPlot(
    stage.div,
    [
      { x: [0, 1, 2], y: [1, 1, 1], mode: 'lines+markers+text', name: 'Lines, Markers and Text', text: ['Text A', 'Text B', 'Text C'], textposition: 'top center', type: 'scatter' },
      { x: [0, 1, 2], y: [2, 2, 2], mode: 'markers+text', name: 'Markers and Text', text: ['Text D', 'Text E', 'Text F'], textposition: 'bottom center', type: 'scatter' },
      { x: [0, 1, 2], y: [3, 3, 3], mode: 'lines+text', name: 'Lines and Text', text: ['Text G', 'Text H', 'Text I'], textposition: 'bottom center', type: 'scatter' },
    ],
    { template: stage.template, showlegend: false, xaxis: { range: [-0.5, 2.5] }, yaxis: { range: [0.2, 3.8] } },
    stage.config,
  );
  if (stage.bar) select(stage.bar, 'textposition (all traces)', POSITIONS, 'top center', (v) => void restyle(stage.div, { textposition: v }));
  if (stage.preview) stage.every(1000, (i) => void restyle(stage.div, { textposition: pick(POSITIONS, i) }));
  return () => stage.dispose();
};

export default mount;
