// An OHLC chart with an annotation arrow and a shaded rectangle
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { appleOhlc } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const d = await appleOhlc('2017-01-17', '2017-02-10');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });

  const annotation = { x: '2017-01-31', y: 0.9, xref: 'x', yref: 'paper', text: 'largest movement', font: { color: 'magenta' }, showarrow: true, xanchor: 'right', ax: -20, ay: 0 } as const;
  const shape = { type: 'rect', xref: 'x', yref: 'paper', x0: '2017-01-31', y0: 0, x1: '2017-02-01', y1: 1, fillcolor: '#d3d3d3', opacity: 0.2, line: { width: 0 } } as const;

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
      annotations: [annotation],
      shapes: [shape],
    },
    stage.config,
  );

  const show = (v: boolean): void => void Plotly.relayout(stage.div, { annotations: v ? [annotation] : [], shapes: v ? [shape] : [] });
  if (stage.bar) toggle(stage.bar, 'annotation and shape', true, show);
  else stage.every(1400, (i) => show(i % 2 === 0));

  return () => stage.dispose();
};

export default mount;
