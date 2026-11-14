// playcanvas example: Camera near, far and frustum culling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Camera near, far and frustum culling",
  summary: "An avenue of boxes shows nearClip and farClip cutting the view, and frustumCulling turning off the engine's skip of boxes outside the frustum, with the forward draw calls counted live in the full view.",
  section: "Components",
  tags: ["nearClip","farClip","frustumCulling","stats.drawCalls"],
  docs: ["repo/docs/user-manual/editor/scenes/components/camera.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
