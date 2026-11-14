// PlayCanvas example: sRGB render target
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "sRGB render target",
  summary:
    "The same offscreen scene rendered into an SRGBA8 and an RGBA8 colour texture by two cameras, shown on planes beside the sphere drawn directly: the sRGB target round-trips correctly, the plain one looks washed out.",
  section: "Graphics: Linear Workflow",
  tags: ["RenderTarget", "Texture", "PIXELFORMAT_SRGBA8", "PIXELFORMAT_RGBA8", "CameraComponent", "renderTarget", "Layer"],
  docs: ["repo/docs/user-manual/graphics/linear-workflow/textures.md", "repo/docs/user-manual/graphics/linear-workflow/index.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
