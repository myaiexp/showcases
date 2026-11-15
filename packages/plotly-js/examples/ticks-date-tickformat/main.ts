// xaxis.tickformat with d3-time-format directives on Apple's price history
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { pick, relayout } from '../../shared/basic-util.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const FORMATS = ['%d %B (%a)\n %Y', '%b %Y', '%Y-%m-%d', '%B %-d', "%b '%y", '%A\n%d/%m/%Y', '%j (day of year)'] as const;

const mount: Mount = async (el, ctx) => {
  const rows = await csv('finance-charts-apple.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 420 });
  const x = unpack(rows, 'Date');

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'scatter', mode: 'lines', name: 'AAPL High', x, y: unpackNum(rows, 'AAPL.High'), line: { color: '#17BECF' } },
      { type: 'scatter', mode: 'lines', name: 'AAPL Low', x, y: unpackNum(rows, 'AAPL.Low'), line: { color: '#7F7F7F' } },
    ],
    { template: stage.template, title: { text: stage.preview ? '' : 'Time series with custom tickformat' }, xaxis: { tickformat: FORMATS[0] }, showlegend: !stage.preview },
    stage.config,
  );
  if (stage.bar) select(stage.bar, 'xaxis.tickformat', FORMATS, FORMATS[0], (v) => void relayout(stage.div, { 'xaxis.tickformat': v }));
  if (stage.preview) stage.every(1400, (i) => void relayout(stage.div, { 'xaxis.tickformat': pick(FORMATS, i) }));
  return () => stage.dispose();
};

export default mount;
