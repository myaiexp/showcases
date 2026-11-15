// galacean example: Texture filter mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Texture filter mode",
  summary:
    "A small checkerboard on a receding floor, sampled with Point, Bilinear and Trilinear filtering: Point is blocky when magnified, Bilinear smooths it, and Trilinear also blends mip levels in the distance.",
  section: "Texture",
  tags: ['Texture2D', 'filterMode', 'TextureFilterMode', 'generateMipmaps'],
  docs: [
    'repo/docs/en/graphics/texture/texture.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
