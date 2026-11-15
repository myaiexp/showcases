// A funnelarea trace: trapezoids whose areas are the values, with per-slice style
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'funnelarea',
        values: [5, 4, 3, 2, 1],
        text: ['The 1st', 'The 2nd', 'The 3rd', 'The 4th', 'The 5th'],
        marker: { colors: ['#59D4E8', '#DDB6C6', '#A696C8', '#67EACA', '#94D2E6'], line: { color: ['#3E4E88', '#606470', '#3E4E88', '#606470', '#3E4E88'], width: [2, 1, 5, 0, 3] } },
        textfont: { family: 'Old Standard TT', size: 13, color: 'black' },
        opacity: 0.65,
      },
    ],
    { template: stage.template, margin: stage.preview ? { l: 40, r: 40, t: 6, b: 6 } : { l: 200, r: 200 }, funnelmode: 'stack', showlegend: !stage.preview },
    stage.config,
  );

  const set = (v: number): void => void Plotly.restyle(stage.div, { baseratio: v });
  if (stage.bar) slider(stage.bar, 'baseratio', [0, 1, 0.05], 0.5, set);
  else stage.every(160, (i) => set(0.5 + 0.45 * Math.sin(i / 8)));

  return () => stage.dispose();
};

export default mount;
