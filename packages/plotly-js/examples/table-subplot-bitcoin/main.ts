// A table beside three line charts in one figure, from 180 days of Bitcoin mining stats
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpack } from '../../shared/data.ts';
import { relayout, restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

/** The table takes the left `s` of the figure, the charts the rest. */
const split = (s: number) => ({
  table: { 'domain.x': [[0, s - 0.02]] },
  axes: { 'xaxis1.domain': [s + 0.05, 1], 'xaxis2.domain': [s + 0.05, 1], 'xaxis3.domain': [s + 0.05, 1] },
});

const mount: Mount = async (el, ctx) => {
  const rows = await csv('Mining-BTC-180.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 520 });
  const headerNames = Object.keys(rows[0]!);
  const headerValues = headerNames.slice(1, 5);
  const cellValues = headerValues.map((h) => unpack(rows, h));
  // Dates arrive as 2017-04-29 00:00:00: keep the day.
  cellValues[0] = cellValues[0]!.map((d) => d.split(' ')[0]!);
  const date = unpack(rows, 'Date');
  const axis = { showline: true, zeroline: false, showgrid: true, mirror: true, ticklen: 4, tickfont: { size: 10 } };

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'table',
        columnwidth: [150, 200, 200, 150],
        columnorder: [0, 1, 2, 3],
        header: { values: headerValues, align: 'center', line: { width: 1, color: 'rgb(50, 50, 50)' }, fill: { color: ['#7a3a85'] }, font: { family: 'Arial', size: 11, color: 'white' } },
        cells: {
          values: cellValues,
          align: ['center', 'center'],
          line: { color: 'black', width: 1 },
          fill: { color: ['#2a2036', '#231c2e'] },
          font: { family: 'Arial', size: 10, color: ['#e6e8ee'] },
        },
        domain: { x: [0, 0.4], y: [0, 1] },
      },
      { type: 'scatter', x: date, y: unpack(rows, 'Hash-rate'), xaxis: 'x1', yaxis: 'y1', mode: 'lines', line: { width: 2, color: '#c26bd1' }, name: 'hash-rate-TH/s' },
      { type: 'scatter', x: date, y: unpack(rows, 'Mining-revenue-USD'), xaxis: 'x2', yaxis: 'y2', mode: 'lines', line: { width: 2, color: '#e0707e' }, name: 'Mining-revenue-USD' },
      { type: 'scatter', x: date, y: unpack(rows, 'Transaction-fees-BTC'), xaxis: 'x3', yaxis: 'y3', mode: 'lines', line: { width: 2, color: '#b88ad0' }, name: 'Transaction-fees-BTC' },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Bitcoin mining stats for 180 days' },
      showlegend: false,
      margin: stage.preview ? { l: 4, r: 8, t: 4, b: 16 } : undefined,
      xaxis1: { ...axis, domain: [0.5, 1], anchor: 'y', showticklabels: false },
      xaxis2: { ...axis, domain: [0.5, 1], anchor: 'y2', showticklabels: false },
      xaxis3: { ...axis, domain: [0.5, 1], anchor: 'y3' },
      yaxis1: { ...axis, domain: [0.66, 0.98], anchor: 'x', hoverformat: '.2f', showticklabels: !stage.preview },
      yaxis2: { ...axis, domain: [0.34, 0.64], anchor: 'x2', tickprefix: '$', hoverformat: '.2f', showticklabels: !stage.preview },
      yaxis3: { ...axis, domain: [0, 0.32], anchor: 'x3', tickprefix: '₿', hoverformat: '.2f', showticklabels: !stage.preview },
    },
    stage.config,
  );

  const move = (s: number): void => {
    const p = split(s);
    void restyle(stage.div, p.table, [0]);
    void relayout(stage.div, p.axes);
  };
  if (stage.bar) slider(stage.bar, 'table width (domain.x)', [0.2, 0.7, 0.01], 0.4, move);
  else stage.every(120, (i) => move(0.4 + 0.12 * Math.sin(i / 8)));
  return () => stage.dispose();
};

export default mount;
