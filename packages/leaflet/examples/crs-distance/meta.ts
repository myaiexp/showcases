// leaflet example: CRS distance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "CRS distance",
  summary:
    "Two draggable markers on a SimpleCRS, EPSG3857 or EPSG4326 map (a select makes a new map). map.distance uses the map's crs; the caption also shows SimpleCRS.distance in units and EPSG3857.distance in kilometres for the same points.",
  section: "Coordinate systems",
  tags: ["SimpleCRS", "EarthCRS", "distance", "crs", "draggable"],
  docs: [
    'repo/src/geo/crs/SimpleCRS.js',
    'repo/src/geo/crs/EarthCRS.js',
    'repo/src/geo/LatLng.js',
    'repo/src/layer/marker/Marker.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
