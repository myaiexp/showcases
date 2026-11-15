// galacean example: Live canvas as background
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Live canvas as background",
  summary:
    "A 2D canvas drawn each frame is re-uploaded with setImageSource in a Script's onUpdate, so the scene's background texture is an animation. The texture is created Dynamic and without mipmaps, as the docs advise for frequent updates.",
  section: "Background",
  tags: ['Background.texture', 'Texture2D.setImageSource', 'TextureUsage.Dynamic'],
  docs: [
    'repo/docs/en/graphics/background/texture.mdx',
    'repo/docs/en/graphics/texture/2d.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
