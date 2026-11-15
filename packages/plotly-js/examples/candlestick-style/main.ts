// Candlestick styling: whisker width, line width and a split hover label
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { Fx } from '../../shared/fx.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { appleOhlc } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const d = await appleOhlc('2017-01-04', '2017-02-15');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        x: d.x, open: d.open, high: d.high, low: d.low, close: d.close,
        type: 'candlestick',
        whiskerwidth: 0.5,
        line: { width: 2 },
        increasing: { line: { color: '#34d399' }, fillcolor: 'rgba(52,211,153,0.35)' },
        decreasing: { line: { color: '#fb7185' }, fillcolor: 'rgba(251,113,133,0.35)' },
        hoverlabel: { split: true },
      },
    ],
    { template: stage.template, showlegend: false, xaxis: { rangeslider: { visible: false } } },
    stage.config,
  );

  if (stage.bar) {
    slider(stage.bar, 'whiskerwidth', [0, 1, 0.1], 0.5, (v) => void Plotly.restyle(stage.div, { whiskerwidth: v }));
    slider(stage.bar, 'line.width', [1, 5, 0.5], 2, (v) => void Plotly.restyle(stage.div, { 'line.width': v }));
    toggle(stage.bar, 'hoverlabel.split', true, (v) => void Plotly.restyle(stage.div, { 'hoverlabel.split': v }));
  } else {
    stage.every(1000, (i) => Fx.hover(stage.div, { curveNumber: 0, pointNumber: (i * 3) % d.x.length }));
  }

  return () => stage.dispose();
};

export default mount;
