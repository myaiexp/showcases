// postprocessing example: Blend functions: difference, exclusion, subtract
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Blend functions: difference, exclusion, subtract',
  summary:
    'DIFFERENCE, EXCLUSION, SUBTRACT, DIVIDE, NEGATION and REFLECT, the functions that compare the two colours. The library has no GLOW function in this version; REFLECT is the nearest relative.',
  section: 'Blending',
  tags: ['BlendFunction', 'blendMode', 'TextureEffect', 'opacity', 'DIFFERENCE', 'EXCLUSION', 'SUBTRACT', 'DIVIDE', 'NEGATION', 'REFLECT'],
  docs: ['repo/README.md', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/blending/BlendMode.js', 'repo/src/effects/TextureEffect.js', 'repo/src/effects/blending/glsl/difference.frag', 'repo/src/effects/blending/glsl/exclusion.frag', 'repo/src/effects/blending/glsl/subtract.frag', 'repo/src/effects/blending/glsl/divide.frag', 'repo/src/effects/blending/glsl/negation.frag', 'repo/src/effects/blending/glsl/reflect.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
