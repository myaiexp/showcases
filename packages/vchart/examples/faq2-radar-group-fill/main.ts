// FAQ: area.style.fill as a callback gives each radar group its own fill
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const KEYS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

const mount: Mount = (el, ctx) => {
  const rand = seeded(17);
  const rows = (): { month: string; value: number; type: string }[] =>
    ['A', 'B'].flatMap((type) => KEYS.map((month) => ({ month, type, value: Math.round(25 + rand() * 65) })));
  const { vchart, release } = createChart(el, ctx, {
    type: 'radar',
    data: [{ id: 'd', values: rows() }],
    categoryField: 'month',
    valueField: 'value',
    seriesField: 'type',
    area: {
      visible: true,
      style: {
        // The datum of an area is the group's first row; its type picks the colour.
        fill: (d: { type: string }) => (d.type === 'A' ? '#ffd666' : '#40a9ff'),
        fillOpacity: 0.35,
      },
    },
    line: { style: { stroke: (d: { type: string }) => (d.type === 'A' ? '#ffd666' : '#40a9ff') } },
    legends: { visible: !ctx.preview, orient: 'bottom' },
  } as unknown as ISpec);
  let alive = true;
  const stop = every(1800, () => {
    if (alive) void vchart.updateData('d', rows());
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
