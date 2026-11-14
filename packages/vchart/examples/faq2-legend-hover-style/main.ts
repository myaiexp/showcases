// FAQ: legend item hover: no item background, and a bigger shape in selectedHover/unSelectedHover
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const mount: Mount = (el, ctx) => {
  const rand = seeded(5);
  const rows = (): { x: string; y: number; c: string }[] =>
    Array.from({ length: 8 }, (_, i) =>
      ['Role A', 'Role B'].map((c) => ({ x: `Round ${i + 1}`, y: Math.round(20 + rand() * 50), c })),
    ).flat();
  const spec = {
    type: 'line',
    data: [{ id: 'line', values: rows() }],
    xField: 'x',
    yField: 'y',
    seriesField: 'c',
    legends: {
      visible: true,
      orient: 'bottom',
      item: {
        // The pill behind the item goes away ...
        background: { visible: false },
        shape: {
          state: {
            // ... and the shape grows on hover, selected or not (size in both states).
            selectedHover: { size: 15 },
            unSelectedHover: { size: 15 },
          },
        },
      },
    },
  } as ISpec;
  const { vchart, release } = createChart(el, ctx, spec);
  let alive = true;
  const stop = every(2000, () => {
    if (alive) void vchart.updateData('line', rows());
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
