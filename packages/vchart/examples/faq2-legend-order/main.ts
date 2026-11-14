// FAQ: legend item order: data order, fields domain + sortIndex, legends.data or legends.reverse
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const AGES = ['Under 5', '5 to 13', '14 to 17', '18 to 24'];
// Rows come with the series field in a mixed order.
const ARRIVAL = ['14 to 17', 'Under 5', '18 to 24', '5 to 13'];
const values = ['AL', 'AK', 'AZ'].flatMap((State, s) =>
  ARRIVAL.map((age, i) => ({ State, age, population: 20 + ((s * 7 + i * 11) % 30) })),
);

const MODES = ['data order', 'fields domain', 'legends.data', 'legends.reverse'] as const;
type Mode = (typeof MODES)[number];
interface S {
  mode: Mode;
}

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { mode: 'data order' },
    mode: 'rebuild',
    previewMs: 1800,
    step: (s) => ({ mode: MODES[(MODES.indexOf(s.mode) + 1) % MODES.length] as Mode }),
    controls: (bar, live) => select(bar, 'order by', MODES, (v) => live.set({ mode: v as Mode })),
    build: (s): ISpec =>
      ({
        type: 'bar',
        data: [
          {
            id: 'pop',
            // The domain orders the series field, and the order of drawing follows it too.
            ...(s.mode === 'fields domain' ? { fields: { age: { domain: AGES, sortIndex: 0 } } } : {}),
            values,
          },
        ],
        xField: 'State',
        yField: 'population',
        seriesField: 'age',
        stack: true,
        legends: {
          visible: true,
          orient: ctx.preview ? 'bottom' : 'right',
          ...(s.mode === 'legends.data' ? { data: (items: unknown[]) => [...items].sort((a, b) => String((a as { label: string }).label).localeCompare(String((b as { label: string }).label))) } : {}),
          ...(s.mode === 'legends.reverse' ? { reverse: true } : {}),
        },
      }) as unknown as ISpec,
  });

export default mount;
