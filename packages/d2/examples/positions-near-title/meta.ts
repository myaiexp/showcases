// d2 example: Position: near, a title
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Position: near, a title',
  summary:
    'Giving a shape `near: top-center` pins it to that point of the diagram, outside the layout. A markdown shape becomes a title; the variants move it to other constants (the eight values the docs list).',
  section: 'Positions',
  tags: ['near', 'title', 'markdown'],
  docs: ['repo/docs/tour/positions.md', 'repo/static/d2/near-constant.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
