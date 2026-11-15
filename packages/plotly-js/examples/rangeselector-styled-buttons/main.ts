// rangeselector styling attributes and a button list built from step, count and stepmode
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { at } from '../../shared/events-kit.ts';
import { select } from '../../shared/controls.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { relayout } from '../../shared/basic-util.ts';
import { guiRelayout } from '../../shared/fund-util.ts';
import { createStage } from '../../shared/stage.ts';

const BUTTONS = [
  { count: 1, label: '1 month', step: 'month', stepmode: 'backward' },
  { count: 3, label: '3 months', step: 'month', stepmode: 'backward' },
  { count: 1, label: 'this year', step: 'year', stepmode: 'todate' },
  { step: 'all', label: 'everything' },
];

const mount: Mount = async (el, ctx) => {
  const rows = await csv('finance-charts-apple.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 440 });
  const x = unpack(rows, 'Date');

  await Plotly.newPlot(
    stage.div,
    [{ type: 'scatter', mode: 'lines', x, y: unpackNum(rows, 'AAPL.Close'), line: { color: '#f472b6' } }],
    {
      template: stage.template,
      xaxis: {
        range: ['2016-01-01', '2016-06-01'],
        rangeselector: { buttons: stage.preview ? BUTTONS.slice(0, 3) : BUTTONS, bgcolor: '#4a2038', activecolor: '#f472b6', bordercolor: '#f472b6', borderwidth: 1, font: { color: '#fce7f3', size: 12 }, x: 0.02, y: 1.02, xanchor: 'left', yanchor: 'bottom' },
      },
      margin: stage.preview ? { l: 34, r: 12, t: 36, b: 26 } : { t: 90 },
    } as unknown as Partial<Layout>,
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'selector position', ['top left', 'top right', 'inside plot'], 'top left', (v) => {
      const pos = v === 'top left' ? { x: 0.02, y: 1.02, xanchor: 'left', yanchor: 'bottom' } : v === 'top right' ? { x: 1, y: 1.02, xanchor: 'right', yanchor: 'bottom' } : { x: 0.02, y: 0.96, xanchor: 'left', yanchor: 'top' };
      void relayout(stage.div, Object.fromEntries(Object.entries(pos).map(([k, val]) => [`xaxis.rangeselector.${k}`, val])));
    });
  }
  if (stage.preview) {
    const spans = [['2016-05-17', '2016-06-17'], ['2016-03-17', '2016-06-17'], ['2016-01-01', '2016-06-17'], ['2015-02-17', '2016-06-17']];
    stage.every(1300, (i) => void guiRelayout(stage.div, { 'xaxis.range': at(spans, i) }));
  }

  return () => stage.dispose();
};

export default mount;
