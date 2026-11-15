// 3d-force-graph example: Link styling: linkPositionUpdate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: linkPositionUpdate',
  summary:
    'linkThreeObject can replace a link entirely; linkPositionUpdate then places that object, and returning true tells the library not to position it. Each link here is a bead that travels from source to target and back, with a checkbox to freeze it at the middle.',
  section: 'Link styling',
  tags: ['linkPositionUpdate', 'linkThreeObject'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
