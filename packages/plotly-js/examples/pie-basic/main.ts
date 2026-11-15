// pie trace from values and labels, with the rotation attribute to spin it
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });

  const data: Data[] = [{ values: [19, 26, 55], labels: ['Residential', 'Non-Residential', 'Utility'], type: 'pie' }];

  await Plotly.newPlot(stage.div, data, { template: stage.template }, stage.config);

  if (stage.bar) slider(stage.bar, 'rotation (degrees)', [0, 360, 1], 0, (r) => void restyle(stage.div, { rotation: r }));
  if (stage.preview) stage.every(60, (i) => void restyle(stage.div, { rotation: (i * 4) % 360 }));

  return () => stage.dispose();
};

export default mount;
