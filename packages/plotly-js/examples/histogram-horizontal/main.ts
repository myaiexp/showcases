// A horizontal histogram: samples go in y, so the bars grow sideways
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { rng, uniform } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const rand = rng(5);

  await Plotly.newPlot(
    stage.div,
    [{ y: uniform(rand, 500), type: 'histogram', marker: { color: 'pink' } }],
    { template: stage.template, bargap: 0.02 },
    stage.config,
  );

  // Cards draw a fresh sample every few seconds.
  if (stage.preview) stage.every(1500, () => void Plotly.restyle(stage.div, { y: [uniform(rand, 500)] }));

  return () => stage.dispose();
};

export default mount;
