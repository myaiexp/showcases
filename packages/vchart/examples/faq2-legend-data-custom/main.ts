// FAQ: legends.data maps the computed items: add a value, change one item's shape
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const pieData = [
  { type: 'Tradition Industries', value: 61 },
  { type: 'Business Companies', value: 38 },
  { type: 'Customer-facing', value: 24 },
];
const VALUES: Record<string, number> = Object.fromEntries(pieData.map((d) => [d.type, d.value]));

const MODES = ['plain', 'value column', 'value + one diamond'] as const;
interface S {
  mode: (typeof MODES)[number];
}

type LegendItem = { label: string; value?: unknown; shape: Record<string, unknown> };

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { mode: 'value column' },
    mode: 'rebuild',
    previewMs: 1600,
    step: (s) => ({ mode: MODES[(MODES.indexOf(s.mode) + 1) % 3] as S['mode'] }),
    controls: (bar, live) => {
      select(bar, 'legend items', MODES, (v) => live.set({ mode: v as S['mode'] })).value = live.state.mode;
    },
    build: (s): ISpec =>
      ({
        type: 'pie',
        data: [{ id: 'd', values: pieData }],
        categoryField: 'type',
        valueField: 'value',
        outerRadius: 0.8,
        legends: {
          visible: true,
          orient: ctx.preview ? 'bottom' : 'right',
          item: {
            shape: { style: { symbolType: 'square' } },
            label: { style: { fill: '#aab' } },
            // The value text is styled apart from the label.
            value: { style: { fontWeight: 'bold', fill: '#ffd666' } },
            space: 10,
          },
          data: (items: LegendItem[]) =>
            items.map((it) => ({
              ...it,
              ...(s.mode === 'plain' ? {} : { value: VALUES[it.label] }),
              ...(s.mode === 'value + one diamond' && it.label === 'Business Companies'
                ? { shape: { ...it.shape, symbolType: 'diamond' } }
                : {}),
            })),
        },
      }) as unknown as ISpec,
  });

export default mount;
