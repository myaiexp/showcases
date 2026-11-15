// bar text arrays appear on hover; xaxis.tickangle and a tight bargap
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { Fx } from '../../shared/fx.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  const trace1: Data = {
    x: ['Liam', 'Sophie', 'Jacob', 'Mia', 'William', 'Olivia'],
    y: [8.0, 8.0, 12.0, 12.0, 13.0, 20.0],
    type: 'bar',
    text: ['4.17 below the mean', '4.17 below the mean', '0.17 below the mean', '0.17 below the mean', '0.83 above the mean', '7.83 above the mean'],
    marker: { color: 'rgb(142,124,195)' },
  };

  await Plotly.newPlot(
    stage.div,
    [trace1],
    {
      template: stage.template,
      title: stage.preview ? undefined : { text: 'Number of Graphs Made this Week' },
      font: { family: 'Raleway, sans-serif' },
      showlegend: false,
      xaxis: { tickangle: -45 },
      yaxis: { zeroline: false, gridwidth: 2 },
      bargap: 0.05,
    },
    stage.config,
  );

  if (stage.preview) stage.every(800, (i) => Fx.hover(stage.div, { curveNumber: 0, pointNumber: i % 6 }));

  return () => stage.dispose();
};

export default mount;
