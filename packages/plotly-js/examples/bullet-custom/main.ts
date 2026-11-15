// A bullet chart with a top delta, subtitle, dark bar, cyan step and threshold
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 230 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'indicator',
        mode: 'number+gauge+delta',
        value: 220,
        domain: { x: [0, 1], y: [0, 1] },
        delta: { reference: 280, position: 'top' },
        title: { text: "<b>Profit</b><br><span style='color: gray; font-size:0.8em'>U.S. $</span>", font: { size: 14 } },
        gauge: {
          shape: 'bullet',
          axis: { range: [null, 300] as never },
          // The docs add line.gradient here; plotly.js 4.3 has no such attribute, so it is left out.
          threshold: { line: { color: 'red', width: 2 }, thickness: 0.75, value: 270 },
          bgcolor: 'white',
          steps: [{ range: [0, 150], color: 'cyan' }],
          bar: { color: 'darkblue' },
        },
      },
    ],
    { template: stage.template, margin: stage.preview ? { l: 60, r: 20, t: 20, b: 20 } : { l: 100, r: 30, t: 30, b: 30 } },
    { ...stage.config, responsive: true },
  );

  const set = (v: number): void => void Plotly.restyle(stage.div, { value: v });
  if (stage.bar) slider(stage.bar, 'value', [0, 300, 5], 220, set);
  else stage.every(150, (i) => set(Math.round(150 + 120 * Math.sin(i / 8))));

  return () => stage.dispose();
};

export default mount;
