// Parcoords with layout annotations in paper coordinates pointing out two regions
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { csv, unpackNum } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('iris-id.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'parcoords',
        line: {
          color: unpackNum(rows, 'species_id'),
          colorscale: [
            [0, 'red'],
            [0.5, 'green'],
            [1, 'blue'],
          ],
        },
        dimensions: [
          { range: [2, 4.5], label: 'sepal_width', values: unpackNum(rows, 'sepal_width') },
          { constraintrange: [5, 6], range: [4, 8], label: 'sepal_length', values: unpackNum(rows, 'sepal_length') },
          { label: 'petal_width', range: [0, 2.5], values: unpackNum(rows, 'petal_width') },
          { label: 'petal_length', range: [1, 7], values: unpackNum(rows, 'petal_length') },
        ],
      },
    ],
    {
      template: stage.template,
      margin: stage.preview ? { l: 40, r: 30, t: 30, b: 14 } : { l: 80, r: 80, t: 80, b: 40 },
      // Paper coordinates run 0..1 across the whole figure, so the notes stay put as the plot resizes.
      annotations: [
        { showarrow: false, text: 'Higher sepal width', x: 0, y: 1, xref: 'paper', yref: 'paper', font: { size: stage.preview ? 9 : 13 } },
        { showarrow: false, text: 'Lower petal width and length', x: 0.9, y: 0.25, xref: 'paper', yref: 'paper', font: { size: stage.preview ? 9 : 13 } },
      ],
    },
    stage.config,
  );

  if (stage.preview) {
    stage.every(160, (i) => void restyle(stage.div, { 'dimensions[2].constraintrange': [[0.2 + 0.5 * (1 + Math.sin(i / 12)), 1.4 + 0.5 * (1 + Math.sin(i / 12))]] }, [0]));
  }

  return () => stage.dispose();
};

export default mount;
