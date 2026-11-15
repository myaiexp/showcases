// postprocessing example: the deprecated GammaCorrectionEffect and its gamma factor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gamma correction (deprecated)',
  summary:
    'GammaCorrectionEffect raises the colours to 1 / gamma. The docs mark it deprecated, because the composer already encodes the renderer output colour space, so applying it lightens the picture a second time. A gamma of 1 changes nothing. Its shader calls LinearToGamma(), which three 0.187 removed, so this runs a subclass that prepends that helper through setFragmentShader().',
  section: 'Color Grading',
  tags: ['GammaCorrectionEffect', 'gamma', 'deprecated'],
  docs: ['repo/README.md', 'repo/src/effects/Effect.js', 'repo/src/effects/GammaCorrectionEffect.js', 'repo/src/effects/glsl/gamma-correction.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
