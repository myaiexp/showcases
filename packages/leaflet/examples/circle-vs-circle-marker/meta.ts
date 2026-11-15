// leaflet example: Circle vs circle marker
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Circle vs circle marker",
  summary:
    "A Circle is sized in meters and scales with the map; a CircleMarker is sized in pixels and does not. The caption reads both radii while the map zooms.",
  section: "Vector layers",
  tags: ["Circle", "CircleMarker", "getRadius", "radius"],
  docs: ["repo/src/layer/vector/Circle.js", "repo/src/layer/vector/CircleMarker.js", "repo/docs/examples/quick-start/index.md", "repo/MIGRATION.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
