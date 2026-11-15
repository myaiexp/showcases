// grouped bars with marker colours, tick fonts, an in-plot legend, bargap and bargroupgap
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  const x = Array.from({ length: 18 }, (_, i) => 1995 + i);
  // Docs tick colour rgb(107,107,107) is too dark for this page; a lighter grey keeps the idea.
  const tick = { size: stage.preview ? 9 : 14, color: 'rgb(161, 161, 170)' };

  const trace1: Data = {
    x, y: [219, 146, 112, 127, 124, 180, 236, 207, 236, 263, 350, 430, 474, 526, 488, 537, 500, 439],
    name: 'Rest of world', marker: { color: 'rgb(55, 83, 109)' }, type: 'bar',
  };
  const trace2: Data = {
    x, y: [16, 13, 10, 11, 28, 37, 43, 55, 56, 88, 105, 156, 270, 299, 340, 403, 549, 499],
    name: 'China', marker: { color: 'rgb(26, 118, 255)' }, type: 'bar',
  };

  await Plotly.newPlot(
    stage.div,
    [trace1, trace2],
    {
      template: stage.template,
      title: stage.preview ? undefined : { text: 'US Export of Plastic Scrap' },
      xaxis: { tickfont: tick },
      yaxis: { title: stage.preview ? undefined : { text: 'USD (millions)', font: { size: 16, color: 'rgb(161, 161, 170)' } }, tickfont: tick },
      legend: { x: 0, y: 1.0, bgcolor: 'rgba(255, 255, 255, 0)', bordercolor: 'rgba(255, 255, 255, 0)' },
      barmode: 'group',
      bargap: 0.15,
      bargroupgap: 0.1,
    },
    stage.config,
  );

  if (stage.bar) {
    slider(stage.bar, 'bargap', [0, 1, 0.05], 0.15, (g) => void relayout(stage.div, { bargap: g }));
    slider(stage.bar, 'bargroupgap', [0, 1, 0.05], 0.1, (g) => void relayout(stage.div, { bargroupgap: g }));
  }
  if (stage.preview) stage.every(120, (i) => void relayout(stage.div, { bargap: 0.4 + 0.35 * Math.sin(i / 9), bargroupgap: 0.2 + 0.15 * Math.sin(i / 6) }));

  return () => stage.dispose();
};

export default mount;
