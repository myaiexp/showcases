// leaflet example: SimpleCRS with an image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SimpleCRS with an image",
  summary:
    "A SimpleCRS map with an ImageOverlay of the star map. A select switches between the bounds measured in the tutorial and bounds of exactly 0 to 1000, and between minZoom -5 and 0; Sol's marker shows whether the image is placed right.",
  section: "Coordinate systems",
  tags: ["SimpleCRS", "crs", "ImageOverlay", "setBounds", "fitBounds", "minZoom"],
  docs: [
    'repo/docs/examples/crs-simple/index.md',
    'repo/docs/examples/crs-simple/uqm_map_full.png',
    'repo/src/geo/crs/SimpleCRS.js',
    'repo/src/layer/ImageOverlay.js',
    'repo/src/layer/vector/Rectangle.js',
    'repo/src/map/Map.js',
    'repo/src/layer/Layer.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
