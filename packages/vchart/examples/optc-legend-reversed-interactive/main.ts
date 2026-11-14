// Legend switches: reversed order, interactive off, filter off
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { GROUPS, groupedRows } from '../../shared/components-data.ts';

interface S { reversed: boolean; interactive: boolean; filter: boolean }

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { reversed: false, interactive: true, filter: true },
    mode: 'rebuild',
    previewMs: 1500,
    step: (_s, i) => ({ reversed: i % 2 === 1, interactive: true, filter: i % 4 < 2 }),
    build: (s) => ({
      type: 'bar',
      stack: true,
      data: [{ id: 'd', values: groupedRows(['Q1', 'Q2', 'Q3', 'Q4'], GROUPS, 5) }],
      xField: 'x',
      yField: 'y',
      seriesField: 'c',
      legends: { type: 'discrete', visible: true, orient: 'right', reversed: s.reversed, interactive: s.interactive, filter: s.filter } as unknown as NonNullable<ISpec['legends']>,
    }),
    controls: (bar, live) => {
      select(bar, 'reversed', ['false', 'true'], (v) => live.set({ reversed: v === 'true' }));
      select(bar, 'interactive', ['true', 'false'], (v) => live.set({ interactive: v === 'true' }));
      select(bar, 'filter', ['true', 'false'], (v) => live.set({ filter: v === 'true' }));
    },
  });

export default mount;
