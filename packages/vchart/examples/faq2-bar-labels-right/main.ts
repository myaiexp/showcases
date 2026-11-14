// FAQ: a right-aligned column of values from an extensionMark text mark
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const NAMES = ['Walmart', 'Amazon', 'Apple', 'CVS', 'Costco', 'Kroger', 'Target', 'Home Depot'];

const mount: Mount = (el, ctx) => {
  const rand = seeded(30);
  const rows = (): { name: string; value: number }[] =>
    NAMES.map((name, i) => ({ name, value: Math.round(200000 / (i + 1.4) + rand() * 15000) }));
  const { vchart, release } = createChart(el, ctx, {
    type: 'bar',
    direction: 'horizontal',
    data: [{ id: 'barData', values: rows() }],
    xField: 'value',
    yField: 'name',
    padding: { right: 70 },
    axes: [{ orient: 'bottom', visible: false }],
    label: { visible: false },
    extensionMark: [
      {
        type: 'text',
        dataId: 'barData',
        visible: true,
        style: {
          text: (d: { value: number }) => d.value.toLocaleString('en'),
          fontSize: 12,
          fill: '#69b1ff',
          textBaseline: 'middle',
          textAlign: 'right',
          // Right edge of the plot, plus a margin; the row centre from the band scale.
          x: (_d: unknown, c: { getRegion: () => { getLayoutRect: () => { width: number } } }) => c.getRegion().getLayoutRect().width + 64,
          y: (d: { name: string }, c: { valueToY: (v: string[]) => number; yBandwidth: () => number }) =>
            c.valueToY([d.name]) + c.yBandwidth() / 2,
        },
      },
    ],
  } as unknown as ISpec);
  let alive = true;
  const stop = every(1800, () => {
    if (alive) void vchart.updateData('barData', rows());
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
