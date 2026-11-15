// zephyr3d example: Spot light cone: cutoff as a cosine
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Spot light cone: cutoff as a cosine',
  summary:
    'A SpotLight sweeping over boxes. cutoff is the cosine of the cone half-angle, not the angle: the slider takes degrees and sets cutoff = cos(angle), because assigning the angle itself gives a much wider cone than intended.',
  section: 'Lighting',
  tags: ['SpotLight', 'cutoff', 'intensity', 'range', 'rotation.fromEulerAngle'],
  docs: ['repo/apps/doc/web/en/lighting-direct.md', 'repo/apps/doc/src/tut-13/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
