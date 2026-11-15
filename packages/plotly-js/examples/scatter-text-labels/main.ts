// scatter mode markers+text with textposition and per-trace textfont
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';

const positions = [
  'top left', 'top center', 'top right',
  'middle left', 'middle center', 'middle right',
  'bottom left', 'bottom center', 'bottom right',
] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  const trace1: Data = {
    x: [1, 2, 3, 4, 5],
    y: [1, 6, 3, 6, 1],
    mode: 'markers+text',
    type: 'scatter',
    name: 'Team A',
    text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
    textposition: 'top center',
    textfont: { family: 'Raleway, sans-serif' },
    marker: { size: 12 },
  };
  const trace2: Data = {
    x: [1.5, 2.5, 3.5, 4.5, 5.5],
    y: [4, 1, 7, 1, 4],
    mode: 'markers+text',
    type: 'scatter',
    name: 'Team B',
    text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'],
    textfont: { family: 'Times New Roman' },
    textposition: 'bottom center',
    marker: { size: 12 },
  };

  await Plotly.newPlot(
    stage.div,
    [trace1, trace2],
    {
      template: stage.template,
      xaxis: { range: [0.75, 5.25] },
      yaxis: { range: [0, 8] },
      // Docs use grey 20px legend text on white; the template's legend colour reads on dark.
      legend: { y: 0.5, yref: 'paper', font: { family: 'Arial, sans-serif', size: stage.preview ? 10 : 18, color: 'grey' } },
      title: stage.preview ? undefined : { text: 'Data Labels on the Plot' },
    },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'Team A textposition', positions, 'top center', (p) => void Plotly.restyle(stage.div, { textposition: p }, [0]));
    select(stage.bar, 'Team B textposition', positions, 'bottom center', (p) => void Plotly.restyle(stage.div, { textposition: p }, [1]));
  }
  if (stage.preview) stage.every(1100, (i) => {
    void restyle(stage.div, { textposition: [pick(positions, i * 2), pick(positions, i * 2 + 5)] });
  });

  return () => stage.dispose();
};

export default mount;
