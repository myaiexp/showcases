// table from CSV rows: one header and one cells column per field, columnwidth and columnorder
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';
import { csv, unpack } from '../../shared/data.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('Mining-BTC-180.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 520 });
  const small = stage.preview;

  const headerNames = Object.keys(rows[0] ?? {});
  const headerValues = headerNames.map((n) => [n]);
  const cellValues = headerNames.map((n) => unpack(rows, n));
  // Keep the date part of the timestamp column only.
  cellValues[1] = (cellValues[1] ?? []).map((d) => d.split(' ')[0] as string);

  const order = headerNames.map((_, i) => i);
  const data: Data[] = [{
    type: 'table',
    columnwidth: [150, 600, 1000, 900, 600, 500, 1000, 1000, 1000],
    columnorder: order,
    header: {
      values: headerValues,
      align: 'center',
      line: { width: 1, color: 'rgb(50, 50, 50)' },
      fill: { color: ['rgb(235, 100, 230)'] },
      font: { family: 'Arial', size: small ? 6 : 8, color: 'white' },
    },
    cells: {
      values: cellValues,
      align: ['center', 'center'],
      line: { color: 'black', width: 1 },
      fill: { color: ['rgba(228, 222, 249, 0.65)', 'rgb(235, 193, 238)', 'rgba(228, 222, 249, 0.65)'] },
      font: { family: 'Arial', size: small ? 7 : 9, color: ['black'] },
      height: small ? 16 : undefined,
    },
  }];

  await Plotly.newPlot(
    stage.div,
    data,
    { template: stage.template, title: small ? undefined : { text: 'Bitcoin mining stats for 180 days' }, margin: small ? { l: 4, r: 4, t: 4, b: 4 } : { l: 20, r: 20, t: 60, b: 20 } },
    stage.config,
  );

  let shift = 0;
  const rotate = (): void => {
    shift = (shift + 1) % order.length;
    void restyle(stage.div, { columnorder: [order.map((_, i) => order[(i + shift) % order.length])] });
  };
  if (stage.bar) button(stage.bar, 'Rotate columnorder', rotate);
  if (stage.preview) stage.every(1300, rotate);

  return () => stage.dispose();
};

export default mount;
