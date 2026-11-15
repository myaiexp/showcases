// Tick marks: tickmode linear, dtick, ticklen, tickwidth
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const axis = { tickmode: 'linear' as const, ticks: 'outside' as const, tick0: 0, dtick: 0.25, ticklen: 8, tickwidth: 4, tickcolor: '#e6e8ee' };

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: [8, 7, 6, 5, 4, 3, 2, 1, 0], type: 'scatter' },
      { x, y: x, type: 'scatter' },
    ],
    { template: stage.template, xaxis: { ...axis }, yaxis: { ...axis } },
    stage.config,
  );

  const both = (key: string, v: number): Promise<void> => relayout(stage.div, { [`xaxis.${key}`]: v, [`yaxis.${key}`]: v });
  if (stage.bar) {
    slider(stage.bar, 'dtick', [0.1, 2, 0.05], 0.25, (v) => void both('dtick', v));
    slider(stage.bar, 'ticklen', [0, 20, 1], 8, (v) => void both('ticklen', v));
    slider(stage.bar, 'tickwidth', [0, 10, 1], 4, (v) => void both('tickwidth', v));
  }
  if (stage.preview) {
    stage.every(1000, (i) => {
      void both('dtick', [0.25, 0.5, 1, 2][i % 4] as number);
      void both('ticklen', 4 + (i % 3) * 5);
    });
  }
  return () => stage.dispose();
};

export default mount;
