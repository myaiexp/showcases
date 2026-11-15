// 3d-force-graph example: Link styling: linkWidth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: linkWidth',
  summary:
    'A linkWidth of 0 draws a one pixel line that never changes with distance; any positive width draws a cylinder in scene units. The function here widens each link by its value field, and the slider scales it, down to 0 where every link turns back into a hairline.',
  section: 'Link styling',
  tags: ['linkWidth'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
