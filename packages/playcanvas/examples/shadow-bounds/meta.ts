// playcanvas example: Shadow bounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shadow bounds",
  summary:
    "A directional light fits one shadow map to a BoundingBox that follows a walking character instead of to the camera view, keeping its shadow crisp. Casters outside the bounds, like the far pillars, cast nothing while it is on.",
  section: "Graphics: Lighting",
  tags: ["shadowBounds","BoundingBox","drawWireAlignedBox"],
  docs: ["repo/docs/user-manual/graphics/lighting/shadows.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
