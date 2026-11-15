// layout.width, height and margin (l, r, t, b, pad) on a graph with autosize off
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 560 });
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  // The docs' mid greys are too bright on a dark page; same idea, two darker greys.
  const colors = { paper_bgcolor: '#3b4252', plot_bgcolor: '#2a303c' };

  await Plotly.newPlot(
    stage.div,
    [{ x, y: x, type: 'scatter' }],
    stage.preview
      ? { template: stage.template, ...colors, margin: { l: 50, r: 50, b: 60, t: 40, pad: 4 } }
      : { template: stage.template, ...colors, autosize: false, width: 500, height: 500, margin: { l: 50, r: 50, b: 100, t: 100, pad: 4 } },
    stage.config,
  );

  if (stage.bar) {
    slider(stage.bar, 'width', [300, 900, 10], 500, (v) => void relayout(stage.div, { width: v }));
    slider(stage.bar, 'height', [300, 540, 10], 500, (v) => void relayout(stage.div, { height: v }));
    for (const side of ['l', 'r', 'b', 't'] as const) slider(stage.bar, `margin.${side}`, [0, 200, 5], side === 'l' || side === 'r' ? 50 : 100, (v) => void relayout(stage.div, { [`margin.${side}`]: v }));
    slider(stage.bar, 'margin.pad', [0, 40, 2], 4, (v) => void relayout(stage.div, { 'margin.pad': v }));
  } else {
    stage.every(120, (i) => {
      const t = i / 10;
      void relayout(stage.div, { 'margin.l': 40 + Math.sin(t) * 30, 'margin.r': 40 + Math.sin(t + 2) * 30, 'margin.t': 30 + Math.sin(t + 4) * 20, 'margin.b': 40 + Math.sin(t + 1) * 25, 'margin.pad': 4 + Math.sin(t) * 4 });
    });
  }
  return () => stage.dispose();
};

export default mount;
