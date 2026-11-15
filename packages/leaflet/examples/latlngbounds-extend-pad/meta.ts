// leaflet example: LatLngBounds extend and pad
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "LatLngBounds extend and pad",
  summary:
    "A LatLngBounds starts empty and grows with extend(); a dashed rectangle shows pad(ratio). Click the map or watch the card add points; the caption gives toBBoxString and isValid.",
  section: "Geometry & types",
  tags: ["LatLngBounds", "extend", "pad", "isValid", "toBBoxString"],
  docs: ["repo/src/geo/LatLngBounds.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
