// g6 example: Fix element size: constant on zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fix element size: constant on zoom',
  summary: 'fix-element-size scales nodes, edge widths and labels against the zoom so they keep their screen size; a toggle turns it off. The card zooms in and out.',
  section: 'Behavior',
  tags: ['fix-element-size', 'enable', 'zoomTo'],
  docs: ['repo/packages/site/docs/manual/behavior/FixElementSize.en.md', 'repo/packages/site/common/api/behaviors/fix-element-size.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
