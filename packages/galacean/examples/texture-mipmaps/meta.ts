// galacean example: Mipmaps on and off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mipmaps on and off",
  summary:
    "Two floors with the same fine checkerboard: the left texture was created with mipmaps (and generateMipmaps), the right one without. Far away the right one shimmers and turns to noise while the left settles to grey.",
  section: "Texture",
  tags: ['Texture2D', 'mipmap', 'generateMipmaps'],
  docs: [
    'repo/docs/en/graphics/texture/texture.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
