// An indicator with gauge.shape 'bullet': a horizontal bar, a number and a delta
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 250 });

  await Plotly.newPlot(
    stage.div,
    [{ type: 'indicator', mode: 'number+gauge+delta', gauge: { shape: 'bullet' }, delta: { reference: 300 }, value: 220, domain: { x: [0, 1], y: [0, 1] }, title: { text: 'Profit' } }],
    { template: stage.template, margin: stage.preview ? { l: 60, r: 20, t: 20, b: 20 } : { l: 100, r: 30, t: 30, b: 30 } },
    stage.config,
  );

  const set = (v: number): void => void Plotly.restyle(stage.div, { value: v });
  if (stage.bar) slider(stage.bar, 'value', [0, 400, 5], 220, set);
  else stage.every(150, (i) => set(Math.round(220 + 150 * Math.sin(i / 8))));

  return () => stage.dispose();
};

export default mount;
