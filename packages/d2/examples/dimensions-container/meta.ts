// d2 example: Dimensions on containers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dimensions on containers',
  summary:
    'On containers, `width` and `height` work with ELK but not with dagre. The same source is compiled with each engine; the container grows to 260 by 120 only under ELK.',
  section: 'Dimensions',
  tags: ['dimensions', 'container', 'elk', 'dagre'],
  docs: ['repo/docs/tour/dimensions.md', 'repo/docs/tour/layouts.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
