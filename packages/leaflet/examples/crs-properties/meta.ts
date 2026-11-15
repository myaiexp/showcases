// leaflet example: CRS properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "CRS properties",
  summary:
    "The static properties of each built-in CRS class listed in a panel: code, infinite, wrapLng, wrapLat, scale at two zooms, zoom for a scale, bounds at zoom 0, a projected point, and a distance. EarthCRS.R in the caption.",
  section: "Coordinate systems",
  tags: ["CRS", "EarthCRS", "EPSG3857", "EPSG900913", "EPSG3395", "EPSG4326", "SimpleCRS", "getProjectedBounds"],
  docs: ["repo/src/geo/crs/CRS.js", "repo/src/geo/crs/EarthCRS.js", "repo/src/geo/crs/EPSG3857.js", "repo/src/geo/crs/EPSG3395.js", "repo/src/geo/crs/EPSG4326.js", "repo/src/geo/crs/SimpleCRS.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
