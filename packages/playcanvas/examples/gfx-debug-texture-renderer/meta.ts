// PlayCanvas example: Texture renderer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Texture renderer",
  summary:
    "On-screen previews with TextureRenderer: one texture shown as rgb, rrr, ggg, bbb and aaa, a chosen channel swizzle, and the camera's scene depth, all resubmitted every frame and limited to the main camera.",
  section: "Graphics",
  tags: ["TextureRenderer", "draw", "channels", "sceneDepth", "requestSceneDepthMap"],
  docs: ["repo/docs/user-manual/graphics/debug-drawing.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
