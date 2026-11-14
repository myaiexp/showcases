// Stacked area totals: totalLabel shows the sum above each x position
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { seeded, trends } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(64);
const next = () => trends(rand, ['2019', '2020', '2021', '2022', '2023'], ['Rent', 'Food', 'Travel'], 10, 40);

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'area',
      data: [{ id: 'data', values: next() }],
      xField: 'x',
      yField: 'value',
      seriesField: 'group',
      stack: true,
      point: { visible: false },
      legends: { visible: !ctx.preview, orient: 'top' },
      totalLabel: { visible: true, style: { fontWeight: 'bold' } },
    } as ISpec,
  });

export default mount;
