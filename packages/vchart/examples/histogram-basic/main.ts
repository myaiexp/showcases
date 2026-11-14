// Histogram: xField and x2Field are the interval edges, yField the frequency
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { binCounts, sample, seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(77);
const next = () => binCounts(sample(rand, 400, 50, 18), 0, 100, 10);

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'histogram',
      data: [{ id: 'data', values: next() }],
      xField: 'x0',
      x2Field: 'x1',
      yField: 'frequency',
      bar: { style: { stroke: '#222', lineWidth: 1 } },
      tooltip: {
        mark: {
          title: { value: 'Frequency' },
          content: [{ key: (d: Record<string, unknown>) => `${d.x0} to ${d.x1}`, value: (d: Record<string, unknown>) => String(d.frequency) }],
        },
      },
    } as ISpec,
  });

export default mount;
