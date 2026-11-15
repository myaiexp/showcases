// A cheater carpet from a 2D y grid: cheaterslope shears it, cheatertype picks index or value spacing
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });

  // y is a 2D array, one row per b value and one column per a value; x is left out, which makes this a "cheater" plot.
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'carpet',
        a: [0.1, 0.2, 0.3],
        b: [1, 2, 3],
        y: [
          [1, 2.2, 3],
          [1.5, 2.7, 3.5],
          [1.7, 2.9, 3.7],
        ],
        cheaterslope: 1,
        aaxis: { title: { text: 'a' }, tickmode: 'linear', dtick: 0.05, minorgridcount: 9 },
        baxis: { title: { text: 'b' }, tickmode: 'linear', dtick: 0.5, minorgridcount: 9 },
      },
    ],
    { template: stage.template },
    stage.config,
  );

  const slope = (v: number): void => void restyle(stage.div, { cheaterslope: v });
  if (stage.bar) {
    slider(stage.bar, 'cheaterslope', [-2, 2, 0.1], 1, slope);
    select(stage.bar, 'aaxis.cheatertype', ['index', 'value'] as const, 'index', (v) => void restyle(stage.div, { 'aaxis.cheatertype': v, 'baxis.cheatertype': v }));
  } else stage.every(120, (i) => slope(Math.sin(i / 10) * 1.5));

  return () => stage.dispose();
};

export default mount;
