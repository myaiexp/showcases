// galacean example: Transform: Euler angles and quaternion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transform: Euler angles and quaternion",
  summary:
    "The same rotation read two ways: rotation (Euler degrees) and rotationQuaternion. Writing either one updates the other; the readout shows both as the cube turns.",
  section: "Core",
  tags: ['Transform', 'rotation', 'rotationQuaternion', 'Quaternion'],
  docs: [
    'repo/docs/en/core/transform.mdx',
    'repo/docs/en/core/math.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
