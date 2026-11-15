// zerolinelayer: draw the zero line above or below the traces
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const LAYERS = ['above traces', 'below traces'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  await Plotly.newPlot(
    stage.div,
    [{ x: ['A', 'B', 'C', 'D', 'A'], y: [2, 0, 4, -3, 2], fill: 'toself', mode: 'none', fillcolor: 'lightpink', type: 'scatter' }],
    { template: stage.template, yaxis: { zerolinelayer: 'above traces', zerolinewidth: 4, zerolinecolor: '#1f2937' } } as Partial<Layout>,
    stage.config,
  );
  if (stage.bar) select(stage.bar, 'yaxis.zerolinelayer', LAYERS, 'above traces', (v) => void relayout(stage.div, { 'yaxis.zerolinelayer': v }));
  if (stage.preview) stage.every(1400, (i) => void relayout(stage.div, { 'yaxis.zerolinelayer': LAYERS[i % 2] }));
  return () => stage.dispose();
};

export default mount;
