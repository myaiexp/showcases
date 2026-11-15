// method 'update' takes [dataUpdate, layoutUpdate]: visible traces plus title and annotations
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { applyButton, at } from '../../shared/events-kit.ts';
import type { Btn } from '../../shared/events-kit.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('finance-charts-apple.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });
  const date = unpack(rows, 'Date');
  const high = unpackNum(rows, 'AAPL.High');
  const low = unpackNum(rows, 'AAPL.Low');
  const avg = (a: number[]): number => a.reduce((s, v) => s + v, 0) / a.length;
  const highAve = avg(high);
  const lowAve = avg(low);
  const highMax = Math.max(...high);
  const lowMin = Math.min(...low);
  const note = (text: string, x: string, y: number, ay: number): object => ({ text, x, y, xref: 'x', yref: 'y', ax: 0, ay });
  const highNotes = [
    note(`High Average:<br>${highAve.toFixed(2)}`, '2016-03-01', highAve, -40),
    note(`High Max:<br>${highMax.toFixed(2)}`, date[high.indexOf(highMax)]!, highMax, -40),
  ];
  const lowNotes = [
    note(`Low Average:<br>${lowAve.toFixed(2)}`, '2015-05-01', lowAve, 40),
    note(`Low Min:<br>${lowMin.toFixed(2)}`, date[low.indexOf(lowMin)]!, lowMin, 40),
  ];
  const buttons: Btn[] = [
    { args: [{ visible: [true, true, false, false] }, { title: 'Yahoo High', annotations: highNotes }], label: 'High', method: 'update' },
    { args: [{ visible: [false, false, true, true] }, { title: 'Yahoo Low', annotations: lowNotes }], label: 'Low', method: 'update' },
    { args: [{ visible: [true, true, true, true] }, { title: 'Yahoo', annotations: [...lowNotes, ...highNotes] }], label: 'Both', method: 'update' },
    { args: [{ visible: [true, false, true, false] }, { title: 'Yahoo', annotations: [] }], label: 'Reset', method: 'update' },
  ];

  await Plotly.newPlot(
    stage.div,
    [
      { x: date, y: high, mode: 'lines', name: 'High', line: { color: '#33CFA5' } },
      { x: date, y: date.map(() => highAve), mode: 'lines', name: 'Low Average', line: { color: '#33CFA5', dash: 'dash' }, visible: false },
      { x: date, y: low, mode: 'lines', name: 'Low', line: { color: '#F06A6A' } },
      { x: date, y: date.map(() => lowAve), mode: 'lines', name: 'High Average', line: { color: '#F06A6A', dash: 'dash' }, visible: false },
    ],
    {
      template: stage.template,
      showlegend: !stage.preview,
      title: stage.preview ? undefined : { text: 'Yahoo' },
      margin: stage.preview ? undefined : { t: 110 },
      updatemenus: stage.preview ? [] : [{ buttons, direction: 'left', pad: { r: 10, t: 10 }, showactive: true, type: 'buttons', x: 0.1, xanchor: 'left', y: 1.27, yanchor: 'top' }],
    } as unknown as Partial<Layout>,
    stage.config,
  );

  if (stage.preview) stage.every(1500, (i) => void applyButton(stage.div, at(buttons, i)));

  return () => stage.dispose();
};

export default mount;
