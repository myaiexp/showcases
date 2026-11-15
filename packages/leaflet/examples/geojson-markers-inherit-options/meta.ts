// leaflet example: GeoJSON markersInheritOptions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON markersInheritOptions",
  summary:
    "A GeoJSON layer is given Marker options (opacity, title, draggable). A toggle sets markersInheritOptions, which decides whether the default Markers it creates use them.",
  section: "GeoJSON",
  tags: ["GeoJSON", "markersInheritOptions", "Marker", "opacity", "draggable"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/src/layer/GeoJSON.js',
    'repo/src/layer/ImageOverlay.js',
    'repo/src/layer/marker/Marker.js',
    'repo/src/layer/LayerGroup.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
