// postprocessing example: a dot screen laid over the scene with different blend functions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dot screen: blend functions',
  summary:
    'The halftone replaces the picture by default. Giving DotScreenEffect another blendFunction (OVERLAY, MULTIPLY, SOFT_LIGHT, SCREEN) lays the dots over the lit scene, and blendMode.opacity sets how strongly.',
  section: 'Pattern',
  tags: ['DotScreenEffect', 'BlendFunction', 'blendFunction', 'blendMode', 'opacity'],
  docs: ['repo/README.md', 'repo/src/effects/DotScreenEffect.js', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/blending/BlendMode.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
