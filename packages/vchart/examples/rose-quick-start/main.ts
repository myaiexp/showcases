// Rose quick start: sector angle is fixed per category, valueField sets the sector radius
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { jitterer } from '../../shared/polar-data.ts';

const PRODUCTS = [
  { product: 'Digital', value: 70 },
  { product: 'Daily needs', value: 50 },
  { product: 'Food', value: 80 },
  { product: 'Clothing', value: 45 },
  { product: 'Books', value: 30 },
  { product: 'Toys', value: 55 },
];

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, {
    type: 'rose',
    data: [{ id: 'sales', values: PRODUCTS }],
    categoryField: 'product',
    valueField: 'value',
    seriesField: 'product',
    outerRadius: 0.9,
    legends: { visible: !ctx.preview, orient: 'left' },
    label: { visible: true },
  });
  // Categories keep their angle; only the radius of each petal changes with the new values.
  const next = jitterer(PRODUCTS.map((d) => ({ ...d })), 8, 0.9);
  const stop = every(2000, () => {
    void vchart.updateData('sales', next());
  });
  return () => {
    stop();
    release();
  };
};

export default mount;
