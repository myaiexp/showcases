// 3d-force-graph example: Link styling: linkCurveRotation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: linkCurveRotation',
  summary:
    'Several links between the same two nodes would lie on top of each other. With a curvature and a different linkCurveRotation each, in radians around the start-to-end axis, they fan out into a ring. The slider changes the angle between neighbours.',
  section: 'Link styling',
  tags: ['linkCurveRotation', 'linkCurvature'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
