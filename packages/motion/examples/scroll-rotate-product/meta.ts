// motion example: Product that rotates and zooms as you scroll past
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Product that rotates and zooms as you scroll past',
  summary: 'A shop page where the sneaker tilts in, comes upright and grows as it crosses the middle of the screen, then tilts away, while its shadow widens and a price tag fades in and out. Three animations share one scroll() setup: the stage as target, from entering at the bottom to leaving at the top.',
  section: 'scroll',
  tags: ['scroll', 'target', 'offset', 'container', 'animate', 'rotate', 'scale'],
  docs: ['pages/motion-dev/docs/scroll.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
