// Word cloud colour sources: colorList (ordinal), colorHexField and the theme palette
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { wordRows } from '../../shared/wordcloud-data.ts';

const SOURCES = ['ordinal colorList', 'linear colorList', 'colorHexField', 'theme palette'];
const HEX = ['#f87171', '#fbbf24', '#a3e635', '#38bdf8', '#c084fc'];
const rows = wordRows(4, 40).map((w, i) => ({ ...w, hex: HEX[i % HEX.length], group: `g${i % 3}` }));

const mount: Mount = (el, ctx) =>
  mountLive<{ source: string }>(el, ctx, {
    initial: { source: 'ordinal colorList' },
    mode: 'rebuild',
    chart: { height: 460 },
    previewMs: 1800,
    step: (s) => ({ source: SOURCES[(SOURCES.indexOf(s.source) + 1) % SOURCES.length] as string }),
    build: (s, preview) =>
      ({
        type: 'wordCloud',
        nameField: 'word',
        valueField: 'count',
        data: [{ id: 'words', values: rows.slice(0, preview ? 14 : rows.length) }],
        // ordinal: one colour per value of seriesField, cycling through colorList.
        // Without colorMode the colorList becomes a gradient over valueField.
        ...(s.source === 'ordinal colorList'
          ? { colorMode: 'ordinal', seriesField: 'group', colorList: ['#fbbf24', '#f472b6', '#38bdf8'] }
          : s.source === 'linear colorList'
            ? { colorList: ['#38bdf8', '#fbbf24', '#f87171'] }
            : s.source === 'colorHexField'
              ? { colorHexField: 'hex' }
              : { seriesField: 'word' }),
        legends: { visible: false },
      }) as never,
    controls: (bar, live) => {
      select(bar, 'colour source', SOURCES, (v) => live.set({ source: v }));
    },
  });

export default mount;
