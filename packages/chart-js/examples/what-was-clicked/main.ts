// Click a bar and read which one with getElementsAtEventForMode
import type { ScriptableContext } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, every } from '../../shared/stage.ts';
import { log } from '../../shared/controls.ts';
import { ghostCursor } from '../../shared/config-data.ts';
import { C, alpha } from '../../shared/data.ts';

const FLAVOURS = [
  ['Vanilla', 118],
  ['Chocolate', 134],
  ['Pistachio', 62],
  ['Strawberry', 91],
  ['Mango', 76],
  ['Salted caramel', 105],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const note = caption(el, 'click a bar');
  const write = ctx.preview ? null : log(el, 5);
  const ghost = ghostCursor();
  let picked = -1;

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: FLAVOURS.map((f) => f[0]),
      datasets: [
        {
          label: 'Scoops sold today',
          data: FLAVOURS.map((f) => f[1]),
          // Scriptable colour: the clicked bar is amber.
          backgroundColor: (c: ScriptableContext<'bar'>) => alpha(c.dataIndex === picked ? C.amber : C.blue, 0.7),
          borderRadius: 3,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { x: { ticks: { maxRotation: 0, font: { size: ctx.preview ? 9 : 12 } } } },
      plugins: { legend: { display: !ctx.preview } },
      // api.md § getElementsAtEventForMode: ask the chart what is under the event.
      onClick(event, _active, c) {
        const points = c.getElementsAtEventForMode(event as unknown as Event, 'nearest', { intersect: true }, true);
        const first = points[0];
        picked = first ? first.index : -1;
        c.update('none');
        if (!first) {
          note.textContent = 'you clicked empty space';
          write?.('no bar under the pointer');
          return;
        }
        const label = c.data.labels?.[first.index];
        const value = c.data.datasets[first.datasetIndex]?.data[first.index];
        note.textContent = `${label}: ${value} scoops`;
        write?.(`clicked ${label} (dataset ${first.datasetIndex}, index ${first.index}) = ${value}`);
      },
    },
    plugins: ctx.preview ? [ghost.plugin] : [],
  });

  // The card clicks for you: a fake pointer glides to each bar in turn, then a click.
  let step = 0;
  const stop = ctx.preview
    ? every(1500, () => {
        const meta = chart.getDatasetMeta(0);
        const bar = meta.data[step++ % meta.data.length]!;
        const { x, y, base } = bar.getProps(['x', 'y', 'base']);
        ghost.move(chart, x, (y + base) / 2, 'click');
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
