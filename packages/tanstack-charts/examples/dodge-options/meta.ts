// tanstack-charts example: Anchor, padding and fit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Anchor, padding and fit',
  summary:
    'The dodgeY options: anchor puts the swarm on the bottom, middle or top of the plot, padding sets the empty pixels between neighbouring circles, and fit: \'compress\' squeezes a swarm that would overflow back into the plot, at the price of overlapping circles. The default overflow keeps every dot clear of the others.',
  section: 'Dodge Layouts',
  tags: ['dodgeY', 'anchor', 'padding', 'fit', 'compress'],
  docs: ['repo/docs/reference/marks/dodge.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
