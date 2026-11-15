// A bullet chart with an axis range, grey steps and a red threshold line
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 250 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'indicator',
        mode: 'number+gauge+delta',
        value: 220,
        domain: { x: [0, 1], y: [0, 1] },
        title: { text: '<b>Profit</b>' },
        delta: { reference: 200 },
        gauge: {
          shape: 'bullet',
          axis: { range: [null, 300] as never },
          threshold: { line: { color: 'red', width: 2 }, thickness: 0.75, value: 280 },
          steps: [
            { range: [0, 150], color: 'lightgray' },
            { range: [150, 250], color: 'gray' },
          ],
        },
      },
    ],
    { template: stage.template, margin: stage.preview ? { l: 60, r: 20, t: 20, b: 20 } : { l: 100, r: 30, t: 30, b: 30 } },
    { ...stage.config, responsive: true },
  );

  const set = (v: number): void => void Plotly.restyle(stage.div, { value: v });
  if (stage.bar) slider(stage.bar, 'value', [0, 300, 5], 220, set);
  else stage.every(150, (i) => set(Math.round(160 + 130 * Math.sin(i / 8))));

  return () => stage.dispose();
};

export default mount;
