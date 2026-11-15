// leaflet example: LatLng input forms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "LatLng input forms",
  summary:
    "Seven ways to write the same coordinate (two numbers, with altitude, array, object with lng or lon, numeric strings) all build one LatLng. The card moves a marker through them; the panel also shows clone and toString with a precision.",
  section: "Geometry & types",
  tags: ["LatLng", "LatLngExpression", "clone", "toString"],
  docs: ["repo/src/geo/LatLng.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
