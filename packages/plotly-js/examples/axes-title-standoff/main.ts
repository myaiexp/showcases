// title.standoff: the gap between tick labels and the axis title
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  await Plotly.newPlot(
    stage.div,
    [{ mode: 'lines+markers', x: ['December', 'January', 'February'], y: [4, 1, 3] }],
    {
      template: stage.template,
      margin: { t: 10, r: 10, b: 10, l: 20 },
      xaxis: { automargin: true, tickangle: 90, title: { text: 'Month', standoff: 20 } },
      yaxis: { automargin: true, tickangle: 90, title: { text: 'Temperature', standoff: 40 } },
    },
    stage.config,
  );
  if (stage.bar) {
    slider(stage.bar, 'x standoff', [0, 80, 2], 20, (v) => void relayout(stage.div, { 'xaxis.title.standoff': v }));
    slider(stage.bar, 'y standoff', [0, 80, 2], 40, (v) => void relayout(stage.div, { 'yaxis.title.standoff': v }));
    toggle(stage.bar, 'automargin', true, (v) => void relayout(stage.div, { 'xaxis.automargin': v, 'yaxis.automargin': v }));
  }
  if (stage.preview) {
    stage.every(500, (i) => void relayout(stage.div, { 'xaxis.title.standoff': 4 + Math.abs(Math.sin(i / 4)) * 30, 'yaxis.title.standoff': 4 + Math.abs(Math.cos(i / 4)) * 30 }));
  }
  return () => stage.dispose();
};

export default mount;
