// leaflet example: Smooth factor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Smooth factor",
  summary:
    "A 301-point line redrawn with different smoothFactor values. The caption counts the points the SVG path really contains after simplification.",
  section: "Vector layers",
  tags: ["Polyline", "smoothFactor", "redraw", "setStyle"],
  docs: [
    'repo/src/layer/vector/Polyline.js',
    'repo/src/geometry/LineUtil.js',
    'repo/MIGRATION.md',
    'repo/src/layer/GeoJSON.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
