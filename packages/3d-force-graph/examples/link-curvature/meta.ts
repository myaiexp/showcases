// 3d-force-graph example: Link styling: linkCurvature
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: linkCurvature',
  summary:
    'linkCurvature bends a link into a 3D bezier. 0 is straight, 1 is roughly a semicircle, and the sign picks the side. The accessor is read on every tick, so moving the slider bends the links live.',
  section: 'Link styling',
  tags: ['linkCurvature'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
