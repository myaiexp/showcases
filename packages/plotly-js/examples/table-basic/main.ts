// table trace: header.values and cells.values (one array per column)
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, select } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 360 });
  const small = stage.preview;

  const values = [
    ['Salaries', 'Office', 'Merchandise', 'Legal', '<b>TOTAL</b>'],
    [1200000, 20000, 80000, 2000, 12120000],
    [1300000, 20000, 70000, 2000, 130902000],
    [1300000, 20000, 120000, 2000, 131222000],
    [1400000, 20000, 90000, 2000, 14102000],
  ];

  const data: Data[] = [{
    type: 'table',
    header: {
      values: [['<b>EXPENSES</b>'], ['<b>Q1</b>'], ['<b>Q2</b>'], ['<b>Q3</b>'], ['<b>Q4</b>']],
      align: 'center',
      line: { width: 1, color: 'black' },
      fill: { color: 'grey' },
      font: { family: 'Arial', size: small ? 9 : 12, color: 'white' },
    },
    cells: {
      values,
      align: 'center',
      line: { color: 'black', width: 1 },
      // The docs' black text is for a white page; this one is dark.
      font: { family: 'Arial', size: small ? 9 : 11 },
      height: small ? 22 : undefined,
    },
  }];

  await Plotly.newPlot(stage.div, data, { template: stage.template, margin: small ? { l: 6, r: 6, t: 6, b: 6 } : { l: 20, r: 20, t: 20, b: 20 } }, stage.config);

  // Fresh random figures for the four quarters (the row labels stay).
  const typical = [1200000, 20000, 80000, 2000];
  const refresh = (): void => {
    const quarters = [0, 1, 2, 3].map(() => {
      const col = typical.map((v) => Math.round(v * (0.8 + Math.random() * 0.5)));
      return [...col, col.reduce((sum, v) => sum + v, 0)];
    });
    void restyle(stage.div, { 'cells.values': [[values[0], ...quarters]] });
  };
  if (stage.bar) {
    button(stage.bar, 'New figures', refresh);
    select(stage.bar, 'cells.align', ['center', 'left', 'right'], 'center', (a) => void restyle(stage.div, { 'cells.align': a }));
  }
  if (stage.preview) stage.every(1400, refresh);

  return () => stage.dispose();
};

export default mount;
