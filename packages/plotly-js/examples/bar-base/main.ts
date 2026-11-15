// bar base moves where each bar starts; hovertemplate can print it as %{base}
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';

const expenses = [500, 600, 700];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });

  const data: Data[] = [
    { type: 'bar', x: ['2016', '2017', '2018'], y: expenses, base: [-500, -600, -700], hovertemplate: '%{base}', marker: { color: 'red' }, name: 'expenses' },
    { type: 'bar', x: ['2016', '2017', '2018'], y: [300, 400, 700], base: 0, marker: { color: 'blue' }, name: 'revenue' },
  ];

  await Plotly.newPlot(stage.div, data, { template: stage.template }, stage.config);

  // k = 1 is the docs' figure; below 1 the expense bars float, above 1 they sink further.
  const setBase = (k: number): void => void restyle(stage.div, { base: [expenses.map((e) => -e * k)] }, [0]);
  if (stage.bar) slider(stage.bar, 'Expense base (x -length)', [0, 1.6, 0.05], 1, setBase);
  if (stage.preview) stage.every(120, (i) => setBase(0.8 + 0.8 * Math.sin(i / 8)));

  return () => stage.dispose();
};

export default mount;
