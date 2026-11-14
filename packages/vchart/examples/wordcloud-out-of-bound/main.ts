// wordCloudConfig.drawOutOfBound: what happens to a word wider than the canvas
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { longRows } from '../../shared/wordcloud-data.ts';

const MODES = ['clip', 'hidden'];
const rows = longRows(2);

const mount: Mount = (el, ctx) =>
  mountLive<{ mode: string }>(el, ctx, {
    initial: { mode: 'clip' },
    mode: 'rebuild',
    previewMs: 2200,
    chart: { height: 460 },
    build: ({ mode }) =>
      ({
        type: 'wordCloud',
        nameField: 'word',
        valueField: 'count',
        seriesField: 'word',
        fontSizeRange: ctx.preview ? [8, 20] : [14, 64],
        wordCloudConfig: { drawOutOfBound: mode },
        data: [{ id: 'words', values: rows }],
        legends: { visible: false },
        title: { visible: !ctx.preview, text: `drawOutOfBound: '${mode}'` },
      }) as unknown as ISpec,
    step: (s) => ({ mode: s.mode === 'clip' ? 'hidden' : 'clip' }),
    controls: (bar, live) => {
      select(bar, 'drawOutOfBound', MODES, (mode) => live.set({ mode }));
    },
  });

export default mount;
