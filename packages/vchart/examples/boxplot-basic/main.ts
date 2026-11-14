// Box plot: one field each for min, Q1, median, Q3 and max
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { boxRows, seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(5);
const REGIONS = ['Africa', 'South Asia', 'MENA', 'Latin America', 'East Asia', 'Europe'];
const next = () => boxRows(rand, REGIONS);

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'boxPlot',
      data: [{ id: 'data', values: next() }],
      direction: 'vertical',
      xField: 'x',
      minField: 'min',
      q1Field: 'q1',
      medianField: 'median',
      q3Field: 'q3',
      maxField: 'max',
      axes: [{ orient: 'bottom', label: { visible: !ctx.preview } }],
    } as ISpec,
  });

export default mount;
