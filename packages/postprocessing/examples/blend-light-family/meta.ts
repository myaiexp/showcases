// postprocessing example: Blend functions: overlay and the lights
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Blend functions: overlay and the lights',
  summary:
    'The contrast family: OVERLAY, SOFT_LIGHT, HARD_LIGHT, VIVID_LIGHT, LINEAR_LIGHT and PIN_LIGHT. They darken where the layer is dark and lighten where it is bright, differing in how hard the transition is.',
  section: 'Blending',
  tags: ['BlendFunction', 'blendMode', 'TextureEffect', 'opacity', 'OVERLAY', 'SOFT_LIGHT', 'HARD_LIGHT', 'VIVID_LIGHT', 'LINEAR_LIGHT', 'PIN_LIGHT'],
  docs: ['repo/README.md', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/blending/BlendMode.js', 'repo/src/effects/TextureEffect.js', 'repo/src/effects/blending/glsl/overlay.frag', 'repo/src/effects/blending/glsl/soft-light.frag', 'repo/src/effects/blending/glsl/hard-light.frag', 'repo/src/effects/blending/glsl/vivid-light.frag', 'repo/src/effects/blending/glsl/linear-light.frag', 'repo/src/effects/blending/glsl/pin-light.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
