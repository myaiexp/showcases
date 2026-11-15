// postprocessing example: Depth of field: circle of confusion view
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Depth of field: circle of confusion view',
  summary:
    "DepthOfFieldEffect.cocTexture holds the circle of confusion it blurs by. A TextureEffect puts it on screen: red marks foreground that is too near, green marks background that is too far, and black is the sharp zone around focusDistance.",
  section: 'Depth of Field',
  tags: ['DepthOfFieldEffect', 'cocTexture', 'cocMaterial', 'TextureEffect', 'focusDistance'],
  docs: ['repo/README.md', 'repo/src/effects/DepthOfFieldEffect.js', 'repo/src/materials/CircleOfConfusionMaterial.js', 'repo/src/materials/glsl/circle-of-confusion.frag', 'repo/src/effects/TextureEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
