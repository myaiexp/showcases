// FAQ: the percentage labels of a funnel are transformLabel; its style.fill sets their colour
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const COLORS = ['#ffd666', '#ff7875', '#95de64', '#69c0ff'];
interface S {
  color: string;
}

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { color: COLORS[0] ?? '#ffd666' },
    previewMs: 1400,
    step: (_s, i) => ({ color: COLORS[i % COLORS.length] ?? '#fff' }),
    controls: (bar, live) => {
      select(bar, 'Percentage colour', COLORS, (v) => live.set({ color: v }));
    },
    build: (s): ISpec => ({
      type: 'funnel',
      categoryField: 'name',
      valueField: 'value',
      isTransform: true,
      isCone: false,
      data: [
        {
          id: 'funnel',
          values: [
            { name: 'Sent', value: 5676 },
            { name: 'Viewed', value: 3872 },
            { name: 'Clicked', value: 1668 },
            { name: 'Add to cart', value: 610 },
            { name: 'Purchased', value: 565 },
          ],
        },
      ],
      label: { visible: true, style: { fill: '#ffffff' } },
      // The conversion percentage between two layers.
      transformLabel: { visible: true, style: { fill: s.color, fontWeight: 'bold' } },
      outerLabel: { visible: !ctx.preview, style: { fill: '#cccccc' } },
    }),
  });

export default mount;
