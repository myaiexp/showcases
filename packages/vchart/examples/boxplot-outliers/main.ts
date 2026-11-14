// Box plot outliers: outliersField and outliersStyle
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select, slider } from '../../shared/chart.ts';
import { boxRows, seeded } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = boxRows(seeded(48), ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);

const mount: Mount = (el, ctx) =>
  mountLive<{ size: number; on: boolean }>(el, ctx, {
    initial: { size: 10, on: true },
    mode: 'rebuild',
    build: ({ size, on }) =>
      ({
        type: 'boxPlot',
        data: [{ id: 'data', values }],
        xField: 'x',
        minField: 'min',
        q1Field: 'q1',
        medianField: 'median',
        q3Field: 'q3',
        maxField: 'max',
        ...(on ? { outliersField: 'outliers' } : {}),
        outliersStyle: { fill: '#ff7a59', size },
      }) as ISpec,
    controls: (bar, live) => {
      select(bar, 'outliersField', ['on', 'off'], (v) => live.set({ on: v === 'on' }));
      slider(bar, 'outliersStyle.size', [4, 24, 1], 10, (size) => live.set({ size }));
    },
    step: (_s, i) => ({ on: i % 4 !== 3, size: [6, 12, 20][i % 3] ?? 10 }),
    previewMs: 1300,
  });

export default mount;
