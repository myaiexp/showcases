// Grouped box plot: xField as [category, group], one color per group
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { boxRows, seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(15);
const REGIONS = ['Africa', 'South Asia', 'MENA', 'Latin America', 'East Asia'];
const next = () => boxRows(rand, REGIONS, ['High income', 'Low income']);

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'boxPlot',
      data: [{ id: 'data', values: next() }],
      xField: ['x', 'group'],
      seriesField: 'group',
      minField: 'min',
      q1Field: 'q1',
      medianField: 'median',
      q3Field: 'q3',
      maxField: 'max',
      color: ['#62CDFF', '#C5528D'],
      legends: [{ visible: !ctx.preview, orient: 'top' }],
      axes: [{ orient: 'bottom', label: { visible: !ctx.preview } }],
    } as ISpec,
  });

export default mount;
