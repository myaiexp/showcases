// legend.orientation 'h' with x, y and anchors moving the legend
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const ANCHORS = ['auto', 'left', 'center', 'right'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: [0, 3, 6, 4, 5, 2, 3, 5, 4], type: 'scatter', name: 'Plot 1' },
      { x, y: [0, 4, 7, 8, 3, 6, 3, 3, 4], type: 'scatter', name: 'Plot 2' },
      { x, y: [0, 5, 3, 10, 5.33, 2.24, 4.4, 5.1, 7.2], type: 'scatter', name: 'Plot 3' },
    ],
    { template: stage.template, showlegend: true, legend: { orientation: 'h', y: 1.1 }, margin: stage.preview ? { t: 30 } : undefined },
    stage.config,
  );
  if (stage.bar) {
    slider(stage.bar, 'legend.y', [-0.4, 1.2, 0.05], 1.1, (v) => void relayout(stage.div, { 'legend.y': v }));
    slider(stage.bar, 'legend.x', [-0.2, 1.2, 0.05], 0, (v) => void relayout(stage.div, { 'legend.x': v }));
    select(stage.bar, 'legend.xanchor', ANCHORS, 'auto', (v) => void relayout(stage.div, { 'legend.xanchor': v }));
  }
  if (stage.preview) {
    stage.every(1300, (i) => void relayout(stage.div, { 'legend.y': i % 2 ? -0.3 : 1.12, 'legend.x': [0, 0.5, 1][i % 3], 'legend.xanchor': ['left', 'center', 'right'][i % 3] }));
  }
  return () => stage.dispose();
};

export default mount;
