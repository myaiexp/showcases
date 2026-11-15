// leaflet example: Point scaleBy and unscaleBy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point scaleBy and unscaleBy",
  summary:
    "A pixel point divided by the tile size with unscaleBy and floored gives its tile; scaleBy turns the tile back into the tile's top-left pixel. A select changes the tile size to 256, 128 or 256 by 128.",
  section: "Geometry & types",
  tags: ["Point", "scaleBy", "unscaleBy", "floor"],
  docs: ["repo/src/geometry/Point.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
