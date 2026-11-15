// leaflet example: EPSG4326 map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EPSG4326 map",
  summary:
    "A map with crs EPSG4326 drawn from the WMS server: the world is two tiles wide at zoom 0, a rectangle marks the edges, and the caption turns the pointer's latlng into a pixel with EPSG4326.latLngToPoint.",
  section: "Coordinate systems",
  tags: ["EPSG4326", "crs", "latLngToPoint", "WMSTileLayer", "Rectangle"],
  docs: [
    'repo/src/geo/crs/EPSG4326.js',
    'repo/src/geo/crs/CRS.js',
    'repo/docs/examples/wms/index.md',
    'repo/src/layer/vector/Rectangle.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
