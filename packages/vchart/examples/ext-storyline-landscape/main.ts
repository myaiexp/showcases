// Storyline landscape layout: images in a row, text above and below, a curve between them
import type { Mount } from '@/types.ts';
import { mountStoryline } from '../../shared/ext-storyline.ts';

const mount: Mount = (el, ctx) =>
  mountStoryline(el, ctx, {
    layout: () => 'landscape',
    titleFill: '#e6e8ee',
    extra: { label: 'block.height', range: [220, 380, 20], value: 320 },
    spec: (s, preview) => ({ block: { height: preview ? 150 : s.extra }, padding: preview ? [8, 8, 30, 8] : [20, 90, 100, 20] }),
  });

export default mount;
