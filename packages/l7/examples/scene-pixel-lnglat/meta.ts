// l7 example: pixelToLngLat and lngLatToPixel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "pixelToLngLat and lngLatToPixel",
  summary:
    "A grid of screen pixels every 40 px is mapped to coordinates with pixelToLngLat and drawn as points; lngLatToPixel reports where [0, 0] sits on screen.",
  section: 'Scene',
  tags: ["pixelToLngLat", "lngLatToPixel", "getSize"],
  docs: ["repo/site/docs/api/scene.en.md", "repo/site/docs/api/point_layer/shape.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
