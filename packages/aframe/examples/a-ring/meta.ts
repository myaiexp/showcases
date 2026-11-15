// aframe example: <a-ring>: radius-inner, radius-outer, segments and theta
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-ring>: radius-inner, radius-outer, segments and theta',
  summary:
    '<a-ring> is a flat band between radius-inner and radius-outer. A plain teal ring and a textured one sit beside a wireframe ring whose theta-length grows and shrinks, with segments-theta around the ring and segments-phi across the band.',
  section: 'Primitives',
  tags: ['a-ring', 'radius-inner', 'radius-outer', 'segments-theta', 'segments-phi', 'theta-length'],
  docs: ['repo/docs/primitives/a-ring.md', 'repo/docs/components/geometry.md', 'repo/docs/components/animation.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
