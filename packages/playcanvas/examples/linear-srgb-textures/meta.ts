// PlayCanvas example: sRGB versus linear textures
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "sRGB versus linear textures",
  summary:
    "The same grey ramp, primaries and mid grey as an sRGB texture and as a plain RGBA8 one, next to a plain material colour: only the sRGB format matches the authored picture.",
  section: "Graphics: Linear Workflow",
  tags: ["Texture", "PIXELFORMAT_SRGBA8", "PIXELFORMAT_RGBA8", "StandardMaterial", "diffuseMap"],
  docs: ["repo/docs/user-manual/graphics/linear-workflow/index.md", "repo/docs/user-manual/graphics/linear-workflow/textures.md", "repo/docs/user-manual/graphics/textures.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
