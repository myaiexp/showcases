// A gauge styled end to end: axis, bar, border, steps, delta, paper and font
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'indicator',
        mode: 'gauge+number+delta',
        value: 420,
        title: { text: 'Speed', font: { size: 24 } },
        delta: { reference: 400, increasing: { color: 'RebeccaPurple' } },
        gauge: {
          axis: { range: [null, 500] as never, tickwidth: 1, tickcolor: 'darkblue' },
          bar: { color: 'darkblue' },
          bgcolor: 'white',
          borderwidth: 2,
          bordercolor: 'gray',
          steps: [
            { range: [0, 250], color: 'cyan' },
            { range: [250, 400], color: 'royalblue' },
          ],
          threshold: { line: { color: 'red', width: 4 }, thickness: 0.75, value: 490 },
        },
      },
    ],
    // The docs' lavender card with navy text, kept as a deliberate light panel on the dark page.
    { template: stage.template, margin: { t: 25, r: 25, l: 25, b: 25 }, paper_bgcolor: 'lavender', font: { color: 'darkblue', family: 'Arial' } },
    stage.config,
  );

  const set = (v: number): void => void Plotly.restyle(stage.div, { value: v });
  if (stage.bar) slider(stage.bar, 'value', [0, 500, 5], 420, set);
  else stage.every(140, (i) => set(Math.round(300 + 190 * Math.sin(i / 8))));

  return () => stage.dispose();
};

export default mount;
