// l7 example: size(field, [min, max]): height range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "size(field, [min, max]): height range",
  summary:
    "size(field, [min, max]) maps the field's values linearly into the range. Raise the maximum to exaggerate the skyline.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","size","domain","extrude"],
  docs: ["repo/site/docs/api/polygon_layer/size.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
