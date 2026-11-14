// Hover a bar: a log of the context its scriptable colour was called with
import type { ScriptableContext } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage } from '../../shared/stage.ts';
import { log } from '../../shared/controls.ts';
import { autoHover } from '../../shared/hover.ts';
import { C, WEEKDAYS, alpha } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { previewHeight: 160, height: 320 });
  const label = ctx.preview ? caption(el) : null;
  const write = ctx.preview ? null : log(el, 8);
  let last = '';

  // Reads the fields options.md § Option Context lists for the `data` level.
  const colour = (c: ScriptableContext<'bar'>): string => {
    if (c.active) {
      const parsed = c.parsed as { x: number; y: number };
      const text =
        `type: '${c.type}'  dataIndex: ${c.dataIndex}  datasetIndex: ${c.datasetIndex}  raw: ${c.raw as number}` +
        `  parsed.y: ${parsed.y}  mode: '${c.mode}'  active: ${c.active}`;
      if (text !== last) {
        last = text;
        write?.(text);
        if (label) label.textContent = `dataIndex: ${c.dataIndex}  raw: ${c.raw as number}  active: true`;
      }
    }
    return alpha(c.active ? C.amber : C.blue, c.active ? 0.9 : 0.55);
  };

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: WEEKDAYS,
      datasets: [{ label: 'Cups sold', data: [42, 38, 51, 47, 66, 89, 73], backgroundColor: colour }],
    },
    options: { maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: !ctx.preview } } },
  });
  if (!ctx.preview) write?.('Hover a bar to see its context.');

  const stop = ctx.preview ? autoHover(chart, 1300) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
