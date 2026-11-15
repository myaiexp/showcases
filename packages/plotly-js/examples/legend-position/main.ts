// legend.x, y, xanchor and yanchor: placing the legend inside or outside the plot
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { pick, relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const PRESETS = {
  'inside (x 1, xanchor right, y 1)': { 'legend.x': 1, 'legend.xanchor': 'right', 'legend.y': 1, 'legend.yanchor': 'auto' },
  'outside (x 1, y 0.5)': { 'legend.x': 1.02, 'legend.xanchor': 'left', 'legend.y': 0.5, 'legend.yanchor': 'auto' },
  'inside bottom left': { 'legend.x': 0.02, 'legend.xanchor': 'left', 'legend.y': 0.02, 'legend.yanchor': 'bottom' },
  'default': { 'legend.x': 1.02, 'legend.xanchor': 'left', 'legend.y': 1, 'legend.yanchor': 'auto' },
} as const;
const NAMES = Object.keys(PRESETS) as (keyof typeof PRESETS)[];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: [0, 3, 6, 4, 5, 2, 3, 5, 4], type: 'scatter' },
      { x, y: [0, 4, 7, 8, 3, 6, 3, 3, 4], type: 'scatter' },
    ],
    { template: stage.template, showlegend: true, legend: { x: 1, xanchor: 'right', y: 1 }, margin: stage.preview ? { r: 60 } : { r: 120 } },
    stage.config,
  );
  if (stage.bar) {
    select(stage.bar, 'preset', NAMES, pick(NAMES, 0), (v) => void relayout(stage.div, PRESETS[v]));
    slider(stage.bar, 'legend.x', [-0.2, 1.4, 0.02], 1, (v) => void relayout(stage.div, { 'legend.x': v }));
    slider(stage.bar, 'legend.y', [-0.2, 1.2, 0.02], 1, (v) => void relayout(stage.div, { 'legend.y': v }));
  }
  if (stage.preview) stage.every(1300, (i) => void relayout(stage.div, PRESETS[pick(NAMES, i)]));
  return () => stage.dispose();
};

export default mount;
