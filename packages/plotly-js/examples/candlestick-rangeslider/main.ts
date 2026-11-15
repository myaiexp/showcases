// xaxis.rangeslider on a candlestick: shown or hidden, and how tall it is
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { appleOhlc } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const d = await appleOhlc();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });

  await Plotly.newPlot(
    stage.div,
    [{ x: d.x, open: d.open, high: d.high, low: d.low, close: d.close, increasing: { line: { color: '#e6e8ee' } }, decreasing: { line: { color: 'red' } }, type: 'candlestick', xaxis: 'x', yaxis: 'y' }],
    { template: stage.template, dragmode: 'zoom', showlegend: false, xaxis: { rangeslider: { visible: false } } },
    stage.config,
  );

  const show = (v: boolean): void => void Plotly.relayout(stage.div, { 'xaxis.rangeslider.visible': v });
  if (stage.bar) {
    toggle(stage.bar, 'rangeslider.visible', false, show);
    slider(stage.bar, 'rangeslider.thickness', [0.05, 0.4, 0.01], 0.15, (v) => void Plotly.relayout(stage.div, { 'xaxis.rangeslider.thickness': v }));
  } else {
    stage.every(1500, (i) => show(i % 2 === 1));
  }

  return () => stage.dispose();
};

export default mount;
