// A candlestick trace from open, high, low and close, with a rangeslider below
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { appleOhlc } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const d = await appleOhlc('2017-01-04', '2017-02-15');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        x: d.x, open: d.open, high: d.high, low: d.low, close: d.close,
        decreasing: { line: { color: '#7F7F7F' } },
        increasing: { line: { color: '#17BECF' } },
        line: { color: 'rgba(31,119,180,1)' },
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y',
      },
    ],
    {
      template: stage.template,
      dragmode: 'zoom',
      showlegend: false,
      xaxis: {
        autorange: true,
        range: ['2017-01-03 12:00', '2017-02-15 12:00'],
        rangeslider: { visible: !stage.preview, range: ['2017-01-03 12:00', '2017-02-15 12:00'] },
        title: { text: stage.preview ? '' : 'Date' },
        type: 'date',
      },
      yaxis: { autorange: true, type: 'linear' },
    },
    stage.config,
  );

  // Cards slide a 15-candle window along the series.
  if (stage.preview) {
    stage.every(500, (i) => {
      const from = i % (d.x.length - 15);
      void Plotly.relayout(stage.div, { 'xaxis.range': [`${d.x[from]} 12:00`, `${d.x[from + 14]} 12:00`], 'yaxis.autorange': true });
    });
  }

  return () => stage.dispose();
};

export default mount;
