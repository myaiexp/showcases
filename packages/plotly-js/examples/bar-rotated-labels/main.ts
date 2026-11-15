// xaxis.tickangle on grouped bars
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const x = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const trace1: Data = {
    x, y: [20, 14, 25, 16, 18, 22, 19, 15, 12, 16, 14, 17], type: 'bar', name: 'Primary Product',
    marker: { color: 'rgb(49,130,189)', opacity: 0.7 },
  };
  const trace2: Data = {
    x, y: [19, 14, 22, 14, 16, 19, 15, 14, 10, 12, 12, 16], type: 'bar', name: 'Secondary Product',
    marker: { color: 'rgb(204,204,204)', opacity: 0.5 },
  };

  await Plotly.newPlot(
    stage.div,
    [trace1, trace2],
    {
      template: stage.template,
      title: stage.preview ? undefined : { text: '2013 Sales Report' },
      xaxis: { tickangle: -45 },
      barmode: 'group',
      showlegend: !stage.preview,
    },
    stage.config,
  );

  if (stage.bar) slider(stage.bar, 'xaxis.tickangle', [-90, 90, 5], -45, (a) => void relayout(stage.div, { 'xaxis.tickangle': a }));
  if (stage.preview) stage.every(120, (i) => void relayout(stage.div, { 'xaxis.tickangle': -45 + 45 * Math.sin(i / 9) }));

  return () => stage.dispose();
};

export default mount;
