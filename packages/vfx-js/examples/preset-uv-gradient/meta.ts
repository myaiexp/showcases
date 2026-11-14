// VFX-JS example: uvGradient preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '"uvGradient" preset',
  summary:
    "The uvGradient preset paints each pixel with its own coordinates: red grows to the right, green upward, and blue pulses with time. The element's alpha is the mask, so only the letters show the gradient.",
  section: 'Shader presets',
  tags: ["uvGradient", "shader preset", "uv"],
  docs: ['pages/amagi-dev/vfx-js/effects.md', 'repo/packages/vfx-js/src/constants.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
