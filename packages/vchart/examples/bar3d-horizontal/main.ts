// bar3d direction: the same 3D bars drawn vertically or horizontally, with the axes swapped
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { INIT_3D, register3d } from '../../shared/chart3d.ts';
import { mountLive } from '../../shared/live-spec.ts';

const DATA = [
  { month: 'Monday', sales: 22 }, { month: 'Tuesday', sales: 13 }, { month: 'Wednesday', sales: 25 },
  { month: 'Thursday', sales: 29 }, { month: 'Friday', sales: 38 },
];
const DIRS = ['vertical', 'horizontal'];

const mount: Mount = (el, ctx) => {
  register3d('bar3d');
  return mountLive<{ dir: string }>(el, ctx, {
    initial: { dir: 'horizontal' },
    mode: 'rebuild',
    previewMs: 2400,
    chart: { height: 440, init: { ...INIT_3D, options3d: { enable: true, alpha: 0.15, beta: -0.25 } } },
    build: ({ dir }) => {
      const horizontal = dir === 'horizontal';
      return {
        type: 'bar3d',
        direction: dir,
        data: [{ id: 'barData', values: DATA }],
        // In a horizontal chart the category field sits on y and the value field on x.
        xField: horizontal ? 'sales' : 'month',
        yField: horizontal ? 'month' : 'sales',
        bar3d: { style: { length: 20, z: -20 } },
        axes: horizontal
          ? [{ orient: 'left', type: 'band', mode: '3d' }, { orient: 'bottom', type: 'linear', mode: '3d' }]
          : [{ orient: 'bottom', type: 'band', mode: '3d' }, { orient: 'left', type: 'linear', mode: '3d' }],
      } as unknown as ISpec;
    },
    step: (s) => ({ dir: s.dir === 'vertical' ? 'horizontal' : 'vertical' }),
    controls: (bar, live) => {
      select(bar, 'direction', DIRS, (dir) => live.set({ dir })).value = 'horizontal';
    },
  });
};

export default mount;
