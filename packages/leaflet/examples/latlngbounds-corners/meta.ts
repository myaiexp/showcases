// leaflet example: LatLngBounds corners and bbox string
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "LatLngBounds corners and bbox string",
  summary:
    "One LatLngBounds with its four corners, centre, sides and bbox string read from getNorthWest, getNorthEast, getSouthEast, getSouthWest, getCenter, getNorth, getSouth, getEast, getWest and toBBoxString.",
  section: "Geometry & types",
  tags: ["LatLngBounds", "getNorthWest", "getCenter", "getWest", "toBBoxString"],
  docs: ["repo/src/geo/LatLngBounds.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
