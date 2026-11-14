// deck-gl example: getBounds() draws the camera's footprint
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "getBounds() draws the camera's footprint",
  summary:
    "A pitched, rotated main view and a minimap that outlines viewport.getBounds(), with the cities inside the bounds highlighted.",
  section: "Viewports",
  tags: ["getBounds", "WebMercatorViewport", "layerFilter"],
  docs: ["repo/docs/api-reference/core/viewport.md", "repo/docs/api-reference/core/web-mercator-viewport.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
