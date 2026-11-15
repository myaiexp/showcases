// postprocessing example: bloom blend function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bloom blend function',
  summary:
    'The blurred glow is merged with the scene through the effect\'s BlendFunction. SCREEN, the default, brightens softly; ADD pushes harder, and OVERLAY, SOFT_LIGHT or MULTIPLY treat the glow as contrast or shadow. The opacity slider fades the glow in the chosen mode.',
  section: 'Bloom',
  tags: ['BloomEffect', 'BlendFunction', 'blendMode', 'opacity'],
  docs: ['repo/README.md', 'repo/src/effects/BloomEffect.js', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/blending/BlendMode.js', 'repo/src/effects/Effect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
