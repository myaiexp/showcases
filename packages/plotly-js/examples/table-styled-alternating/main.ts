// table header/cells fill, line, font and align, with per-column and per-row colour arrays
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';

const styles = ['column colours', 'alternating rows'] as const;

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
  // Per-column fills: one colour per column. Per-row fills: a nested array, one colour per row.
  const columnFill = ['#25FEFD', 'white'];
  const stripes = [['white', '#d4d4d8', 'white', '#d4d4d8', 'white']];

  const data: Data[] = [{
    type: 'table',
    header: {
      values: [['<b>EXPENSES</b>'], ['<b>Q1</b>'], ['<b>Q2</b>'], ['<b>Q3</b>'], ['<b>Q4</b>']],
      align: ['left', 'center'],
      line: { width: 1, color: '#506784' },
      fill: { color: '#119DFF' },
      font: { family: 'Arial', size: small ? 9 : 12, color: 'white' },
    },
    cells: {
      values,
      align: ['left', 'center'],
      line: { color: '#506784', width: 1 },
      fill: { color: columnFill },
      font: { family: 'Arial', size: small ? 9 : 11, color: ['#506784'] },
      height: small ? 22 : undefined,
    },
  }];

  await Plotly.newPlot(stage.div, data, { template: stage.template, margin: small ? { l: 6, r: 6, t: 6, b: 6 } : { l: 20, r: 20, t: 20, b: 20 } }, stage.config);

  const apply = (s: (typeof styles)[number]): void => {
    if (s === 'alternating rows') void restyle(stage.div, { 'cells.fill.color': [stripes], 'header.fill.color': 'grey', 'cells.font.color': [['black']] });
    else void restyle(stage.div, { 'cells.fill.color': [columnFill], 'header.fill.color': '#119DFF', 'cells.font.color': [['#506784']] });
  };
  if (stage.bar) select(stage.bar, 'Style', styles, 'column colours', apply);
  if (stage.preview) stage.every(1600, (i) => apply(pick(styles, i)));

  return () => stage.dispose();
};

export default mount;
