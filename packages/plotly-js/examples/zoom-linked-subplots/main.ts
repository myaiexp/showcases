// Zoom one subplot and a plotly_relayout handler applies the range to the other
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { button } from '../../shared/controls.ts';
import { guiRelayout } from '../../shared/fund-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('2014_apple_stock.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 440 });
  const x = unpack(rows, 'AAPL_x');
  const y = unpackNum(rows, 'AAPL_y');
  const change = y.map((v, i) => (i ? v - (y[i - 1] ?? v) : 0));

  await Plotly.newPlot(
    stage.div,
    [
      { x, y, type: 'scatter', mode: 'lines', name: 'close' },
      { x, y: change, type: 'bar', name: 'change', xaxis: 'x2', yaxis: 'y2', marker: { color: change.map((c) => (c >= 0 ? '#34d399' : '#fb7185')) } },
    ],
    {
      template: stage.template,
      showlegend: false,
      xaxis: { anchor: 'y' },
      yaxis: { domain: [0.42, 1] },
      xaxis2: { anchor: 'y2' },
      yaxis2: { domain: [0, 0.34] },
    } as Partial<Layout>,
    stage.config,
  );

  // An event from one axis sets the other; the equality check stops the echo.
  stage.div.on('plotly_relayout', (d) => {
    const e = d as unknown as Record<string, unknown>;
    const from = ['xaxis', 'xaxis2'].find((a) => `${a}.range[0]` in e || `${a}.autorange` in e);
    if (!from) return;
    const to = from === 'xaxis' ? 'xaxis2' : 'xaxis';
    const full = stage.div as unknown as { _fullLayout: Record<string, { range: unknown[] }> };
    const [a, b] = full._fullLayout[from]!.range;
    const [c, d2] = full._fullLayout[to]!.range;
    if (a === c && b === d2) return;
    void guiRelayout(stage.div, e[`${from}.autorange`] ? { [`${to}.autorange`]: true } : { [`${to}.range`]: [a, b] });
  });

  const spans: (string[] | null)[] = [['2014-03-01', '2014-05-15'], ['2014-08-01', '2014-10-01'], null];
  const zoom = (i: number): void => {
    const s = spans[i % spans.length];
    void guiRelayout(stage.div, s ? { 'xaxis.range': s } : { 'xaxis.autorange': true });
  };
  if (stage.preview) stage.every(1500, zoom);
  if (stage.bar) {
    let i = 0;
    button(stage.bar, 'Zoom the top plot to the next span', () => zoom(i++));
  }

  return () => stage.dispose();
};

export default mount;
