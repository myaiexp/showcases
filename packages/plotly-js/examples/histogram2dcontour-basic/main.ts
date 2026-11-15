// histogram2dcontour: contour lines of 2D bin counts, ncontours and coloring
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { rng, uniform } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const rand = rng(41);

  await Plotly.newPlot(
    stage.div,
    [{ x: uniform(rand, 500), y: uniform(rand, 500, 1, 1), type: 'histogram2dcontour' }],
    { template: stage.template },
    stage.config,
  );

  if (stage.bar) {
    slider(stage.bar, 'ncontours', [2, 30, 1], 15, (v) => void Plotly.restyle(stage.div, { ncontours: v }));
    select(stage.bar, 'contours.coloring', ['fill', 'heatmap', 'lines', 'none'] as const, 'fill', (v) => void Plotly.restyle(stage.div, { 'contours.coloring': v }));
  } else {
    stage.every(300, (i) => void Plotly.restyle(stage.div, { ncontours: 4 + Math.round(10 * (1 + Math.sin(i / 6))), 'contours.coloring': i % 40 < 28 ? 'fill' : 'lines' }));
  }

  return () => stage.dispose();
};

export default mount;
