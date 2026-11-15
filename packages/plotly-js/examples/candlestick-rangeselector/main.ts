// A range selector: buttons that jump a candlestick chart to 1m, 6m or all
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { appleOhlc } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const d = await appleOhlc();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [{ x: d.x, open: d.open, high: d.high, low: d.low, close: d.close, increasing: { line: { color: '#e6e8ee' } }, decreasing: { line: { color: 'red' } }, type: 'candlestick', xaxis: 'x', yaxis: 'y' }],
    {
      template: stage.template,
      dragmode: 'zoom',
      showlegend: false,
      xaxis: {
        autorange: true,
        title: { text: stage.preview ? '' : 'Date' },
        rangeslider: { visible: false },
        rangeselector: {
          x: 0,
          y: stage.preview ? 1.05 : 1.2,
          xanchor: 'left',
          font: { size: 8, color: '#e6e8ee' },
          bgcolor: '#232835',
          activecolor: '#f59e0b',
          buttons: [
            { step: 'month', stepmode: 'backward', count: 1, label: '1 month' },
            { step: 'month', stepmode: 'backward', count: 6, label: '6 months' },
            { step: 'all', label: 'All dates' },
          ],
        },
      },
      yaxis: { autorange: true },
    },
    stage.config,
  );

  // Cards press the buttons for the reader by setting the same ranges the buttons would.
  if (stage.preview) {
    const last = d.x[d.x.length - 1] ?? '';
    const ranges: (string[] | null)[] = [['2017-01-16', last], ['2016-08-16', last], null];
    stage.every(1400, (i) => {
      const r = ranges[i % 3];
      void Plotly.relayout(stage.div, r ? { 'xaxis.range': r, 'yaxis.autorange': true } : { 'xaxis.autorange': true, 'yaxis.autorange': true });
    });
  }

  return () => stage.dispose();
};

export default mount;
