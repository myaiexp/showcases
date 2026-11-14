// deck-gl example: fitBounds() frames a group of cities
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "fitBounds() frames a group of cities",
  summary:
    "A standalone WebMercatorViewport.fitBounds() computes the camera for each group of cities, which a FlyToInterpolator then flies to.",
  section: "Viewports",
  tags: ["fitBounds", "WebMercatorViewport", "padding", "FlyToInterpolator"],
  docs: ["repo/docs/api-reference/core/web-mercator-viewport.md", "repo/docs/api-reference/core/viewport.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
