// aframe example: <a-sphere>: segments, a dome and an opening wedge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-sphere>: segments, a dome and an opening wedge',
  summary:
    '<a-sphere> maps radius, segments-width and segments-height, and the phi and theta ranges to the sphere geometry. Few segments give a faceted ball, theta-length 90 keeps only the top as a dome, and an animated phi-length opens a wedge.',
  section: 'Primitives',
  tags: ['a-sphere', 'radius', 'segments-width', 'segments-height', 'phi-length', 'theta-length'],
  docs: ['repo/docs/primitives/a-sphere.md', 'repo/docs/components/geometry.md', 'repo/docs/components/animation.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
