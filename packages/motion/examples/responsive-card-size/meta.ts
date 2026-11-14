// motion example: Product card that adapts to its own width
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Product card that adapts to its own width',
  summary: 'A product card in a box you can drag larger or smaller. The card reshapes itself to the space it gets: a compact tile, a cosy stack, then a wide layout with a description. resize() watches the element, so it reacts to its own size rather than the window.',
  section: 'Gestures',
  tags: ['resize', 'frame.render', 'border box', 'animate'],
  docs: ['pages/motion-dev/docs/resize.md', 'pages/motion-dev/docs/frame.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
