// FAQ: make one data point stand out with point style callbacks over the datum
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { pick, walk } from '../../shared/components-data.ts';

const values = walk(12, 17);
const KEYS = values.map((d) => d.x);

const build = (key: string): ISpec => ({
  type: 'line',
  data: [{ id: 'd', values }],
  xField: 'x',
  yField: 'y',
  // size and fill/opacity are visual channels: a callback receives each point's datum.
  point: {
    style: {
      size: (d: Record<string, string>) => (d.x === key ? 18 : 6),
      fill: (d: Record<string, string>) => (d.x === key ? '#f97316' : '#60a5fa'),
      fillOpacity: (d: Record<string, string>) => (d.x === key ? 1 : 0.45),
      stroke: (d: Record<string, string>) => (d.x === key ? '#fff' : undefined),
      lineWidth: (d: Record<string, string>) => (d.x === key ? 2 : 0),
    },
  },
  label: { visible: false },
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build(pick(KEYS, 4)));
  let released = false;
  const apply = (k: string): void => {
    if (!released) void vchart.updateSpec(build(k));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'emphasised point', KEYS, apply).value = pick(KEYS, 4);
  }
  let i = 0;
  const stop = every(1100, () => {
    i += 1;
    if (ctx.preview) apply(pick(KEYS, i));
  });
  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
