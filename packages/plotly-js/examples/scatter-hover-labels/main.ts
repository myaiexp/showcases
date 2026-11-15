// scatter text array shown in the hover label of each point
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { Fx } from '../../shared/fx.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  const trace1: Data = {
    x: [1, 2, 3, 4, 5],
    y: [1, 6, 3, 6, 1],
    mode: 'markers',
    type: 'scatter',
    name: 'Team A',
    text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
    marker: { size: 12 },
  };
  const trace2: Data = {
    x: [1.5, 2.5, 3.5, 4.5, 5.5],
    y: [4, 1, 7, 1, 4],
    mode: 'markers',
    type: 'scatter',
    name: 'Team B',
    text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'],
    marker: { size: 12 },
  };

  await Plotly.newPlot(
    stage.div,
    [trace1, trace2],
    {
      template: stage.template,
      xaxis: { range: [0.75, 5.25] },
      yaxis: { range: [0, 8] },
      title: stage.preview ? undefined : { text: 'Data Labels Hover' },
    },
    stage.config,
  );

  // No pointer in a card: Fx.hover stands in for it.
  if (stage.preview) stage.every(900, (i) => {
    Fx.hover(stage.div, { curveNumber: i % 2, pointNumber: Math.floor(i / 2) % 5 });
  });

  return () => stage.dispose();
};

export default mount;
