// pie insidetextorientation: horizontal, radial, tangential, auto
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';

const orientations = ['radial', 'horizontal', 'tangential', 'auto'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });

  const data: Data[] = [{
    type: 'pie',
    values: [2, 3, 4, 4],
    labels: ['Wages', 'Operating expenses', 'Cost of sales', 'Insurance'],
    textinfo: 'label+percent',
    insidetextorientation: 'radial',
  }];

  await Plotly.newPlot(stage.div, data, { template: stage.template, showlegend: false }, stage.config);

  if (stage.bar) select(stage.bar, 'insidetextorientation', orientations, 'radial', (o) => void restyle(stage.div, { insidetextorientation: o }));
  if (stage.preview) stage.every(1500, (i) => {
    const o = pick(orientations, i);
    void restyle(stage.div, { insidetextorientation: o });
  });

  return () => stage.dispose();
};

export default mount;
