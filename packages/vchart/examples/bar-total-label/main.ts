// Stack totals: totalLabel, its position and a formatMethod
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { grouped, seeded } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = grouped(seeded(61), ['Q1', 'Q2', 'Q3', 'Q4'], ['Web', 'Store', 'Phone'], 10, 50);

const mount: Mount = (el, ctx) =>
  mountLive<{ position: 'top' | 'bottom' }>(el, ctx, {
    initial: { position: 'top' },
    build: ({ position }) =>
      ({
        type: 'bar',
        data: [{ id: 'data', values }],
        xField: 'cat',
        yField: 'value',
        seriesField: 'group',
        stack: true,
        legends: { visible: !ctx.preview },
        totalLabel: {
          visible: true,
          position,
          formatMethod: (text: string) => `${text} k`,
          style: { fontWeight: 'bold' },
        },
      }) as ISpec,
    controls: (bar, live) => {
      select(bar, 'totalLabel.position', ['top', 'bottom'], (v) => live.set({ position: v as 'top' | 'bottom' }));
    },
    step: (s) => ({ position: s.position === 'top' ? 'bottom' : 'top' }),
    previewMs: 1800,
  });

export default mount;
