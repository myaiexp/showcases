// A zoom handler that reads the new date range and draws the visible mean as a shape
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { output, sig } from '../../shared/events-kit.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { relayout } from '../../shared/basic-util.ts';
import { guiRelayout } from '../../shared/fund-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('2014_apple_stock.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 400 });
  const out = output(stage, el);
  const x = unpack(rows, 'AAPL_x');
  const y = unpackNum(rows, 'AAPL_y');

  await Plotly.newPlot(
    stage.div,
    [{ x, y, type: 'scatter', mode: 'lines', line: { color: '#60a5fa' } }],
    { template: stage.template },
    stage.config,
  );

  stage.div.on('plotly_relayout', (d) => {
    const e = d as unknown as Record<string, unknown>;
    // Drawing the shape raises plotly_relayout too: only axis range keys count as a zoom.
    if (!('xaxis.range[0]' in e) && !('xaxis.range' in e) && !e['xaxis.autorange']) return;
    const range = (e['xaxis.range'] as string[] | undefined) ?? [e['xaxis.range[0]'] as string, e['xaxis.range[1]'] as string];
    const lo = e['xaxis.autorange'] ? x[0]! : String(range[0]).slice(0, 10);
    const hi = e['xaxis.autorange'] ? x[x.length - 1]! : String(range[1]).slice(0, 10);
    const seen = y.filter((_, i) => x[i]! >= lo && x[i]! <= hi);
    if (!seen.length) return;
    const mean = seen.reduce((s, v) => s + v, 0) / seen.length;
    out.set(`${lo} to ${hi}: ${seen.length} days in view, mean ${sig(mean)}`);
    void relayout(stage.div, { shapes: [{ type: 'line', xref: 'paper', x0: 0, x1: 1, yref: 'y', y0: mean, y1: mean, line: { color: '#f59e0b', dash: 'dash', width: 2 } }] });
  });

  const spans: (string[] | null)[] = [['2014-02-01', '2014-04-01'], ['2014-06-15', '2014-10-15'], ['2014-10-01', '2014-12-31'], null];
  if (stage.preview) {
    stage.every(1400, (i) => {
      const s = spans[i % spans.length];
      void guiRelayout(stage.div, s ? { 'xaxis.range': s } : { 'xaxis.autorange': true });
    });
  }

  return () => stage.dispose();
};

export default mount;
