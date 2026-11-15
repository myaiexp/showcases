// A radar chart on a polygonal grid with an open centre: polar.gridshape and polar.hole
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  const cats = ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Cost'];
  const closed = <T,>(v: T[]): T[] => [...v, v[0] as T];

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'scatterpolar', name: 'Model X', r: closed([4, 3, 5, 4, 2, 3]), theta: closed(cats), fill: 'toself', opacity: 0.8 },
      { type: 'scatterpolar', name: 'Model Y', r: closed([2, 5, 3, 5, 4, 4]), theta: closed(cats), fill: 'toself', opacity: 0.8 },
    ],
    {
      template: stage.template,
      showlegend: !stage.preview,
      // gridshape 'linear' joins the ticks with straight lines (a spider web) instead of circles.
      polar: { gridshape: 'linear', hole: 0.15, radialaxis: { visible: true, range: [0, 5], angle: 90, tickangle: 90 } },
    },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'polar.gridshape', ['linear', 'circular'] as const, 'linear', (v) => void relayout(stage.div, { 'polar.gridshape': v }));
    slider(stage.bar, 'polar.hole', [0, 0.7, 0.05], 0.15, (v) => void relayout(stage.div, { 'polar.hole': v }));
  } else {
    stage.every(130, (i) => void relayout(stage.div, { 'polar.hole': 0.3 + 0.28 * Math.sin(i / 8) }));
  }

  return () => stage.dispose();
};

export default mount;
