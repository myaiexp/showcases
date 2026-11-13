// Gradient fills on bars: linear colorStops per series, a colour callback per bar, and global versus local gradients
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { seeded, between, MONTHS } from '../../shared/bar-data.ts';

type Direction = 'vertical' | 'horizontal' | 'diagonal';
const VECTORS: Record<Direction, { x: number; y: number; x2: number; y2: number }> = {
  vertical: { x: 0, y: 1, x2: 0, y2: 0 },
  horizontal: { x: 0, y: 0, x2: 1, y2: 0 },
  diagonal: { x: 0, y: 1, x2: 1, y2: 0 },
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const rand = seeded(21);
  const data = MONTHS.map(() => between(rand, 20, 100));
  let direction: Direction = 'vertical';
  let mode: 'one gradient' | 'colour by value' | 'global' = 'one gradient';

  const apply = (): void => {
    const gradient = (from: string, to: string, global = false): object => ({
      type: 'linear',
      ...VECTORS[direction],
      // colorStops: the colour at each offset (0 to 1) along the gradient vector.
      colorStops: [
        { offset: 0, color: from },
        { offset: 1, color: to },
      ],
      // global: false measures the vector against each bar; true against the whole chart.
      global,
    });
    chart.setOption(
      {
        grid: { top: 16, left: 40, right: 16, bottom: 28 },
        xAxis: { type: 'category', data: MONTHS },
        yAxis: { type: 'value', max: 100 },
        series: {
          type: 'bar',
          data,
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color:
              mode === 'colour by value'
                ? // A callback receives the data item, so each bar picks its own gradient.
                  (p: { value: unknown }): object =>
                    (p.value as number) >= 70 ? gradient('#f9c74f', '#f94144') : gradient('#90e0ef', '#0077b6')
                : gradient('#83bff6', '#188df0', mode === 'global'),
          },
        },
      },
      true,
    );
  };
  apply();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'direction', Object.keys(VECTORS), (v) => {
      direction = v as Direction;
      apply();
    });
    select(bar, 'fill', ['one gradient', 'colour by value', 'global'], (v) => {
      mode = v as typeof mode;
      apply();
    });
  } else {
    const dirs = Object.keys(VECTORS) as Direction[];
    let i = 0;
    stop = every(1600, () => {
      i++;
      direction = dirs[i % dirs.length]!;
      mode = i % 4 === 3 ? 'colour by value' : 'one gradient';
      apply();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
