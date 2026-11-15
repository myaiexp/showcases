// Carpet axis ticks: linear tick spacing, start and end lines, axis titles and label placement
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'carpet',
        a: [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3],
        b: [4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6],
        x: [2, 3, 4, 5, 2.2, 3.1, 4.1, 5.1, 1.5, 2.5, 3.5, 4.5],
        y: [1, 1.4, 1.6, 1.75, 2, 2.5, 2.7, 2.75, 3, 3.5, 3.7, 3.75],
        aaxis: { title: { text: 'a' }, tickmode: 'linear', dtick: 1, smoothing: 0, startlinewidth: 2, endlinewidth: 2, minorgridcount: 3 },
        baxis: { title: { text: 'b' }, tickmode: 'linear', dtick: 0.5, smoothing: 0, startlinewidth: 2, endlinewidth: 2, minorgridcount: 3 },
      },
    ],
    { template: stage.template },
    stage.config,
  );

  const both = (key: string, v: unknown): void => void restyle(stage.div, { [`aaxis.${key}`]: v, [`baxis.${key}`]: v });
  if (stage.bar) {
    slider(stage.bar, 'a dtick', [0.25, 2, 0.25], 1, (v) => void restyle(stage.div, { 'aaxis.dtick': v }));
    slider(stage.bar, 'b dtick', [0.1, 1, 0.1], 0.5, (v) => void restyle(stage.div, { 'baxis.dtick': v }));
    toggle(stage.bar, 'startline', true, (v) => both('startline', v));
    toggle(stage.bar, 'endline', true, (v) => both('endline', v));
    select(stage.bar, 'showticklabels', ['start', 'end', 'both', 'none'] as const, 'start', (v) => both('showticklabels', v));
  } else {
    const labels = ['start', 'end', 'both', 'none'];
    stage.every(1200, (i) => both('showticklabels', labels[i % 4]));
  }

  return () => stage.dispose();
};

export default mount;
