// galacean example: setImageSource from a canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "setImageSource from a canvas",
  summary:
    "A 2D canvas drawn in code is uploaded with setImageSource, the way images, canvases and video all reach a texture. The flipY argument turns the upload upside down; the card flips it back and forth.",
  section: "Texture",
  tags: ['Texture2D.setImageSource', 'flipY', 'premultiplyAlpha'],
  docs: [
    'repo/docs/en/graphics/texture/2d.mdx',
    'repo/docs/en/graphics/texture/texture.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
