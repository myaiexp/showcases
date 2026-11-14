// Waterfall total: type end adds the accumulated sum as a last bar
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(22);
const DATES = ['Feb.11', 'Feb.20', 'Feb.25', 'Mar.4', 'Mar.11', 'Mar.19', 'Mar.26', 'Apr.1'];
const next = () => DATES.map((x) => ({ x, y: Math.round((rand() - 0.3) * 8) || 2 }));

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'waterfall',
      data: { id: 'data', values: next() },
      xField: 'x',
      yField: 'y',
      stackLabel: { style: { fill: '#dddddd' }, valueType: 'absolute', formatMethod: (text: string | string[]) => `${text}%` },
      total: { type: 'end', text: 'Total' },
      legends: { visible: !ctx.preview, orient: 'bottom' },
      axes: [{ orient: 'bottom', type: 'band', paddingInner: 0.4 }],
    } as ISpec,
  });

export default mount;
