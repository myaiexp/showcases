// Each frame is a longer slice of the series; fill tozeroy makes the area grow as frames play
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('2014_apple_stock.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 440 });
  const x = unpack(rows, 'AAPL_x');
  const y = unpackNum(rows, 'AAPL_y');
  const n = 100;
  const frames = Array.from({ length: n }, (_, i) => ({ data: [{ x: x.slice(0, i + 1), y: y.slice(0, i + 1) }] }));
  const play = { fromcurrent: true, transition: { duration: 0 }, frame: { duration: 40, redraw: false } };

  await Plotly.newPlot(stage.div, {
    data: [{ x: frames[1]!.data[0]!.x, y: frames[1]!.data[0]!.y, fill: 'tozeroy', type: 'scatter', mode: 'lines', line: { color: 'green' }, fillcolor: 'rgba(34,197,94,0.35)' }],
    layout: {
      template: stage.template,
      title: stage.preview ? undefined : { text: 'Filled-Area Animation' },
      xaxis: { type: 'date', range: [x[0], x[n - 1]] },
      yaxis: { range: [0, 90] },
      margin: stage.preview ? undefined : { b: 120 },
      updatemenus: stage.preview ? [] : [{ x: 0.1, y: 0, yanchor: 'top', xanchor: 'right', showactive: false, direction: 'left', type: 'buttons', pad: { t: 87, r: 10 }, buttons: [{ method: 'animate', args: [null, play], label: 'Play' }, { method: 'animate', args: [[null], { mode: 'immediate', transition: { duration: 0 }, frame: { duration: 0, redraw: false } }], label: 'Pause' }] }],
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
