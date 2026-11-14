// word.formatMethod: change the text drawn for each word without touching the data
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { wordRows } from '../../shared/wordcloud-data.ts';

type Datum = { word: string; count: number };
const FORMATS: Record<string, (d: Datum) => string> = {
  'as is': (d) => d.word,
  'UPPERCASE': (d) => d.word.toUpperCase(),
  'word + "..."': (d) => `${d.word}...`,
  'word (count)': (d) => `${d.word} (${d.count})`,
  '#hashtag': (d) => `#${d.word}`,
};
const KEYS = Object.keys(FORMATS);
const rows = wordRows(6, 30);

const mount: Mount = (el, ctx) =>
  mountLive<{ format: string }>(el, ctx, {
    initial: { format: 'UPPERCASE' },
    mode: 'rebuild',
    previewMs: 2200,
    chart: { height: 460 },
    build: ({ format }) =>
      ({
        type: 'wordCloud',
        nameField: 'word',
        valueField: 'count',
        seriesField: 'word',
        fontSizeRange: [12, 42],
        word: { formatMethod: FORMATS[format] },
        data: [{ id: 'words', values: rows }],
        legends: { visible: false },
        title: { visible: !ctx.preview, text: `formatMethod: ${format}` },
      }) as unknown as ISpec,
    step: (_s, i) => ({ format: KEYS[i % KEYS.length] ?? 'as is' }),
    controls: (bar, live) => {
      select(bar, 'formatMethod', KEYS, (format) => live.set({ format })).value = 'UPPERCASE';
    },
  });

export default mount;
