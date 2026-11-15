// trace name (legend and hover), layout.title and axis titles
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { toggle } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { Fx } from '../../shared/fx.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  const trace1: Data = { x: [1, 2, 3, 4], y: [10, 15, 13, 17], mode: 'markers', name: 'Scatter' };
  const trace2: Data = { x: [2, 3, 4, 5], y: [16, 5, 11, 9], mode: 'lines', name: 'Lines' };
  const trace3: Data = { x: [1, 2, 3, 4], y: [12, 9, 15, 12], mode: 'lines+markers', name: 'Scatter and Lines' };

  await Plotly.newPlot(
    stage.div,
    [trace1, trace2, trace3],
    {
      template: stage.template,
      title: stage.preview ? undefined : { text: 'Title of the Graph' },
      xaxis: { title: stage.preview ? undefined : { text: 'x-axis title' } },
      yaxis: { title: stage.preview ? undefined : { text: 'y-axis title' } },
    },
    stage.config,
  );

  if (stage.bar) {
    toggle(stage.bar, 'Legend', true, (on) => void relayout(stage.div, { showlegend: on }));
    toggle(stage.bar, 'Graph title', true, (on) => void relayout(stage.div, { 'title.text': on ? 'Title of the Graph' : '' }));
    toggle(stage.bar, 'Axis titles', true, (on) =>
      void relayout(stage.div, { 'xaxis.title.text': on ? 'x-axis title' : '', 'yaxis.title.text': on ? 'y-axis title' : '' }));
  }
  // Hover shows each trace's name: walk a label along the three traces.
  if (stage.preview) stage.every(900, (i) => Fx.hover(stage.div, { curveNumber: i % 3, pointNumber: Math.floor(i / 3) % 3 }));

  return () => stage.dispose();
};

export default mount;
