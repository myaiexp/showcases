// A scatter series filled chunk by chunk with chart.appendData, then reset to start over
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';

const LIMIT = 60000;

// Seeded points around a drifting centre, so each chunk lands in a new region of the plane.
function makeChunker(): (n: number) => number[][] {
  let s = 12345;
  const rnd = (): number => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  let t = 0;
  return (n) =>
    Array.from({ length: n }, () => {
      t += 0.0004;
      const cx = 50 + 35 * Math.cos(t * 3);
      const cy = 50 + 35 * Math.sin(t * 2);
      return [Math.round((cx + (rnd() + rnd() - 1) * 14) * 100) / 100, Math.round((cy + (rnd() + rnd() - 1) * 14) * 100) / 100];
    });
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const readout = document.createElement('div');
  readout.style.cssText = 'font:12px/1.6 monospace;opacity:.9;padding-top:4px';
  if (!ctx.preview) el.append(readout);

  let chunk = ctx.preview ? 1500 : 2000;
  let total = 0;
  let next = makeChunker();

  const reset = (): void => {
    total = 0;
    next = makeChunker();
    // An empty data array restarts the series; the axes are fixed so appended points never move the scale.
    chart.setOption(
      {
        animation: false,
        grid: { top: 8, left: 8, right: 8, bottom: 8 },
        xAxis: { type: 'value', min: 0, max: 100, show: false },
        yAxis: { type: 'value', min: 0, max: 100, show: false },
        series: [{ type: 'scatter', data: [], symbolSize: 3, itemStyle: { opacity: 0.55 }, progressive: 2000 }],
      },
      true,
    );
  };
  reset();

  const append = (): void => {
    if (total >= LIMIT) return;
    // appendData adds to the series without touching the elements already drawn.
    chart.appendData({ seriesIndex: 0, data: next(chunk) });
    total += chunk;
    readout.textContent = `${total} points appended in chunks of ${chunk} (limit ${LIMIT})`;
  };

  const stop = every(ctx.preview ? 400 : 300, () => {
    if (total >= LIMIT) {
      if (ctx.preview) reset();
      return;
    }
    append();
  });

  if (!ctx.preview) {
    select(bar!, 'chunk size', ['500', '2000', '5000'], (v) => {
      chunk = Number(v);
    });
    button(bar!, 'reset', reset);
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
