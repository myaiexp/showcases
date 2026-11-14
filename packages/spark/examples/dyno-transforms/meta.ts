// Spark example: transformGsplat, transformPos and transformQuat with uniforms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transforms in a modifier',
  summary:
    'A knot moved by a modifier next to a faint untouched copy. transformGsplat applies uniform scale, a quaternion rotation and a translation to centre, orientation and size at once; the other choice does it with transformPos (which also takes per-axis scales) and transformQuat. All parts are dyno uniforms driven by animation or sliders.',
  section: 'Dyno Standard Library',
  tags: ['transformGsplat', 'transformPos', 'transformQuat', 'dynoVec4', 'dynoVec3', 'objectModifiers'],
  docs: ['repo/docs/docs/dyno-stdlib.md', 'repo/docs/docs/splat-mesh.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
