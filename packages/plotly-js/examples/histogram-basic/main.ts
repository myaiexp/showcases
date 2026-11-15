// A histogram of 500 uniform samples, with the bin count adjustable (nbinsx)
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { rng, uniform } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const x = uniform(rng(3), 500);

  await Plotly.newPlot(stage.div, [{ x, type: 'histogram' }], { template: stage.template, bargap: 0.02 }, stage.config);

  const bins = (n: number): void => void Plotly.restyle(stage.div, { nbinsx: n });
  if (stage.bar) slider(stage.bar, 'nbinsx', [2, 60, 1], 20, bins);
  else stage.every(220, (i) => bins(4 + Math.round(18 * (1 + Math.sin(i / 6)))));

  return () => stage.dispose();
};

export default mount;
