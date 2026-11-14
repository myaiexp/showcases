// dataZoom zoomLock fixes the window size; minSpan and maxSpan bound it
import type { Mount } from '@/types.ts';
import { createChart, controlBar, every, select } from '../../shared/chart.ts';
import { walk, windowComponent } from '../../shared/components-data.ts';

type Mode = 'free' | 'zoomLock' | 'minSpan 0.3 / maxSpan 0.5';

const build = (mode: Mode) => ({
  type: 'line' as const,
  data: [{ id: 'd', values: walk(60, 4) }],
  xField: 'x',
  yField: 'y',
  axes: [{ orient: 'bottom' as const, label: { autoHide: true } }, { orient: 'left' as const }],
  dataZoom: [
    {
      orient: 'bottom' as const,
      start: 0.2,
      end: 0.5,
      zoomLock: mode === 'zoomLock',
      ...(mode === 'free' ? {} : mode === 'zoomLock' ? {} : { minSpan: 0.3, maxSpan: 0.5 }),
    },
  ],
});

const mount: Mount = (el, ctx) => {
  let mode: Mode = ctx.preview ? 'zoomLock' : 'free';
  const chart = createChart(el, ctx, build(mode));
  const { vchart, release } = chart;
  let alive = true;
  // Try to stretch the window to a random-looking [a, b]; the component decides what survives.
  let t = 0;
  const stop = every(ctx.preview ? 700 : 1000, () => {
    t += 1;
    const a = 0.05 + 0.15 * ((t * 7) % 5) / 4;
    const b = a + [0.15, 0.6, 0.3, 0.7][t % 4]!;
    windowComponent(vchart, 'dataZoom')?.setStartAndEnd(a, Math.min(1, b));
  });
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'mode', ['free', 'zoomLock', 'minSpan 0.3 / maxSpan 0.5'], (v) => {
      mode = v as Mode;
      if (alive) void vchart.updateSpec(build(mode));
    });
  }
  return () => {
    stop();
    alive = false;
    release();
  };
};

export default mount;
