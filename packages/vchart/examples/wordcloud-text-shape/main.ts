// maskShape of type 'text': the words are laid out inside the outline of a text, with wordMask behind
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { wordRows } from '../../shared/wordcloud-data.ts';

const TEXTS = ['VChart', 'DATA', 'Hello', '2026'];
const rows = wordRows(10);

const mount: Mount = (el, ctx) =>
  mountLive<{ text: string; hollow: boolean }>(el, ctx, {
    initial: { text: 'VChart', hollow: false },
    mode: 'rebuild',
    previewMs: 2400,
    chart: { height: 460 },
    build: ({ text, hollow }) =>
      ({
        type: 'wordCloud',
        // A text outline makes it a shape word cloud: core words fill the glyphs, filling words the gaps.
        maskShape: { type: 'text', text, fontFamily: 'sans-serif', fontWeight: 900, hollow, fill: '#2d3a6b', backgroundColor: 'transparent' },
        nameField: 'word',
        valueField: 'count',
        // A card is ~260x200, so its words are much smaller.
        fontSizeRange: ctx.preview ? [5, 12] : [10, 36],
        seriesField: 'word',
        data: [{ id: 'words', values: rows }],
        wordMask: { visible: true, style: { fillOpacity: 0.5 } },
        legends: { visible: false },
        title: { visible: !ctx.preview, text: `text: '${text}', hollow: ${hollow}` },
      }) as unknown as ISpec,
    step: (_s, i) => ({ text: TEXTS[i % TEXTS.length] ?? 'VChart', hollow: i % 4 === 3 }),
    controls: (bar, live) => {
      select(bar, 'mask text', TEXTS, (text) => live.set({ text }));
      select(bar, 'hollow', ['false', 'true'], (v) => live.set({ hollow: v === 'true' }));
    },
  });

export default mount;
