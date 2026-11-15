// postprocessing example: TextureEffect uv transform with offset, repeat, rotation, center
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Texture: offset, repeat, rotation',
  summary:
    'TextureEffect applies the texture\'s own transform matrix to its UVs, which replaces the deprecated aspectCorrection option. Offset slides the texture, repeat tiles or zooms it, rotation turns it about its center point. The last checkbox sets repeat.x to the canvas aspect so the square grid keeps square cells.',
  section: 'Texture',
  tags: ['TextureEffect', 'texture.offset', 'texture.repeat', 'texture.rotation', 'texture.center', 'matrixAutoUpdate', 'aspectCorrection'],
  docs: ['repo/README.md', 'repo/src/effects/TextureEffect.js', 'repo/src/effects/glsl/texture.frag', 'repo/src/effects/glsl/texture.vert'],
  provenance: 'pure',
  added: '2026-11-15',
});
