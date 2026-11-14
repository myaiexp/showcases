// Waterfall: each y is a change, bars float on the running total, a legend for up and down
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(15);
const DATES = ['Feb.11', 'Feb.20', 'Feb.25', 'Mar.4', 'Mar.11', 'Mar.19', 'Mar.26', 'Apr.1', 'Apr.8'];
const next = () => DATES.map((x) => ({ x, y: Math.round((rand() - 0.35) * 10) || 1 }));

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'waterfall',
      data: { id: 'data', values: next() },
      xField: 'x',
      yField: 'y',
      stackLabel: { style: { fill: '#dddddd' } },
      legends: { visible: !ctx.preview, orient: 'bottom' },
      axes: [
        { orient: 'left', title: { visible: !ctx.preview, text: 'favorability' }, label: { formatMethod: (v: string | string[]) => `${v}%` } },
        { orient: 'bottom', type: 'band', paddingInner: 0.4, label: { visible: !ctx.preview } },
      ],
    } as ISpec,
  });

export default mount;
