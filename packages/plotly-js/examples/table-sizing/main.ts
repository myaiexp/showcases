// table columnwidth (a ratio per column) and header.height / cells.height
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';

const lorem =
  'Lorem ipsum dolor sit amet, tollit discere inermis pri ut. Eos ea iusto timeam, an prima laboramus vim. Id usu aeterno adversarium, summo mollis timeam vel ad';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  const small = stage.preview;

  const values = [['Salaries', 'Office', 'Merchandise', 'Legal', '<b>TOTAL<br>EXPENSES</b>'], Array<string>(5).fill(lorem)];

  const data: Data[] = [{
    type: 'table',
    // The docs list columnorder [1,2] for this two-column table; the columns here are 0 and 1.
    columnorder: [0, 1],
    columnwidth: [80, 400],
    header: {
      values: [['<b>EXPENSES</b><br>as of July 2017'], ['<b>DESCRIPTION</b>']],
      align: ['left', 'center'],
      height: 40,
      line: { width: 1, color: '#506784' },
      fill: { color: '#119DFF' },
      font: { family: 'Arial', size: small ? 9 : 12, color: 'white' },
    },
    cells: {
      values,
      align: ['left', 'center'],
      height: small ? 24 : 30,
      line: { color: '#506784', width: 1 },
      fill: { color: ['#25FEFD', 'white'] },
      font: { family: 'Arial', size: small ? 8 : 11, color: ['#506784'] },
    },
  }];

  await Plotly.newPlot(stage.div, data, { template: stage.template, margin: small ? { l: 6, r: 6, t: 6, b: 6 } : { l: 20, r: 20, t: 20, b: 20 } }, stage.config);

  if (stage.bar) {
    slider(stage.bar, 'First column width', [20, 400, 10], 80, (w) => void restyle(stage.div, { columnwidth: [[w, 400]] }));
    slider(stage.bar, 'cells.height', [18, 80, 2], 30, (h) => void restyle(stage.div, { 'cells.height': h }));
    slider(stage.bar, 'header.height', [20, 100, 2], 40, (h) => void restyle(stage.div, { 'header.height': h }));
  }
  if (stage.preview) stage.every(100, (i) => void restyle(stage.div, { columnwidth: [[80 + 160 * (0.5 + 0.5 * Math.sin(i / 8)), 400]] }));

  return () => stage.dispose();
};

export default mount;
