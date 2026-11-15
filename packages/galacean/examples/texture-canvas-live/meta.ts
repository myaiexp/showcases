// galacean example: Canvas updated every frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Canvas updated every frame",
  summary:
    "A clock face drawn on a canvas each frame and re-sent with setImageSource from onUpdate. The texture is created without mipmaps and with TextureUsage.Dynamic, as the docs advise for content that changes constantly.",
  section: "Texture",
  tags: ['Texture2D.setImageSource', 'TextureUsage.Dynamic', 'Script.onUpdate'],
  docs: [
    'repo/docs/en/graphics/texture/2d.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
