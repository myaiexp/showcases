// leaflet example: Bounds extend, pad and corners
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bounds extend, pad and corners",
  summary:
    "A Bounds that starts empty and grows with extend(); getCenter, getSize, the corners and pad(ratio) are read from it. Click the plane or watch the card add points.",
  section: "Geometry & types",
  tags: ["Bounds", "extend", "pad", "getCenter", "getSize", "getBottomLeft", "isValid"],
  docs: ["repo/src/geometry/Bounds.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
