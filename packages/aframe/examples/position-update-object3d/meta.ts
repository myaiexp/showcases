// aframe example: position: object3D.position versus setAttribute
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "position: object3D.position versus setAttribute",
  summary: "Each button updates a box with a different call from the docs: object3D.position.set(x, y, z), an incremental object3D.position.x += 1, a Vector3 utility such as multiplyScalar(2), and the less recommended setAttribute('position', {x, y, z}). getAttribute('position') returns the same live vector, shown in the read-out.",
  section: 'Components',
  tags: ["position", "object3D.position", "Vector3", "set", "multiplyScalar", "setAttribute", "getAttribute"],
  docs: ["repo/docs/components/position.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
