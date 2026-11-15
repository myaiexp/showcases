// l7 example: Map options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Map options",
  summary:
    "A Map starts from its center, zoom, pitch and rotation options; squareColumn bars show the tilt. The card then circles the camera from that start.",
  section: 'Map',
  tags: ["Map", "center", "zoom", "pitch", "rotation", "squareColumn"],
  docs: ["repo/site/docs/api/map/map.en.md", "repo/site/docs/api/common/map.en.md", "repo/site/docs/api/point_layer/shape.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
