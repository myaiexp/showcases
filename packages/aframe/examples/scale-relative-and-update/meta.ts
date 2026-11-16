// aframe example: scale: nested scales multiply, and object3D.scale updates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "scale: nested scales multiply, and object3D.scale updates",
  summary: "Scales apply in the local coordinate system and multiply down a nest of entities: a box inside two parents scaled 2 and 1.5 ends up three times as big. Buttons update scale with object3D.scale.set, multiplyScalar and an incremental x += 1, and setAttribute, and getAttribute('scale') returns the live Vector3.",
  section: 'Components',
  tags: ["scale", "object3D.scale", "multiplyScalar", "relative scale", "getAttribute", "setAttribute"],
  docs: ["repo/docs/components/scale.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
