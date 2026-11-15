// A log-log power law with decade ticks, minor ticks and a minor grid drawn at 2 to 9
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { toggle } from '../../shared/controls.ts';
import { linspace } from '../../shared/sci-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  const x = linspace(0, 4, 60).map((e) => 10 ** e);

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: x.map((v) => 3 * v ** 1.5), name: 'y = 3·x^1.5', type: 'scatter', mode: 'lines' },
      { x, y: x.map((v) => 40 * Math.sqrt(v)), name: 'y = 40·√x', type: 'scatter', mode: 'lines' },
    ],
    {
      template: stage.template,
      xaxis: { type: 'log', title: { text: 'x' }, minor: { ticks: 'inside', ticklen: 4, showgrid: true, gridcolor: 'rgba(160,170,190,0.07)' } },
      yaxis: { type: 'log', title: { text: 'y' }, minor: { ticks: 'inside', ticklen: 4, showgrid: true, gridcolor: 'rgba(160,170,190,0.07)' } },
      showlegend: !stage.preview,
    },
    stage.config,
  );

  // On a log axis a power law is a straight line; minor.showgrid fills in 2..9 between the decades.
  const set = (on: boolean): void => void relayout(stage.div, { 'xaxis.minor.showgrid': on, 'yaxis.minor.showgrid': on, 'xaxis.minor.ticks': on ? 'inside' : '', 'yaxis.minor.ticks': on ? 'inside' : '' });
  if (stage.bar) toggle(stage.bar, 'minor ticks and grid', true, set);
  else stage.every(1400, (i) => set(i % 2 === 0));

  return () => stage.dispose();
};

export default mount;
