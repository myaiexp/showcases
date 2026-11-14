// theme.mark by type and theme.markByName: the name wins
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

type Mode = 'none' | 'mark (by type)' | 'markByName' | 'both';

const CATS = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'];
const bars = CATS.map((x, i) => ({ x, v: 24 + ((i * 13) % 30) }));
const trend = CATS.map((x, i) => ({ x, v: 30 + i * 7 }));

// mark: indexed by type, so every symbol in the chart (the line's points) gets size 4.
// markByName: indexed by name, so the 'point' marks get size 14, the 'bar' marks get rounded corners.
function theme(mode: Mode): unknown {
  const byType = { mark: { symbol: { style: { size: 4 } }, rect: { style: { fillOpacity: 0.55 } } } };
  const byName = { markByName: { point: { style: { size: 14, fill: '#FFDB26' } }, bar: { style: { cornerRadius: [8, 8, 0, 0] } } } };
  return mode === 'mark (by type)' ? byType : mode === 'markByName' ? byName : mode === 'both' ? { ...byType, ...byName } : {};
}

const mount: Mount = (el, ctx) =>
  mountLive<{ mode: Mode }>(el, ctx, {
    initial: { mode: 'none' },
    build: ({ mode }) =>
      ({
        type: 'common',
        data: [
          { id: 'bars', values: bars },
          { id: 'trend', values: trend },
        ],
        theme: theme(mode),
        series: [
          { type: 'bar', dataId: 'bars', xField: 'x', yField: 'v' },
          { type: 'line', dataId: 'trend', xField: 'x', yField: 'v', point: { visible: true } },
        ],
        axes: [
          { orient: 'bottom', type: 'band' },
          { orient: 'left', type: 'linear' },
        ],
      }) as never,
    controls(bar, live) {
      select(bar, 'theme keys set', ['none', 'mark (by type)', 'markByName', 'both'], (mode) => live.set({ mode: mode as Mode }));
    },
    step: (_, i) => ({ mode: (['none', 'mark (by type)', 'markByName', 'both'] as const)[i % 4] ?? 'none' }),
    mode: 'rebuild',
    previewMs: 1700,
  });

export default mount;
