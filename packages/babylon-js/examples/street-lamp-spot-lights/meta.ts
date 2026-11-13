// babylon-js example: street lamps with spot lights at night
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Street lamps with spot lights at night',
  summary:
    'A lamp post extruded along a path with ExtrudeShape, cloned four times, each clone carrying a yellow SpotLight. maxSimultaneousLights lifts the four-light limit on the ground, and a slider fades the hemispheric light and sky from day to night.',
  section: 'Introduction',
  tags: ['SpotLight', 'MeshBuilder.ExtrudeShape', 'maxSimultaneousLights', 'HemisphericLight'],
  docs: ['repo/content/features/introductionToFeatures/chap7/lights.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
