// A big number with a prefix and a delta above it, laid out as a data card
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 200 });

  await Plotly.newPlot(
    stage.div,
    [{ type: 'indicator', mode: 'number+delta', value: 400, number: { prefix: '$' }, delta: { position: 'top', reference: 320 }, domain: { x: [0, 1], y: [0, 1] } }],
    // The docs' light card on a dark page: paper and text colours are set together.
    { template: stage.template, paper_bgcolor: '#d3d3d3', font: { color: '#1a1d24' }, margin: { t: 0, b: 0, l: 0, r: 0 } },
    stage.config,
  );

  const set = (v: number): void => void Plotly.restyle(stage.div, { value: v });
  if (stage.bar) slider(stage.bar, 'value', [100, 600, 10], 400, set);
  else stage.every(300, (i) => set(Math.round(400 + 150 * Math.sin(i / 5))));

  return () => stage.dispose();
};

export default mount;
