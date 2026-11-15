// 3d-force-graph example: Link styling: arrow position
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: arrow position',
  summary:
    'linkDirectionalArrowRelPos is where along the link the arrow sits: 0 next to the source, 1 next to the target, 0.5 in the middle. It is read every tick, so the slider moves the arrows live.',
  section: 'Link styling',
  tags: ['linkDirectionalArrowRelPos', 'linkDirectionalArrowLength'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
