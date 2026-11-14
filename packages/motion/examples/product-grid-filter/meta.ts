// motion example: Product grid that closes up when you filter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Product grid that closes up when you filter',
  summary: 'Tap a category chip and the products that do not match disappear while the rest slide together to fill the gaps. Showing them again slides everything apart to make room. Every tile is a data-layout element.',
  section: 'animateLayout',
  tags: ['animateLayout', 'data-layout', 'grid', 'filter'],
  docs: ['pages/motion-dev/docs/layout-animations.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
