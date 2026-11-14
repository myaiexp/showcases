// tanstack-charts example: Vertical swarm with dodgeX
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vertical swarm with dodgeX',
  summary:
    'dodgeX is the transposed layout: the y value is kept and x is derived. A column of response times fans out sideways around the middle, with y as the only configured scale.',
  section: 'Dodge Layouts',
  tags: ['dot', 'dodgeX', 'layout', 'x: null'],
  docs: ['repo/docs/reference/marks/dodge.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
