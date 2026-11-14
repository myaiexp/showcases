// Bar series sampling and samplingFactor on 2000 bars
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { rng } from '../../shared/components-data.ts';

const METHODS = ['none', 'lttb', 'min', 'max', 'sum', 'average'];
const r = rng(23);
let level = 50;
const rows = Array.from({ length: 2000 }, (_, i) => {
  level = Math.max(5, Math.min(95, level + (r() - 0.5) * 12));
  return { x: i, y: Math.round(level + (i % 250 === 0 ? 30 : 0)) };
});

interface S { method: string; factor: number }

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { method: 'lttb', factor: 1 },
    mode: 'rebuild',
    previewMs: 1500,
    step: (s) => ({ method: METHODS[(METHODS.indexOf(s.method) + 1) % METHODS.length] as string }),
    build: (s) =>
      ({
        type: 'bar',
        data: [{ id: 'd', values: rows }],
        xField: 'x',
        yField: 'y',
        ...(s.method === 'none' ? {} : { sampling: s.method, samplingFactor: s.factor }),
        axes: [{ orient: 'left', type: 'linear' }, { orient: 'bottom', type: 'linear', tick: { tickCount: 8 } }],
      }) as never,
    controls: (bar, live) => {
      select(bar, 'sampling', METHODS, (v) => live.set({ method: v })).value = 'lttb';
      slider(bar, 'samplingFactor', [0.2, 4, 0.2], live.state.factor, (v) => live.set({ factor: v }));
    },
  });

export default mount;
