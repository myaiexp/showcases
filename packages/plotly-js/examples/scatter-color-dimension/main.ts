// scatter marker.color as a number array, mapped through a colorscale
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, toggle } from '../../shared/controls.ts';

const scales = ['Viridis', 'Portland', 'Jet', 'Hot', 'Cividis', 'Electric', 'Blues', 'RdBu'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 360 });

  const trace1: Data = {
    y: Array.from({ length: 40 }, () => 5),
    mode: 'markers',
    marker: {
      size: stage.preview ? 14 : 24,
      color: Array.from({ length: 40 }, (_, i) => i),
      colorscale: 'Viridis',
      showscale: !stage.preview,
    },
  };

  await Plotly.newPlot(
    stage.div,
    [trace1],
    { template: stage.template, title: stage.preview ? undefined : { text: 'Scatter Plot with a Color Dimension' } },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'Colorscale', scales, 'Viridis', (s) => void Plotly.restyle(stage.div, { 'marker.colorscale': s }));
    toggle(stage.bar, 'Reverse', false, (r) => void Plotly.restyle(stage.div, { 'marker.reversescale': r }));
  }
  if (stage.preview) stage.every(1200, (i) => void Plotly.restyle(stage.div, { 'marker.colorscale': scales[i % scales.length] }));

  return () => stage.dispose();
};

export default mount;
