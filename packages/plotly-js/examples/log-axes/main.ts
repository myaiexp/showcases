// Two straight lines on axes that switch between linear and log, with autorange
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, relayout } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const types = ['linear', 'log'] as const;
const combos = [['log', 'log'], ['linear', 'log'], ['linear', 'linear'], ['log', 'linear']] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });

  await Plotly.newPlot(
    stage.div,
    [
      { x: [0, 1, 2, 3, 4, 5, 6, 7, 8], y: [8, 7, 6, 5, 4, 3, 2, 1, 0], type: 'scatter' },
      { x: [0, 1, 2, 3, 4, 5, 6, 7, 8], y: [0, 1, 2, 3, 4, 5, 6, 7, 8], type: 'scatter' },
    ],
    { template: stage.template, xaxis: { type: 'log', autorange: true }, yaxis: { type: 'log', autorange: true } },
    stage.config,
  );

  // Zero has no logarithm, so those points drop out on a log axis, and the range is recomputed.
  const set = (x: string, y: string): void => void relayout(stage.div, { 'xaxis.type': x, 'yaxis.type': y, 'xaxis.autorange': true, 'yaxis.autorange': true });
  if (stage.bar) {
    let xt: string = 'log';
    let yt: string = 'log';
    select(stage.bar, 'xaxis.type', types, 'log', (v) => (set((xt = v), yt)));
    select(stage.bar, 'yaxis.type', types, 'log', (v) => (set(xt, (yt = v))));
  } else {
    stage.every(1400, (i) => {
      const [x, y] = pick(combos, i);
      set(x, y);
    });
  }

  return () => stage.dispose();
};

export default mount;
