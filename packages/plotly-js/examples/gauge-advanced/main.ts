// A gauge with colour steps, a red threshold line and a delta
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 450 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: 450,
        title: { text: 'Speed' },
        type: 'indicator',
        mode: 'gauge+number+delta',
        delta: { reference: 380 },
        gauge: {
          axis: { range: [null, 500] as never },
          steps: [
            { range: [0, 250], color: 'lightgray' },
            { range: [250, 400], color: 'gray' },
          ],
          threshold: { line: { color: 'red', width: 4 }, thickness: 0.75, value: 490 },
        },
      },
    ],
    { template: stage.template, margin: { t: stage.preview ? 20 : 0, b: 0 } },
    stage.config,
  );

  const set = (v: number): void => void Plotly.restyle(stage.div, { value: v });
  if (stage.bar) slider(stage.bar, 'value', [0, 500, 5], 450, set);
  else stage.every(140, (i) => set(Math.round(250 + 230 * Math.sin(i / 8))));

  return () => stage.dispose();
};

export default mount;
