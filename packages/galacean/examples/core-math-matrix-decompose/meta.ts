// galacean example: Math: affineTransformation and decompose
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Math: affineTransformation and decompose",
  summary:
    "A pose built with Matrix.affineTransformation(scale, rotation, translation), the same pose built by multiplying translation, rotation and scaling matrices, and decompose() reading the three parts back out.",
  section: "Core",
  tags: ['Matrix', 'affineTransformation', 'decompose', 'scaling', 'translation', 'rotationQuaternion', 'equals'],
  docs: [
    'repo/docs/en/core/math.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
