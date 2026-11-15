// leaflet example: custom-pane-labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Labels pane above polygons",
  summary:
    "The Working with Map Panes tutorial's map: the EU countries as GeoJSON polygons, with a labels-only tile layer in a custom pane made by createPane('labels'), z-index 650 and pointer-events none, so labels draw over the polygons and clicks still open their popups.",
  section: "Map panes",
  tags: ["createPane", "getPane", "pane", "GeoJSON", "TileLayer", "bindPopup", "fitBounds"],
  docs: [
    'repo/docs/examples/map-panes/index.md',
    'repo/src/map/Map.js',
    'repo/src/layer/LayerGroup.js',
    'repo/src/layer/DivOverlay.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
