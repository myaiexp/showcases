// galacean example: Math: matrix multiplication order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Math: matrix multiplication order",
  summary:
    "Matrix.multiply(a, b) applies b first: translation times rotation spins a cube in place at an offset, rotation times translation swings it around the origin.",
  section: "Core",
  tags: ['Matrix', 'multiply', 'translation', 'rotationAxisAngle', 'localMatrix'],
  docs: [
    'repo/docs/en/core/math.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
