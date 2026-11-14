// Rose label.position and offsetRadius
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const PRODUCTS = [
  { product: 'Digital', value: 70 }, { product: 'Daily', value: 50 }, { product: 'Food', value: 80 },
  { product: 'Clothing', value: 45 }, { product: 'Books', value: 30 }, { product: 'Toys', value: 55 },
];
const POSITIONS = ['outside', 'inside', 'inside-outer', 'inside-inner'];

const mount: Mount = (el, ctx) =>
  mountLive<{ position: string; offset: number }>(el, ctx, {
    initial: { position: 'inside-outer', offset: 0 },
    previewMs: 1500,
    step: (_s, i) => ({ position: POSITIONS[i % 4] as string, offset: i % 8 >= 4 ? -12 : 0 }),
    build: (s, preview) =>
      ({
        type: 'rose',
        data: [{ id: 'd', values: PRODUCTS }],
        categoryField: 'product',
        valueField: 'value',
        seriesField: 'product',
        outerRadius: 0.8,
        innerRadius: 0.2,
        legends: { visible: false },
        label: {
          visible: true,
          position: s.position,
          offsetRadius: s.offset,
          style: { fontSize: preview ? 10 : 13, fontWeight: 'bold' },
        },
      }) as never,
    controls: (bar, live) => {
      select(bar, 'position', POSITIONS, (v) => live.set({ position: v })).value = 'inside-outer';
      slider(bar, 'offsetRadius', [-40, 40, 2], live.state.offset, (v) => live.set({ offset: v }));
    },
  });

export default mount;
