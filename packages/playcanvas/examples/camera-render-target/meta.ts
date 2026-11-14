// playcanvas example: Render target monitor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render target monitor",
  summary:
    "A camera assigned a RenderTarget draws into a texture instead of the screen. The texture becomes the emissive map of an in-world monitor, so the monitor shows a second scene that the main camera never draws directly.",
  section: "Graphics: Cameras",
  tags: ["renderTarget","RenderTarget","Texture","emissiveMap"],
  docs: ["repo/docs/user-manual/graphics/cameras/multiple-cameras.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
