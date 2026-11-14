// FAQ: a chart-level ordinal color scale: range cycles through slices, domain pins colours to categories
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const TYPES = ['oxygen', 'silicon', 'aluminum', 'iron', 'calcium', 'sodium', 'potassium'];
const values = TYPES.map((type, i) => ({ type, value: Math.round(46 / (i + 1) + 3) }));

type Setup = 'three colours, cycled' | 'seven colours' | 'domain pins two';
const SETUPS: Setup[] = ['three colours, cycled', 'seven colours', 'domain pins two'];
interface S {
  setup: Setup;
}

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { setup: SETUPS[0] as Setup },
    mode: 'rebuild',
    previewMs: 1800,
    step: (s) => ({ setup: SETUPS[(SETUPS.indexOf(s.setup) + 1) % 3] as Setup }),
    controls: (bar, live) => select(bar, 'colour setup', SETUPS, (v) => live.set({ setup: v as Setup })),
    build: (s): ISpec => {
      const color =
        s.setup === 'three colours, cycled'
          ? { type: 'ordinal', range: ['#ffd666', '#5cdbd3', '#ff85c0'] }
          : s.setup === 'seven colours'
            ? { type: 'ordinal', range: ['#ffd666', '#5cdbd3', '#ff85c0', '#95de64', '#69b1ff', '#ff9c6e', '#b37feb'] }
            : // Only oxygen and iron are named; the rest take the remaining range colours in order.
              { type: 'ordinal', domain: ['oxygen', 'iron'], range: ['#ff4d4f', '#40a9ff'] };
      return {
        type: 'pie',
        data: [{ id: 'elements', values }],
        valueField: 'value',
        categoryField: 'type',
        outerRadius: 0.85,
        innerRadius: 0.4,
        color,
        legends: { visible: !ctx.preview, orient: 'right' },
        label: { visible: !ctx.preview },
      } as unknown as ISpec;
    },
  });

export default mount;
