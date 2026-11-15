// 3d-force-graph example: Link styling: self-referencing links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: self-referencing links',
  summary:
    'A link whose source equals its target is drawn as a loop around its node, and linkCurvature sets how big the loop is. Each node here has a loop of a different size; the slider scales them all.',
  section: 'Link styling',
  tags: ['linkCurvature', 'linkCurveRotation'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
