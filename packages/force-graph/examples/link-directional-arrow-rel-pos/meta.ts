// force-graph example: Link styling: arrow position
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: arrow position',
  summary:
    'linkDirectionalArrowRelPos places the arrow along the link as a ratio: 0 next to the source, 1 next to the target, 0.5 in the middle. The arrows follow the curve when linkCurvature bends the links.',
  section: 'Link styling',
  tags: ['linkDirectionalArrowRelPos', 'linkDirectionalArrowLength', 'linkDirectionalArrowColor', 'linkCurvature'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
