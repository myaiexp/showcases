// Word cloud random: deterministic or randomly directed placement on each build
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { wordRows } from '../../shared/wordcloud-data.ts';

const rows = wordRows(2, 40);

const mount: Mount = (el, ctx) =>
  mountLive<{ random: boolean; roll: number }>(el, ctx, {
    initial: { random: true, roll: 0 },
    mode: 'rebuild',
    chart: { height: 460 },
    previewMs: 1800,
    step: (s) => ({ roll: s.roll + 1 }),
    build: (s, preview) =>
      ({
        type: 'wordCloud',
        nameField: 'word',
        valueField: 'count',
        seriesField: 'word',
        random: s.random,
        // roll is only here to force a new build; the data never changes.
        data: [{ id: 'words', values: rows.slice(0, preview ? 14 : rows.length) }],
        legends: { visible: false },
      }) as never,
    controls: (bar, live) => {
      select(bar, 'random', ['true', 'false'], (v) => live.set({ random: v === 'true' }));
      button(bar, 're-roll', () => live.set({ roll: live.state.roll + 1 }));
    },
  });

export default mount;
