// Big numbers with relative deltas, a top delta and a multi-line title
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const title = stage.preview
    ? 'Accounts'
    : "Accounts<br><span style='font-size:0.8em;color:gray'>Subtitle</span><br><span style='font-size:0.8em;color:gray'>Subsubtitle</span>";

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'indicator', mode: 'number+delta', value: 200, domain: { x: [0, 0.5], y: [0, 0.5] }, delta: { reference: 400, relative: true, position: 'top' } },
      { type: 'indicator', mode: 'number+delta', value: 350, delta: { reference: 400, relative: true }, domain: { x: [0, 0.5], y: [0.5, 1] } },
      { type: 'indicator', mode: 'number+delta', value: 450, title: { text: title }, delta: { reference: 400, relative: true }, domain: { x: [0.6, 1], y: [0, 1] } },
    ],
    { template: stage.template, margin: { t: 25, r: 25, l: 25, b: 25 } },
    stage.config,
  );

  // Cards: values drift; delta colours flip when a value crosses its reference of 400.
  if (stage.bar) toggle(stage.bar, 'relative delta', true, (v) => void Plotly.restyle(stage.div, { 'delta.relative': v }));
  else stage.every(400, (i) => void Plotly.restyle(stage.div, { value: [200 + 250 * Math.abs(Math.sin(i / 6)), 350 + 100 * Math.sin(i / 4), 450 - 120 * Math.sin(i / 5)] }));

  return () => stage.dispose();
};

export default mount;
