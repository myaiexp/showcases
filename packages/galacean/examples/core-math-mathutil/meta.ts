// galacean example: Math: MathUtil
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Math: MathUtil",
  summary:
    "MathUtil helpers at work: degreeToRadian and radianToDegree, clamp, lerp and isPowerOf2. A ball sweeps an arc whose angle is converted, clamped and interpolated with them.",
  section: "Core",
  tags: ['MathUtil', 'clamp', 'lerp', 'degreeToRadian', 'radianToDegree', 'isPowerOf2'],
  docs: [
    'repo/docs/en/core/math.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
