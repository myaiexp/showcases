// A splom of the Iris measurements: every pair of four columns, by species
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { splomAxes } from '../../shared/splom.ts';
import { slider } from '../../shared/controls.ts';

const SPECIES = ['Iris-setosa', 'Iris-versicolor', 'Iris-virginica'];
const COLUMNS = ['sepal length', 'sepal width', 'petal length', 'petal width'];

const mount: Mount = async (el, ctx) => {
  const rows = await csv('iris-data.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 640 });
  const species = unpack(rows, 'class');

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'splom',
        dimensions: COLUMNS.map((label) => ({ label, values: unpackNum(rows, label) })),
        text: species,
        // The colour column is 0, 0.5 and 1 for the three species, cut into flat bands by the scale.
        marker: {
          color: species.map((s) => SPECIES.indexOf(s) / 2),
          colorscale: [[0, '#19d3f3'], [0.333, '#19d3f3'], [0.333, '#e763fa'], [0.666, '#e763fa'], [0.666, '#636efa'], [1, '#636efa']],
          size: stage.preview ? 4 : 7,
          line: { color: 'white', width: 0.5 },
        },
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Iris Data set' },
      hovermode: 'closest',
      dragmode: 'select',
      ...splomAxes(4, stage.preview ? 8 : 10),
      ...(stage.preview ? { margin: { l: 30, r: 10, t: 6, b: 24 } } : {}),
    },
    stage.config,
  );

  // Cards: marker size pulses; the full view lets you change it.
  const size = (s: number): void => void Plotly.restyle(stage.div, { 'marker.size': s });
  if (stage.bar) slider(stage.bar, 'marker.size', [2, 16, 1], 7, size);
  else stage.every(150, (i) => size(3 + 3 * (1 + Math.sin(i / 6))));

  return () => stage.dispose();
};

export default mount;
