// Storyline portrait layout: alternating sides of a vertical axis, with time markers and subImages
import type { Mount } from '@/types.ts';
import { mountStoryline } from '../../shared/ext-storyline.ts';
import { storyNodes, svgImage } from '../../shared/ext-data.ts';

const mount: Mount = (el, ctx) =>
  mountStoryline(el, ctx, {
    layout: () => 'portrait',
    titleFill: '#e6e8ee',
    previewCount: 3,
    extra: { label: 'image.height', range: [80, 180, 10], value: 120 },
    height: 640,
    spec: (s, preview) => ({
      // marker and subImage live on the node data; marker.visible toggles the labels.
      data: storyNodes(preview ? 3 : s.count).map((n, i) => ({ ...n, subImage: svgImage('', 40 + i * 50, 200, 120) })),
      marker: { visible: true, style: { fontSize: preview ? 9 : 14 } },
      image: { width: preview ? 80 : 180, height: preview ? 50 : s.extra, showBackground: true },
      block: { width: preview ? 110 : 260 },
    }),
  });

export default mount;
