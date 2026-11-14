// A horizontal box plot with separate colors for box, median and corners
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { boxRows, seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(77);
const next = () => boxRows(rand, ['Spring', 'Summer', 'Autumn', 'Winter']);

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'boxPlot',
      data: [{ id: 'data', values: next() }],
      direction: 'horizontal',
      yField: 'x',
      minField: 'min',
      q1Field: 'q1',
      medianField: 'median',
      q3Field: 'q3',
      maxField: 'max',
      boxPlot: {
        style: {
          boxWidth: 28,
          lineWidth: 2,
          boxFill: 'rgba(98,205,255,0.35)',
          boxStroke: '#62cdff',
          medianStroke: '#ffd166',
          boxCornerRadius: 6,
        },
      },
    } as ISpec,
  });

export default mount;
