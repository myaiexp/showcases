// yaxis.automargin: margins that grow for tick labels and axis titles
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  await Plotly.newPlot(
    stage.div,
    [{ x: ['Apples', 'Oranges', 'Watermelon', 'Pears'], y: [3, 2, 1, 4], type: 'bar' }],
    {
      template: stage.template,
      autosize: stage.preview,
      ...(stage.preview ? {} : { width: 500, height: 440 }),
      margin: stage.preview ? { l: 30, r: 10, t: 10, b: 24 } : { l: 40, r: 20, t: 20, b: 40 },
      yaxis: {
        title: { text: 'Y-axis Title', font: { size: stage.preview ? 14 : 30 } },
        ticktext: ['long label', 'Very long label', '3', 'label'],
        tickvals: [1, 2, 3, 4],
        tickmode: 'array',
        automargin: true,
      },
      paper_bgcolor: '#3b4252',
      plot_bgcolor: '#2a303c',
    },
    stage.config,
  );
  if (stage.bar) {
    toggle(stage.bar, 'yaxis.automargin', true, (v) => void relayout(stage.div, { 'yaxis.automargin': v }));
    slider(stage.bar, 'title font size', [10, 40, 2], 30, (v) => void relayout(stage.div, { 'yaxis.title.font.size': v }));
  }
  if (stage.preview) stage.every(1400, (i) => void relayout(stage.div, { 'yaxis.automargin': i % 2 === 0 }));
  return () => stage.dispose();
};

export default mount;
