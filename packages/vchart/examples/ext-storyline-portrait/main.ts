// Storyline portrait layout: alternating sides of a vertical axis, with time markers and subImages
import type { Mount } from '@/types.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { select, slider, type ISpec } from '../../shared/chart.ts';
import { storyNodes, svgImage } from '../../shared/ext-data.ts';
import { COLORS, TITLE } from '../../shared/ext-storyline.ts';

interface State {
  count: number;
  themeColor: string;
  imageHeight: number;
}

const names = Object.keys(COLORS);

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { count: 4, themeColor: COLORS['teal'] as string, imageHeight: 120 },
    build: (s, preview) =>
      ({
        type: 'storyline',
        animation: false,
        layout: 'portrait',
        themeColor: s.themeColor,
        title: { style: { fontSize: preview ? 11 : 18, fill: '#e6e8ee', ...TITLE } },
        content: { visible: !preview, style: { fontSize: 13, lineHeight: 19, fill: '#b7bdc9' } },
        // marker and subImage live on the node data; marker.visible toggles the labels.
        data: storyNodes(preview ? 3 : s.count).map((n, i) => ({ ...n, subImage: svgImage('', 40 + i * 50, 200, 120) })),
        marker: { visible: true, style: { fontSize: preview ? 9 : 14 } },
        image: { width: preview ? 80 : 180, height: preview ? 50 : s.imageHeight, showBackground: true },
        block: { width: preview ? 110 : 260 },
      }) as unknown as ISpec,
    controls(bar, live) {
      select(bar, 'nodes', ['3', '4', '5'], (v) => live.set({ count: Number(v) })).value = '4';
      select(bar, 'themeColor', names, (v) => live.set({ themeColor: COLORS[v] as string })).value = 'teal';
      slider(bar, 'image.height', [80, 180, 10], 120, (v) => live.set({ imageHeight: v }));
    },
    step: (_, i) => ({ themeColor: COLORS[names[i % names.length] as string] as string }),
    previewMs: 1800,
    mode: 'rebuild',
    chart: { height: 640, previewHeight: 200 },
  });

export default mount;
