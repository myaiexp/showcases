// leaflet example: Animation options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation options",
  summary:
    "Zoom buttons on a map with markers, with toggles for zoomAnimation, fadeAnimation and markerZoomAnimation (each builds a new map, as they are read at creation) and a slider for zoomAnimationThreshold, the largest zoom change that still animates.",
  section: "Map interaction",
  tags: ["zoomAnimation", "fadeAnimation", "markerZoomAnimation", "zoomAnimationThreshold", "setZoom"],
  docs: ["repo/src/map/Map.js", "repo/src/layer/marker/Marker.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
