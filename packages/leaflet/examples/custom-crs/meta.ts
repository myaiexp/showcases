// leaflet example: A custom CRS from SimpleCRS
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A custom CRS from SimpleCRS",
  summary:
    "A class extending SimpleCRS with its own Transformation, so coordinates are pixels of the star-map image and zoom 0 fits it in one tile. Markers sit at image pixels computed from the tutorial's measured bounds.",
  section: "Coordinate systems",
  tags: ["SimpleCRS", "Transformation", "crs", "ImageOverlay", "scale"],
  docs: [
    'repo/src/geo/crs/SimpleCRS.js',
    'repo/src/geo/crs/CRS.js',
    'repo/src/geometry/Transformation.js',
    'repo/docs/examples/crs-simple/index.md',
    'repo/src/map/Map.js',
    'repo/src/layer/Layer.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
