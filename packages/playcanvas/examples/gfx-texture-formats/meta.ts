// PlayCanvas example: Texture pixel formats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Texture pixel formats",
  summary:
    "One gradient uploaded as R8, RG8, RGBA8, SRGBA8, RGBA16F and RGBA32F, each on its own plane, with the GPU size of each texture in the full view.",
  section: "Graphics",
  tags: ["Texture", "PIXELFORMAT_R8", "PIXELFORMAT_RG8", "PIXELFORMAT_RGBA8", "PIXELFORMAT_SRGBA8", "PIXELFORMAT_RGBA16F", "PIXELFORMAT_RGBA32F", "FloatPacking", "gpuSize"],
  docs: ["repo/docs/user-manual/graphics/textures.md", "repo/docs/user-manual/graphics/linear-workflow/textures.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
