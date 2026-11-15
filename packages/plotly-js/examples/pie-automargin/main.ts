// pie automargin: margins grow to fit outside labels instead of clipping them
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { toggle } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  // A narrow box makes the long labels reach the edge, as in the docs' 400px figure.
  stage.div.style.width = stage.preview ? '230px' : '400px';

  const data: Data[] = [{
    type: 'pie',
    values: [2, 3, 4, 4],
    labels: ['Wages', 'Operating expenses', 'Cost of sales', 'Insurance'],
    textinfo: 'label+percent',
    textposition: 'outside',
    automargin: true,
  }];

  await Plotly.newPlot(stage.div, data, { template: stage.template, margin: { t: 0, b: 0, l: 0, r: 0 }, showlegend: false }, stage.config);

  if (stage.bar) toggle(stage.bar, 'automargin', true, (on) => void restyle(stage.div, { automargin: on }));
  if (stage.preview) stage.every(1600, (i) => void restyle(stage.div, { automargin: i % 2 === 0 }));

  return () => stage.dispose();
};

export default mount;
