// A parcoords trace of the iris measurements, coloured by species, with a brushed range
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { button } from '../../shared/controls.ts';
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
    { template: stage.template, margin: stage.preview ? { l: 40, r: 30, t: 30, b: 14 } : { l: 80, r: 80, t: 80, b: 40 } },
    stage.config,
  );

  // The brush on sepal_length is data too: constraintrange moves it from code (drag on an axis to move it by hand).
  const brush = (lo: number): void => void restyle(stage.div, { 'dimensions[1].constraintrange': [[lo, lo + 1]] }, [0]);
  if (stage.bar) {
    button(stage.bar, 'Brush 4.5–5.5', () => brush(4.5));
    button(stage.bar, 'Brush 5–6', () => brush(5));
    button(stage.bar, 'Brush 6.5–7.5', () => brush(6.5));
  } else stage.every(160, (i) => brush(4 + 2.5 + 2.5 * Math.sin(i / 12)));

  return () => stage.dispose();
};

export default mount;
