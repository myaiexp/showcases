// PlayCanvas example: Color LUT grading
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Color LUT grading",
  summary:
    "Three 256 by 16 colour lookup strips generated in code (warm, teal and orange, noir), applied through CameraFrame colorLUT with a crossfade between two of them. The LUTs are sRGB, unmipmapped and bilinear as the docs require.",
  section: "Graphics: Linear Workflow",
  tags: ["CameraFrame", "colorLUT", "Texture", "PIXELFORMAT_SRGBA8", "blend", "intensity2", "texture2"],
  docs: ["repo/docs/user-manual/graphics/linear-workflow/hdr-rendering.md", "repo/docs/user-manual/graphics/linear-workflow/textures.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
