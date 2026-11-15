// tanstack-charts example: resolveRectCornerRadii and rectCornerRadiiPath
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "resolveRectCornerRadii and rectCornerRadiiPath",
  summary:
    "Custom renderers can share the built-in corner policy. A custom mark emits three rectangles with selective corner radii, and a plain SVG beside the chart draws the same rectangles with rectCornerRadiiPath. The readout shows resolveRectCornerRadii shrinking requested radii that do not fit a small rectangle.",
  section: "Custom Marks and Renderers",
  tags: ['resolveRectCornerRadii', 'rectCornerRadiiPath', 'SceneRect.cornerRadii', 'renderer/rect'],
  docs: ['repo/docs/guides/custom-marks-and-renderers.md', 'repo/docs/reference/rendering-and-export.md', 'repo/docs/reference/runtime-and-scene.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
