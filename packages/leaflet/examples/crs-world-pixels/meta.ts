// leaflet example: The world in pixels per CRS
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The world in pixels per CRS",
  summary:
    "getProjectedBounds(zoom) for EPSG3857, EPSG3395 and EPSG4326 drawn as rectangles with Helsinki through each latLngToPoint. A slider sets the zoom and a panel lists the pixel sizes.",
  section: "Coordinate systems",
  tags: ["CRS", "getProjectedBounds", "latLngToPoint", "EPSG3857", "EPSG3395", "EPSG4326"],
  docs: [
    'repo/src/geo/crs/CRS.js',
    'repo/src/geo/crs/EPSG4326.js',
    'repo/src/geo/crs/EPSG3857.js',
    'repo/src/geo/crs/EPSG3395.js',
    'repo/src/map/Map.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
