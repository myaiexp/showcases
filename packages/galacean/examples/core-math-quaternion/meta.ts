// galacean example: Math: Quaternion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Math: Quaternion",
  summary:
    "The same Euler angles turned into quaternions three ways: rotationYawPitchRoll, rotationEuler and chained rotateX/rotateY/rotateZ, each applied to a cube, with equals() and toEuler() readouts.",
  section: "Core",
  tags: ['Quaternion', 'rotationEuler', 'rotationYawPitchRoll', 'rotateX', 'toEuler', 'equals', 'MathUtil'],
  docs: [
    'repo/docs/en/core/math.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
