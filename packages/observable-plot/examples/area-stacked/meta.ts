// observable-plot example: Area: stacked and streamgraph
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: stacked and streamgraph',
  summary:
    'A fill channel groups rows into series and stacks them. The offset option turns the stack into a streamgraph (wiggle), centred or normalized.',
  section: 'Mark: Area',
  tags: ['areaY', 'fill', 'offset', 'stackY'],
  docs: ['repo/docs/marks/area.md', 'repo/docs/data/bls-industry-unemployment.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
