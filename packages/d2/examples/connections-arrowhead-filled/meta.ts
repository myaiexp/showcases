// d2 example: Filled and hollow arrowheads
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Filled and hollow arrowheads',
  summary:
    'The triangle is solid by default and `style.filled: false` hollows it. The diamond, circle and box default to outlined, and `style.filled: true` fills them.',
  section: 'Connections',
  tags: ['arrowhead', 'style.filled'],
  docs: ['repo/docs/tour/connections.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
