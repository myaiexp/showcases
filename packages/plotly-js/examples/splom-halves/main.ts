// splom showupperhalf, showlowerhalf and diagonal.visible: trimming the matrix
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { splomAxes } from '../../shared/splom.ts';

const SPECIES = ['Iris-setosa', 'Iris-versicolor', 'Iris-virginica'];
const COLUMNS = ['sepal length', 'sepal width', 'petal length', 'petal width'];

const mount: Mount = async (el, ctx) => {
  const rows = await csv('iris-data.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 640 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'splom',
        dimensions: COLUMNS.map((label) => ({ label, values: unpackNum(rows, label) })),
        text: unpack(rows, 'class'),
        showupperhalf: false,
        diagonal: { visible: false },
        marker: { color: unpack(rows, 'class').map((s) => SPECIES.indexOf(s)), colorscale: [[0, '#19d3f3'], [0.5, '#e763fa'], [1, '#636efa']], size: stage.preview ? 4 : 7, line: { color: 'white', width: 0.5 } },
      },
    ],
    {
      template: stage.template,
      hovermode: 'closest',
      ...splomAxes(4, stage.preview ? 8 : 10),
      ...(stage.preview ? { margin: { l: 30, r: 10, t: 6, b: 24 } } : {}),
    },
    stage.config,
  );

  const set = (key: string, v: boolean): void => void Plotly.restyle(stage.div, { [key]: v });
  if (stage.bar) {
    toggle(stage.bar, 'showupperhalf', false, (v) => set('showupperhalf', v));
    toggle(stage.bar, 'showlowerhalf', true, (v) => set('showlowerhalf', v));
    toggle(stage.bar, 'diagonal.visible', false, (v) => set('diagonal.visible', v));
  } else {
    stage.every(1200, (i) => {
      set('showupperhalf', i % 4 >= 2);
      set('showlowerhalf', i % 4 !== 3);
      set('diagonal.visible', i % 2 === 1);
    });
  }

  return () => stage.dispose();
};

export default mount;
