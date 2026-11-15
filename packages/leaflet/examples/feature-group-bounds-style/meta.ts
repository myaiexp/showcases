// leaflet example: Feature group bounds and style
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Feature group bounds and style",
  summary:
    "A FeatureGroup holding a marker, a polyline, a polygon, a circle and a nested LayerGroup. getBounds drives fitBounds and an outline rectangle; setStyle recolours every path; adding a far circle grows the bounds.",
  section: "Layer groups",
  tags: ["FeatureGroup", "getBounds", "setStyle", "fitBounds", "LayerGroup"],
  docs: ["repo/src/layer/FeatureGroup.js", "repo/src/layer/LayerGroup.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
