// PlayCanvas example: Texture filtering and anisotropy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Texture filtering and anisotropy",
  summary:
    "A 32px checker on a ground plane seen at a grazing angle. Cards cycle the six minFilter modes; the full view sets minFilter, magFilter and anisotropy.",
  section: "Graphics",
  tags: ["Texture", "minFilter", "magFilter", "anisotropy", "FILTER_LINEAR_MIPMAP_LINEAR", "FILTER_NEAREST"],
  docs: ["repo/docs/user-manual/graphics/textures.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
