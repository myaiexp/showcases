// maskShape with a built-in shape name: the words fill a circle, star, heart and so on
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { wordRows } from '../../shared/wordcloud-data.ts';

const SHAPES = ['circle', 'cardioid', 'diamond', 'square', 'star', 'triangle', 'triangleForward', 'pentagon', 'rect'];
const rows = wordRows(9);

const mount: Mount = (el, ctx) =>
  mountLive<{ shape: string }>(el, ctx, {
    initial: { shape: 'cardioid' },
    mode: 'rebuild',
    previewMs: 2200,
    chart: { height: 460 },
    build: ({ shape }) =>
      ({
        type: 'wordCloud',
        maskShape: shape,
        nameField: 'word',
        valueField: 'count',
        seriesField: 'word',
        fontSizeRange: ctx.preview ? [5, 14] : [9, 36],
        data: [{ id: 'words', values: rows }],
        legends: { visible: false },
        title: { visible: !ctx.preview, text: `maskShape: '${shape}'` },
      }) as unknown as ISpec,
    step: (_s, i) => ({ shape: SHAPES[i % SHAPES.length] ?? 'circle' }),
    controls: (bar, live) => {
      select(bar, 'maskShape', SHAPES, (shape) => live.set({ shape })).value = 'cardioid';
    },
  });

export default mount;
