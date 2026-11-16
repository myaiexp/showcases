// aframe example: <a-cone>: radius-bottom, radius-top, segments and open ends
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-cone>: radius-bottom, radius-top, segments and open ends',
  summary:
    '<a-cone> maps radius-bottom and radius-top to the cone geometry, so a wide base and a small top give a frustum. The textured cone keeps the default point, and a six-segment open-ended cone with side double becomes a hollow funnel.',
  section: 'Primitives',
  tags: ['a-cone', 'radius-bottom', 'radius-top', 'segments-radial', 'open-ended', 'side'],
  docs: ['repo/docs/primitives/a-cone.md', 'repo/docs/components/geometry.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
