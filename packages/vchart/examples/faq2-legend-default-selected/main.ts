// FAQ: legends.defaultSelected picks which series are visible when the chart first draws
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const NAMES = ['Role A', 'Role B', 'Role C', 'Role D'];
const values = Array.from({ length: 8 }, (_, i) =>
  NAMES.map((c, k) => ({ x: `Round ${i + 1}`, y: 20 + k * 12 + ((i * (k + 3) * 7) % 25), c })),
).flat();

const SETS: Record<string, string[]> = {
  'all four': NAMES,
  'Role A only': ['Role A'],
  'A and C': ['Role A', 'Role C'],
};
interface S {
  set: string;
}

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { set: 'Role A only' },
    mode: 'rebuild',
    previewMs: 1800,
    step: (s) => {
      const keys = Object.keys(SETS);
      return { set: keys[(keys.indexOf(s.set) + 1) % keys.length] as string };
    },
    controls: (bar, live) => {
      select(bar, 'defaultSelected', Object.keys(SETS), (v) => live.set({ set: v })).value = live.state.set;
    },
    build: (s): ISpec => ({
      type: 'line',
      data: [{ id: 'lines', values }],
      xField: 'x',
      yField: 'y',
      seriesField: 'c',
      legends: { visible: true, orient: 'bottom', defaultSelected: SETS[s.set] },
    }),
  });

export default mount;
