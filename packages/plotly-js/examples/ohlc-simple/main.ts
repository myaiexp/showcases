// An ohlc trace: a vertical bar a day with open and close ticks
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { appleOhlc } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const d = await appleOhlc('2017-01-17', '2017-02-10');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        x: d.x, open: d.open, high: d.high, low: d.low, close: d.close,
        decreasing: { line: { color: '#7F7F7F' } },
        increasing: { line: { color: '#17BECF' } },
        type: 'ohlc',
        xaxis: 'x',
        yaxis: 'y',
      },
    ],
    {
      template: stage.template,
      dragmode: 'zoom',
      showlegend: false,
      xaxis: { autorange: true, rangeslider: { visible: !stage.preview, range: ['2017-01-17 12:00', '2017-02-10 12:00'] }, title: { text: stage.preview ? '' : 'Date' }, type: 'date' },
      yaxis: { autorange: true, type: 'linear' },
    },
    stage.config,
  );

  const width = (v: number): void => void Plotly.restyle(stage.div, { 'line.width': v });
  if (stage.bar) slider(stage.bar, 'line.width', [1, 6, 0.5], 2, width);
  else stage.every(160, (i) => width(1 + 2.5 * (1 + Math.sin(i / 6))));

  return () => stage.dispose();
};

export default mount;
