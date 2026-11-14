// playcanvas example: Near and far clip planes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Near and far clip planes",
  summary:
    "Two columns of shapes march away from a fixed camera while nearClip and farClip sweep: objects closer than the near plane or beyond the far plane are not rendered. The full view has sliders for both planes.",
  section: "Graphics: Cameras",
  tags: ["nearClip","farClip"],
  docs: ["repo/docs/user-manual/graphics/cameras/projection.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
