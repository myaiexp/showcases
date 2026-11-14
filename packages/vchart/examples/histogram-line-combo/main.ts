// Histogram plus a line: type common, two series on the same data, two value axes
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { binCounts, sample, seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(41);
const next = () => binCounts(sample(rand, 500, 60, 16), 20, 100, 10).map((b) => ({ ...b, type: 'trend' }));

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    dataId: 'id0',
    spec: {
      type: 'common',
      seriesField: 'color',
      data: [{ id: 'id0', values: next() }],
      series: [
        { type: 'bar', id: 'bar', dataIndex: 0, xField: 'x0', x2Field: 'x1', yField: 'frequency' },
        {
          type: 'line',
          id: 'line',
          dataIndex: 0,
          seriesField: 'type',
          xField: 'x0',
          yField: 'frequency',
          stack: false,
          point: { visible: false },
          line: { style: { lineWidth: 2 } },
        },
      ],
      axes: [
        { orient: 'left', seriesIndex: [0] },
        { orient: 'right', seriesId: ['line'], grid: { visible: false } },
        { orient: 'bottom', label: { visible: true }, type: 'band' },
      ],
      legends: { visible: !ctx.preview, orient: 'bottom' },
    } as ISpec,
  });

export default mount;
