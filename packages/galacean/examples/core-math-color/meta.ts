// galacean example: Math: Color between sRGB and linear
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Math: Color between sRGB and linear",
  summary:
    "Two gradients between the same colours: one mixes the sRGB numbers directly, the other mixes in linear space (toLinear) and converts back with toSRGB. The linear mix keeps its brightness through the middle.",
  section: "Core",
  tags: ['Color', 'toLinear', 'toSRGB', 'lerp'],
  docs: [
    'repo/docs/en/core/math.mdx',
    'repo/docs/en/core/color.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
