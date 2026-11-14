// playcanvas example: Render custom AABB
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render custom AABB",
  summary: "customAabb replaces the bounds a render component is culled with. A sphere sweeps in and out of view with its small culling box drawn in yellow; it vanishes once that box leaves the view, whatever the mesh still covers.",
  section: "Components",
  tags: ["customAabb","BoundingBox","frustum culling"],
  docs: ["repo/docs/user-manual/editor/scenes/components/render.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
