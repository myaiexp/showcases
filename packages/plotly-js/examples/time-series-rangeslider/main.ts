// A time series with a range slider and 1m, 6m and all range-selector buttons
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { appleOhlc } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const d = await appleOhlc();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'scatter', mode: 'lines', name: 'AAPL High', x: d.x, y: d.high, line: { color: '#17BECF' } },
      { type: 'scatter', mode: 'lines', name: 'AAPL Low', x: d.x, y: d.low, line: { color: '#7F7F7F' } },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Time Series with Rangeslider' },
      showlegend: false,
      xaxis: {
        autorange: true,
        range: ['2015-02-17', '2017-02-16'],
        rangeselector: {
          font: { color: '#e6e8ee', size: stage.preview ? 8 : 12 },
          bgcolor: '#232835',
          activecolor: '#f59e0b',
          y: stage.preview ? 1.04 : 1.1,
          buttons: [
            { count: 1, label: '1m', step: 'month', stepmode: 'backward' },
            { count: 6, label: '6m', step: 'month', stepmode: 'backward' },
            { step: 'all' },
          ],
        },
        rangeslider: { visible: !stage.preview, range: ['2015-02-17', '2017-02-16'] },
        type: 'date',
      },
      yaxis: { autorange: true, type: 'linear' },
    },
    stage.config,
  );

  // Cards stand in for the selector buttons: one month, six months, everything.
  if (stage.preview) {
    const ranges: [string, string][] = [['2017-01-16', '2017-02-16'], ['2016-08-16', '2017-02-16'], ['2015-02-17', '2017-02-16']];
    stage.every(1400, (i) => void Plotly.relayout(stage.div, { 'xaxis.range': ranges[i % 3], 'yaxis.autorange': true }));
  }

  return () => stage.dispose();
};

export default mount;
