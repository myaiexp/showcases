// wordCloud3d: the words sit on a sphere in 3D; depth_3d is the sphere's depth
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { INIT_3D, register3d } from '../../shared/chart3d.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { wordRows } from '../../shared/wordcloud-data.ts';

const DEPTHS = ['300', '600', '1000'];
const rows = wordRows(14, 48);

const mount: Mount = (el, ctx) => {
  register3d('wordCloud3d');
  return mountLive<{ depth: string }>(el, ctx, {
    initial: { depth: '300' },
    mode: 'rebuild',
    previewMs: 2800,
    // center is the point of the 3D projection: the middle of the chart, which is 460px tall.
    chart: { height: 460, previewHeight: 200, init: { ...INIT_3D, options3d: { enable: true, center: { x: Math.max(el.clientWidth, 260) / 2, y: ctx.preview ? 100 : 230 } } } },
    build: ({ depth }) =>
      ({
        type: 'wordCloud3d',
        padding: { bottom: ctx.preview ? 0 : 120 },
        nameField: 'word',
        valueField: 'count',
        seriesField: 'word',
        data: [{ id: 'words', values: rows }],
        // keepDirIn3d false lets the words turn with the sphere instead of always facing the viewer.
        word: { style: { keepDirIn3d: false } },
        fillingWord: { style: { keepDirIn3d: false } },
        fontSizeRange: ctx.preview ? [12, 26] : [20, 40],
        depth_3d: Number(depth),
        legends: { visible: false },
      }) as unknown as ISpec,
    step: (_s, i) => ({ depth: DEPTHS[i % DEPTHS.length] ?? '1000' }),
    controls: (bar, live) => {
      select(bar, 'depth_3d', DEPTHS, (depth) => live.set({ depth })).value = '300';
    },
  });
};

export default mount;
