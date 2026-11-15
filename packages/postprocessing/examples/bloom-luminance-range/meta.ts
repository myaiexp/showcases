// postprocessing example: luminance range mask for bloom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bloom luminance range',
  summary:
    'The luminance material can mask by a band instead of a threshold. Set luminanceRange to a Vector2 and only pixels whose luminance falls between its two values feed the bloom, so dim and very bright emitters can be picked apart. Null returns to the threshold.',
  section: 'Bloom',
  tags: ['BloomEffect', 'luminanceMaterial', 'LuminanceMaterial', 'luminanceRange'],
  docs: ['repo/README.md', 'repo/src/effects/BloomEffect.js', 'repo/src/materials/LuminanceMaterial.js', 'repo/src/passes/LuminancePass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
