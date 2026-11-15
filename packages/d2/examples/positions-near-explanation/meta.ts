// d2 example: Position: near, a long description
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Position: near, a long description',
  summary:
    'A markdown block with `near: center-left` sits beside the diagram as a longform explanation. The layout engine arranges the connected shapes on their own and leaves the note out of that arrangement.',
  section: 'Positions',
  tags: ['near', 'markdown', 'description'],
  docs: ['repo/docs/tour/positions.md', 'repo/static/d2/near-explanation.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
