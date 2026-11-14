// wordCloudConfig.zoomToFit: enlarge a sparse cloud to the canvas, or shrink a crowded one to fit
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { wordRows } from '../../shared/wordcloud-data.ts';

interface State {
  fit: string;
}
const FITS: Record<string, { words: number; zoomToFit: Record<string, unknown> | undefined }> = {
  'few words, no zoomToFit': { words: 6, zoomToFit: undefined },
  'few words, enlarge': { words: 6, zoomToFit: { enlarge: true } },
  'few words, enlarge, fontSizeLimitMax 40': { words: 6, zoomToFit: { enlarge: true, fontSizeLimitMax: 40 } },
  'many words, no zoomToFit': { words: 60, zoomToFit: undefined },
  'many words, shrink': { words: 60, zoomToFit: { shrink: true, fontSizeLimitMin: 5 } },
};
const KEYS = Object.keys(FITS);

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { fit: KEYS[1] ?? '' },
    mode: 'rebuild',
    previewMs: 2200,
    chart: { height: 460 },
    build: ({ fit }) => {
      const { words, zoomToFit } = FITS[fit] ?? { words: 6, zoomToFit: undefined };
      return {
        type: 'wordCloud',
        nameField: 'word',
        valueField: 'count',
        seriesField: 'word',
        fontSizeRange: [12, words > 20 ? 80 : 20],
        wordCloudConfig: zoomToFit ? { zoomToFit } : {},
        data: [{ id: 'words', values: wordRows(4, words) }],
        legends: { visible: false },
        title: { visible: !ctx.preview, text: fit },
      } as unknown as ISpec;
    },
    step: (_s, i) => ({ fit: KEYS[i % KEYS.length] ?? '' }),
    controls: (bar, live) => {
      select(bar, 'zoomToFit', KEYS, (fit) => live.set({ fit })).value = KEYS[1] ?? '';
    },
  });

export default mount;
