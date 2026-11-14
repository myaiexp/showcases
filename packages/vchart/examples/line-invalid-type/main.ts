// Missing values: invalidType break, link, zero or ignore over a series with nulls
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const YEARS = ['1960', '1964', '1968', '1972', '1976', '1980', '1984', '1988', '1992'];
const GOLD = [12, 20, 15, null, 25, null, 33, 41, 30];
const SILVER = [8, 14, 18, 22, null, null, 28, 26, 24];
const values = [
  ...YEARS.map((year, i) => ({ year, medal: 'Gold', count: GOLD[i] })),
  ...YEARS.map((year, i) => ({ year, medal: 'Silver', count: SILVER[i] })),
];
const MODES = ['break', 'link', 'zero', 'ignore'];

const mount: Mount = (el, ctx) =>
  mountLive<{ mode: string }>(el, ctx, {
    initial: { mode: 'break' },
    build: ({ mode }) =>
      ({
        type: 'line',
        data: [{ id: 'data', values }],
        xField: 'year',
        yField: 'count',
        seriesField: 'medal',
        invalidType: mode,
        legends: { visible: !ctx.preview },
      }) as ISpec,
    controls: (bar, live) => {
      select(bar, 'invalidType', MODES, (mode) => live.set({ mode }));
    },
    step: (_s, i) => ({ mode: MODES[i % MODES.length] ?? 'break' }),
    previewMs: 1400,
  });

export default mount;
