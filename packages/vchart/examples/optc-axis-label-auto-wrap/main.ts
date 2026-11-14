// Axis label autoWrap: long band labels wrap onto lines, lineClamp caps the lines
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const NAMES = ['Customer satisfaction survey', 'Average delivery time in days', 'Returned and refunded items', 'Monthly active subscribers'];
const VALUES = [78, 64, 31, 92];

interface S { wrap: boolean; clamp: number }

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { wrap: true, clamp: 3 },
    previewMs: 1500,
    step: (s, i) => ({ wrap: i % 4 !== 0, clamp: [1, 2, 3][i % 3] as number }),
    build: (s) => ({
      type: 'bar',
      data: [{ id: 'd', values: NAMES.map((name, i) => ({ name, value: VALUES[i] })) }],
      xField: 'name',
      yField: 'value',
      axes: [
        {
          orient: 'bottom',
          label: { autoWrap: s.wrap, autoLimit: !s.wrap, style: { lineClamp: s.clamp, fontSize: 12 } },
        },
        { orient: 'left' },
      ],
    }),
    controls: (bar, live) => {
      select(bar, 'autoWrap', ['true', 'false'], (v) => live.set({ wrap: v === 'true' }));
      select(bar, 'lineClamp', ['1', '2', '3'], (v) => live.set({ clamp: Number(v) })).value = '3';
    },
  });

export default mount;
