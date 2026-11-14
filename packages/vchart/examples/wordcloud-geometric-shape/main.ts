// maskShape of type 'geometric', with colorList, fillingColorList and the wordMask backdrop
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { wordRows } from '../../shared/wordcloud-data.ts';

const SHAPES = ['star', 'cardioid', 'circle', 'diamond', 'pentagon'];
const rows = wordRows(11, 36);

const mount: Mount = (el, ctx) =>
  mountLive<{ shape: string }>(el, ctx, {
    initial: { shape: 'star' },
    mode: 'rebuild',
    previewMs: 2400,
    chart: { height: 460 },
    build: ({ shape }) =>
      ({
        type: 'wordCloud',
        maskShape: { type: 'geometric', shape, fill: '#1c2447', backgroundColor: 'transparent' },
        // Core words (the data) take colorList; the small filling words take fillingColorList.
        colorList: ['#f4c95d', '#ef8a62', '#ffffff'],
        wordCloudShapeConfig: { fillingColorList: ['#5b9bd5', '#7fb8e6', '#3d6fa8'] },
        nameField: 'word',
        valueField: 'count',
        // A card is ~260x200, so its words are much smaller.
        fontSizeRange: ctx.preview ? [5, 12] : [10, 36],
        seriesField: 'word',
        data: [{ id: 'words', values: rows }],
        wordMask: { visible: true },
        legends: { visible: false },
        title: { visible: !ctx.preview, text: `geometric: '${shape}'` },
      }) as unknown as ISpec,
    step: (_s, i) => ({ shape: SHAPES[i % SHAPES.length] ?? 'star' }),
    controls: (bar, live) => {
      select(bar, 'geometric shape', SHAPES, (shape) => live.set({ shape }));
    },
  });

export default mount;
