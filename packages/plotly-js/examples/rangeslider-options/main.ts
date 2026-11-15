// rangeslider attributes through relayout: thickness, bgcolor, autorange, yaxis.rangemode
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { at } from '../../shared/events-kit.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { relayout } from '../../shared/basic-util.ts';
import { guiRelayout } from '../../shared/fund-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('finance-charts-apple.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });
  const x = unpack(rows, 'Date');

  await Plotly.newPlot(
    stage.div,
    [{ type: 'scatter', mode: 'lines', x, y: unpackNum(rows, 'AAPL.Close'), line: { color: '#34d399' } }],
    {
      template: stage.template,
      xaxis: { range: ['2016-01-01', '2016-06-01'], rangeslider: { thickness: stage.preview ? 0.2 : 0.15, bgcolor: '#171a21', autorange: true, yaxis: { rangemode: 'match' } } },
    } as unknown as Partial<Layout>,
    stage.config,
  );

  if (stage.bar) {
    const bar = stage.bar;
    slider(bar, 'thickness', [0.05, 0.4, 0.01], 0.15, (v) => void relayout(stage.div, { 'xaxis.rangeslider.thickness': v }));
    select(bar, 'bgcolor', ['#171a21', '#1e3a5f', '#4a2038'], '#171a21', (v) => void relayout(stage.div, { 'xaxis.rangeslider.bgcolor': v }));
    toggle(bar, 'autorange', true, (v) => void relayout(stage.div, { 'xaxis.rangeslider.autorange': v }));
    select(bar, 'yaxis.rangemode', ['match', 'auto', 'fixed'], 'match', (v) => void relayout(stage.div, { 'xaxis.rangeslider.yaxis.rangemode': v }));
  }
  if (stage.preview) {
    const spans = [['2015-03-01', '2015-06-01'], ['2015-08-01', '2016-01-01'], ['2016-01-01', '2016-06-01']];
    stage.every(1400, (i) => void guiRelayout(stage.div, { 'xaxis.range': at(spans, i) }));
  }

  return () => stage.dispose();
};

export default mount;
