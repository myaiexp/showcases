// Setting a date range with xaxis.range and a fitted y range
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { appleOhlc } from '../../shared/stat-data.ts';

const RANGES: Record<string, [string, string] | null> = {
  '2016-07-01 to 2016-12-31': ['2016-07-01', '2016-12-31'],
  '2015 Q2': ['2015-04-01', '2015-06-30'],
  '2016 H1': ['2016-01-01', '2016-06-30'],
  'all dates': null,
};

const mount: Mount = async (el, ctx) => {
  const d = await appleOhlc();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 440 });

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'scatter', mode: 'lines', x: d.x, y: d.high, line: { color: '#17BECF' } },
      { type: 'scatter', mode: 'lines', x: d.x, y: d.low, line: { color: '#7F7F7F' } },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Custom Range' },
      showlegend: false,
      xaxis: { range: ['2016-07-01', '2016-12-31'], type: 'date' },
      yaxis: { autorange: true, type: 'linear' },
    },
    stage.config,
  );

  const go = (name: string): void => {
    const r = RANGES[name] ?? null;
    void Plotly.relayout(stage.div, r ? { 'xaxis.range': r, 'yaxis.autorange': true } : { 'xaxis.autorange': true, 'yaxis.autorange': true });
  };
  if (stage.bar) select(stage.bar, 'xaxis.range', Object.keys(RANGES), '2016-07-01 to 2016-12-31', go);
  else stage.every(1500, (i) => go(Object.keys(RANGES)[i % 4] ?? ''));

  return () => stage.dispose();
};

export default mount;
