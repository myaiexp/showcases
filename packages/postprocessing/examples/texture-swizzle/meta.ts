// postprocessing example: TextureEffect setTextureSwizzleRGBA with ColorChannel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Texture: channel swizzle',
  summary:
    'setTextureSwizzleRGBA(r, g, b, a) picks which ColorChannel of the texture feeds each output channel. The data texture holds a different picture in each channel (a red ramp, a green ramp, a blue checker and an alpha fade), so swapping them or copying one into all four shows them one at a time.',
  section: 'Texture',
  tags: ['TextureEffect', 'setTextureSwizzleRGBA', 'ColorChannel', 'DataTexture', 'BlendFunction.SRC'],
  docs: ['repo/README.md', 'repo/src/effects/TextureEffect.js', 'repo/src/enums/ColorChannel.js', 'repo/src/effects/glsl/texture.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
