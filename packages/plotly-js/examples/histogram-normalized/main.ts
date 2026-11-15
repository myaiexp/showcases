// histnorm: counts, percent, probability, density on one sample
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { rng, uniform } from '../../shared/stat-data.ts';

const NORMS = ['probability', '', 'percent', 'density', 'probability density'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [{ x: uniform(rng(9), 500), type: 'histogram', histnorm: 'probability', marker: { color: 'rgb(255,255,100)' } }],
    { template: stage.template, bargap: 0.02, yaxis: { title: { text: 'probability' } } },
    stage.config,
  );

  const set = (n: (typeof NORMS)[number]): void => {
    void Plotly.restyle(stage.div, { histnorm: n });
    void Plotly.relayout(stage.div, { 'yaxis.title.text': n || 'count' });
  };
  if (stage.bar) select(stage.bar, 'histnorm', NORMS, 'probability', set);
  else stage.every(1400, (i) => set(NORMS[i % NORMS.length] ?? ''));

  return () => stage.dispose();
};

export default mount;
