// Two traces per frame; the high trace fills down to the low one with tonexty
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('finance-charts-apple.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 440 });
  const x = unpack(rows, 'Date');
  const high = unpackNum(rows, 'AAPL.High');
  const low = unpackNum(rows, 'AAPL.Low');
  const n = 100;
  const frames = Array.from({ length: n }, (_, i) => ({
    data: [{ x: x.slice(0, i + 1), y: low.slice(0, i + 1) }, { x: x.slice(0, i + 1), y: high.slice(0, i + 1) }],
  }));
  const play = { fromcurrent: true, transition: { duration: 0 }, frame: { duration: 40, redraw: false } };

  await Plotly.newPlot(stage.div, {
    data: [
      { type: 'scatter', mode: 'lines', name: 'AAPL Low', x: x.slice(0, 6), y: low.slice(0, 6), line: { color: '#cbd5e1' } },
      { type: 'scatter', mode: 'lines', name: 'AAPL High', fill: 'tonexty', fillcolor: 'rgba(148,163,184,0.3)', x: x.slice(0, 6), y: high.slice(0, 6), line: { color: '#94a3b8' } },
    ],
    layout: {
      template: stage.template,
      title: stage.preview ? undefined : { text: 'Multiple Trace Filled-Area Animation' },
      xaxis: { range: [x[0], x[n - 1]], showgrid: false },
      yaxis: { range: [120, 140], showgrid: false },
      showlegend: !stage.preview,
      legend: { orientation: 'h', x: 0.5, y: 1.15, xanchor: 'center' },
      margin: stage.preview ? undefined : { b: 120 },
      updatemenus: stage.preview ? [] : [{ x: 0.5, y: 0, yanchor: 'top', xanchor: 'center', showactive: false, direction: 'left', type: 'buttons', pad: { t: 87, r: 10 }, buttons: [{ method: 'animate', args: [null, play], label: 'Play' }, { method: 'animate', args: [[null], { mode: 'immediate', transition: { duration: 0 }, frame: { duration: 0, redraw: false } }], label: 'Pause' }] }],
    } as unknown as Partial<Layout>,
    frames,
    config: stage.config,
  } as never);

  if (stage.preview) {
    const go = (): void => void Plotly.animate(stage.div, null as never, { ...play, fromcurrent: false } as never).catch(() => {});
    go();
    stage.every(n * 40 + 900, go);
  }

  return () => stage.dispose();
};

export default mount;
