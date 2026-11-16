// aframe example: <a-circle>: radius, segments, theta and lying flat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-circle>: radius, segments, theta and lying flat',
  summary:
    '<a-circle> is a flat disc. A circle rotated -90 degrees about X lies on the ground as a textured platform, segments 6 turns one into a hexagon, and an animated theta-length opens and closes a slice that starts at theta-start.',
  section: 'Primitives',
  tags: ['a-circle', 'radius', 'segments', 'theta-start', 'theta-length', 'rotation', 'src'],
  docs: ['repo/docs/primitives/a-circle.md', 'repo/docs/components/geometry.md', 'repo/docs/components/animation.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
