// Global scales: ordinal with specified, linear with clamp
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const r = rng(41);
const GROUPS = ['alpha', 'beta', 'gamma', 'delta'];
// v goes past the size scale's domain end of 100.
const values = Array.from({ length: 16 }, (_, i) => ({ x: i + 1, y: Math.round(20 + r() * 60), v: 20 + i * 10, g: GROUPS[i % GROUPS.length] }));

const mount: Mount = (el, ctx) =>
  mountLive<{ clamp: boolean; specified: boolean }>(el, ctx, {
    initial: { clamp: true, specified: true },
    mode: 'rebuild',
    previewMs: 1500,
    step: (_s, i) => ({ clamp: i % 2 === 0, specified: i % 4 < 2 }),
    build: ({ clamp, specified }, preview) =>
      ({
        type: 'scatter',
        data: [{ id: 'd', values }],
        scales: [
          {
            id: 'colorScale',
            type: 'ordinal',
            domain: GROUPS,
            range: ['#4d7cff', '#2fb86b', '#b07cff', '#9bb7ff'],
            // specified is matched first: these two categories ignore domain and range.
            ...(specified ? { specified: { beta: '#ff8a3d', delta: '#e5534b' } } : {}),
          },
          { id: 'sizeScale', type: 'linear', domain: [20, 100], range: [6, 26], clamp },
        ],
        xField: 'x',
        yField: 'y',
        point: {
          style: {
            fillOpacity: 0.85,
            fill: { scale: 'colorScale', field: 'g' },
            size: { scale: 'sizeScale', field: 'v' },
          },
        },
        title: preview ? undefined : { visible: true, text: `clamp: ${clamp}, specified: ${specified}`, textStyle: { fontSize: 13 } },
        tooltip: { visible: false },
      }) as unknown as ISpec,
    controls: (bar, live) => {
      select(bar, 'clamp', ['true', 'false'], (v) => live.set({ clamp: v === 'true' }));
      select(bar, 'specified', ['true', 'false'], (v) => live.set({ specified: v === 'true' }));
    },
  });

export default mount;
