// PlayCanvas example: Texture mipmaps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Texture mipmaps",
  summary:
    "Mip levels supplied one by one in different colours, generated from level 0, or disabled, on a ground plane receding to the horizon. Cards cycle the three; the full view picks one.",
  section: "Graphics",
  tags: ["Texture", "mipmaps", "levels", "numLevels", "FILTER_LINEAR_MIPMAP_LINEAR"],
  docs: ["repo/docs/user-manual/graphics/textures.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
