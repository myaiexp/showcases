// galacean example: sRGB or linear texture data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "sRGB or linear texture data",
  summary:
    "The same grey ramp on two planes: the left texture is flagged sRGB (the default) and is decoded to linear for lighting, the right one is created with isSRGBColorSpace false and is read as if it were already linear, so its midtones look different.",
  section: "Texture",
  tags: ['Texture2D', 'isSRGBColorSpace', 'UnlitMaterial'],
  docs: [
    'repo/docs/en/graphics/texture/texture.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
