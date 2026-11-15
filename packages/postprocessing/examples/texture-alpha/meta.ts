// postprocessing example: TextureEffect with a texture that has an alpha channel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Texture: alpha',
  summary:
    'A round badge painted on a transparent canvas is blended with NORMAL, which uses the texture\'s alpha so only the badge covers the scene. The effect\'s blend opacity fades the whole badge. The transparent surroundings come from the clamped texture edge.',
  section: 'Texture',
  tags: ['TextureEffect', 'texture', 'BlendFunction.NORMAL', 'blendMode', 'opacity', 'texture.repeat'],
  docs: ['repo/README.md', 'repo/src/effects/TextureEffect.js', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/glsl/texture.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
