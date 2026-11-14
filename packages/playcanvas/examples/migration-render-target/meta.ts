// playcanvas example: Migration: render target on the camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Migration: render target on the camera",
  summary: "To render to a texture, set the RenderTarget on a camera, not on a layer. A second camera with a lower priority draws a far-off scene into a texture, which a main-scene screen shows as its emissive map.",
  section: "Engine",
  tags: ["RenderTarget","Texture","CameraComponent.renderTarget","priority","emissiveMap"],
  docs: ["repo/docs/user-manual/engine/migrations.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
