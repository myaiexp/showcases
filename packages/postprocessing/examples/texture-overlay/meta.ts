// postprocessing example: TextureEffect with a canvas texture and blend functions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Texture: overlay and blend',
  summary:
    'TextureEffect stretches a texture over the whole screen and blends it with the scene. The texture is a gradient grid painted on a canvas; the blend function (NORMAL, MULTIPLY, SCREEN, OVERLAY, SOFT_LIGHT, ADD, DIFFERENCE) and opacity decide how it mixes.',
  section: 'Texture',
  tags: ['TextureEffect', 'texture', 'CanvasTexture', 'BlendFunction', 'blendMode', 'opacity'],
  docs: ['repo/README.md', 'repo/src/effects/TextureEffect.js', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/glsl/texture.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
