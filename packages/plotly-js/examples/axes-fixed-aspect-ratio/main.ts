// Fixed-ratio axes: scaleanchor and scaleratio across subplots
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const t = (text: string): { text: string } => ({ text: stage.preview ? '' : text });

  await Plotly.newPlot(
    stage.div,
    [
      { x: [0, 1, 1, 0, 0, 1, 1, 2, 2, 3, 3, 2, 2, 3], y: [0, 0, 1, 1, 3, 3, 2, 2, 3, 3, 1, 1, 0, 0] },
      { x: [0, 1, 2, 3], y: [1, 2, 4, 8], yaxis: 'y2' },
      { x: [1, 10, 100, 10, 1], y: [0, 1, 2, 3, 4], xaxis: 'x2', yaxis: 'y3' },
      { x: [1, 100, 30, 80, 1], y: [1, 1.5, 2, 2.5, 3], xaxis: 'x2', yaxis: 'y4' },
    ],
    {
      template: stage.template,
      title: t('fixed-ratio axes'),
      showlegend: false,
      xaxis: { nticks: 10, domain: [0, 0.45], title: t('shared X axis') },
      yaxis: { scaleanchor: 'x', domain: [0, 0.45], title: t('1:1') },
      yaxis2: { scaleanchor: 'x', scaleratio: 0.2, domain: [0.55, 1], title: t('1:5') },
      xaxis2: { type: 'log', domain: [0.55, 1], anchor: 'y3', title: t('unconstrained log X') },
      yaxis3: { domain: [0, 0.45], anchor: 'x2', title: t('Scale matches ->') },
      yaxis4: { scaleanchor: 'y3', domain: [0.55, 1], anchor: 'x2', title: t('Scale matches <-') },
    } as Partial<Layout>,
    stage.config,
  );

  if (stage.bar) slider(stage.bar, 'yaxis2.scaleratio (the 1:5 panel)', [0.05, 1, 0.05], 0.2, (v) => void relayout(stage.div, { 'yaxis2.scaleratio': v }));
  if (stage.preview) stage.every(900, (i) => void relayout(stage.div, { 'yaxis2.scaleratio': [0.2, 0.5, 1, 0.5][i % 4] }));
  return () => stage.dispose();
};

export default mount;
