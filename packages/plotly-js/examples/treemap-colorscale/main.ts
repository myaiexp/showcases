// treemap marker.colorscale applied to numeric marker.colors
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';

const scales = ['Blues', 'Viridis', 'Portland', 'Hot', 'Greens', 'YlOrRd', 'Electric'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  const values = [11, 12, 13, 14, 15, 20, 30];

  const data: Data[] = [{
    type: 'treemap',
    values,
    labels: ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2'],
    parents: ['', 'A1', 'A2', 'A3', 'A4', '', 'B1'],
    marker: { colors: values, colorscale: 'Blues', showscale: !stage.preview },
  }];

  await Plotly.newPlot(stage.div, data, { template: stage.template, margin: stage.preview ? { l: 4, r: 4, t: 4, b: 4 } : { l: 10, r: 10, t: 30, b: 10 } }, stage.config);

  if (stage.bar) select(stage.bar, 'marker.colorscale', scales, 'Blues', (s) => void restyle(stage.div, { 'marker.colorscale': s }));
  if (stage.preview) stage.every(1300, (i) => void restyle(stage.div, { 'marker.colorscale': pick(scales, i) }));

  return () => stage.dispose();
};

export default mount;
