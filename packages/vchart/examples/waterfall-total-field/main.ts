// Waterfall total: type field, rows tagged total, collectCountField sums the last n rows
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(5);
const SECTORS = ['Primary', 'Secondary', 'Tertiary'];
const next = () => [
  ...['Q1', 'Q2', 'Q3'].flatMap((q) => [
    ...SECTORS.map((type) => ({ x: `${q}-${type}`, y: Math.round(20 + rand() * 80), type })),
    { x: q, total: true, collect: 3 },
  ]),
  { x: 'Year', total: true },
];

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'waterfall',
      data: [{ id: 'data', values: next() }],
      xField: 'x',
      yField: 'y',
      seriesField: 'type',
      total: { type: 'field', tagField: 'total', startField: 'start', valueField: 'value', collectCountField: 'collect' },
      stackLabel: { style: { fill: '#dddddd' } },
      legends: { visible: !ctx.preview, orient: 'bottom' },
      axes: [
        { orient: 'left', expand: { max: 0.12 } },
        { orient: 'bottom', type: 'band', paddingInner: 0.4, label: { visible: !ctx.preview, formatMethod: (t: string | string[]) => String(t).split('-').pop() ?? '' } },
      ],
    } as ISpec,
  });

export default mount;
